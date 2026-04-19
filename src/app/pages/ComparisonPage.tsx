import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import { ArrowLeft, ExternalLink, Star, TrendingUp, Check, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function ComparisonPage() {
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [aiTools, setAiTools] = useState<any[]>([]);

  useEffect(() => {
    const toolsParam = searchParams.get('tools');
    if (toolsParam) setSelectedTools(toolsParam.split(','));
  }, [searchParams]);

  useEffect(() => {
    fetch("http://localhost:5000/tools")
      .then(res => res.json())
      .then(data => setAiTools(data));
  }, []);

  const toolsToCompare = aiTools.filter(tool => selectedTools.includes(tool.id));

  if (toolsToCompare.length === 0) {
    return (
      <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${
        theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#f8f8f8]'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className={`rounded-2xl border p-12 text-center ${
            theme === 'dark'
              ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
              : 'bg-white border-[rgba(184,134,11,0.15)]'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
              No Tools Selected
            </h2>
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Please select tools from the explore page to compare them.
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)', color: '#0a0a0a' }}
            >
              Go to Explore
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getBestValue = (values: number[], currentValue: number) => {
    const maxValue = Math.max(...values);
    return currentValue === maxValue && maxValue > 0;
  };

  const comparisonRows = [
    {
      label: 'Overall Rating',
      getValue: (tool: any) => (
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
          <span className="font-bold text-[#FFD700]">{tool.rating}</span>
        </div>
      ),
      compareValues: toolsToCompare.map(t => t.rating)
    },
    {
      label: 'HumanEval Score',
      getValue: (tool: any) => tool.humanEval > 0
        ? <span className="font-bold text-[#FFD700]">{tool.humanEval}%</span>
        : <span className="text-gray-500">N/A</span>,
      compareValues: toolsToCompare.map(t => t.humanEval)
    },
    {
      label: 'MBPP Score',
      getValue: (tool: any) => tool.mbpp > 0
        ? <span className="font-bold text-[#FFD700]">{tool.mbpp}%</span>
        : <span className="text-gray-500">N/A</span>,
      compareValues: toolsToCompare.map(t => t.mbpp)
    },
    {
      label: 'Speed',
      getValue: (tool: any) => (
        <div className="flex items-center gap-2">
          <div className={`flex-1 rounded-full h-2 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-200'}`}>
            <div className="h-2 rounded-full"
              style={{ width: `${tool.speed}%`, background: 'linear-gradient(90deg, #FFD700, #B8860B)' }} />
          </div>
          <span className="text-sm font-bold text-[#FFD700]">{tool.speed}%</span>
        </div>
      ),
      compareValues: toolsToCompare.map(t => t.speed)
    },
    {
      label: 'Popularity',
      getValue: (tool: any) => (
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#FFD700]" />
          <span className="font-bold text-[#FFD700]">{tool.popularity}%</span>
        </div>
      ),
      compareValues: toolsToCompare.map(t => t.popularity)
    },
    {
      label: 'Pricing',
      getValue: (tool: any) => (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          tool.pricing === 'Free'
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : tool.pricing === 'Freemium'
            ? 'bg-[rgba(255,215,0,0.15)] text-[#FFD700] border border-[rgba(255,215,0,0.3)]'
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {tool.pricing}
        </span>
      ),
      compareValues: []
    },
    {
      label: 'Accuracy Level',
      getValue: (tool: any) => (
        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
          {tool.accuracy}
        </span>
      ),
      compareValues: []
    },
    {
      label: 'Privacy',
      getValue: (tool: any) => (
        <span className={`text-xs px-2 py-1 rounded-full border ${
          theme === 'dark'
            ? 'border-[rgba(255,215,0,0.2)] text-gray-300'
            : 'border-[rgba(184,134,11,0.2)] text-gray-600'
        }`}>
          {tool.privacy}
        </span>
      ),
      compareValues: []
    },
    {
      label: 'Platforms',
      getValue: (tool: any) => (
        <div className="flex flex-wrap gap-1">
          {(tool.platforms || []).map((platform: string) => (
            <span key={platform} className={`text-xs px-2 py-0.5 rounded-full border ${
              theme === 'dark'
                ? 'border-[rgba(255,215,0,0.2)] text-gray-400'
                : 'border-[rgba(184,134,11,0.2)] text-gray-500'
            }`}>
              {platform}
            </span>
          ))}
        </div>
      ),
      compareValues: []
    },
    {
      label: 'Languages',
      getValue: (tool: any) => (
        <div className="flex flex-wrap gap-1">
          {(tool.languages || []).length > 0
            ? tool.languages.slice(0, 3).map((lang: string) => (
                <span key={lang} className={`text-xs px-2 py-0.5 rounded-full border ${
                  theme === 'dark'
                    ? 'border-[rgba(255,215,0,0.2)] text-gray-400'
                    : 'border-[rgba(184,134,11,0.2)] text-gray-500'
                }`}>
                  {lang}
                </span>
              ))
            : <span className="text-sm text-gray-500">N/A</span>
          }
        </div>
      ),
      compareValues: []
    },
    {
      label: 'IDE Integration',
      getValue: (tool: any) => (
        tool.ideIntegration?.length > 0 ? (
          <div className="flex items-center gap-1">
            <Check className="w-4 h-4 text-green-400" />
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {tool.ideIntegration.join(', ')}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <X className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">None</span>
          </div>
        )
      ),
      compareValues: []
    }
  ];

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#f8f8f8]'
    }`}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 fade-in-up">
          <Link
            to="/explore"
            className={`inline-flex items-center gap-2 mb-4 px-3 py-2 rounded-lg transition-all duration-300 ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-[#FFD700] hover:bg-[rgba(255,215,0,0.05)]'
                : 'text-gray-500 hover:text-[#B8860B] hover:bg-[rgba(184,134,11,0.05)]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
            Compare <span className="shimmer">AI Tools</span>
          </h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
            Side-by-side comparison of {toolsToCompare.length} tools
          </p>
        </div>

        {/* Comparison Table */}
        <div className={`rounded-2xl border overflow-hidden ${
          theme === 'dark'
            ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
            : 'bg-white border-[rgba(184,134,11,0.15)]'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(184,134,11,0.05))' }}>
                  <th className={`text-left p-6 font-bold sticky left-0 z-10 ${
                    theme === 'dark' ? 'text-white bg-[#111111]' : 'text-[#0a0a0a] bg-white'
                  }`}
                  style={{ borderRight: '1px solid rgba(255,215,0,0.1)' }}>
                    Feature
                  </th>
                  {toolsToCompare.map(tool => (
                    <th key={tool.id} className="p-6 min-w-[250px]">
                      <div className="flex flex-col items-center gap-3">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-4xl border ${
                          theme === 'dark'
                            ? 'bg-[#1a1a1a] border-[rgba(255,215,0,0.2)]'
                            : 'bg-[#f8f8f8] border-[rgba(184,134,11,0.2)]'
                        }`}>
                          {tool.logo}
                        </div>
                        <div className="text-center">
                          <div className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                            {tool.name}
                          </div>
                          <div className="text-sm text-[#FFD700]">{tool.pricing}</div>
                        </div>
                        
                         <a href={tool.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center border rounded-lg px-3 py-1 text-sm transition-all duration-300 ${
                            theme === 'dark'
                              ? 'border-[rgba(255,215,0,0.3)] text-[#FFD700] hover:bg-[rgba(255,215,0,0.1)]'
                              : 'border-[rgba(184,134,11,0.3)] text-[#B8860B] hover:bg-[rgba(184,134,11,0.1)]'
                          }`}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Visit
                        </a>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={row.label} className={`transition-all duration-200 ${
                    index % 2 === 0
                      ? theme === 'dark' ? 'bg-[#0f0f0f]' : 'bg-[#fafafa]'
                      : theme === 'dark' ? 'bg-[#111111]' : 'bg-white'
                  }`}>
                    <td className={`p-6 font-medium sticky left-0 z-10 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    } ${index % 2 === 0
                      ? theme === 'dark' ? 'bg-[#0f0f0f]' : 'bg-[#fafafa]'
                      : theme === 'dark' ? 'bg-[#111111]' : 'bg-white'
                    }`}
                    style={{ borderRight: '1px solid rgba(255,215,0,0.1)' }}>
                      {row.label}
                    </td>
                    {toolsToCompare.map((tool, toolIndex) => {
                      const isBest = row.compareValues.length > 0 &&
                        getBestValue(row.compareValues, row.compareValues[toolIndex]);

                      return (
                        <td
                          key={tool.id}
                          className={`p-6 transition-all duration-200 ${
                            isBest ? 'border-2 border-[rgba(255,215,0,0.4)]' : ''
                          }`}
                          style={isBest ? { background: 'rgba(255,215,0,0.05)' } : {}}
                        >
                          {row.getValue(tool)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`mb-4 text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            Values highlighted in gold indicate the best performance in each category
          </p>
          <Link
            to="/explore"
            className={`inline-flex items-center justify-center border rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105 ${
              theme === 'dark'
                ? 'border-[rgba(255,215,0,0.3)] text-[#FFD700] hover:bg-[rgba(255,215,0,0.1)]'
                : 'border-[rgba(184,134,11,0.3)] text-[#B8860B] hover:bg-[rgba(184,134,11,0.1)]'
            }`}
          >
            Add More Tools to Compare
          </Link>
        </div>
      </div>
    </div>
  );
}