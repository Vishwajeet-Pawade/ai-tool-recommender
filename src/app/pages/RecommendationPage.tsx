import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { FilterPanel } from '../components/FilterPanel';
import { ToolCard } from '../components/ToolCard';
import { FilterState, defaultFilters } from '../data/tools';
import type { AITool } from '../data/tools';
import { Sparkles, SlidersHorizontal, Search, X, Bot } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { createPortal } from 'react-dom';

// ─── Session State Persistence ───────────────────────────────────────────────
const SESSION_KEY = 'explore_state';

function saveState(state: any) {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(state)); } catch {}
}

function loadState() {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch { return null; }
}

// ─── Scoring Formula (fallback when AI is not active) ────────────────────────
function scoreTools(tool: AITool, keyword: string): number {
  const k = keyword.toLowerCase().trim();
  const toolPurposes = (Array.isArray(tool.purposes) ? tool.purposes : [tool.purposes])
    .filter(Boolean)
    .map((p: any) => String(p).toLowerCase().replace(/_/g, ' ').trim());
  const toolTags = (Array.isArray(tool.tags) ? tool.tags : [])
    .filter(Boolean)
    .map((t: any) => String(t).toLowerCase().trim());

  const purposeScore =
    toolPurposes.some(tp => tp === k) ? 200 :
    toolPurposes.some(tp => tp.includes(k) || k.includes(tp)) ? 100 :
    toolTags.some(tt => tt.includes(k) || k.includes(tt)) ? 50 : 0;

  const rating     = (tool.rating     || 0) * 20;
  const popularity = (tool.popularity || 0);
  const reviews    = Math.min((tool.reviews  || 0) / 1000, 20);
  const humanEval  = (tool.humanEval  || 0) * 0.5;
  const mbpp       = (tool.mbpp       || 0) * 0.5;

  return purposeScore + rating + popularity + reviews + humanEval + mbpp;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function RecommendationPage() {
  const navigate    = useNavigate();
  const { theme }   = useTheme();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saved = loadState();

  // ── State ──
  const [aiTools,           setAiTools]           = useState<AITool[]>([]);
  const [filters,           setFilters]           = useState<FilterState>(saved?.filters        ?? defaultFilters);
  const [appliedFilters,    setAppliedFilters]    = useState<FilterState>(saved?.appliedFilters ?? defaultFilters);
  const [comparisonList,    setComparisonList]    = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchKeyword,     setSearchKeyword]     = useState<string>(saved?.searchKeyword ?? '');
  const [showSuggestions,   setShowSuggestions]   = useState(false);
  const [topN,              setTopN]              = useState<number | null>(saved?.topN ?? null);
  const [isLoading,         setIsLoading]         = useState(true);
  const [aiExplanation,     setAiExplanation]     = useState<string>(saved?.aiExplanation ?? '');
  const [aiToolIds,         setAiToolIds]         = useState<string[]>(saved?.aiToolIds ?? []);
  const [aiLoading,         setAiLoading]         = useState(false);
  const [isAiActive,        setIsAiActive]        = useState<boolean>(saved?.isAiActive ?? false);

  // ── Persist state ──
  useEffect(() => {
    saveState({ searchKeyword, topN, filters, appliedFilters, aiExplanation, aiToolIds, isAiActive });
  }, [searchKeyword, topN, filters, appliedFilters, aiExplanation, aiToolIds, isAiActive]);

  // Reset comparison list on every mount (page visit/return)
  useEffect(() => {
    setComparisonList([]);
  }, []);
  // ── Fetch tools ──
  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:5000/tools')
      .then(res => res.json())
      .then(data => { setAiTools(Array.isArray(data) ? data : []); setIsLoading(false); })
      .catch(err => { console.error(err); setIsLoading(false); });
  }, []);

  // ── Helpers ──
  const normalize = (str: any) => String(str || '').toLowerCase().replace(/_/g, ' ').trim();

  const toArray = (value: any): string[] => {
    if (Array.isArray(value)) return value.filter(Boolean);
    if (typeof value === 'string' && value.trim()) return [value.trim()];
    return [];
  };

  const getUniqueValues = (key: keyof AITool) =>
    Array.from(new Set(aiTools.flatMap(tool => {
      const value = tool[key];
      if (Array.isArray(value)) return value.map(v => normalize(v));
      if (typeof value === 'string') return [normalize(value)];
      return [];
    })));

  const dynamicOptions = {
    purposes:    getUniqueValues('purposes'),
    skillLevels: getUniqueValues('skillLevel'),
    platforms:   getUniqueValues('platforms'),
    languages:   getUniqueValues('languages'),
  };

  // ── AI call — ALL searches go through AI ──
  const callAI = useCallback(async (keyword: string, currentFilters: FilterState) => {
    const hasSearch  = keyword.trim() !== '';
    const hasFilters = Object.values(currentFilters).some(f => Array.isArray(f) && f.length > 0);

    if (!hasSearch && !hasFilters) {
      setIsAiActive(false); setAiExplanation(''); setAiToolIds([]);
      return;
    }

    setAiLoading(true); setIsAiActive(true);
    try {
      const res  = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: keyword, filters: currentFilters }),
      });
      const data = await res.json();
      setAiExplanation(data.explanation ?? '');
      setAiToolIds(Array.isArray(data.toolIds) ? data.toolIds : []);
    } catch (err) {
      console.error(err);
      setAiExplanation('Something went wrong. Please try again.');
    }
    setAiLoading(false);
  }, []);

  // ── Search input handler — ALL searches go through AI ──
  const handleSearchChange = (val: string) => {
    setSearchKeyword(val);
    setShowSuggestions(true);

    if (!val.trim()) {
      setIsAiActive(false); setAiExplanation(''); setAiToolIds([]);
      return;
    }

    // Debounce AI call for all searches
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => callAI(val, appliedFilters), 800);
  };

  // ── Enter key → trigger AI immediately ──
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      callAI(searchKeyword, appliedFilters);
    }
  };

  // ── Filter change → also goes through AI ──
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setAppliedFilters(newFilters);
    callAI(searchKeyword, newFilters);
  };

  // ── Suggestions ──
  const getKeywordSuggestions = () => {
    if (!searchKeyword.trim() || aiTools.length === 0) return [];
    const kw = searchKeyword.toLowerCase();
    const s  = new Set<string>();
    aiTools.forEach(tool => {
      if (tool.name?.toLowerCase().includes(kw)) s.add(tool.name);
      toArray(tool.tags).forEach(tag => { if (tag.toLowerCase().includes(kw)) s.add(tag); });
      toArray(tool.purposes).forEach(p => { if (p.toLowerCase().includes(kw)) s.add(p); });
    });
    return Array.from(s).slice(0, 8);
  };
  const suggestions = getKeywordSuggestions();

  // ── Filtering ──
  // Step 1: AI results or keyword filter
  const keywordFilteredTools: AITool[] = isAiActive
    ? aiToolIds.map(id => aiTools.find(t => t.id === id)).filter((t): t is AITool => !!t)
    : searchKeyword.trim()
    ? aiTools.filter(tool => {
        const kw = searchKeyword.toLowerCase();
        return (
          normalize(tool.name).includes(kw) ||
          normalize(tool.description).includes(kw) ||
          toArray(tool.purposes).some(p => normalize(p).includes(kw) || kw.includes(normalize(p))) ||
          toArray(tool.tags).some(t => normalize(t).includes(kw) || kw.includes(normalize(t)))
        );
      })
    : aiTools;

  // Step 2: Apply panel filters on top
  const filteredTools = keywordFilteredTools.filter(tool => {
    if ((appliedFilters.purposes ?? []).length > 0) {
      const hasMatch = appliedFilters.purposes.some(purpose => {
        const nf = normalize(purpose);
        return (
          toArray(tool.purposes).some(p => normalize(p).includes(nf) || nf.includes(normalize(p))) ||
          toArray(tool.tags).some(t => normalize(t).includes(nf) || nf.includes(normalize(t)))
        );
      });
      if (!hasMatch) return false;
    }
    if ((appliedFilters.skillLevels ?? []).length > 0) {
      const sl = toArray(tool.skillLevel).map(normalize);
      if (!appliedFilters.skillLevels.some(l => sl.includes(normalize(l)))) return false;
    }
    if ((appliedFilters.budget ?? []).length > 0) {
      if (!tool.pricing || !appliedFilters.budget.includes(tool.pricing)) return false;
    }
    if ((appliedFilters.accuracy ?? []).length > 0) {
      if (!tool.accuracy || !appliedFilters.accuracy.includes(tool.accuracy)) return false;
    }
    if ((appliedFilters.platforms ?? []).length > 0) {
      const pl = toArray(tool.platforms).map(normalize);
      if (!appliedFilters.platforms.some(p => pl.includes(normalize(p)))) return false;
    }
    if ((appliedFilters.languages ?? []).length > 0) {
      const lang = toArray(tool.languages).map(normalize);
      if (!appliedFilters.languages.some(l => lang.includes(normalize(l)))) return false;
    }
    if ((appliedFilters.privacy ?? []).length > 0) {
      if (!tool.privacy || !appliedFilters.privacy.includes(tool.privacy)) return false;
    }
    return true;
  });

  // Step 3: Sort — AI order when active, score-based otherwise
  const currentKeyword = searchKeyword.trim() ||
    (appliedFilters.purposes?.length > 0 ? appliedFilters.purposes[0] : '');

  const sortedTools = isAiActive
    ? filteredTools
    : [...filteredTools].sort((a, b) => scoreTools(b, currentKeyword) - scoreTools(a, currentKeyword));

  const displayedTools = topN ? sortedTools.slice(0, topN) : sortedTools;

  // ── Actions ──
  const handleSuggestionClick = (s: string) => {
    setSearchKeyword(s);
    setShowSuggestions(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    callAI(s, appliedFilters);
  };

  const clearAll = () => {
    setSearchKeyword(''); setShowSuggestions(false);
    setIsAiActive(false); setAiExplanation(''); setAiToolIds([]);
    setFilters(defaultFilters); setAppliedFilters(defaultFilters);
    setTopN(null); setComparisonList([]);
    sessionStorage.removeItem(SESSION_KEY);
  };

  const clearSearch = () => {
    setSearchKeyword(''); setShowSuggestions(false);
    setIsAiActive(false); setAiExplanation(''); setAiToolIds([]);
  };

  const handleCompareToggle = (toolId: string) => {
    setComparisonList(prev => {
      if (prev.includes(toolId)) return prev.filter(id => id !== toolId);
      if (prev.length >= 4) { alert('You can compare up to 4 tools at a time'); return prev; }
      return [...prev, toolId];
    });
  };

  const handleCompareClick = () => {
    if (comparisonList.length < 2) { alert('Please select at least 2 tools to compare'); return; }
    navigate(`/compare?tools=${comparisonList.join(',')}`);
  };

  const activeFilterCount = Object.values(appliedFilters).reduce(
    (count, arr) => count + (Array.isArray(arr) ? arr.length : 0), 0
  );

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#f8f8f8]'
    }`}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)' }}>
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                Explore <span className="shimmer">AI Tools</span>
              </h1>
              <p className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                {isLoading ? 'Loading tools...' : `${displayedTools.length} tools found`}
                {activeFilterCount > 0 && ` (${activeFilterCount} filters active)`}
                {topN && ` • Showing top ${topN}`}
                {isAiActive && ` • AI Ranked Results`}
              </p>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mt-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className={`w-full rounded-xl border px-4 py-2 flex items-center justify-center transition-all duration-300 ${
                theme === 'dark'
                  ? 'border-[rgba(255,215,0,0.2)] text-[#FFD700] hover:bg-[rgba(255,215,0,0.05)]'
                  : 'border-[rgba(184,134,11,0.2)] text-[#B8860B] hover:bg-[rgba(184,134,11,0.05)]'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              {showMobileFilters ? 'Hide' : 'Show'} Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 text-black text-xs px-2 py-1 rounded-full"
                  style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)' }}>
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Search Bar + Top N */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFD700]" />
                <input
                  type="text"
                  placeholder='Search (e.g. "coding") or ask AI (e.g. "I need a free tool for coding")...'
                  value={searchKeyword}
                  onChange={e => handleSearchChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border focus:outline-none transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-[#111111] border-[rgba(255,215,0,0.2)] text-white placeholder-gray-600 focus:border-[#FFD700]'
                      : 'bg-white border-[rgba(184,134,11,0.2)] text-[#0a0a0a] placeholder-gray-400 focus:border-[#B8860B]'
                  }`}
                />
                {searchKeyword && (
                  <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FFD700]">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && !isAiActive && (
                <div className={`absolute z-50 w-full mt-2 rounded-xl border shadow-lg max-h-64 overflow-y-auto ${
                  theme === 'dark' ? 'bg-[#111111] border-[rgba(255,215,0,0.2)]' : 'bg-white border-[rgba(184,134,11,0.2)]'
                }`}>
                  <div className="p-2">
                    <p className={`text-xs px-3 py-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Suggestions</p>
                    {suggestions.map((s, i) => (
                      <button key={i} onClick={() => handleSuggestionClick(s)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                          theme === 'dark'
                            ? 'text-gray-300 hover:bg-[rgba(255,215,0,0.05)] hover:text-[#FFD700]'
                            : 'text-gray-600 hover:bg-[rgba(184,134,11,0.05)] hover:text-[#B8860B]'
                        }`}>
                        <Search className="inline w-4 h-4 mr-2 text-[#FFD700]" />
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Top N */}
            <div className="sm:w-48">
              <select value={topN || 'all'}
                onChange={e => setTopN(e.target.value === 'all' ? null : parseInt(e.target.value))}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#111111] border-[rgba(255,215,0,0.2)] text-white focus:border-[#FFD700]'
                    : 'bg-white border-[rgba(184,134,11,0.2)] text-[#0a0a0a] focus:border-[#B8860B]'
                }`}>
                <option value="all">All Tools</option>
                <option value="3">Top 3</option>
                <option value="5">Top 5</option>
                <option value="10">Top 10</option>
              </select>
            </div>
          </div>

          {/* AI Loading */}
          {aiLoading && (
            <div className="mt-4 p-4 rounded-xl border flex items-center gap-3"
              style={{ background: 'rgba(255,215,0,0.05)', borderColor: 'rgba(255,215,0,0.2)' }}>
              <Bot className="w-5 h-5 text-[#FFD700] animate-pulse" />
              <p className="text-[#FFD700] font-medium">AI is ranking tools for your query...</p>
            </div>
          )}

          {/* AI Explanation */}
          {aiExplanation && !aiLoading && (
            <div className="mt-4 p-5 rounded-xl border"
              style={{ background: 'rgba(255,215,0,0.05)', borderColor: 'rgba(255,215,0,0.2)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-5 h-5 text-[#FFD700]" />
                <p className="font-bold text-[#FFD700]">AI Recommendation</p>
              </div>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{aiExplanation}</p>
            </div>
          )}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className={`lg:block ${showMobileFilters ? 'block' : 'hidden'}`}>
            <FilterPanel
              filters={filters}
              dynamicOptions={dynamicOptions}
              onFilterChange={handleFilterChange}
              onApply={() => setShowMobileFilters(false)}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`rounded-2xl border p-6 animate-pulse ${
                    theme === 'dark' ? 'bg-[#111111] border-[rgba(255,215,0,0.1)]' : 'bg-white border-[rgba(184,134,11,0.1)]'
                  }`}>
                    <div className={`h-4 rounded mb-4 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-200'}`} />
                    <div className={`h-4 rounded mb-2 w-3/4 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-200'}`} />
                    <div className={`h-4 rounded w-1/2 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-200'}`} />
                  </div>
                ))}
              </div>
            ) : displayedTools.length === 0 ? (
              <div className={`rounded-2xl border p-12 text-center ${
                theme === 'dark' ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]' : 'bg-white border-[rgba(184,134,11,0.15)]'
              }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'
                }`}>
                  <Sparkles className="w-8 h-8 text-[#FFD700]" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                  No tools found
                </h3>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  Try a different keyword or adjust your filters
                </p>
                <button onClick={clearAll}
                  className={`rounded-xl border px-4 py-2 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'border-[rgba(255,215,0,0.3)] text-[#FFD700] hover:bg-[rgba(255,215,0,0.05)]'
                      : 'border-[rgba(184,134,11,0.3)] text-[#B8860B] hover:bg-[rgba(184,134,11,0.05)]'
                  }`}>
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {displayedTools.map((tool, index) => (
                  <div key={tool.id} className="relative">
                    {isAiActive && (
                      <div className="absolute -top-3 -left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-black text-sm font-bold shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)' }}>
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
        {comparisonList.length > 0 && createPortal(
          <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
            <button
              onClick={handleCompareClick}
              className="text-black rounded-xl shadow-2xl px-6 py-4 font-bold text-lg pulse-gold"
              style={{
                background: 'linear-gradient(135deg, #FFD700, #B8860B)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Compare {comparisonList.length} {comparisonList.length === 1 ? 'Tool' : 'Tools'}
            </button>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}