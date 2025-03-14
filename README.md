# Adverse Event Analyzer

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-blue)](https://adverse-event-visualize-mu.vercel.app)

## Overview
The Adverse Event Analyzer is a web application built with Next.js, Tailwind CSS, and Shadcn UI to help healthcare professionals analyze drug-related adverse event reports using the FDA's OpenFDA Adverse Events API. This tool provides actionable insights through search, filtering, metrics, and time trend visualization, enabling users to understand key metrics (e.g., total reports, deaths, hospitalizations) and trends for specific drugs. The project was completed within a 1.5-hour window, prioritizing production-readiness over extensive features.

## Features
- **Drug Search**: Search for adverse events by drug name (e.g., "DURAGESIC-100").
- **Seriousness Filtering**: Filter results by "All", "Death", or "Hospitalization".
- **Key Metrics Display**: Show total reports, deaths, hospitalizations, life-threatening events, serious non-death/hospitalization events, and reports by patient sex.
- **Time Trend Visualization**: Visualize adverse event counts by year using a bar chart.

## Project Structure
- `/app`: Next.js App Router directory with `page.tsx`, `layout.tsx`, and API routes (`/api/adverse-events/route.ts`).
- `/components`: Reusable components (`SearchBar.tsx`, `FilterDropdown.tsx`, `MetricsDisplay.tsx`, `TrendChart.tsx`).
- `/public`: Static assets (if needed).
- `package.json`: Project dependencies (Next.js, Tailwind CSS, Shadcn UI, Chart.js, etc.).
- `README.md`: This documentation.
- `/docs`: Additional documentation used as reference by LLMs

## Documentation

For more detailed information about the project, please refer to the specifications in the /docs directory, which were generated to serve as references and guides for the LLM:

* [API Documentation](/docs/API.md) - Details about the API implementation and OpenFDA integration
* [Architecture Overview](/docs/ARCHITECTURE.md) - System architecture and design decisions
* [Component Documentation](/docs/COMPONENTS.md) - Component structure and implementation details
* [Project Milestones](/docs/MILESTONES.md) - Development timeline and milestone achievements
* [Product Requirements](/docs/PRD.md) - Product requirements and specifications
* [Styling Guide](/docs/STYLING.md) - Style guidelines and UI/UX documentation

## Getting Started

### Prerequisites
- Node.js (v16 or later).
- npm (comes with Node.js).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/israelvicars/adverse-event-visualize
   cd adverse-event-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure you have internet access (no API keys needed for OpenFDA).

### Running the App
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to http://localhost:3000 to view the app.

3. Use the search bar to enter a drug name (e.g., "DURAGESIC-100"), apply filters, and view metrics and trends.

## Notes
* The app relies on the public OpenFDA Adverse Events API (https://api.fda.gov/drug/event.json), which requires no authentication.
* No environment variables or configuration files are needed for this demo.
* A live deployment is available at [adverse-event-visualize-mu.vercel.app](https://adverse-event-visualize-mu.vercel.app)

## Development Process
This project was developed within a 1.5-hour window using the following plan:

* **Setup (0:00-0:10)**: Created a Next.js app with TypeScript, set up Tailwind CSS and Shadcn UI components, and installed dependencies.
* **API Integration & Search (0:10-0:30)**: Built a server-side route handler (/api/adverse-events) to fetch OpenFDA data, added SearchBar.tsx for drug search.
* **Seriousness Filter & Metrics (0:30-0:45)**: Implemented FilterDropdown.tsx and MetricsDisplay.tsx to filter by seriousness and display metrics (total, deaths, hospitalizations, etc.).
* **Time Trend Visualization (0:45-0:55)**: Added TrendChart.tsx for a bar chart of events by year using Chart.js.
* **Testing & Final Tweaks (0:55-1:00)**: Tested with sample drugs (e.g., "DURAGESIC-100", "ASPIRIN"), fixed bugs, and ensured functionality.
* **Research & Overage (1:00-1:30)**: Extra time dedicated to explore public API and for things to go wrong.

I used Cursor as my IDE, an LLM (Grok 3) for brainstorming and code suggestions, and git for version control (commits marked milestones 1-5). The screen recording captures this process, submitted within 4 hours of receiving the challenge.

## Technical Choices & Tradeoffs
* **Next.js with App Router**: Chosen for rapid setup, server-side rendering, and API routes, ensuring production-readiness. Tradeoff: Limited time prevented exploring other frameworks like Remix or Svelte.
* **Tailwind CSS & Shadcn UI**: Selected for rapid development with utility-first CSS and accessible, customizable components. Tradeoff: Learning curve for utility classes, but offset by excellent documentation and type safety.
* **Chart.js for Visualization**: Lightweight and easy to integrate, but lacks advanced features (e.g., tooltips, animations) due to time constraints.
* **No Caching or Error Handling**: Omitted for simplicity; in production, I'd add caching (e.g., React Query) and robust error boundaries.
* **API Limit=1000**: Caps results for performance, but limits comprehensive data analysis—ideal for demo but not scalable without pagination.

## Production-Readiness Considerations
* **Server-Side API Calls**: Reduces client-side load, but no rate limiting or retry logic was added due to time.
* **Responsive Design**: Tailwind's mobile-first approach ensures responsiveness, but extensive testing was skipped.
* **Security**: No API keys needed, but encodeURIComponent sanitizes inputs—production would require more robust validation.
* **Testing**: Basic manual testing was done; unit tests (e.g., Jest, React Testing Library) were omitted for time but are critical for production.

## Future Improvements (If More Time)
* **Theme Customization**: Leverage Tailwind's theme configuration for custom branding.
* **Advanced Filtering**: Add pharmacological class or route filters from the API.
* **Pagination**: Implement skip and limit for larger datasets.
* **Error Handling**: Add loading states, retry logic, and user-friendly error messages.
* **Data Caching**: Use SWR or React Query for better performance.
* **Accessibility**: Enhance ARIA labels and keyboard navigation for WCAG compliance.
* **UI Polish**: Add custom animations, tooltips for charts, and a more detailed layout.
* **Component Library**: Expand Shadcn UI component usage for consistent UI patterns.
