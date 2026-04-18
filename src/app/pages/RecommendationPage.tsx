import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FilterPanel } from '../components/FilterPanel';
import { ToolCard } from '../components/ToolCard';
import { FilterState, defaultFilters } from '../data/tools';
import type { AITool } from '../data/tools';
import { Sparkles, SlidersHorizontal, Search, X, Bot } from 'lucide-react';

export function RecommendationPage() {

  const navigate = useNavigate();

  const [aiTools, setAiTools] = useState<AITool[]>([]);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(defaultFilters);
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [topN, setTopN] = useState<number | null>(null);

  // AI Search states
  const [aiExplanation, setAiExplanation] = useState('');
  const [aiToolIds, setAiToolIds] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [isAiSearch, setIsAiSearch] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/tools")
      .then(res => res.json())
      .then(data => setAiTools(data))
      .catch(err => console.error(err));
  }, []);

  // Handle Enter key press for AI search
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const wordCount = searchKeyword.trim().split(' ').length;
      
      if (wordCount > 3) {
        setAiLoading(true);
        setIsAiSearch(true);
        setShowSuggestions(false);

        try {
          const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: searchKeyword })
          });

          const data = await response.json();
          setAiExplanation(data.explanation);
          setAiToolIds(data.toolIds);
        } catch (err) {
          console.error(err);
          setAiExplanation("Something went wrong. Please try again.");
        }

        setAiLoading(false);
      }
    }
  };

  // Get keyword suggestions
  const getKeywordSuggestions = () => {
    if (!searchKeyword.trim()) return [];
    
    const keyword = searchKeyword.toLowerCase();
    const suggestions = new Set<string>();
    
    aiTools.forEach(tool => {
      if (tool.name?.toLowerCase().includes(keyword)) {
        suggestions.add(tool.name);
      }
      (tool.tags || []).forEach(tag => {
        if (tag?.toLowerCase().includes(keyword)) {
          suggestions.add(tag);
        }
      });
      (tool.purposes || []).forEach(purpose => {
        if (purpose?.toLowerCase().includes(keyword)) {
          suggestions.add(purpose);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, 8);
  };

  const suggestions = getKeywordSuggestions();

  // Filter tools based on keyword search or AI search
  // For AI search - maintain LLaMA's ranking order
  const keywordFilteredTools = isAiSearch
    ? aiToolIds
        .map(id => aiTools.find(tool => tool.id === id))
        .filter((tool): tool is AITool => tool !== undefined)
    : searchKeyword.trim()
    ? aiTools.filter(tool => {
        const keyword = searchKeyword.toLowerCase();
        return (
          tool.name?.toLowerCase().includes(keyword) ||
          tool.description?.toLowerCase().includes(keyword) ||
          (tool.tags || []).some(tag => tag?.toLowerCase().includes(keyword)) ||
          (tool.purposes || []).some(purpose => purpose?.toLowerCase().includes(keyword))
        );
      })
    : aiTools;

  const filteredTools = keywordFilteredTools.filter(tool => {
    if (appliedFilters.purposes.length > 0) {
      const hasMatchingPurpose = appliedFilters.purposes.some(purpose => 
        (tool.purposes || []).includes(purpose)
      );
      if (!hasMatchingPurpose) return false;
    }

    if (appliedFilters.skillLevels.length > 0) {
      const hasMatchingSkillLevel = appliedFilters.skillLevels.some(level => 
        (tool.skillLevel || []).includes(level)
      );
      if (!hasMatchingSkillLevel) return false;
    }

    if (appliedFilters.budget.length > 0) {
      if (!appliedFilters.budget.includes(tool.pricing)) return false;
    }

    if (appliedFilters.accuracy.length > 0) {
      if (!appliedFilters.accuracy.includes(tool.accuracy)) return false;
    }

    if (appliedFilters.platforms.length > 0) {
      const hasMatchingPlatform = appliedFilters.platforms.some(platform => 
        (tool.platforms || []).includes(platform)
      );
      if (!hasMatchingPlatform) return false;
    }

    if (appliedFilters.languages.length > 0) {
      const hasMatchingLanguage = appliedFilters.languages.some(lang => 
        (tool.languages || []).includes(lang)
      );
      if (!hasMatchingLanguage) return false;
    }

    if (appliedFilters.privacy.length > 0) {
      if (!appliedFilters.privacy.includes(tool.privacy)) return false;
    }

    return true;
  });

  // Only sort by rating when NOT in AI search mode
  // In AI search mode preserve LLaMA's ranking order
  const sortedTools = isAiSearch 
    ? filteredTools 
    : [...filteredTools].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
  const displayedTools = topN ? sortedTools.slice(0, topN) : sortedTools;

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setShowMobileFilters(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchKeyword(suggestion);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchKeyword('');
    setShowSuggestions(false);
    setIsAiSearch(false);
    setAiExplanation('');
    setAiToolIds([]);
  };
  
  const handleCompareToggle = (toolId: string) => {
    setComparisonList(prev => {
      if (prev.includes(toolId)) {
        return prev.filter(id => id !== toolId);
      } else {
        if (prev.length >= 4) {
          alert('You can compare up to 4 tools at a time');
          return prev;
        }
        return [...prev, toolId];
      }
    });
  };

  const handleCompareClick = () => {
    if (comparisonList.length < 2) {
      alert('Please select at least 2 tools to compare');
      return;
    }
    navigate(`/compare?tools=${comparisonList.join(',')}`);
  };

  const activeFilterCount = Object.values(appliedFilters).reduce(
    (count, filterArray) => count + filterArray.length,
    0
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Explore AI Tools</h1>
              <p className="text-gray-600">
                {displayedTools.length} tools found
                {activeFilterCount > 0 && ` (${activeFilterCount} filters active)`}
                {topN && ` • Showing top ${topN}`}
                {isAiSearch && ` • AI Ranked Results`}
              </p>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full rounded-xl border-2 border-gray-300 px-4 py-2 flex items-center justify-center hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              {showMobileFilters ? 'Hide' : 'Show'} Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Search Bar and Top N Filter */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by keyword or ask AI (e.g., I need a free tool for coding)..."
                  value={searchKeyword}
                  onChange={(e) => {
                    setSearchKeyword(e.target.value);
                    setShowSuggestions(true);
                    setIsAiSearch(false);
                    setAiExplanation('');
                    setAiToolIds([]);
                  }}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                />
                {searchKeyword && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && !isAiSearch && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl border-2 border-gray-200 shadow-lg max-h-64 overflow-y-auto">
                  <div className="p-2">
                    <p className="text-xs text-gray-500 px-3 py-2">Suggestions</p>
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                      >
                        <Search className="inline w-4 h-4 mr-2 text-gray-400" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Top N Filter */}
            <div className="sm:w-48">
              <select
                value={topN || 'all'}
                onChange={(e) => setTopN(e.target.value === 'all' ? null : parseInt(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-white"
              >
                <option value="all">All Tools</option>
                <option value="3">Top 3</option>
                <option value="5">Top 5</option>
                <option value="10">Top 10</option>
              </select>
            </div>
          </div>

          {/* AI Loading */}
          {aiLoading && (
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200 flex items-center gap-3">
              <Bot className="w-5 h-5 text-blue-600 animate-pulse" />
              <p className="text-blue-700 font-medium">AI is thinking...</p>
            </div>
          )}

          {/* AI Explanation Box */}
          {aiExplanation && !aiLoading && (
            <div className="mt-4 p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-5 h-5 text-blue-600" />
                <p className="font-semibold text-blue-700">AI Recommendation</p>
              </div>
              <p className="text-gray-700">{aiExplanation}</p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showMobileFilters ? 'block' : 'hidden'}`}>
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              onApply={handleApplyFilters}
            />
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            {filteredTools.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No tools found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or ask AI differently
                </p>
                <button
                  onClick={() => {
                    setFilters(defaultFilters);
                    setAppliedFilters(defaultFilters);
                    setSearchKeyword('');
                    setTopN(null);
                    setIsAiSearch(false);
                    setAiExplanation('');
                    setAiToolIds([]);
                  }}
                  className="rounded-xl border-2 border-gray-300 px-4 py-2 hover:bg-gray-50"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {displayedTools.map((tool, index) => (
                  <div key={tool.id} className="relative">
                    {/* AI Rank Label */}
                    {isAiSearch && (
                      <div className="absolute -top-3 -left-3 z-10 w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        {index + 1}
                      </div>
                    )}
                    <ToolCard
                      tool={tool}
                      onCompare={handleCompareToggle}
                      isInComparison={comparisonList.includes(tool.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Floating Compare Button */}
        {comparisonList.length > 0 && (
          <div className="fixed bottom-8 right-8 z-40">
            <button
              onClick={handleCompareClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-2xl px-6 py-6 font-medium text-lg"
            >
              Compare {comparisonList.length} {comparisonList.length === 1 ? 'Tool' : 'Tools'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}