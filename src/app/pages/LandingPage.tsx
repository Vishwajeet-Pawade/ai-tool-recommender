import { Link } from 'react-router';
import { Sparkles, Zap, Shield, TrendingUp, Code, Pencil, Image, Video } from 'lucide-react';

export function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Discover AI Tools Made Easy</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Find the Perfect{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Tool
                </span>{' '}
                for Your Task
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Use smart filters to discover the best AI tools for coding, writing, design, and more. 
                Compare features, pricing, and performance in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/explore" 
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all font-medium"
                >
                  Start Recommendation
                </Link>
                <Link 
                  to="/compare" 
                  className="inline-flex items-center justify-center px-8 py-6 text-lg rounded-xl border-2 hover:bg-gray-50 font-medium"
                >
                  Compare Tools
                </Link>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">50,000+ users</div>
                    <div className="text-gray-600">trust our recommendations</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1616161560065-4bbfa1103fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwQUklMjBkaWdpdGFsfGVufDF8fHx8MTc3MzIzMjM0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                  alt="AI Technology" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">98% Match</div>
                    <div className="text-sm text-gray-600">Accuracy Rate</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold">12+ Tools</div>
                    <div className="text-sm text-gray-600">AI Platforms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose AI Tool Finder?</h2>
            <p className="text-xl text-gray-600">Smart filtering to match your exact needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Smart Filtering</h3>
              <p className="text-gray-700">
                Filter by purpose, skill level, budget, and more to find tools that perfectly match your requirements.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Detailed Comparisons</h3>
              <p className="text-gray-700">
                Compare features, pricing, benchmarks, and user ratings side-by-side to make informed decisions.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-pink-600 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Real Benchmarks</h3>
              <p className="text-gray-700">
                See actual performance metrics like HumanEval and MBPP scores to understand tool capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Find AI Tools for Any Task</h2>
            <p className="text-xl text-gray-600">Discover specialized tools for your specific needs</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Coding</h4>
              <p className="text-sm text-gray-600">AI assistants for programming and development</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Pencil className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Writing</h4>
              <p className="text-sm text-gray-600">Content creation and copywriting tools</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-pink-300 hover:shadow-lg transition-all cursor-pointer">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Image className="w-6 h-6 text-pink-600" />
              </div>
              <h4 className="font-semibold mb-2">Image Generation</h4>
              <p className="text-sm text-gray-600">Create stunning visuals from text</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-green-300 hover:shadow-lg transition-all cursor-pointer">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Video Generation</h4>
              <p className="text-sm text-gray-600">AI-powered video creation and editing</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Find Your Perfect AI Tool?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Start exploring our curated collection and discover tools that will transform your workflow.
          </p>
          <Link 
            to="/explore" 
            className="inline-flex items-center justify-center bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-lg font-medium"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}