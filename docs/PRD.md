# Adverse Event Analyzer - Product Requirements Document (PRD)

## 1. Overview
### Product Name
Adverse Event Analyzer

### Purpose
A web application designed to help healthcare professionals analyze drug-related adverse event reports from the FDA’s OpenFDA Adverse Events API. The tool provides actionable insights through search, filtering, metrics, and visualization, enabling users to understand key trends and risks associated with specific drugs.

### Objective
Build a functional prototype in 1 hour using Next.js that demonstrates interaction with a public API, delivering a minimum viable product (MVP) for a take-home interview.

### Target Audience
- Healthcare professionals (e.g., doctors, pharmacists).
- Interview evaluators assessing technical skills.

## 2. Scope
### In-Scope
- Search for adverse events by drug name.
- Filter adverse events by seriousness (e.g., death, hospitalization).
- Display key metrics (e.g., total reports, seriousness counts).
- Visualize adverse event trends over time (e.g., by year).

### Out-of-Scope (Due to 1-Hour Limit)
- Advanced filtering (e.g., pharmacological class, administration route).
- Integration with Drugs@FDA API.
- User authentication or persistent data storage.
- Extensive UI polish or accessibility features.

## 3. Requirements

### 3.1 Functional Requirements
#### FR1: Drug Search
- **Description**: Users can enter a drug name to retrieve adverse event reports.
- **Details**: 
  - Input field accepts free-text drug names (e.g., "DURAGESIC-100").
  - Submits query to OpenFDA API: `search=patient.drug.medicinalproduct:"<drug_name>"&limit=100`.
- **Acceptance Criteria**:
  - Entering a drug name and clicking "Search" displays results.
  - Invalid or empty input shows a "No results" message.

#### FR2: Seriousness Filter
- **Description**: Users can filter adverse events by seriousness category.
- **Details**: 
  - Dropdown with options: "All", "Death", "Hospitalization".
  - Updates API query with `+seriousnessdeath:1` or `+seriousnesshospitalization:1`.
- **Acceptance Criteria**:
  - Selecting a filter updates displayed results dynamically.
  - "All" option shows unfiltered results.

#### FR3: Key Metrics Display
- **Description**: Show summary statistics for adverse events of the searched drug.
- **Details**: 
  - Metrics: Total reports, count of deaths, count of hospitalizations.
  - Parsed from API response fields (`serious`, `seriousnessdeath`, `seriousnesshospitalization`).
- **Acceptance Criteria**:
  - Metrics update correctly after search or filter change.
  - Displayed in a clear, readable format (e.g., cards or list).

#### FR4: Time Trend Visualization
- **Description**: Visualize adverse events over time for the searched drug.
- **Details**: 
  - Bar chart showing event counts by year.
  - Data derived from `receivedate` field, grouped by year.
  - Implemented using Chart.js.
- **Acceptance Criteria**:
  - Chart renders with correct yearly data after search.
  - Updates with filter changes.

### 3.2 Non-Functional Requirements
#### NFR1: Performance
- **Description**: App should respond quickly within the 1-hour demo context.
- **Details**: Limit API results to 100 (`limit=100`) to ensure fast load times.
- **Acceptance Criteria**: Page loads and updates within 2 seconds on a standard connection.

#### NFR2: Usability
- **Description**: UI should be intuitive for basic interaction.
- **Details**: Use Tailwind CSS for a clean, functional layout.
- **Acceptance Criteria**: Users can search and filter without instructions.

#### NFR3: Technology
- **Description**: Built with Next.js and OpenFDA API.
- **Details**: Leverage Server Components and route handlers for efficiency.
- **Acceptance Criteria**: App runs locally with `npm run dev` and uses specified tech stack.

## 4. User Interface
### Layout
- **Header**: Title "Adverse Event Analyzer".
- **Search Section**: Text input + "Search" button.
- **Filter Section**: Dropdown for seriousness.
- **Results Section**: 
  - Metrics (e.g., "Total Reports: X | Deaths: Y | Hospitalizations: Z").
  - Bar chart showing events per year.

### Mockup (Text-Based)

```
_+-------------------------------------------+
|          Adverse Event Analyzer           |
+-------------------------------------------+
| Search Drug:                              |
| [          Drug Name Input           ]    |
| [ Search Button ]                         |
|                                           |
| Filter By Seriousness:                    |
| [ All v ]                                 |
+-------------------------------------------+
| Results:                                  |
| +-----------------+---------------------+ |
| | Total Reports: X| Deaths: Y          | |
| | Hospitalizations: Z                  | |
| +-----------------+---------------------+ |
|                                           |
| Trend Over Time:                          |
| +---------------------------------------+ |
| |   Bar Chart: Events by Year          | |
| |   +                                  | |
| |   | 10 |                             | |
| |   |    |  8  |                       | |
| |   |    |     |  5  |  4  |          | |
| |   +----+-----+-----+-----+          | |
| |   2020 2021 2022 2023 2024          | |
| +---------------------------------------+ |
+-------------------------------------------+
```

## 5. Dependencies
- **Next.js**: Framework for app structure and routing.
- **OpenFDA Adverse Events API**: Data source (`https://api.fda.gov/drug/event.json`).
- **Chart.js + react-chartjs-2**: Visualization library.
- **Tailwind CSS**: Styling framework.

## 6. Assumptions
- API is available and responsive during the 1-hour period.
- Drug names entered match API data (case-insensitive, exact match).
- No rate limiting or authentication issues with OpenFDA API.

## 7. Risks
- **Time Overrun**: Feature creep could exceed 1 hour.
  - Mitigation: Prioritize FR1-FR3; treat FR4 as bonus.
- **API Errors**: Invalid responses or downtime.
  - Mitigation: Add basic error handling (e.g., "No data found").

## 8. Success Criteria
- App launches and runs without errors.
- User can search for a drug (e.g., "DURAGESIC-100") and see results.
- Filter updates results, metrics reflect data, and chart (if completed) displays trends.
- Completed within 1 hour, demo-ready for interview.

## 9. Timeline
- **Total**: 1 hour (see Milestones doc for breakdown).
- **Deadline**: End of interview coding session.

## 10. Notes
- Focus on functionality over polish.
- Test with sample drugs: "DURAGESIC-100", "ASPIRIN".
- Keep code simple and readable for review.