import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import type { AITool } from '../data/tools';
import { ArrowLeft, ExternalLink, Star, TrendingUp, Zap, Shield, Globe, Users, CheckCircle, XCircle, Code } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

export function ToolDetailsPage() {
  const { toolId } = useParams();
  const { theme } = useTheme();
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
          <div className={`rounded-2xl border p-12 text-center ${
            theme === 'dark'
              ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
              : 'bg-white border-[rgba(184,134,11,0.15)]'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
              Tool Not Found
            </h2>
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              The tool you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)', color: '#0a0a0a' }}
            >
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

        {/* Back Button */}
        <Link
          to="/explore"
          className={`inline-flex items-center gap-2 mb-6 px-3 py-2 rounded-lg transition-all duration-300 ${
            theme === 'dark'
              ? 'text-gray-400 hover:text-[#FFD700] hover:bg-[rgba(255,215,0,0.05)]'
              : 'text-gray-500 hover:text-[#B8860B] hover:bg-[rgba(184,134,11,0.05)]'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explore
        </Link>

        {/* Header */}
        <div className={`rounded-2xl border p-8 mb-6 ${
          theme === 'dark'
            ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
            : 'bg-white border-[rgba(184,134,11,0.15)]'
        }`}>
          <div className="h-1 rounded-full mb-6"
            style={{ background: 'linear-gradient(90deg, #FFD700, #B8860B, #FFD700)' }} />

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden border ${
              theme === 'dark'
                ? 'bg-[#1a1a1a] border-[rgba(255,215,0,0.2)]'
                : 'bg-[#f8f8f8] border-[rgba(184,134,11,0.2)]'
            }`}>
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
                
                <a href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all duration-300 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)', color: '#0a0a0a' }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Website
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
                  <span className="font-bold text-lg text-[#FFD700]">{tool.rating ?? 'N/A'}</span>
                  <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                    ({(tool.reviews ?? 0).toLocaleString()} reviews)
                  </span>
                </div>
                <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Users className="w-5 h-5" />
                  <span>Popularity: {tool.popularity ?? 'N/A'}</span>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  tool.pricing === 'Free'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : tool.pricing === 'Freemium'
                    ? 'bg-[rgba(255,215,0,0.15)] text-[#FFD700] border border-[rgba(255,215,0,0.3)]'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {tool.pricing ?? 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className={`flex flex-wrap gap-2 mt-6 pt-6 border-t ${
            theme === 'dark' ? 'border-[rgba(255,215,0,0.1)]' : 'border-[rgba(184,134,11,0.1)]'
          }`}>
            {(tool.tags ?? []).map(tag => (
              <span key={tag} className={`text-xs px-3 py-1 rounded-full border ${
                theme === 'dark'
                  ? 'bg-[#1a1a1a] border-[rgba(255,215,0,0.2)] text-gray-400'
                  : 'bg-[#f8f8f8] border-[rgba(184,134,11,0.2)] text-gray-500'
              }`}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Overview */}
        <div className={`rounded-2xl border p-8 mb-6 ${
          theme === 'dark'
            ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
            : 'bg-white border-[rgba(184,134,11,0.15)]'
        }`}>
          <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
            <span className="shimmer">Overview</span>
          </h2>
          <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {tool.detailedDescription ?? tool.description ?? 'No description available.'}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: <TrendingUp className="w-5 h-5 text-[#FFD700]" />, label: 'Accuracy', value: tool.accuracy ?? 'N/A' },
            { icon: <Zap className="w-5 h-5 text-[#FFD700]" />, label: 'Speed', value: tool.speed != null ? `${tool.speed}%` : 'N/A' },
            { icon: <Shield className="w-5 h-5 text-[#FFD700]" />, label: 'Privacy', value: tool.privacy ?? 'N/A' },
            { icon: <Globe className="w-5 h-5 text-[#FFD700]" />, label: 'Platforms', value: (tool.platforms ?? []).length || 'N/A' },
          ].map((metric, i) => (
            <div key={i} className={`rounded-xl p-6 border card-hover ${
              theme === 'dark'
                ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
                : 'bg-white border-[rgba(184,134,11,0.15)]'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                {metric.icon}
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {metric.label}
                </span>
              </div>
              <div className="text-xl font-bold text-[#FFD700]">{metric.value}</div>
            </div>
          ))}
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
                  <XAxis dataKey="name" stroke={theme === 'dark' ? '#888888' : '#999999'} />
                  <YAxis domain={[0, 100]} stroke={theme === 'dark' ? '#888888' : '#999999'} />
                  <Tooltip contentStyle={{
                    background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
                    border: '1px solid rgba(255,215,0,0.3)',
                    borderRadius: '8px',
                    color: theme === 'dark' ? '#ffffff' : '#0a0a0a'
                  }} />
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
            <h2 className="text-2xl font-bold mb-6 text-green-400">✅ Pros</h2>
            <ul className="space-y-3">
              {(tool.pros ?? []).map((pro, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`rounded-2xl border p-8 ${
            theme === 'dark'
              ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
              : 'bg-white border-[rgba(184,134,11,0.15)]'
          }`}>
            <h2 className="text-2xl font-bold mb-6 text-red-400">❌ Cons</h2>
            <ul className="space-y-3">
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
        <div className={`rounded-2xl border p-8 mb-6 ${
          theme === 'dark'
            ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
            : 'bg-white border-[rgba(184,134,11,0.15)]'
        }`}>
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
            <span className="shimmer">Technical Details</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className={`font-bold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                <Globe className="w-5 h-5 text-[#FFD700]" />
                Supported Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {(tool.platforms ?? []).map(p => (
                  <span key={p} className={`text-xs px-3 py-1 rounded-full border ${
                    theme === 'dark'
                      ? 'border-[rgba(255,215,0,0.2)] text-gray-400'
                      : 'border-[rgba(184,134,11,0.2)] text-gray-500'
                  }`}>{p}</span>
                ))}
              </div>
            </div>

            {(tool.languages ?? []).length > 0 && (
              <div>
                <h3 className={`font-bold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                  <Code className="w-5 h-5 text-[#FFD700]" />
                  Programming Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(tool.languages ?? []).map(l => (
                    <span key={l} className={`text-xs px-3 py-1 rounded-full border ${
                      theme === 'dark'
                        ? 'border-[rgba(255,215,0,0.2)] text-gray-400'
                        : 'border-[rgba(184,134,11,0.2)] text-gray-500'
                    }`}>{l}</span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className={`font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                Skill Level
              </h3>
              <div className="flex flex-wrap gap-2">
                {(tool.skillLevel ?? []).map(s => (
                  <span key={s} className={`text-xs px-3 py-1 rounded-full border ${
                    theme === 'dark'
                      ? 'bg-[rgba(255,215,0,0.1)] border-[rgba(255,215,0,0.2)] text-[#FFD700]'
                      : 'bg-[rgba(184,134,11,0.1)] border-[rgba(184,134,11,0.2)] text-[#B8860B]'
                  }`}>{s}</span>
                ))}
              </div>
            </div>

            {(tool.ideIntegration ?? []).length > 0 && (
              <div>
                <h3 className={`font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                  IDE Integration
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(tool.ideIntegration ?? []).map(i => (
                    <span key={i} className={`text-xs px-3 py-1 rounded-full border ${
                      theme === 'dark'
                        ? 'bg-[rgba(255,215,0,0.1)] border-[rgba(255,215,0,0.2)] text-[#FFD700]'
                        : 'bg-[rgba(184,134,11,0.1)] border-[rgba(184,134,11,0.2)] text-[#B8860B]'
                    }`}>{i}</span>
                  ))}
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
              <div key={purpose} className="px-6 py-3 rounded-xl border transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(255,215,0,0.1)',
                  borderColor: 'rgba(255,215,0,0.3)',
                  color: '#FFD700'
                }}>
                <span className="font-medium">{purpose}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}