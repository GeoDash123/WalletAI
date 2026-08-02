# WalletIA

WalletIA es una aplicación móvil para el registro y administración de gastos personales, desarrollada con React Native y Expo.

La aplicación permite registrar gastos manualmente o utilizar inteligencia artificial para analizar fotografías de tickets de compra y extraer automáticamente información como el monto, comercio y categoría del gasto.

## Características

- Registro manual de gastos.
- Escaneo de tickets utilizando la cámara del dispositivo.
- Análisis de tickets mediante inteligencia artificial.
- Clasificación automática de gastos.
- Historial de gastos registrados.
- Búsqueda y filtrado por categoría.
- Ordenamiento por fecha y monto.
- Edición y eliminación de gastos.
- Estadísticas de gastos.
- Persistencia de información en PostgreSQL.
- Automatización del backend mediante n8n.

## Tecnologías utilizadas

### Aplicación móvil

- React Native
- Expo
- TypeScript
- Expo Router
- Axios
- Expo Image Picker

### Backend y automatización

- n8n
- Webhooks
- REST API
- Docker

### Base de datos

- PostgreSQL

### Inteligencia Artificial

- Groq API
- Qwen

## Arquitectura

El proyecto utiliza una arquitectura donde la aplicación móvil se comunica con diferentes webhooks de n8n mediante peticiones HTTP.

```text
┌──────────────────────┐
│     WalletIA App     │
│ React Native + Expo  │
└──────────┬───────────┘
           │
           │ HTTP / JSON
           ▼
┌──────────────────────┐
│         n8n          │
│ Webhooks / Workflows │
└───────┬────────┬─────┘
        │        │
        │        │
        ▼        ▼
┌────────────┐  ┌──────────────┐
│ PostgreSQL │  │   Groq API   │
│   Gastos   │  │ Análisis IA  │
└────────────┘  └──────────────┘
```

n8n funciona como intermediario entre la aplicación, PostgreSQL y los servicios externos.

## Análisis de tickets con IA

Una de las principales funcionalidades de WalletIA es el registro de gastos mediante fotografías de tickets.

El flujo general es:

1. El usuario toma una fotografía desde la aplicación.
2. React Native convierte la imagen a Base64.
3. La imagen se envía mediante HTTP a un webhook de n8n.
4. n8n construye una solicitud para la API de Groq.
5. El modelo analiza la imagen.
6. Se extraen los siguientes datos:

```json
{
  "amount": 125.50,
  "description": "OXXO",
  "category": "Comida"
}
```

7. Los datos regresan a la aplicación.
8. WalletIA completa automáticamente el formulario de registro.
9. El usuario puede revisar y guardar el gasto.

Las categorías utilizadas actualmente son:

- Comida
- Transporte
- Salud
- Educación
- Entretenimiento
- Hogar
- Otros

## Estructura del proyecto

El proyecto está organizado separando las pantallas de la aplicación, componentes reutilizables, servicios de comunicación con el backend, hooks, workflows de n8n, tipos y constantes.

