"use client";

import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { FilterDropdown } from "./components/FilterDropdown";
import { MetricsDisplay } from "./components/MetricsDisplay";
import { TrendChart } from "./components/TrendChart";

interface Event {
  receivedate: string;
  seriousnessdeath?: string;
  seriousnesshospitalization?: string;
  [key: string]: any;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [metrics, setMetrics] = useState({ total: 0, deaths: 0, hospitalizations: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDrug, setCurrentDrug] = useState<string | null>(null);

  const fetchData = async (drugName: string, seriousness?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        drugName: drugName,
        ...(seriousness && seriousness !== "All" ? { seriousness } : {}),
      });

      const response = await fetch(`/api/adverse-events?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch data");
      }
      
      if (data.results) {
        setEvents(data.results);
        // Calculate metrics from the full dataset
        const total = data.results.length;
        const deaths = data.results.filter((e: Event) => e.seriousnessdeath === "1").length;
        const hospitalizations = data.results.filter((e: Event) => e.seriousnesshospitalization === "1").length;
        setMetrics({ total, deaths, hospitalizations });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setEvents([]);
      setMetrics({ total: 0, deaths: 0, hospitalizations: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (drugName: string) => {
    setCurrentDrug(drugName);
    await fetchData(drugName);
  };

  const handleFilterChange = async (filter: string) => {
    if (currentDrug) {
      await fetchData(currentDrug, filter);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          {/* Search and Filter Section */}
          <div className="rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">Search Drug</h2>
            <SearchBar onSearch={handleSearch} />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>
          
          <div className="rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">Filter</h2>
            <FilterDropdown onFilterChange={handleFilterChange} />
          </div>
        </div>

        {/* Metrics Section */}
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
          <MetricsDisplay metrics={metrics} />
        </div>
      </div>

      {/* Chart Section */}
      <div className="rounded-lg border p-4">
        <h2 className="text-lg font-semibold mb-4">Adverse Events Over Time</h2>
        {isLoading ? (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            Loading...
          </div>
        ) : (
          <TrendChart events={events} />
        )}
      </div>
    </div>
  );
}
