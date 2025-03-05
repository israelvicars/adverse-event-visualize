"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (drugName: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [drugName, setDrugName] = useState("");

  const handleSearch = () => {
    if (drugName.trim()) {
      onSearch(drugName);
      setDrugName(""); // Clear input after search
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={drugName}
        onChange={(e) => setDrugName(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter drug name (e.g., DURAGESIC-100)"
        className="flex-grow rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <button
        onClick={handleSearch}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        Search
      </button>
    </div>
  );
} 