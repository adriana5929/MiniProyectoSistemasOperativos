/**
 * Lock Contention - Genera bloqueos entre transacciones
 * concurrentes para estresar el sistema de locks de PostgreSQL.
 */
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();
let lockRunning = false;
let lockWaits = 0;

export function getLockStatus() {
  return { running: lockRunning, lockWaits };
}

async function seedLockRows() {
  const count = await prisma.lockTest.count();
  if (count >= 10) return;
  await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.lockTest.upsert({
        where: { token: `lock-token-${i}` },
        update: {},
        create: { token: `lock-token-${i}`, counter: 0 },
      })
    )
  );
}

export async function startLockContention(concurrency: number = 30, durationMs: number = 60000) {
  lockRunning = true;
  lockWaits = 0;
  await seedLockRows();
  const endTime = Date.now() + durationMs;

  const worker = async () => {
    while (lockRunning && Date.now() < endTime) {
      const tokenIndex = Math.floor(Math.random() * 10);
      try {
        // Transaccion que bloquea la fila con SELECT FOR UPDATE
        await prisma.$transaction(async (tx) => {
          // Esto genera lock wait cuando dos workers toman la misma fila
          await tx.$queryRaw`
            SELECT * FROM "LockTest"
            WHERE token = ${`lock-token-${tokenIndex}`}
            FOR UPDATE
          `;
          // Simula trabajo dentro de la transaccion (mantiene el lock abierto)
          await new Promise(r => setTimeout(r, 100 + Math.random() * 200));
          await tx.lockTest.update({
            where: { token: `lock-token-${tokenIndex}` },
            data: { counter: { increment: 1 } },
          });
        });
      } catch {
        lockWaits++;
      }
    }
  };

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  lockRunning = false;
}

export function stopLockContention() {
  lockRunning = false;
}
