"use client";

import { useState } from "react";

interface FilterDropdownProps {
  onFilterChange: (filter: string) => void;
}

export function FilterDropdown({ onFilterChange }: FilterDropdownProps) {
  const [filter, setFilter] = useState("All");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilter(value);
    onFilterChange(value);
  };

  return (
    <select
      value={filter}
      onChange={handleChange}
      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <option value="All">All</option>
      <option value="Death">Death</option>
      <option value="Hospitalization">Hospitalization</option>
    </select>
  );
} 