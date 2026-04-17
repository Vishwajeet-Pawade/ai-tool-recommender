import { Sparkles, Target, Users, TrendingUp, Shield } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">About AI Tool Finder</h1>
          <p className="text-xl text-gray-600">
            Helping you discover the perfect AI tools for your needs
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            In today's rapidly evolving AI landscape, finding the right tool for your specific needs can be overwhelming. 
            With hundreds of AI platforms available, each claiming to be the best, making an informed decision requires 
            time and research.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            AI Tool Finder was created to simplify this process. We provide a comprehensive, unbiased platform where you 
            can discover, compare, and evaluate AI tools based on your specific requirements, budget, and technical expertise.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Filtering</h3>
            <p className="text-gray-700">
              Use our advanced filtering system to narrow down tools based on purpose, skill level, budget, 
              platform compatibility, and more.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Real Benchmarks</h3>
            <p className="text-gray-700">
              We provide actual performance metrics including HumanEval and MBPP scores, so you can make 
              data-driven decisions.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Community Driven</h3>
            <p className="text-gray-700">
              Our recommendations are based on real user reviews and ratings from thousands of developers, 
              designers, and creators.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Unbiased Reviews</h3>
            <p className="text-gray-700">
              We maintain independence from AI tool providers to ensure our recommendations and comparisons 
              remain objective and trustworthy.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">What We Cover</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold mb-1">Coding & Development</h4>
                <p className="text-sm text-gray-600">AI assistants, code completion, and debugging tools</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold mb-1">Content Creation</h4>
                <p className="text-sm text-gray-600">Writing, copywriting, and content generation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-pink-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold mb-1">Image Generation</h4>
                <p className="text-sm text-gray-600">Text-to-image and AI art creation tools</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold mb-1">Video Production</h4>
                <p className="text-sm text-gray-600">AI-powered video generation and editing</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold mb-1">Research & Analysis</h4>
                <p className="text-sm text-gray-600">Data analysis and research assistance tools</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold mb-1">Conversational AI</h4>
                <p className="text-sm text-gray-600">Chatbots and virtual assistants</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              12+
            </div>
            <div className="text-gray-700">AI Tools</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              50K+
            </div>
            <div className="text-gray-700">Users</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              7+
            </div>
            <div className="text-gray-700">Categories</div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-blue-100 mb-6">
            Have suggestions for tools we should add? Want to partner with us? We'd love to hear from you.
          </p>
          <div className="text-lg">
            <a href="mailto:hello@aitoolfinder.com" className="underline hover:text-blue-200">
              hello@aitoolfinder.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
