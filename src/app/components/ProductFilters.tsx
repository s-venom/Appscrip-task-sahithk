// app/components/ProductFilters.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const filterGroups = [
  { name: "Ideal For", options: ["Men", "Women", "Baby & Kids"] },
  { name: "Occasion", options: ["Work", "Travel", "Daily"] },
  { name: "Fabric", options: ["Cotton", "Polyester", "Wool", "Linen"] },
  { name: "Segment", options: ["Premium", "Standard", "Budget"] },
];

interface Props {
  onFiltersChange: (filters: { [key: string]: string[] }, customizable: boolean) => void;
}

export default function ProductFilters({ onFiltersChange }: Props) {
  const [expanded, setExpanded] = useState<string[]>(["Ideal For"]);
  const [selected, setSelected] = useState<{ [key: string]: string[] }>({});
  const [customizable, setCustomizable] = useState(false);

  const toggleGroup = (name: string) => {
    setExpanded((prev) =>
      prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name]
    );
  };

  const toggleOption = (group: string, option: string) => {
    setSelected((prev) => {
      const curr = prev[group] || [];
      const updated = curr.includes(option)
        ? curr.filter((o) => o !== option)
        : [...curr, option];

      const newFilters = { ...prev, [group]: updated };
      onFiltersChange(newFilters, customizable);
      return newFilters;
    });
  };

  //  Unselect all for a single group
  const unselectAll = (group: string) => {
    setSelected((prev) => {
      const newFilters = { ...prev, [group]: [] };
      onFiltersChange(newFilters, customizable);
      return newFilters;
    });
  };

  // Helper: how many options are selected in a group?
  const selectedCount = (group: string) => (selected[group] || []).length;

  return (
    <aside className="w-64 flex-shrink-0 sticky top-32 h-fit md:border-r pr-6">
      <div className="space-y-6">
        {/* Customizable checkbox */}
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={customizable}
            onChange={(e) => {
              const val = e.target.checked;
              setCustomizable(val);
              onFiltersChange(selected, val);
            }}
            className="w-4 h-4 rounded border-gray-300"
          />
          <span className="text-sm font-bold uppercase">Customizable</span>
        </label>

        {/* Filter groups */}
        {filterGroups.map((group) => (
          <div key={group.name} className="border-b pb-4">
            {/* Group header */}
            <div>
              <button
                onClick={() => toggleGroup(group.name)}
                className="w-full flex justify-between items-center py-2"
              >
                <span className="text-sm font-bold uppercase">{group.name}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    expanded.includes(group.name) ? "rotate-180" : ""
                  }`}
                />
              </button>
              {/* All label */}
              <div className="text-sm font-medium text-gray-900">All</div>
            </div>

            {/* Expanded content */}
            {expanded.includes(group.name) && (
              <div className="mt-3 space-y-3">

                {/* UNSELECT ALL */}
                  <button
                    onClick={() => unselectAll(group.name)}
                    className="text-xs text-gray-400 hover:text-gray-600 underline"
                  >
                    Unselect all
                  </button>


                {/* Options */}
                <div className="space-y-2">
                  {group.options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center space-x-3 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selected[group.name]?.includes(opt) ?? false}
                        onChange={() => toggleOption(group.name, opt)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}