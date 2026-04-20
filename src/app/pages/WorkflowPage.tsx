import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import { useTheme } from '../../context/ThemeContext';
import { ArrowLeft, Bot, Sparkles, ChevronRight, Star, Eye } from 'lucide-react';

interface WorkflowTool {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  reviews: number;
  pricing: string;
  purposes: string[];
  tags: string[];
}

interface WorkflowStep {
  step: string;
  tools: WorkflowTool[];
}

export function WorkflowPage() {
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [workflow, setWorkflow] = useState<WorkflowStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  useEffect(() => {
    if (!query) return;
    fetchWorkflow();
  }, [query]);

  const fetchWorkflow = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setWorkflow(data.workflow || []);
      // Auto expand first step
      if (data.workflow?.length > 0) setExpandedStep(0);
    } catch (err: any) {
      setError('Failed to generate workflow. Please try again.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#f8f8f8]'
    }`}>
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <Link to="/explore"
          className={`inline-flex items-center gap-2 mb-6 px-3 py-2 rounded-lg transition-all duration-300 ${
            theme === 'dark'
              ? 'text-gray-400 hover:text-[#FFD700] hover:bg-[rgba(255,215,0,0.05)]'
              : 'text-gray-500 hover:text-[#B8860B] hover:bg-[rgba(184,134,11,0.05)]'
          }`}>
          <ArrowLeft className="w-4 h-4" />
          Back to Explore
        </Link>

        {/* Header */}
        <div className="mb-10 fade-in-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)' }}>
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                AI <span className="shimmer">Workflow</span>
              </h1>
              <p className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                Step-by-step workflow for: <span className="text-[#FFD700] font-medium">"{query}"</span>
              </p>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)' }}>
              <Bot className="w-8 h-8 text-black animate-pulse" />
            </div>
            <p className="text-[#FFD700] font-medium text-lg">AI is generating your workflow...</p>
            <p className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
              Finding the best tools for each step
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-5 rounded-xl border text-center"
            style={{ background: 'rgba(255,50,50,0.05)', borderColor: 'rgba(255,50,50,0.2)' }}>
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={fetchWorkflow}
              className="px-6 py-2 rounded-xl font-bold transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)', color: '#0a0a0a' }}>
              Try Again
            </button>
          </div>
        )}

        {/* Workflow Steps */}
        {!loading && workflow.length > 0 && (
          <div className="space-y-4">

            {/* Flow diagram — top */}
            <div className={`p-5 rounded-2xl border mb-8 ${
              theme === 'dark'
                ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
                : 'bg-white border-[rgba(184,134,11,0.15)]'
            }`}>
              <p className={`text-xs mb-3 font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                WORKFLOW OVERVIEW
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {workflow.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <button
                      onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                        expandedStep === index
                          ? 'text-black border-[#FFD700]'
                          : theme === 'dark'
                          ? 'border-[rgba(255,215,0,0.3)] text-[#FFD700] hover:bg-[rgba(255,215,0,0.1)]'
                          : 'border-[rgba(184,134,11,0.3)] text-[#B8860B] hover:bg-[rgba(184,134,11,0.1)]'
                      }`}
                      style={expandedStep === index ? {
                        background: 'linear-gradient(135deg, #FFD700, #B8860B)'
                      } : {}}>
                      {index + 1}. {item.step}
                    </button>
                    {index < workflow.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Each Step Detail */}
            {workflow.map((item, index) => (
              <div key={index} className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
                  : 'bg-white border-[rgba(184,134,11,0.15)]'
              }`}>

                {/* Step Header — clickable */}
                <button
                  onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between transition-all duration-300 hover:bg-[rgba(255,215,0,0.03)]">
                  <div className="flex items-center gap-4">
                    {/* Step number */}
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-black font-bold flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)' }}>
                      {index + 1}
                    </div>
                    <div className="text-left">
                      <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                        {item.step}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                        {item.tools.length} tools available
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-[#FFD700] transition-transform duration-300 ${
                    expandedStep === index ? 'rotate-90' : ''
                  }`} />
                </button>

                {/* Tools — shown when expanded */}
                {expandedStep === index && (
                  <div className={`px-6 pb-6 border-t ${
                    theme === 'dark' ? 'border-[rgba(255,215,0,0.1)]' : 'border-[rgba(184,134,11,0.1)]'
                  }`}>
                    {item.tools.length === 0 ? (
                      <p className={`pt-4 text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                        No specific tools found for this step in our database.
                      </p>
                    ) : (
                      <div className="grid md:grid-cols-3 gap-4 pt-4">
                        {item.tools.map((tool, toolIndex) => (
                          <div key={tool.id}
                            className={`relative rounded-xl border p-4 transition-all duration-300 hover:scale-[1.02] ${
                              theme === 'dark'
                                ? 'bg-[#1a1a1a] border-[rgba(255,215,0,0.15)] hover:border-[rgba(255,215,0,0.4)]'
                                : 'bg-[#f8f8f8] border-[rgba(184,134,11,0.15)] hover:border-[rgba(184,134,11,0.4)]'
                            }`}>

                            {/* Rank badge */}
                            <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-black text-xs font-bold"
                              style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)' }}>
                              {toolIndex + 1}
                            </div>

                            {/* Tool logo + name */}
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 border ${
                                theme === 'dark'
                                  ? 'bg-[#111111] border-[rgba(255,215,0,0.2)]'
                                  : 'bg-white border-[rgba(184,134,11,0.2)]'
                              }`}>
                                {tool.logo && tool.logo.startsWith('http') ? (
                                  <img src={tool.logo} alt={tool.name}
                                    className="w-full h-full object-contain"
                                    onError={e => {
                                      const t = e.target as HTMLImageElement;
                                      t.style.display = 'none';
                                      if (t.parentElement) t.parentElement.innerHTML = '<span style="font-size:1.2rem">🤖</span>';
                                    }} />
                                ) : (
                                  <span className="text-xl">{tool.logo || '🤖'}</span>
                                )}
                              </div>
                              <div>
                                <h4 className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                                  {tool.name}
                                </h4>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-[#FFD700] text-[#FFD700]" />
                                  <span className="text-xs text-[#FFD700] font-medium">
                                    {(tool.rating || 0).toFixed(1)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            <p className={`text-xs mb-3 line-clamp-2 ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {tool.description || 'No description available'}
                            </p>

                            {/* Pricing + View */}
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                tool.pricing === 'Free'
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                  : tool.pricing === 'Freemium'
                                  ? 'bg-[rgba(255,215,0,0.15)] text-[#FFD700] border border-[rgba(255,215,0,0.3)]'
                                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
                              }`}>
                                {tool.pricing || 'N/A'}
                              </span>
                              <Link to={`/tool/${tool.id}`}
                                className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-lg border transition-all duration-300 ${
                                  theme === 'dark'
                                    ? 'border-[rgba(255,215,0,0.3)] text-[#FFD700] hover:bg-[rgba(255,215,0,0.1)]'
                                    : 'border-[rgba(184,134,11,0.3)] text-[#B8860B] hover:bg-[rgba(184,134,11,0.1)]'
                                }`}>
                                <Eye className="w-3 h-3" />
                                View
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && workflow.length === 0 && query && (
          <div className={`rounded-2xl border p-12 text-center ${
            theme === 'dark'
              ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
              : 'bg-white border-[rgba(184,134,11,0.15)]'
          }`}>
            <Sparkles className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
              No workflow generated
            </h3>
            <button onClick={fetchWorkflow}
              className="px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)', color: '#0a0a0a' }}>
              Generate Workflow
            </button>
          </div>
        )}

      </div>
    </div>
  );
}