## Component: SearchBar.tsx

### Purpose
A reusable UI component that allows users to input a drug name and trigger a search for adverse event data.

### Type
Client Component (requires interactivity with `"use client"` directive).

### Props
- `onSearch: (drugName: string) => void`
  - Callback function to pass the entered drug name to the parent component for API fetching.

### Behavior
- Displays a text input field and a "Search" button.
- Captures user input and updates local state.
- On button click, calls `onSearch` with the current input value.
- Clears input after search (optional, time-permitting).

### UI Requirements
- **Input Field**:
  - Placeholder: "Enter drug name (e.g., DURAGESIC-100)".
  - Tailwind CSS: `border`, `rounded`, `p-2`, `w-full` or similar for styling.
- **Button**:
  - Text: "Search".
  - Tailwind CSS: `bg-blue-500`, `text-white`, `rounded`, `p-2`, `hover:bg-blue-600`.
- **Layout**: Horizontal flexbox with input and button side-by-side.

### Implementation Details
- Use React `useState` to manage input value.
- Handle form submission via button `onClick`.
- No direct API calls—passes data to parent for processing.

### Example Code Snippet
```jsx
"use client";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [drugName, setDrugName] = useState("");

  const handleSearch = () => {
    if (drugName.trim()) {
      onSearch(drugName);
      // setDrugName(""); // Optional: clear input
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={drugName}
        onChange={(e) => setDrugName(e.target.value)}
        placeholder="Enter drug name (e.g., DURAGESIC-100)"
        className="border rounded p-2 flex-grow"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">
        Search
      </button>
    </div>
  );
}
```
#### Acceptance Criteria

- Typing a drug name updates the input field.
- Clicking "Search" triggers onSearch with the input value.
- UI renders without errors and is styled minimally with Tailwind.

---

### FilterDropdown.tsx Requirements

```markdown
## Component: FilterDropdown.tsx

### Purpose
A dropdown menu allowing users to filter adverse events by seriousness (e.g., "All", "Death", "Hospitalization").

### Type
Client Component (requires interactivity with `"use client"` directive).

### Props
- `onFilterChange: (filter: string) => void`
  - Callback to pass the selected seriousness filter to the parent component.

### Behavior
- Displays a `<select>` element with predefined options.
- Updates local state with the selected value.
- Calls `onFilterChange` when the selection changes.

### UI Requirements
- **Dropdown**:
  - Options: "All", "Death", "Hospitalization".
  - Tailwind CSS: `border`, `rounded`, `p-2`, `w-48` or similar.
- **Label** (optional): "Filter By Seriousness:" (time-permitting).

### Implementation Details
- Use React `useState` to track selected filter.
- Map options to seriousness values: 
  - "All" → no filter.
  - "Death" → `seriousnessdeath:1`.
  - "Hospitalization" → `seriousnesshospitalization:1`.
- Pass raw option value to parent (e.g., "Death"), letting parent handle API logic.

### Example Code Snippet
```jsx
"use client";
import { useState } from "react";

export default function FilterDropdown({ onFilterChange }) {
  const [filter, setFilter] = useState("All");

  const handleChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    onFilterChange(value);
  };

  return (
    <div className="mt-2">
      <select
        value={filter}
        onChange={handleChange}
        className="border rounded p-2 w-48"
      >
        <option value="All">All</option>
        <option value="Death">Death</option>
        <option value="Hospitalization">Hospitalization</option>
      </select>
    </div>
  );
}
```
#### Acceptance Criteria

- Selecting an option updates the dropdown and calls onFilterChange.
- Default value is "All".
- Renders with basic Tailwind styling.


---

## Component: MetricsDisplay.tsx

### Purpose
A stateless component to display key metrics (total reports, deaths, hospitalizations, and optional additional metrics) for the searched drug’s adverse events.

### Type
Stateless Component (can be server or client, depending on parent).

### Props
- `metrics: { 
    total: number, 
    deaths: number, 
    hospitalizations: number, 
    lifeThreatening?: number, 
    bySex?: { male: number, female: number, unknown: number }, 
    seriousNonDH?: number 
  }`
  - Object containing aggregated counts from API data, with optional fields for new metrics.

### Behavior
- Renders metrics in a simple, readable format.
- Displays "0" or "N/A" for any metric if no data is provided.
- Updates automatically when new `metrics` prop is received.

### UI Requirements
- **Layout**: Grid or flexbox with 3-5 sections (depending on added metrics).
- **Text**:
  - Labels (e.g., "Total Reports", "Deaths"): Use MUI `Typography` with `variant="subtitle1"`, `fontWeight="bold"`.
  - Values (e.g., "1,000"): Use `variant="body1"`.
  - New metrics follow the same format (e.g., "Life-Threatening: X").
- **Tailwind CSS**: Use MUI `Card` with `variant="outlined"`, `sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 1 }}` for each metric box.
- **Header**: Add "Key Metrics" title above the grid using `Typography` with `variant="h6"`, `sx={{ mb: 2 }}`.

### Implementation Details
- Purely presentational—no state or API logic.
- Destructure `metrics` prop and render values.
- Handle null/undefined case with defaults (e.g., `{ total = 0, deaths = 0, hospitalizations = 0, lifeThreatening = 0, bySex = { male: 0, female: 0, unknown: 0 }, seriousNonDH = 0 }`).
- Use MUI `Grid` with `container`, `spacing={2}`, `justifyContent="center"`.

### Example Code Snippet
```jsx
import { Card, Grid, Typography } from "@mui/material";

