# Docker Lab con WSL2 y Ubuntu

## Descripción

Este proyecto implementa un entorno Docker utilizando WSL2 y Ubuntu en Windows.

El entorno incluye:

- Nginx
- Node.js
- PostgreSQL
- pgAdmin 4
- Jupyter Lab

Todo el sistema fue orquestado usando Docker Compose.

---

# Arquitectura del Proyecto

```text
Windows
│
├── WSL2
│   └── Ubuntu
│
└── Docker Compose
    ├── nginx
    ├── node-app
    ├── postgres
    ├── pgadmin
    └── jupyter
```

---

# Tecnologías Utilizadas

- Docker
- Docker Compose
- Ubuntu
- WSL2
- Node.js
- Express
- PostgreSQL
- pgAdmin 4
- Jupyter Lab
- GitHub

---

# Estructura del Proyecto

```text
docker-lab/
│
├── nginx/
├── node-app/
├── postgres/
├── jupyter/
├── .env
├── docker-compose.yml
└── README.md
```

---

# Instalación

## Clonar repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

## Entrar al proyecto

```bash
cd docker-lab
```

## Levantar contenedores

```bash
docker compose up -d
```

---

# Servicios

| Servicio | Puerto |
|---|---|
| Nginx | 8080 |
| Node.js | 3000 |
| PostgreSQL | 5432 |
| pgAdmin | 5050 |
| Jupyter | 8888 |

---

# Evidencias

## Docker funcionando

Captura:<img width="932" height="488" alt="evidenciasdocker-ps png" src="https://github.com/user-attachments/assets/265853de-4769-4cee-8ce5-d5a987d1f478" />



## Nginx funcionando

Captura del navegador:

```text
http://localhost:8080
```

## API Node.js


```text
http://localhost:3000
```

## pgAdmin

Captura del panel conectado a PostgreSQL.

## Jupyter Lab

Captura del notebook funcionando.

---

# Intregantes de grupo

Adriana Milena Noscue Dagua
Sebastian Cucalon Astorquiza
