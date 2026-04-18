import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { FilterState, filterOptions } from '../data/tools';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onApply: () => void;
  dynamicOptions?: Partial<Record<keyof FilterState, string[]>>; // ✅ added
}

export function FilterPanel({ filters, onFilterChange, onApply, dynamicOptions }: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    purposes: true,
    skillLevels: true,
    budget: true,
    accuracy: false,
    platforms: false,
    languages: false,
    privacy: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (category: keyof FilterState, value: string) => {
    const currentValues = filters[category];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange({
      ...filters,
      [category]: newValues
    });
  };

  const clearFilters = () => {
    onFilterChange({
      purposes: [],
      skillLevels: [],
      budget: [],
      accuracy: [],
      platforms: [],
      languages: [],
      privacy: []
    });
  };

  const FilterSection = ({ 
    title, 
    category, 
    options 
  }: { 
    title: string; 
    category: keyof FilterState; 
    options: string[] 
  }) => (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => toggleSection(category)}
        className="flex items-center justify-between w-full mb-3 text-left"
      >
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {expandedSections[category] ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      {expandedSections[category] && (
        <div className="space-y-2">
          {options.map(option => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`${category}-${option}`}
                checked={filters[category].includes(option)}
                onCheckedChange={() => handleCheckboxChange(category, option)}
              />
              <Label
                htmlFor={`${category}-${option}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1 rounded-lg text-sm"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        <FilterSection
          title="Purpose / Use Case"
          category="purposes"
          options={dynamicOptions?.purposes || filterOptions.purposes}
        />

        <FilterSection
          title="Skill Level"
          category="skillLevels"
          options={dynamicOptions?.skillLevels || filterOptions.skillLevels}
        />

        <FilterSection
          title="Budget"
          category="budget"
          options={dynamicOptions?.budget || filterOptions.budget}
        />

        <FilterSection
          title="Accuracy Priority"
          category="accuracy"
          options={dynamicOptions?.accuracy || filterOptions.accuracy}
        />

        <FilterSection
          title="Platform"
          category="platforms"
          options={dynamicOptions?.platforms || filterOptions.platforms}
        />

        <FilterSection
          title="Programming Languages"
          category="languages"
          options={dynamicOptions?.languages || filterOptions.languages}
        />

        <FilterSection
          title="Privacy"
          category="privacy"
          options={dynamicOptions?.privacy || filterOptions.privacy}
        />
      </div>

      <button
        onClick={onApply}
        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-3 font-medium"
      >
        Apply Filters
      </button>
    </div>
  );
}