/**
 * Query Flood - Maximiza CPU de PostgreSQL
 * mediante consultas SELECT con JOINs y agregaciones pesadas.
 */


const prisma = new PrismaClient();
let queryFloodRunning = false;

export function getQueryFloodStatus() {
  return { running: queryFloodRunning };
}

async function seedDataIfNeeded() {
  const catCount = await prisma.category.count();
  if (catCount > 0) return;

  const categories = await Promise.all(
    ["Electronics", "Clothing", "Food", "Sports", "Books"].map(name =>
      prisma.category.create({ data: { name } })
    )
  );

  const products = await Promise.all(
    Array.from({ length: 100 }, (_, i) =>
      prisma.product.create({
        data: {
          name: `Product ${i}`,
          price: Math.random() * 1000,
          stock: Math.floor(Math.random() * 500),
          categoryId: categories[i % categories.length].id,
        },
      })
    )
  );

  const orders = await Promise.all(
    Array.from({ length: 50 }, () =>
      prisma.order.create({
        data: { total: Math.random() * 5000, status: "pending" },
      })
    )
  );

  await Promise.all(
    Array.from({ length: 200 }, (_, i) =>
      prisma.orderItem.create({
        data: {
          orderId: orders[i % orders.length].id,
          productId: products[i % products.length].id,
          quantity: Math.floor(Math.random() * 10) + 1,
          price: Math.random() * 500,
        },
      })
    )
  );
}

export async function startQueryFlood(concurrency: number = 20, durationMs: number = 60000) {
  queryFloodRunning = true;
  await seedDataIfNeeded();
  const endTime = Date.now() + durationMs;

  const heavyQuery = async () => {
    while (queryFloodRunning && Date.now() < endTime) {
      await Promise.all([
        // JOIN pesado entre 4 tablas
        prisma.$queryRaw`
          SELECT p.id, p.name, p.price, c.name as category,
                 COUNT(oi.id) as total_orders,
                 SUM(oi.quantity * oi.price) as revenue,
                 AVG(oi.price) as avg_price
          FROM "Product" p
          JOIN "Category" c ON p."categoryId" = c.id
          LEFT JOIN "OrderItem" oi ON oi."productId" = p.id
          LEFT JOIN "Order" o ON oi."orderId" = o.id
          GROUP BY p.id, p.name, p.price, c.name
          ORDER BY revenue DESC NULLS LAST
        `,
        // Agregacion con subquery
        prisma.$queryRaw`
          SELECT c.name, COUNT(p.id) as products,
                 AVG(p.price) as avg_price,
                 MAX(p.stock) as max_stock
          FROM "Category" c
          LEFT JOIN "Product" p ON p."categoryId" = c.id
          GROUP BY c.id, c.name
          HAVING COUNT(p.id) > 0
          ORDER BY avg_price DESC
        `,
        // Cross join simulado para estresar el planificador
        prisma.$queryRaw`
          SELECT o.id, o.total, o.status,
                 COUNT(oi.id) as items,
                 SUM(oi.quantity) as total_units
          FROM "Order" o
          LEFT JOIN "OrderItem" oi ON oi."orderId" = o.id
          GROUP BY o.id, o.total, o.status
          ORDER BY total_units DESC NULLS LAST
          LIMIT 100
        `,
      ]);
    }
  };

  const workers = Array.from({ length: concurrency }, () => heavyQuery());
  await Promise.all(workers);
  queryFloodRunning = false;
}

export function stopQueryFlood() {
  queryFloodRunning = false;
}
