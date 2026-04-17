import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, ExternalLink, Star, TrendingUp, Check, X } from 'lucide-react';

export function ComparisonPage() {

  const [searchParams] = useSearchParams();
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [aiTools, setAiTools] = useState<any[]>([]);

  useEffect(() => {
    const toolsParam = searchParams.get('tools');
    if (toolsParam) {
      setSelectedTools(toolsParam.split(','));
    }
  }, [searchParams]);

  useEffect(() => {
    fetch("http://localhost:5000/tools")
      .then(res => res.json())
      .then(data => setAiTools(data));
  }, []);

  const toolsToCompare = aiTools.filter(tool =>
    selectedTools.includes(tool.id)
  );
  if (toolsToCompare.length === 0) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">No Tools Selected</h2>
            <p className="text-gray-600 mb-6">
              Please select tools from the explore page to compare them.
            </p>
            <Link 
              to="/explore"
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-4 py-2 font-medium"
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
      getValue: (tool: typeof toolsToCompare[0]) => (
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{tool.rating}</span>
        </div>
      ),
      compareValues: toolsToCompare.map(t => t.rating)
    },
    {
      label: 'HumanEval Score',
      getValue: (tool: typeof toolsToCompare[0]) => 
        tool.humanEval > 0 ? `${tool.humanEval}%` : 'N/A',
      compareValues: toolsToCompare.map(t => t.humanEval)
    },
    {
      label: 'MBPP Score',
      getValue: (tool: typeof toolsToCompare[0]) => 
        tool.mbpp > 0 ? `${tool.mbpp}%` : 'N/A',
      compareValues: toolsToCompare.map(t => t.mbpp)
    },
    {
      label: 'Speed',
      getValue: (tool: typeof toolsToCompare[0]) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${tool.speed}%` }}
            />
          </div>
          <span className="text-sm font-medium">{tool.speed}%</span>
        </div>
      ),
      compareValues: toolsToCompare.map(t => t.speed)
    },
    {
      label: 'Popularity',
      getValue: (tool: typeof toolsToCompare[0]) => (
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="font-medium">{tool.popularity}%</span>
        </div>
      ),
      compareValues: toolsToCompare.map(t => t.popularity)
    },
    {
      label: 'Pricing',
      getValue: (tool: typeof toolsToCompare[0]) => (
        <Badge variant="secondary">{tool.pricing}</Badge>
      ),
      compareValues: []
    },
    {
      label: 'Accuracy Level',
      getValue: (tool: typeof toolsToCompare[0]) => tool.accuracy,
      compareValues: []
    },
    {
      label: 'Privacy',
      getValue: (tool: typeof toolsToCompare[0]) => (
        <Badge variant="outline">{tool.privacy}</Badge>
      ),
      compareValues: []
    },
    {
      label: 'Platforms',
      getValue: (tool: typeof toolsToCompare[0]) => (
        <div className="flex flex-wrap gap-1">
          {tool.platforms.map((platform: string) => (
            <Badge key={platform} variant="secondary" className="text-xs">
              {platform}
            </Badge>
          ))}
        </div>
      ),
      compareValues: []
    },
    {
      label: 'Languages',
      getValue: (tool: typeof toolsToCompare[0]) => (
        <div className="flex flex-wrap gap-1">
          {tool.languages.length > 0 ? (
            tool.languages.slice(0, 3).map((lang: string) => (
              <Badge key={lang} variant="outline" className="text-xs">
                {lang}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-gray-500">N/A</span>
          )}
        </div>
      ),
      compareValues: []
    },
    {
      label: 'IDE Integration',
      getValue: (tool: typeof toolsToCompare[0]) => (
        tool.ideIntegration.length > 0 ? (
          <div className="flex items-center gap-1">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm">{tool.ideIntegration.join(', ')}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <X className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">None</span>
          </div>
        )
      ),
      compareValues: []
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/explore" 
            className="inline-flex items-center gap-2 mb-4 hover:bg-gray-100 rounded-lg px-3 py-2 text-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>
          <h1 className="text-3xl font-bold mb-2">Compare AI Tools</h1>
          <p className="text-gray-600">Side-by-side comparison of {toolsToCompare.length} tools</p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <th className="text-left p-6 font-semibold text-gray-900 sticky left-0 bg-gradient-to-r from-blue-50 to-purple-50 z-10">
                    Feature
                  </th>
                  {toolsToCompare.map(tool => (
                    <th key={tool.id} className="p-6 min-w-[250px]">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-4xl">
                          {tool.logo}
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg text-gray-900">{tool.name}</div>
                          <div className="text-sm text-gray-600">{tool.pricing}</div>
                        </div>
                        <a 
                          href={tool.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center border rounded-lg px-3 py-1 text-sm hover:bg-gray-50"
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
                  <tr key={row.label} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-6 font-medium text-gray-900 sticky left-0 bg-inherit z-10 border-r border-gray-200">
                      {row.label}
                    </td>
                    {toolsToCompare.map((tool, toolIndex) => {
                      const isBest = row.compareValues.length > 0 && 
                        getBestValue(row.compareValues, row.compareValues[toolIndex]);
                      
                      return (
                        <td 
                          key={tool.id} 
                          className={`p-6 ${isBest ? 'bg-green-50 border-2 border-green-200' : ''}`}
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
          <p className="text-gray-600 mb-4">
            Values highlighted in green indicate the best performance in each category
          </p>
          <Link 
            to="/explore" 
            className="inline-flex items-center justify-center border rounded-xl px-4 py-2 hover:bg-gray-50"
          >
            Add More Tools to Compare
          </Link>
        </div>
      </div>
    </div>
  );
}