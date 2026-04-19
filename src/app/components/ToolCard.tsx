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
  const safeLogo = tool.logo && typeof tool.logo === 'string' && !tool.logo.startsWith('http') 
    ? tool.logo 
    : '🤖';

  return (
    <div
      className={`relative rounded-2xl p-6 transition-all duration-500 cursor-pointer group card-hover ${
        theme === 'dark'
          ? 'bg-[#111111] border border-[rgba(255,215,0,0.15)] hover:border-[rgba(255,215,0,0.6)]'
          : 'bg-white border border-[rgba(184,134,11,0.2)] hover:border-[rgba(184,134,11,0.6)]'
      }`}
      style={{
        boxShadow: theme === 'dark'
          ? '0 4px 20px rgba(0,0,0,0.5)'
          : '0 4px 20px rgba(0,0,0,0.08)'
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = theme === 'dark'
          ? '0 8px 40px rgba(255,215,0,0.15)'
          : '0 8px 40px rgba(184,134,11,0.15)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = theme === 'dark'
          ? '0 4px 20px rgba(0,0,0,0.5)'
          : '0 4px 20px rgba(0,0,0,0.08)';
      }}
    >
      {/* Gold top border line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{ background: 'linear-gradient(90deg, #FFD700, #B8860B, #FFD700)' }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">

          {/* Logo */}
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-110 flex-shrink-0 ${
            theme === 'dark'
              ? 'bg-[#1a1a1a] border border-[rgba(255,215,0,0.2)]'
              : 'bg-[#f8f8f8] border border-[rgba(184,134,11,0.2)]'
          }`}>
            {safeLogo}
          </div>

          <div>
            <h3 className={`font-bold text-lg transition-all duration-300 group-hover:text-[#FFD700] ${
              theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'
            }`}>
              {tool.name ?? 'Unknown Tool'}
            </h3>

            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                <span className="text-sm font-bold text-[#FFD700]">
                  {safeRating.toFixed(1)}
                </span>
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
      {safeHumanEval > 0 || safeMbpp > 0 ? (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {safeHumanEval > 0 && (
            <div className={`rounded-xl p-3 border ${
              theme === 'dark'
                ? 'bg-[#1a1a1a] border-[rgba(255,215,0,0.1)]'
                : 'bg-[#f8f8f8] border-[rgba(184,134,11,0.1)]'
            }`}>
              <div className={`text-xs mb-1 flex items-center gap-1 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                <Zap className="w-3 h-3 text-[#FFD700]" />
                HumanEval
              </div>
              <div className="flex items-center gap-2">
                <div className="text-lg font-bold text-[#FFD700]">
                  {safeHumanEval}%
                </div>
                <TrendingUp className="w-4 h-4 text-[#FFD700]" />
              </div>
            </div>
          )}

          {safeMbpp > 0 && (
            <div className={`rounded-xl p-3 border ${
              theme === 'dark'
                ? 'bg-[#1a1a1a] border-[rgba(255,215,0,0.1)]'
                : 'bg-[#f8f8f8] border-[rgba(184,134,11,0.1)]'
            }`}>
              <div className={`text-xs mb-1 flex items-center gap-1 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                <Zap className="w-3 h-3 text-[#FFD700]" />
                MBPP
              </div>
              <div className="flex items-center gap-2">
                <div className="text-lg font-bold text-[#FFD700]">
                  {safeMbpp}%
                </div>
                <TrendingUp className="w-4 h-4 text-[#FFD700]" />
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {safeTags.slice(0, 3).map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className={`text-xs px-3 py-1 rounded-full border transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-[#1a1a1a] border-[rgba(255,215,0,0.2)] text-gray-400 hover:border-[#FFD700] hover:text-[#FFD700]'
                : 'bg-[#f8f8f8] border-[rgba(184,134,11,0.2)] text-gray-500 hover:border-[#B8860B] hover:text-[#B8860B]'
            }`}
          >
            {tag}
          </span>
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
            className={`rounded-xl border px-4 py-2.5 transition-all duration-300 ${
              isInComparison
                ? 'border-[#FFD700] text-black font-bold'
                : theme === 'dark'
                ? 'border-[rgba(255,215,0,0.3)] text-[#FFD700] hover:bg-[rgba(255,215,0,0.1)]'
                : 'border-[rgba(184,134,11,0.3)] text-[#B8860B] hover:bg-[rgba(184,134,11,0.1)]'
            }`}
            style={isInComparison ? {
              background: 'linear-gradient(135deg, #FFD700, #B8860B)'
            } : {}}
          >
            <GitCompare className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}