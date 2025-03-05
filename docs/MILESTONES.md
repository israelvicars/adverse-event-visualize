# Adverse Event Analyzer Milestones

## Project Overview
Build a Next.js app that interacts with the OpenFDA Adverse Events API to search for drug-related adverse events, filter by seriousness, display key metrics, and visualize trends over time. Target completion: 1 hour.

## Milestones & Tasks

### Milestone 1: Project Setup (0:00 - 0:10)
- **Duration**: 10 minutes
- **Tasks**:
  - Run `npx create-next-app@latest adverse-event-analyzer --use-npm` (choose App Router, Tailwind CSS).
  - Set up basic file structure: `/app/page.tsx`, `/app/layout.tsx`.
  - Create a simple layout: header ("Adverse Event Analyzer"), search input, filter dropdown, and results section.
- **Deliverable**: Functional Next.js app with a basic UI skeleton.

### Milestone 2: API Integration & Search (0:10 - 0:30)
- **Duration**: 20 minutes
- **Tasks**:
  - Create a route handler (`/app/api/adverse-events/route.js`) to fetch data from `https://api.fda.gov/drug/event.json`.
  - Implement search functionality: use `useState` for drug name input, fetch API with query `search=patient.drug.medicinalproduct:"<drug_name>"&limit=100`.
  - Display raw results (e.g., total reports) in the UI.
- **Deliverable**: App can search for a drug (e.g., "DURAGESIC-100") and show basic adverse event data.

### Milestone 3: Seriousness Filter & Metrics (0:30 - 0:45)
- **Duration**: 15 minutes
- **Tasks**:
  - Add a seriousness filter dropdown ("All", "Death", "Hospitalization") with `useState`.
  - Update API query to filter by seriousness (e.g., `+seriousnessdeath:1` or `+seriousnesshospitalization:1`).
  - Parse API response to calculate metrics: total reports, count of deaths, hospitalizations.
  - Display metrics in the UI (e.g., "Total: X | Deaths: Y | Hospitalizations: Z").
- **Deliverable**: App filters adverse events by seriousness and shows aggregated stats.

### Milestone 4: Time Trend Visualization (0:45 - 0:55)
- **Duration**: 10 minutes
- **Tasks**:
  - Install Chart.js: `npm install chart.js react-chartjs-2`.
  - Process `receivedate` from API results, group by year, and count events.
  - Add a simple bar chart using `react-chartjs-2` to show events per year.
- **Deliverable**: App displays a chart of adverse events over time for the selected drug.

### Milestone 5: Testing & Final Tweaks (0:55 - 1:00)
- **Duration**: 5 minutes
- **Tasks**:
  - Test with sample drugs (e.g., "DURAGESIC-100", "ASPIRIN").
  - Fix any bugs (e.g., API errors, UI glitches).
  - Ensure search, filter, metrics, and chart work together.
- **Deliverable**: Polished, demo-ready app.

## Notes
- **Priority**: Focus on Milestones 1-3 if time runs short; visualization is a bonus.
- **API Limit**: Use `limit=100` to keep responses manageable.
- **Styling**: Use Tailwind CSS for quick, functional design—no need for perfection.