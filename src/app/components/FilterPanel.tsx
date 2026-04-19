import { FilterState, filterOptions } from '../data/tools';
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onApply: () => void;
  dynamicOptions?: Partial<Record<keyof FilterState, string[]>>;
}

export function FilterPanel({ filters, onFilterChange, onApply, dynamicOptions }: FilterPanelProps) {
  const { theme } = useTheme();
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
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // ✅ Safe getter — always returns an array even if filters key is missing
  const getFilterValues = (category: keyof FilterState): string[] => {
    const val = filters?.[category];
    return Array.isArray(val) ? val : [];
  };

  const handleCheckboxChange = (category: keyof FilterState, value: string) => {
    const currentValues = getFilterValues(category);
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onFilterChange({ ...filters, [category]: newValues });
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

  const totalActive = Object.values(filters ?? {}).reduce(
    (sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0),
    0
  );

  const FilterSection = ({
    title,
    category,
    options
  }: {
    title: string;
    category: keyof FilterState;
    options: string[];
  }) => {
    const safeOptions = Array.isArray(options) ? options : [];
    const categoryValues = getFilterValues(category);
    const activeCount = categoryValues.length;

    return (
      <div className={`rounded-xl border overflow-hidden transition-all duration-300 ${
        theme === 'dark'
          ? 'border-[rgba(255,215,0,0.1)] bg-[#0f0f0f]'
          : 'border-[rgba(184,134,11,0.15)] bg-[#fafafa]'
      }`}>
        <button
          onClick={() => toggleSection(category)}
          className={`flex items-center justify-between w-full px-4 py-3 text-left transition-all duration-200 ${
            theme === 'dark'
              ? 'hover:bg-[rgba(255,215,0,0.04)]'
              : 'hover:bg-[rgba(184,134,11,0.04)]'
          }`}
        >
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold text-sm ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>
              {title}
            </h3>
            {activeCount > 0 && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-bold text-black"
                style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)' }}
              >
                {activeCount}
              </span>
            )}
          </div>
          {expandedSections[category]
            ? <ChevronUp className="w-4 h-4 text-[#FFD700]" />
            : <ChevronDown className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
          }
        </button>

        {expandedSections[category] && (
          <div className={`px-4 pb-4 space-y-2 border-t ${
            theme === 'dark' ? 'border-[rgba(255,215,0,0.07)]' : 'border-[rgba(184,134,11,0.1)]'
          }`}>
            <div className="pt-3 space-y-1.5">
              {/* ✅ safeOptions prevents .map() on undefined */}
              {safeOptions.map(option => {
                const isChecked = categoryValues.includes(option);
                return (
                  <label
                    key={option}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 group ${
                      isChecked
                        ? theme === 'dark'
                          ? 'bg-[rgba(255,215,0,0.08)] border border-[rgba(255,215,0,0.25)]'
                          : 'bg-[rgba(184,134,11,0.08)] border border-[rgba(184,134,11,0.25)]'
                        : theme === 'dark'
                        ? 'hover:bg-[rgba(255,215,0,0.04)] border border-transparent'
                        : 'hover:bg-[rgba(184,134,11,0.04)] border border-transparent'
                    }`}
                    onClick={() => handleCheckboxChange(category, option)}
                  >
                    {/* Custom checkbox */}
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200 border ${
                        isChecked
                          ? 'border-[#FFD700]'
                          : theme === 'dark'
                          ? 'border-gray-600 group-hover:border-[rgba(255,215,0,0.4)]'
                          : 'border-gray-300 group-hover:border-[rgba(184,134,11,0.4)]'
                      }`}
                      style={isChecked ? { background: 'linear-gradient(135deg, #FFD700, #B8860B)' } : {}}
                    >
                      {isChecked && (
                        <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm transition-colors duration-200 ${
                      isChecked
                        ? 'text-[#FFD700] font-medium'
                        : theme === 'dark'
                        ? 'text-gray-400 group-hover:text-gray-200'
                        : 'text-gray-500 group-hover:text-gray-800'
                    }`}>
                      {option}
                    </span>
                  </label>
                );
              })}

              {/* ✅ Empty state when no options available */}
              {safeOptions.length === 0 && (
                <p className={`text-xs px-3 py-2 ${
                  theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  No options available
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`rounded-2xl border p-5 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
          : 'bg-white border-[rgba(184,134,11,0.15)]'
      }`}
      style={{
        boxShadow: theme === 'dark'
          ? '0 4px 30px rgba(0,0,0,0.4)'
          : '0 4px 20px rgba(0,0,0,0.06)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)' }}
          >
            <SlidersHorizontal className="w-4 h-4 text-black" />
          </div>
          <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
            Filters
          </h2>
          {totalActive > 0 && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-bold text-black"
              style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)' }}
            >
              {totalActive}
            </span>
          )}
        </div>

        {totalActive > 0 && (
          <button
            onClick={clearFilters}
            className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all duration-300 ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-[#FFD700] hover:bg-[rgba(255,215,0,0.06)]'
                : 'text-gray-500 hover:text-[#B8860B] hover:bg-[rgba(184,134,11,0.06)]'
            }`}
          >
            <X className="w-3 h-3" />
            Clear All
          </button>
        )}
      </div>

      {/* Gold divider */}
      <div
        className="h-px mb-5 rounded-full"
        style={{ background: 'linear-gradient(90deg, #FFD700, transparent)' }}
      />

      {/* Filter Sections */}
      <div className="space-y-3">
        <FilterSection
          title="Purpose / Use Case"
          category="purposes"
          options={dynamicOptions?.purposes ?? filterOptions?.purposes ?? []}
        />
        <FilterSection
          title="Skill Level"
          category="skillLevels"
          options={dynamicOptions?.skillLevels ?? filterOptions?.skillLevels ?? []}
        />
        <FilterSection
          title="Budget"
          category="budget"
          options={dynamicOptions?.budget ?? filterOptions?.budget ?? []}
        />
        <FilterSection
          title="Accuracy Priority"
          category="accuracy"
          options={dynamicOptions?.accuracy ?? filterOptions?.accuracy ?? []}
        />
        <FilterSection
          title="Platform"
          category="platforms"
          options={dynamicOptions?.platforms ?? filterOptions?.platforms ?? []}
        />
        <FilterSection
          title="Programming Languages"
          category="languages"
          options={dynamicOptions?.languages ?? filterOptions?.languages ?? []}
        />
        <FilterSection
          title="Privacy"
          category="privacy"
          options={dynamicOptions?.privacy ?? filterOptions?.privacy ?? []}
        />
      </div>

      {/* Apply Button */}
      <button
        onClick={onApply}
        className="w-full mt-5 py-3 rounded-xl font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
        style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)' }}
      >
        Apply Filters
      </button>
    </div>
  );
}