```text
WalletIA/
│
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── explore.tsx
│   │   └── statistics.tsx
│   │
│   ├── expense/
│   │   └── [id].tsx
│   │
│   └── _layout.tsx
│
├── assets/
│   └── images/
│
├── components/
│   ├── dashboard/
│   │   └── DashboardCard.tsx
│   │
│   ├── expenses/
│   │   ├── ExpenseCard.tsx
│   │   ├── ExpenseForm.tsx
│   │   └── ExpenseItem.tsx
│   │
│   ├── statistics/
│   │   ├── CategoryBarChart.tsx
│   │   ├── CategoryPieChart.tsx
│   │   ├── MonthlyLineChart.tsx
│   │   ├── StatisticsCard.tsx
│   │   └── SummaryCards.tsx
│   │
│   └── ui/
│       ├── Card.tsx
│       ├── icon-symbol.ios.tsx
│       ├── icon-symbol.tsx
│       ├── Input.tsx
│       ├── PrimaryButton.tsx
│       ├── Select.tsx
│       └── StatCard.tsx
│
├── constants/
│   ├── categories.ts
│   ├── categoryIcons.ts
│   ├── colors.ts
│   ├── spacing.ts
│   ├── theme.ts
│   └── typography.ts
│
├── hooks/
│   ├── use-theme-color.ts
│   ├── useDashboard.ts
│   └── useExpenses.ts
│
├── n8n/
│   └── workflows/
│       ├── Borrar Gasto.json
│       ├── Dashboard.json
│       ├── Editar Datos.json
│       ├── Estadisticas.json
│       ├── Historial de Gastos.json
│       ├── Insertar Datos.json
│       ├── Obtener Gasto.json
│       └── Ticket Scanner.json
│
├── services/
│   ├── aiService.ts
│   ├── api.ts
│   ├── dashboardService.ts
│   ├── expenseService.ts
│   └── statisticsService.ts
│
├── types/
│   ├── Dashboard.ts
│   ├── Expense.ts
│   └── Statistics.ts
│
├── utils/
│
├── android/
├── local-files/
├── scripts/
│
├── .gitignore
├── app.json
├── docker-compose.yml
├── eslint.config.js
├── expo-env.d.ts
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

### Organización

- `app/`: contiene las pantallas y rutas de la aplicación utilizando Expo Router.
- `app/(tabs)/`: contiene las pantallas principales accesibles mediante la navegación inferior, incluyendo inicio, historial y estadísticas.
- `app/expense/[id].tsx`: pantalla dinámica utilizada para consultar o editar un gasto específico.
- `components/`: contiene componentes reutilizables de la interfaz.
- `components/dashboard/`: componentes utilizados en el dashboard principal.
- `components/expenses/`: componentes relacionados con el registro, visualización y edición de gastos.
- `components/statistics/`: gráficas, tarjetas y componentes utilizados para visualizar estadísticas.
- `components/ui/`: componentes genéricos reutilizados en diferentes partes de la aplicación.
- `constants/`: categorías, colores, iconos y valores relacionados con el diseño visual.
- `hooks/`: hooks personalizados para obtener y administrar información utilizada por las pantallas.
- `n8n/`: Archivos JSON para importar los Workflows en n8n
- `services/`: capa encargada de la comunicación HTTP con los webhooks y servicios externos.
- `services/aiService.ts`: comunicación con el workflow encargado del análisis de tickets mediante IA.
- `services/api.ts`: configuración principal del cliente HTTP.
- `services/expenseService.ts`: operaciones CRUD relacionadas con los gastos.
- `services/dashboardService.ts`: obtención de información para el dashboard.
- `services/statisticsService.ts`: obtención de datos utilizados para generar estadísticas.
- `types/`: interfaces y tipos de TypeScript utilizados para modelar los datos de la aplicación.
- `assets/images/`: imágenes, iconos y recursos gráficos.
- `docker-compose.yml`: configuración de los servicios ejecutados mediante Docker.
```

## Base de datos

Los gastos son almacenados en PostgreSQL.

La estructura principal utilizada por la aplicación es:

```sql
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API

La aplicación utiliza Axios para comunicarse con los webhooks publicados en n8n.

Entre las operaciones implementadas se encuentran:

```text
POST    Registrar gasto
GET     Consultar gastos
GET     Consultar un gasto
PUT     Actualizar gasto
DELETE  Eliminar gasto
POST    Analizar ticket con IA
```

Los endpoints reales pueden configurarse desde los servicios ubicados en:

```text
services/
├── api.ts
├── aiService.ts
└── expenseService.ts
```

## Instalación

### Requisitos

Es necesario tener instalado:

- Node.js
- npm
- Expo
- Docker
- Docker Compose

También se necesita una API Key de Groq para utilizar el análisis de tickets.

### Clonar el repositorio

```bash
git clone <https://github.com/GeoDash123/WalletAI>
cd WalletAI
```

### Instalar dependencias

```bash
npm install
```

### Iniciar la aplicación

```bash
npx expo start
```

Posteriormente se puede ejecutar mediante Expo Go o un Development Build.

## Configuración de n8n y PostgreSQL

Los servicios de backend pueden ejecutarse mediante Docker Compose.

```bash
docker compose up -d
```

Es necesario configurar correctamente las credenciales de PostgreSQL dentro de n8n y establecer la API Key de Groq utilizada por el workflow de análisis de tickets.

## Workflows de n8n

WalletIA utiliza n8n como backend para procesar las solicitudes realizadas por la aplicación móvil.

Los workflows necesarios para ejecutar el proyecto se encuentran en:

```text
n8n/
```

Estos archivos pueden importarse directamente desde n8n.

### Importar los workflows

1. Inicia la instancia de n8n.
2. Accede al panel de n8n.
3. Selecciona la opción para importar un workflow desde un archivo.
4. Importa los archivos `.json` ubicados en `n8n/`.
5. Configura las credenciales requeridas por cada workflow.
6. Verifica las conexiones con PostgreSQL y los servicios externos.
7. Activa los workflows (Publish)

### Credenciales

Las credenciales no se incluyen en el repositorio por motivos de seguridad.

Tienes que configurar tus propias credenciales para:

- PostgreSQL
- Groq API
- Cualquier otro servicio externo utilizado por los workflows

## Estado del proyecto

WalletIA cuenta actualmente con las principales funcionalidades necesarias para administrar gastos y utilizar inteligencia artificial para agilizar su registro.

El proyecto fue desarrollado como parte de un proyecto académico y también como práctica de integración entre desarrollo móvil, automatización, bases de datos, contenedores e inteligencia artificial.