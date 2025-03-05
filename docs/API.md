# API Requirements - Adverse Event Analyzer

## Overview
The API layer of the Adverse Event Analyzer app is responsible for fetching drug-related adverse event data from the OpenFDA Adverse Events API and serving it to the frontend. It is implemented as a Next.js route handler to leverage server-side capabilities, ensuring efficient data retrieval and minimal client-side processing.

## File Location
- **Path**: `/app/api/adverse-events/route.js`
- **Type**: Next.js Route Handler (API Route using App Router).

## Purpose
- Act as a proxy between the frontend and the OpenFDA Adverse Events API.
- Handle query parameters from the UI (drug name, seriousness filter).
- Return formatted JSON data for consumption by frontend components.

## Endpoint

### GET /api/adverse-events
- **Description**: Retrieves adverse event data for a specified drug, optionally filtered by seriousness.
- **Method**: `GET`

#### Request
- **Query Parameters**:
  - `drugName: string` (required)
    - The name of the drug to search for (e.g., "DURAGESIC-100").
    - Encoded in the OpenFDA query as `patient.drug.medicinalproduct:"<drugName>"`.
  - `seriousness: string` (optional)
    - Filter by seriousness category: "Death" or "Hospitalization".
    - Maps to OpenFDA fields: `seriousnessdeath:1` or `seriousnesshospitalization:1`.
    - If omitted or "All", no seriousness filter is applied.

- **Example Requests**:
  - Search for "DURAGESIC-100" with no filter:
    - `GET /api/adverse-events?drugName=DURAGESIC-100`
  - Search for "ASPIRIN" with "Death" filter:
    - `GET /api/adverse-events?drugName=ASPIRIN&seriousness=Death`

#### Response
- **Status Codes**:
  - `200 OK`: Successful response with data.
  - `400 Bad Request`: Missing or invalid `drugName`.
  - `500 Internal Server Error`: API fetch failure or unexpected error.

- **Body**: JSON object mirroring OpenFDA response structure.
- **Fields**:
  - `meta`: Metadata from OpenFDA (e.g., disclaimer, total results).
  - `results`: Array of adverse event objects (e.g., `safetyreportid`, `receivedate`, `serious`, etc.).
- **Content-Type**: `application/json`.

- **Example Response** (simplified):
```json
{
  "meta": {
    "disclaimer": "Do not rely on openFDA to make decisions regarding medical care...",
    "results": { "skip": 0, "limit": 100, "total": 1258723 }
  },
  "results": [
    {
      "safetyreportid": "5801206-7",
      "receivedate": "20080707",
      "serious": "1",
      "seriousnessdeath": "1",
      "patient": {
        "drug": [{ "medicinalproduct": "DURAGESIC-100" }]
      }
    }
  ]
}
```

## Implementation Details

### Base URL
- External API: `https://open.fda.gov/drug/event.json`
- Query Limit: Set `limit=100` to cap results for performance and demo scope.

### Query Construction
- **Base Query**:
  - `search=patient.drug.medicinalproduct:"<drugName>"`
  - Example: `search=patient.drug.medicinalproduct:"DURAGESIC-100"`.
- **Seriousness Filter**:
  - If `seriousness=Death`, append `+seriousnessdeath:1`.
  - If `seriousness=Hospitalization`, append `+seriousnesshospitalization:1`.
  - If `seriousness=All` or omitted, no additional filter.
- **Full Example**:
  - `https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:"ASPIRIN"+seriousnessdeath:1&limit=100`

### Error Handling
- **Validate drugName**:
  - If missing or empty, return 400 with `{ error: "Drug name is required" }`.
- **Handle fetch errors**:
  - Return 500 with `{ error: "Failed to fetch data from OpenFDA" }` on failure.

### Dependencies
- **Node.js fetch**: Built-in for API calls (no external libraries needed).
- **Next.js**: Provides route handler framework.

## Example Code Snippet

```javascript
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const drugName = searchParams.get("drugName");
  const seriousness = searchParams.get("seriousness");

  if (!drugName || drugName.trim() === "") {
    return new Response(JSON.stringify({ error: "Drug name is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let query = `patient.drug.medicinalproduct:"${encodeURIComponent(drugName)}"`;
  if (seriousness === "Death") query += "+seriousnessdeath:1";
  if (seriousness === "Hospitalization") query += "+seriousnesshospitalization:1";

  const url = `https://api.fda.gov/drug/event.json?search=${query}&limit=100`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("OpenFDA API request failed");
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data from OpenFDA" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

## Performance Considerations
- **Limit=100**: Ensures manageable response size for 1-hour demo.
- **Server-Side**: Reduces client load by handling API calls on the server.
- **No Caching**: Omitted for simplicity; could be added in production.

## Security Notes
- No API keys required (OpenFDA is public).
- Input sanitization via encodeURIComponent to prevent injection-like issues.

## Acceptance Criteria
1. GET `/api/adverse-events?drugName=DURAGESIC-100` returns valid JSON with adverse event data.
2. Adding `&seriousness=Death` filters results to death-related events.
3. Missing `drugName` returns 400 error.
4. API failures return 500 with error message.
5. Response matches OpenFDA structure and includes results array.

## Testing
Test with:
- `drugName=DURAGESIC-100` (no filter).
- `drugName=ASPIRIN&seriousness=Hospitalization`.
- No `drugName` (error case).
- Verify response contains expected fields (`receivedate`, `serious`, etc.).