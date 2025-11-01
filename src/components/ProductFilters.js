// src/components/ProductFilters.js
"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const groups = [
  { name: "Ideal For", options: ["Men", "Women", "Baby & Kids"] },
  { name: "Occasion", options: ["Work", "Travel", "Daily"] },
  { name: "Work", options: ["Formal", "Casual", "Smart Casual"] },
  { name: "Fabric", options: ["Cotton", "Polyester", "Linen"] },
  { name: "Segment", options: ["Premium", "Mid-Range", "Budget"] },
  { name: "Suitable For", options: ["Summer", "Winter", "All Season"] },
  { name: "Raw Materials", options: ["Organic", "Synthetic", "Blended"] },
  { name: "Pattern", options: ["Solid", "Striped", "Checked", "Printed"] }
];

export default function ProductFilters({ onChange }) {
  const [expanded, setExpanded] = useState(["Ideal For"]);
  const [selected, setSelected] = useState({});
  const [custom, setCustom] = useState(false);

  const toggle = (g) => {
    setExpanded(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  };
  const toggleOption = (g, o) => {
    const curr = selected[g] || [];
    const next = curr.includes(o) ? curr.filter(x => x !== o) : [...curr, o];
    const newSel = { ...selected, [g]: next };
    setSelected(newSel);
    onChange(newSel, custom);
  };

  return (
    <aside className="filters-sidebar">
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '.75rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={custom} onChange={e => { const v = e.target.checked; setCustom(v); onChange(selected, v); }} />
          <strong style={{ fontSize: '.875rem', textTransform: 'uppercase' }}>Customizable</strong>
        </label>
      </div>

      {groups.map(g => (
        <div key={g.name} className="filter-group">
          <button className="filter-header" onClick={() => toggle(g.name)}>
            <span>{g.name}</span>
            <ChevronDown size={20} style={{ transform: expanded.includes(g.name) ? 'rotate(180deg)' : '' }} />
          </button>
          {expanded.includes(g.name) && (
            <div className="filter-options">
              {g.options.map(o => (
                <label key={o} style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <input type="checkbox" checked={(selected[g.name] || []).includes(o)} onChange={() => toggleOption(g.name, o)} />
                  <span>{o}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
