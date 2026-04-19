import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import type { AITool } from '../data/tools';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, ExternalLink, Star, TrendingUp, Zap, Shield, Globe, Users, CheckCircle, XCircle, Code } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function ToolDetailsPage() {
  const { toolId } = useParams();
  const [aiTools, setAiTools] = useState<AITool[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/tools")
      .then(res => res.json())
      .then(data => setAiTools(data));
  }, []);

  const tool = aiTools.find(t => t.id === toolId);

  if (!tool) {
    return (
      <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${
        theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#f8f8f8]'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Tool Not Found</h2>
            <p className="text-gray-600 mb-6">The tool you're looking for doesn't exist or has been removed.</p>
            <Link to="/explore" className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-4 py-2 font-medium">
              Back to Explore
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const benchmarkData = [
    { name: 'HumanEval', score: tool.humanEval ?? 0, average: 45 },
    { name: 'MBPP', score: tool.mbpp ?? 0, average: 50 },
    { name: 'Speed', score: tool.speed ?? 0, average: 75 },
    { name: 'Popularity', score: tool.popularity ?? 0, average: 70 },
  ].filter(item => item.score > 0);

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#f8f8f8]'
    }`}>
      <div className="max-w-6xl mx-auto">

        <Link to="/explore" className="inline-flex items-center gap-2 mb-6 hover:bg-gray-100 rounded-lg px-3 py-2 text-gray-700">
          <ArrowLeft className="w-4 h-4" />
          Back to Explore
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">

            {/* Logo */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden">
              {tool.logo && tool.logo.startsWith('http') ? (
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-full h-full object-contain rounded-2xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = '<span style="font-size:2rem">🤖</span>';
                    }
                  }}
                />
              ) : (
                <span className="text-4xl">{tool.logo || '🤖'}</span>
              )}
            </div>


            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                    {tool.name}
                  </h1>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                    {tool.description}
                  </p>
                </div>
                <a href={tool.website} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-4 py-2 whitespace-nowrap font-medium">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Website
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-lg">{tool.rating ?? 'N/A'}</span>
                  <span className="text-gray-600">({(tool.reviews ?? 0).toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">Popularity: {tool.popularity ?? 'N/A'}</span>
                </div>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">{tool.pricing ?? 'N/A'}</Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
            {(tool.tags ?? []).map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
          </div>
        </div>

        {/* Overview */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed">{tool.detailedDescription ?? tool.description ?? 'No description available.'}</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-700">Accuracy</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{tool.accuracy ?? 'N/A'}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-700">Speed</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">{tool.speed != null ? `${tool.speed}%` : 'N/A'}</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">Privacy</span>
            </div>
            <div className="text-lg font-bold text-green-600">{tool.privacy ?? 'N/A'}</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-gray-700">Platforms</span>
            </div>
            <div className="text-lg font-bold text-orange-600">
              {(tool.platforms ?? []).length > 0 ? (tool.platforms ?? []).join(', ') : 'N/A'}
            </div>
          </div>
        </div>

        {/* Benchmarks */}
        {benchmarkData.length > 0 && (
          <div className={`rounded-2xl border p-8 mb-6 ${
            theme === 'dark'
              ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
              : 'bg-white border-[rgba(184,134,11,0.15)]'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
              <span className="shimmer">Performance Benchmarks</span>
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchmarkData}>
                  <CartesianGrid strokeDasharray="3 3"
                    stroke={theme === 'dark' ? 'rgba(255,215,0,0.05)' : 'rgba(0,0,0,0.05)'} />
                  <XAxis dataKey="name"
                    stroke={theme === 'dark' ? '#888888' : '#999999'} />
                  <YAxis domain={[0, 100]}
                    stroke={theme === 'dark' ? '#888888' : '#999999'} />
                  <Tooltip
                    contentStyle={{
                      background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
                      border: '1px solid rgba(255,215,0,0.3)',
                      borderRadius: '8px',
                      color: theme === 'dark' ? '#ffffff' : '#0a0a0a'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="score" fill="#FFD700" name={tool.name} radius={[8, 8, 0, 0]} />
                  <Bar dataKey="average" fill="#333333" name="Industry Average" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Pros and Cons */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className={`rounded-2xl border p-8 ${
            theme === 'dark'
              ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
              : 'bg-white border-[rgba(184,134,11,0.15)]'
          }`}>
            <h2 className="text-2xl font-bold mb-6 text-green-400">
              ✅ Pros
            </h2>
            <ul className="space-y-3">
              {(tool.pros ?? []).map((pro, index) => (
              {(tool.pros ?? []).map((pro, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-6 text-red-600">Cons</h2>
            <ul className="space-y-3">
              {(tool.cons ?? []).map((con, index) => (
              {(tool.cons ?? []).map((con, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6">Technical Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />Supported Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {(tool.platforms ?? []).map(p => <Badge key={p} variant="outline">{p}</Badge>)}
              </div>
            </div>
            {(tool.languages ?? []).length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />Programming Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(tool.languages ?? []).map(l => <Badge key={l} variant="outline">{l}</Badge>)}
                </div>
              </div>
            )}
            <div>
              <h3 className={`font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                Skill Level
              </h3>
              <div className="flex flex-wrap gap-2">
                {(tool.skillLevel ?? []).map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
              </div>
            </div>
            {(tool.ideIntegration ?? []).length > 0 && (
              <div>
                <h3 className={`font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                  IDE Integration
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(tool.ideIntegration ?? []).map(i => <Badge key={i} variant="secondary">{i}</Badge>)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Best For */}
        <div className={`rounded-2xl border p-8 ${
          theme === 'dark'
            ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
            : 'bg-white border-[rgba(184,134,11,0.15)]'
        }`}>
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
            <span className="shimmer">Best For</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {(tool.purposes ?? []).map(purpose => (
              <div key={purpose} className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl px-6 py-3">
                <span className="font-medium text-blue-900">{purpose}</span>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
}