export default function MetricsDisplay({ metrics }) {
  const { 
    total = 0, 
    deaths = 0, 
    hospitalizations = 0, 
    lifeThreatening = 0, 
    bySex = { male: 0, female: 0, unknown: 0 }, 
    seriousNonDH = 0 
  } = metrics || {};

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>Key Metrics</Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={4}>
          <Card variant="outlined" sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">Total Reports</Typography>
            <Typography variant="body1">{total}</Typography>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card variant="outlined" sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">Deaths</Typography>
            <Typography variant="body1">{deaths}</Typography>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card variant="outlined" sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">Hospitalizations</Typography>
            <Typography variant="body1">{hospitalizations}</Typography>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card variant="outlined" sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">Life-Threatening</Typography>
            <Typography variant="body1">{lifeThreatening}</Typography>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card variant="outlined" sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">Serious (Non-DH)</Typography>
            <Typography variant="body1">{seriousNonDH}</Typography>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card variant="outlined" sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">Male</Typography>
            <Typography variant="body1">{bySex.male}</Typography>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card variant="outlined" sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">Female</Typography>
            <Typography variant="body1">{bySex.female}</Typography>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card variant="outlined" sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">Unknown</Typography>
            <Typography variant="body1">{bySex.unknown}</Typography>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
```

Acceptance Criteria
Displays correct values from metrics prop, including new metrics (life-threatening, serious non-death/hospitalization, by sex).
Shows "0" or "N/A" for missing or null data.
Renders in a clean, grid-based layout with MUI styling, matching the provided image (3-5 cards per row, depending on added metrics).
Header "Key Metrics" is visible and styled with MUI h6.
Notes
Time Constraint: Adding these metrics requires updates to page.jsx to calculate and pass them via the metrics prop, but they’re feasible within 1 hour if prioritized over less critical features.
API Fields:
serious: For total serious events (non-death, non-hospitalization).
seriousnesslifethreatening: For life-threatening events.
patientsex: For sex-based counts.
Ensure parsing logic in page.jsx aggregates these fields from the API response.
UI Fit: The grid layout can adjust to 3-5 cards, maintaining the visual style from the image (e.g., white cards with rounded corners, gray labels, black values).

---

### TrendChart.tsx Requirements

```markdown
## Component: TrendChart.tsx

### Purpose
A component to visualize adverse event trends over time (by year) using a bar chart.

### Type
Client Component (requires Chart.js with `"use client"` directive).

### Props
- `events: Array<{ receivedate: string, [key: string]: any }>`
  - Array of adverse event objects from API response, each with a `receivedate`.

### Behavior
- Processes `receivedate` fields to group events by year.
- Renders a bar chart with years on x-axis and event counts on y-axis.
- Updates when new `events` prop is received.

### UI Requirements
- **Chart Type**: Bar chart (vertical bars).
- **Labels**: 
  - X-axis: Years (e.g., "2020", "2021").
  - Y-axis: "Number of Events".
- **Styling**: Default Chart.js styling, minimal customization (time-permitting).

### Implementation Details
- **Dependencies**: Requires `chart.js` and `react-chartjs-2` (install via `npm install chart.js react-chartjs-2`).
- **Data Processing**: 
  - Extract year from `receivedate` (e.g., "20080707" → "2008").
  - Count events per year using `reduce`.
- **Chart Config**: 
  - `labels`: Array of unique years.
  - `data`: Array of event counts per year.
  - Single dataset with label "Adverse Events".

### Example Code Snippet
```jsx
"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

export default function TrendChart({ events }) {
  const yearData = events?.reduce((acc, event) => {
    const year = event.receivedate.slice(0, 4);
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const labels = yearData ? Object.keys(yearData).sort() : [];
  const dataPoints = labels.map((year) => yearData[year]);

  const data = {
    labels,
    datasets: [
      {
        label: "Adverse Events",
        data: dataPoints,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    scales: { y: { beginAtZero: true, title: { display: true, text: "Number of Events" } } },
  };

  return (
    <div className="mt-4">
      {events?.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
}
```

#### Acceptance Criteria

- Chart renders with correct years and counts when events is provided.
- Displays "No data to display" if events is empty or null.
Bars reflect filtered data when used with FilterDropdown.