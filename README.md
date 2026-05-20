# Docker Lab con WSL2 y Ubuntu

## Este proyecto implementa un entorno de desarrollo basado en contenedores Docker utilizando WSL2 y Ubuntu sobre Windows.


## Tecnologías Utilizadas

- WSL2
- Ubuntu
- Docker
- Nginx
- Node.js
- PostgreSQL
- pgAdmin 4
- Jupyter Lab
- Git & GitHub


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



## Nginx funcionando

<img width="932" height="488" alt="evidenciasdocker-ps png" src="https://github.com/user-attachments/assets/265853de-4769-4cee-8ce5-d5a987d1f478" />

## API Node.js

<img width="1064" height="266" alt="evidenciasnode-api png (2)" src="https://github.com/user-attachments/assets/582cc3a8-fbc9-40e8-b29d-8464d8778728" />


## pgAdmin

<img width="1802" height="858" alt="evidenciaspgadmin png" src="https://github.com/user-attachments/assets/9672dc46-6976-46fa-90d2-9398603cc131" />



## Jupyter Lab

<img width="1852" height="831" alt="evidenciasjupyter png" src="https://github.com/user-attachments/assets/f14fa524-349d-4469-ab53-084931062fe5" />

## contenedores activos

<img width="297" height="57" alt="image" src="https://github.com/user-attachments/assets/4b9405f2-f6d7-4097-b743-3ba27223d8c7" />

<img width="497" height="67" alt="image" src="https://github.com/user-attachments/assets/eebccb32-8da8-4205-86a4-e51d429b676c" />


---

# Intregantes de grupo


| Nombre | Codigo |
|---|---|
|  Adriana Milena Noscue Dagua | 2477336 |
| Sebastian Cucalon Astorquiza | 2477344 |

