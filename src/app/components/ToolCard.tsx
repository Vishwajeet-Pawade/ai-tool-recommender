import { Link } from 'react-router';
import { AITool } from '../data/tools';
import { Star, TrendingUp, Eye, GitCompare, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ToolCardProps {
  tool: AITool;
  onCompare?: (toolId: string) => void;
  isInComparison?: boolean;
}

export function ToolCard({ tool, onCompare, isInComparison }: ToolCardProps) {
  const { theme } = useTheme();

  const safeReviews = typeof tool.reviews === 'number' ? tool.reviews : 0;
  const safeRating = typeof tool.rating === 'number' ? tool.rating : 0;
  const safeHumanEval = typeof tool.humanEval === 'number' ? tool.humanEval : 0;
  const safeMbpp = typeof tool.mbpp === 'number' ? tool.mbpp : 0;
  const safeTags = Array.isArray(tool.tags) ? tool.tags : [];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:border-blue-300">

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">

          {/* Logo */}
          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
            {tool.logo && tool.logo.startsWith('http') ? (
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = '<span style="font-size:1.5rem">🤖</span>';
                  }
                }}
              />
            ) : (
              <span className="text-3xl">{tool.logo || '🤖'}</span>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900">{tool.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{(tool.rating ?? 0).toFixed(1)}</span>
              </div>
              <span className={`text-xs ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                ({safeReviews.toLocaleString()} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Badge */}
        <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ml-2 ${
          tool.pricing === 'Free'
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : tool.pricing === 'Freemium'
            ? 'bg-[rgba(255,215,0,0.15)] text-[#FFD700] border border-[rgba(255,215,0,0.3)]'
            : tool.pricing === 'Paid'
            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
            : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
        }`}>
          {tool.pricing ?? 'Unknown'}
        </span>
      </div>

      {/* Description */}
      <p className={`text-sm mb-4 line-clamp-2 ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
      }`}>
        {tool.description ?? 'No description available'}
      </p>

      {/* Benchmark Scores */}
      {((tool.humanEval ?? 0) > 0 || (tool.mbpp ?? 0) > 0) && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {(tool.humanEval ?? 0) > 0 && (
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">HumanEval</div>
              <div className="flex items-center gap-2">
                <div className="text-lg font-bold text-blue-600">{tool.humanEval}%</div>
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          )}
          {(tool.mbpp ?? 0) > 0 && (
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">MBPP</div>
              <div className="flex items-center gap-2">
                <div className="text-lg font-bold text-purple-600">{tool.mbpp}%</div>
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(tool.tags ?? []).slice(0, 3).map((tag) => (
          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{tag}</span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Link to={`/tool/${tool.id}`} className="flex-1">
          <div className={`inline-flex items-center justify-center w-full rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 border ${
            theme === 'dark'
              ? 'border-[rgba(255,215,0,0.3)] text-[#FFD700] hover:bg-[rgba(255,215,0,0.1)]'
              : 'border-[rgba(184,134,11,0.3)] text-[#B8860B] hover:bg-[rgba(184,134,11,0.1)]'
          }`}>
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </div>
        </Link>
        {onCompare && (
          <button
            onClick={() => onCompare(tool.id)}
            className={`rounded-lg border-2 px-4 py-2 ${
              isInComparison ? 'bg-blue-600 text-white hover:bg-blue-700' : 'hover:bg-gray-50'
            }`}
          >
            <GitCompare className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}