# Servidor de Aplicaciones Bajo Estrés

Proyecto desarrollado para la asignatura de Sistemas Operativos 2026-1 de la Universidad del Valle - Sede Tuluá.

## Descripción

Esta aplicación implementa un entorno de estrés controlado sobre una arquitectura multicapa basada en Docker, compuesta por:

- Next.js 14 (Servidor Web)
- PostgreSQL 16 (Base de Datos)
- PgAdmin (Administración de BD)
- JupyterLab (Entrenamiento de IA)

El objetivo es generar diferentes tipos de carga sobre el sistema para analizar el comportamiento de CPU, memoria RAM, I/O de disco y bloqueos en PostgreSQL utilizando herramientas de monitoreo del sistema operativo Linux.

---

## Arquitectura

```text
Usuario
   │
   ▼
Next.js Dashboard
   │
   ├── HTTP Flood
   ├── Query Flood
   ├── Insert Flood
   ├── Lock Contention
   │
   ▼
PostgreSQL
   │
   ▼
Métricas en Tiempo Real
```

---

## Tecnologías Utilizadas

### Frontend

- Next.js 14
- TypeScript
- React
- Tailwind CSS

### Backend

- Next.js API Routes
- Prisma ORM

### Base de Datos

- PostgreSQL 16

### Infraestructura

- Docker
- Docker Compose
- Ubuntu WSL2

### Monitoreo

- htop
- vmstat
- docker stats
- pg_stat_activity
- iostat

---

## Funcionalidades Implementadas

### Dashboard de Control

Panel web para iniciar y detener mecanismos de estrés.

Muestra métricas en tiempo real:

- Uso de CPU
- Uso de RAM
- Conexiones activas PostgreSQL
- Lock Waits
- Load Average
- Uptime

---

## Mecanismos de Estrés

### 1. HTTP Flood

Objetivo:

Saturar el servidor Next.js mediante múltiples peticiones HTTP concurrentes.

Implementación:

```typescript
startHttpFlood(concurrency, duration)
```

Métricas observables:

- CPU Node.js
- Load Average
- Docker Stats

---

### 2. Query Flood

Objetivo:

Generar consultas SQL complejas para aumentar el consumo de CPU de PostgreSQL.

Implementación:

```typescript
startQueryFlood(workers, duration)
```

Métricas observables:

- pg_stat_activity
- CPU PostgreSQL
- Conexiones activas

---

### 3. Insert Flood

Objetivo:

Estresar el sistema de escritura de PostgreSQL mediante inserciones masivas.

Implementación:

```typescript
startInsertFlood(batchSize, duration)
```

Métricas observables:

- WAL PostgreSQL
- I/O de Disco
- Docker Stats

---

### 4. Lock Contention

Objetivo:

Generar bloqueos entre transacciones concurrentes.

Implementación:

```typescript
startLockContention()
```

Métricas observables:

- pg_locks
- lock waits
- pg_stat_activity

---

## API REST

### Métricas

```http
GET /api/metrics
```

Respuesta:

```json
{
  "cpu": 24,
  "ram": {
    "total": 3779,
    "used": 2737,
    "free": 1042,
    "percent": 72
  },
  "postgres": {
    "active": 1,
    "idle": 0,
    "lockWaits": 0
  },
  "loadAvg": [10.43, 9.52, 7.19],
  "uptime": 5800
}
```

---

### HTTP Flood

```http
POST /api/stress/http
```

Body:

```json
{
  "action": "start",
  "concurrency": 50,
  "duration": 120
}
```

Detener:

```json
{
  "action": "stop"
}
```

---

### Query Flood

```http
POST /api/stress/query
```

---

### Insert Flood

```http
POST /api/stress/insert
```

---

### Lock Contention

```http
POST /api/stress/lock
```

---

## Instalación

### 1. Clonar repositorio

```bash
git clone https://github.com/usuario/docker-lab.git
cd docker-lab
```

### 2. Levantar contenedores

```bash
docker compose up -d
```

### 3. Verificar contenedores

```bash
docker ps
```

---

## Acceso a Servicios

### Aplicación Web

```text
http://localhost:3000
```

### PgAdmin

```text
http://localhost:5050
```

### JupyterLab

```text
http://localhost:8888
```

---

## Monitoreo del Sistema

### htop

```bash
htop
```

### Docker Stats

```bash
docker stats
```

### VMStat

```bash
vmstat 2 60
```

### PostgreSQL

```sql
SELECT state, count(*)
FROM pg_stat_activity
GROUP BY state;
```

---

## Evidencias Esperadas

Durante las pruebas se deben capturar:

- Estado Idle
  <img width="921" height="458" alt="image" src="https://github.com/user-attachments/assets/e6a6596f-3688-4459-b617-6cc37f7108ba" />

- HTTP Flood
  <img width="670" height="287" alt="image" src="https://github.com/user-attachments/assets/4586a498-5687-42c4-bab9-715f06edbb63" />

- Query Flood
  <img width="921" height="728" alt="image" src="https://github.com/user-attachments/assets/b3fe4eba-3bc1-47c6-86d8-2c5274e8944e" />

  Htoop
  <img width="921" height="443" alt="image" src="https://github.com/user-attachments/assets/86319a3e-527c-4a59-aca5-6ff5907cbfc5" />


- Insert Flood
  <img width="921" height="726" alt="image" src="https://github.com/user-attachments/assets/05f7be71-4898-4acc-9967-3fce73c11d26" />
   htoop
  <img width="921" height="392" alt="image" src="https://github.com/user-attachments/assets/a894093c-8d87-41bb-b768-e6bb09627042" />

- Lock Contention
  <img width="921" height="623" alt="image" src="https://github.com/user-attachments/assets/70de118e-c6d8-4cd9-aa8a-90cec11c418f" />

- Ejecución simultánea con IA
  <img width="921" height="651" alt="image" src="https://github.com/user-attachments/assets/9ea7aee8-86bb-45bb-8552-d2ce40544fc9" />
- Htoop en ejecucion en simultanea
  <img width="921" height="404" alt="image" src="https://github.com/user-attachments/assets/471bf20c-02c5-49d4-ae24-a73ad302036f" />


- Estado de recuperación
  <img width="921" height="417" alt="image" src="https://github.com/user-attachments/assets/d35cc980-2e97-42a6-a883-3b24964a57b2" />


---

## Resultados Esperados

Durante la ejecución de los mecanismos de estrés se espera observar:

- Incremento de CPU en Node.js
- Incremento de CPU en PostgreSQL
- Aumento de conexiones activas
- Incremento de I/O de disco
- Aparición de lock waits
- Aumento del Load Average
- Competencia de recursos con el entrenamiento del modelo IA

---

## Autores

Adriana Milena Noscue Dagua

Universidad del Valle – Sede Tuluá

Ingeniería de Sistemas

Curso: Sistemas Operativos 2026-1

Mini Proyecto: Servidor de Aplicaciones Bajo Estrés
