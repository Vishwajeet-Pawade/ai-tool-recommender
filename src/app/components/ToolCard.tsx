import { Link } from 'react-router';
import { AITool } from '../data/tools';
import { Star, TrendingUp, Eye, GitCompare } from 'lucide-react';
import { Badge } from './ui/badge';

interface ToolCardProps {
  tool: AITool;
  onCompare?: (toolId: string) => void;
  isInComparison?: boolean;
}

export function ToolCard({ tool, onCompare, isInComparison }: ToolCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:border-blue-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-3xl">
            {tool.logo}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{tool.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{tool.rating || 0}</span>
              </div>
              <span className="text-sm text-gray-500">({(tool.reviews || 0).toLocaleString()} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tool.description}</p>

      {/* Benchmark Scores */}
      {((tool.humanEval || 0) > 0 || (tool.mbpp || 0) > 0) && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {(tool.humanEval || 0) > 0 && (
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">HumanEval</div>
              <div className="flex items-center gap-2">
                <div className="text-lg font-bold text-blue-600">{tool.humanEval}%</div>
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          )}
          {(tool.mbpp || 0) > 0 && (
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
        {(tool.tags || []).slice(0, 3).map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Link to={`/tool/${tool.id}`} className="flex-1">
          <div className="inline-flex items-center justify-center w-full rounded-lg border-2 hover:bg-gray-50 px-4 py-2">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </div>
        </Link>
        {onCompare && (
          <button
            onClick={() => onCompare(tool.id)}
            className={`rounded-lg border-2 px-4 py-2 ${isInComparison ? 'bg-blue-600 text-white hover:bg-blue-700' : 'hover:bg-gray-50'}`}
          >
            <GitCompare className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}