# Perth Airport (PER) Intelligent Analytics Digital Twin

An AI-powered digital twin and smart analytics platform designed for Perth Airport. This application provides real-time monitoring, predictive analytics, and strategic intelligence across all operational domains of the airport through a combination of a 3D visualization dashboard and detailed KPI panels.

## Features

- **Interactive 3D Digital Twin**: A complete 3D representation of the airport geometry (Terminals T1-T4, runways, aprons) built with Three.js.
- **Real-Time & Predictive Analytics**: KPI tracking and forecasting across five core domains:
  -  Passenger Flow & Queue Management
  -  Resource Scheduling & Gate Assignment
  -  Threat Detection & Abandoned Baggage
  -  Sustainability & Energy Optimization
  -  Customer Experience & Retail
- **Smart Alerts & Actions**: AI-driven insights (e.g., CrowdSense, ThreatGuard, EnergyOptimize) that generate actionable recommendations based on SLA thresholds and simulated real-time data.
- **Terminal Analytics Dashboard**: In-depth analytical views for each terminal, providing both operational (current) and predictive (+30m, +60m) metrics.
- **Executive View**: High-level summaries including health scores, risk indices, and revenue performance.
- **Natural Language Query (NLQ) Simulation**: An interface to simulate querying the digital twin for instant insights.

## Technology Stack

- **Core**: HTML, CSS, JavaScript (Vanilla ES6 Modules)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **3D Rendering**: [Three.js](https://threejs.org/)
- **Data Visualization**: [Chart.js](https://www.chartjs.org/)
- **State/Routing**: Custom event-bus (`bus`) and hash-based routing.

## Project Structure

```text
front/
├── index.html            # Main entry point and application layout
├── package.json          # Project dependencies and scripts
└── src/
    ├── main.js           # Core application initialization and coordination
    ├── router.js         # Hash-based routing system
    ├── components/       # Reusable layout components (Sidebar, Topbar, Notifications)
    ├── data/             # Mock data, KPIs, alerts, and Smart Actions
    ├── pages/            # Full-page views (Alert Center, Terminal Analytics)
    ├── panels/           # Sidebar panels (KPIs, Domains, Smart Actions)
    ├── scene/            # Three.js 3D environment (Airport geometry, overlays, particles)
    ├── styles/           # CSS design system (base, layout, components)
    └── utils/            # Helper functions (Event Bus, Chart generation abstractions)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository and navigate to the `front` directory:
   ```bash
   cd path/to/DXC-PER-Intelligent-Analytics/front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate a `dist` folder containing the compiled and minified assets. You can preview the build using:

```bash
npm run preview
```

## Architecture Notes

- **Modularity**: The application avoids large framework overhead by using a robust Vanilla JS architecture with an event-driven `bus` (`src/utils/helpers.js`).
- **Styling**: Uses a curated CSS variable design system (`src/styles/base.css`) ensuring high-performance dark-mode aesthetics without external CSS frameworks.
- **Data Source**: Currently uses a highly detailed mock data layer (`src/data/mockData.js` and `terminalKpiData.js`) simulating Perth-specific operating conditions (e.g., FIFO peaks, WA SWIS grid factors, AFL game days).
