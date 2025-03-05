# Adverse Event Analyzer Architecture

## Overview
A Next.js application that fetches and analyzes drug-related adverse event data from the OpenFDA Adverse Events API. The app provides a simple UI for searching drugs, filtering by seriousness, displaying key metrics, and visualizing trends over time. Built with the App Router, Server Components, and minimal client-side state.

## Tech Stack
- **Framework**: Next.js (App Router)
- **API**: OpenFDA Adverse Events API (`https://api.fda.gov/drug/event.json`)
- **Styling**: Tailwind CSS
- **Visualization**: Chart.js with `react-chartjs-2`
- **State Management**: React `useState` for UI interactions
- **Language**: JavaScript (or TypeScript if preferred)

## File Structure

```
adverse-event-analyzer/
├── /app/
│   ├── /api/
│   │   └── /adverse-events/
│   │       └── route.js          # Route handler for API calls
│   ├── /components/
│   │   ├── SearchBar.tsx        # Search input component
│   │   ├── FilterDropdown.tsx   # Seriousness filter dropdown
│   │   ├── MetricsDisplay.tsx   # Metrics (total, deaths, etc.)
│   │   └── TrendChart.tsx       # Chart.js visualization
│   ├── layout.tsx               # Root layout with Tailwind setup
│   └── page.tsx                 # Main page orchestrating components
├── /public/                     # Static assets (if needed)
├── package.json                 # Dependencies (next, chart.js, etc.)
└── README.md                    # Project documentation
```

## Architecture Components

### 1. Data Layer
- **API Endpoint**: `/api/adverse-events`
  - **Purpose**: Handles server-side API requests to OpenFDA.
  - **Implementation**: Next.js route handler (`GET` method).
  - **Logic**: 
    - Accepts query params (e.g., `drugName`, `seriousness`).
    - Constructs API URL (e.g., `https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:"<drugName>"&limit=100`).
    - Adds seriousness filter if provided (e.g., `+seriousnessdeath:1`).
    - Returns JSON response to client.
  - **Why Server-Side**: Keeps API key-free requests secure and simplifies client logic.

### 2. UI Layer
- **Root Layout** (`/app/layout.tsx`):
  - Defines app-wide structure (e.g., `<html>`, `<body>`) with Tailwind CSS.
  - Minimal: Wraps page content with a header ("Adverse Event Analyzer").

- **Main Page** (`/app/page.tsx`):
  - **Type**: Server Component with client-side interactivity.
  - **Responsibilities**:
    - Renders `<SearchBar>`, `<FilterDropdown>`, `<MetricsDisplay>`, and `<TrendChart>`.
    - Manages state with `useState` for `drugName`, `seriousnessFilter`, and `eventData`.
    - Fetches data from `/api/adverse-events` on search/filter change.
  - **Flow**: 
    1. User enters drug name and selects filter.
    2. Triggers API call via `fetch`.
    3. Updates state with response data.
    4. Passes data to child components.

- **Components**:
  - **`SearchBar.tsx`**:
    - Client Component (`"use client"`).
    - Input field and "Search" button.
    - Calls parent callback with drug name.
  - **`FilterDropdown.tsx`**:
    - Client Component.
    - Dropdown with options: "All", "Death", "Hospitalization".
    - Updates parent state with selected filter.
  - **`MetricsDisplay.tsx`**:
    - Stateless component.
    - Receives `eventData` and displays counts (e.g., total, deaths).
    - Simple grid or list with Tailwind styling.
  - **`TrendChart.tsx`**:
    - Client Component.
    - Receives `eventData`, groups `receivedate` by year, and renders a bar chart.
    - Uses `react-chartjs-2` for visualization.

### 3. Data Flow
1. **User Input**: Drug name and seriousness filter entered in UI.
2. **API Request**: Main page fetches data via `/api/adverse-events`.
3. **Processing**: 
   - Parse `results` array from API response.
   - Calculate metrics (e.g., total reports, seriousness counts).
   - Group `receivedate` by year for chart.
4. **Rendering**: Update UI with metrics and chart.

## Key Design Decisions
- **Server Components**: Use Next.js Server Components for initial render and API calls to minimize client-side JS.
- **Route Handler**: Offloads API logic to server, keeping client lightweight.
- **Minimal Dependencies**: Only Chart.js added for visualization; rely on Next.js and Tailwind for rest.
- **Simple State**: `useState` in main page avoids complex state management libraries.
- **Limit=100**: Caps API results for performance and simplicity in 1-hour scope.

## Data Model (API Response)
- **Source**: OpenFDA Adverse Events API.
- **Key Fields**:
  - `results[].serious`: "1" (serious) or "2" (non-serious).
  - `results[].seriousnessdeath`: "1" if death-related.
  - `results[].seriousnesshospitalization`: "1" if hospitalization-related.
  - `results[].receivedate`: Date string (e.g., "20080707") for trends.
  - `results[].patient.drug.medicinalproduct`: Drug name.

## Scalability Notes
- For production: Add error handling, loading states, and pagination (`skip` param in API).
- Current scope: Focus on functional demo within 1 hour.

## Diagram (Text-Based)

```
[User] --> [page.tsx]
|--> [SearchBar] --> Input drug name
|--> [FilterDropdown] --> Select seriousness
|--> [/api/adverse-events] --> Fetch OpenFDA data
|--> [MetricsDisplay] --> Show counts
|--> [TrendChart] --> Render chart
```