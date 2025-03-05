# Adverse Event Analyzer - Style Guide (Material-UI)

## Overview
This style guide defines the visual design and styling standards for the Adverse Event Analyzer app, using Material-UI (MUI) as the primary framework. It ensures consistency across components, aligning with a professional, healthcare-focused aesthetic suitable for healthcare professionals. The guide is optimized for a 1-hour take-home interview build, focusing on simplicity and reusability.

## Dependencies
- **Material-UI (MUI)**: Install via `npm install @mui/material @emotion/react @emotion/styled`.
- **Next.js**: Integration with MUI via `ThemeProvider` in `layout.jsx`.

## Theme Configuration
### Color Palette
- **Primary Color**: `#1976D2` (MUI default blue, for buttons and highlights).
- **Secondary Color**: `#DC004E` (MUI default pink, for accents or error states).
- **Background**: `#F5F5F5` (light gray, for main content area).
- **Text**:
  - Primary: `#212121` (dark gray, for body text).
  - Secondary: `#757575` (medium gray, for secondary text or labels).
- **Error**: `#D32F2F` (MUI red, for error messages).

### Typography
- **Font Family**: `Roboto` (MUI default, ensure `@fontsource/roboto` is installed via `npm install @fontsource/roboto`).
- **Font Sizes**:
  - Header (Title): `h4` (24px, bold).
  - Body Text: `body1` (16px, regular).
  - Labels/Captions: `caption` (12px, regular).
- **Line Height**: 1.5 for readability.

### Spacing
- Use MUI’s spacing scale (8px increments):
  - `spacing={1}` = 8px, `spacing={2}` = 16px, etc.
  - Default padding/margin: `spacing={2}` (16px) for containers, `spacing={1}` (8px) for inner elements.

## Global Layout
- **Container**: Use `Container` component from MUI, max width `md` (960px), centered on page.
- **Header**: "Adverse Event Analyzer" in `Typography` with `variant="h4"`, `color="primary"`, aligned center.
- **Background**: `sx={{ bgcolor: '#F5F5F5', minHeight: '100vh' }}` for full-page coverage.

## Component-Specific Styles

### SearchBar.tsx
- **Component**: `TextField` (for input) + `Button`.
- **Styles**:
  - `TextField`:
    - `variant="outlined"`, `fullWidth={true}`, `placeholder="Enter drug name (e.g., DURAGESIC-100)"`.
    - `sx={{ mb: 2 }}` (margin bottom 16px).
    - `InputProps={{ sx: { borderRadius: 1 } }}` for rounded corners.
  - `Button`:
    - `variant="contained"`, `color="primary"`, `sx={{ ml: 1 }}` (margin left 8px).
    - Text: "Search".
- **Layout**: Use `Stack` or `Box` with `direction="row"`, `spacing={1}` for input and button alignment.

### FilterDropdown.tsx
- **Component**: `Select` with `MenuItem` options.
- **Styles**:
  - `Select`:
    - `variant="outlined"`, `fullWidth={false}`, `sx={{ width: 200, mb: 2 }}`.
    - Label (optional): `FormControl` with `FormLabel` or `InputLabel` styled as `caption` text.
  - `MenuItem`:
    - Default MUI styling, no custom overrides needed.
- **Layout**: Use `FormControl` with `sx={{ mb: 2 }}` for spacing below.

### MetricsDisplay.tsx
- **Component**: Grid of `Card` components.
- **Styles**:
  - `Card`:
    - Use `Card` with `variant="outlined"`, `sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 1 }}` for each metric.
  - `Typography`:
    - Metric labels (e.g., "Total Reports"): `variant="subtitle1"`, `fontWeight="bold"`.
    - Values (e.g., "X"): `variant="body1"`.
  - Layout: `Grid` with `container`, `spacing={2}`, `justifyContent="center"`.
- **Example**: Three cards in a row, each 4 units wide (`xs={4}`).

### TrendChart.tsx
- **Component**: Custom chart using MUI `Box` or `Paper` to wrap Chart.js bar chart.
- **Styles**:
  - `Box` or `Paper`:
    - `sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 1, mt: 2 }}` for chart container.
  - Chart:
    - Use Chart.js default styling, customize via `options` prop for MUI colors (e.g., bars in `primary.main`).
    - Ensure chart fits within container, no overflow.
- **Layout**: Centered within parent container, full width.

## Responsive Design
- Use MUI’s responsive breakpoints (`xs`, `sm`, `md`, `lg`, `xl`).
- Ensure components stack vertically on `xs` screens (`direction="column"` in `Stack` or `Grid`).
- Minimum width: 320px (mobile-friendly).

## Error States
- **Error Messages**: Use `Alert` component from MUI with `severity="error"`, `sx={{ mt: 2 }}`.
  - Example: "No data found" or "API error occurred".
- **Loading States**: Use `CircularProgress` centered in `Box` with `sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}`.

## Example Theme Setup (layout.jsx)
```jsx
"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    primary: { main: "#1976D2" },
    secondary: { main: "#DC004E" },
    background: { default: "#F5F5F5" },
    text: { primary: "#212121", secondary: "#757575" },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h4: { fontWeight: 500 },
    body1: { lineHeight: 1.5 },
    caption: { fontSize: "0.75rem" },
  },
  spacing: 8, // 8px base unit
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

#### Notes

- Simplicity: Focus on MUI defaults and minimal customizations to fit the 1-hour constraint.
- Healthcare Focus: Use professional, clean colors and layouts (e.g., light backgrounds, clear text).
- Testing: Verify styles on desktop and mobile views using MUI’s responsive utilities.

### Example Component Usage (SearchBar.tsx)

```
"use client";
import { TextField, Button, Stack } from "@mui/material";

export default function SearchBar({ onSearch }) {
  const [drugName, setDrugName] = useState("");

  const handleSearch = () => {
    if (drugName.trim()) onSearch(drugName);
  };

  return (
    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Enter drug name (e.g., DURAGESIC-100)"
        value={drugName}
        onChange={(e) => setDrugName(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Stack>
  );
}
```

### Notes
- This style guide assumes MUI v5+ and integrates with Next.js App Router.
- It prioritizes simplicity and speed for the 1-hour interview, using MUI’s default components and themes while ensuring a professional look.
- You can expand this guide with additional customizations (e.g., shadows, animations) if time permits, but the current scope focuses on core styling.
