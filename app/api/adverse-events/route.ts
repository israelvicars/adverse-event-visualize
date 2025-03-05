import { NextResponse } from "next/server";

const FDA_API_BASE_URL = "https://api.fda.gov/drug/event.json";
const LIMIT = 100;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const drugName = searchParams.get("drugName");
  const seriousness = searchParams.get("seriousness");

  if (!drugName || drugName.trim() === "") {
    return NextResponse.json(
      { error: "Drug name is required" },
      { status: 400 }
    );
  }

  try {
    let query = `patient.drug.medicinalproduct:"${drugName}"`;
    
    // Add seriousness filter if specified
    if (seriousness === "Death") {
      query += "+seriousnessdeath:1";
    } else if (seriousness === "Hospitalization") {
      query += "+seriousnesshospitalization:1";
    }

    const url = `${FDA_API_BASE_URL}?search=${encodeURIComponent(query)}&limit=${LIMIT}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`OpenFDA API request failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching from OpenFDA:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from OpenFDA" },
      { status: 500 }
    );
  }
} 