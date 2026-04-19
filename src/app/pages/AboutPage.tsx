import { Sparkles, Target, Users, TrendingUp, Shield, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function AboutPage() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#f8f8f8]'
    }`}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
            style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)' }}>
            <Sparkles className="w-10 h-10 text-black" />
          </div>
          <h1 className={`text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
            About <span className="shimmer">AI Tool Finder</span>
          </h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
            Helping you discover the perfect AI tools for your needs
          </p>
        </div>

        {/* Mission */}
        <div className={`rounded-2xl border p-8 mb-8 card-hover ${
          theme === 'dark'
            ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
            : 'bg-white border-[rgba(184,134,11,0.15)]'
        }`}>
          <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
            Our <span className="shimmer">Mission</span>
          </h2>
          <p className={`text-lg leading-relaxed mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            In today's rapidly evolving AI landscape, finding the right tool for your specific needs can be overwhelming.
            With hundreds of AI platforms available, each claiming to be the best, making an informed decision requires
            time and research.
          </p>
          <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            AI Tool Finder was created to simplify this process. We provide a comprehensive, unbiased platform where you
            can discover, compare, and evaluate AI tools based on your specific requirements, budget, and technical expertise.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            {
              icon: <Target className="w-6 h-6 text-black" />,
              title: 'Smart Filtering',
              desc: 'Use our advanced AI-powered filtering system to narrow down tools based on purpose, skill level, budget, platform compatibility, and more.'
            },
            {
              icon: <TrendingUp className="w-6 h-6 text-black" />,
              title: 'Real Benchmarks',
              desc: 'We provide actual performance metrics including HumanEval and MBPP scores, so you can make data-driven decisions.'
            },
            {
              icon: <Users className="w-6 h-6 text-black" />,
              title: 'Community Driven',
              desc: 'Our recommendations are based on real user reviews and ratings from thousands of developers, designers, and creators.'
            },
            {
              icon: <Shield className="w-6 h-6 text-black" />,
              title: 'Unbiased Reviews',
              desc: 'We maintain independence from AI tool providers to ensure our recommendations and comparisons remain objective and trustworthy.'
            }
          ].map((feature, i) => (
            <div key={i} className={`rounded-2xl p-8 border card-hover transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-[#111111] border-[rgba(255,215,0,0.15)] hover:border-[rgba(255,215,0,0.4)]'
                : 'bg-white border-[rgba(184,134,11,0.15)] hover:border-[rgba(184,134,11,0.4)]'
            }`}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)' }}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                {feature.title}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className={`rounded-2xl border p-8 mb-8 ${
          theme === 'dark'
            ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
            : 'bg-white border-[rgba(184,134,11,0.15)]'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
            What We <span className="shimmer">Cover</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Coding & Development', desc: 'AI assistants, code completion, and debugging tools' },
              { label: 'Content Creation', desc: 'Writing, copywriting, and content generation' },
              { label: 'Image Generation', desc: 'Text-to-image and AI art creation tools' },
              { label: 'Video Production', desc: 'AI-powered video generation and editing' },
              { label: 'Research & Analysis', desc: 'Data analysis and research assistance tools' },
              { label: 'Conversational AI', desc: 'Chatbots and virtual assistants' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ background: '#FFD700' }} />
                <div>
                  <h4 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                    {item.label}
                  </h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { value: '76+', label: 'AI Tools' },
            { value: '50K+', label: 'Users' },
            { value: '7+', label: 'Categories' },
          ].map((stat, i) => (
            <div key={i} className={`rounded-2xl p-6 text-center border card-hover ${
              theme === 'dark'
                ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
                : 'bg-white border-[rgba(184,134,11,0.15)]'
            }`}>
              <div className="text-4xl font-bold shimmer mb-2">
                {stat.value}
              </div>
              <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="rounded-2xl p-8 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a1500, #0a0a0a, #1a1500)' }}>
          <div className="absolute inset-0 opacity-10"
            style={{ background: 'radial-gradient(circle at 50% 50%, #FFD700, transparent 70%)' }} />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)' }}>
              <Mail className="w-7 h-7 text-black" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Get In <span className="shimmer">Touch</span>
            </h2>
            <p className="text-gray-400 mb-6">
              Have suggestions for tools we should add? Want to partner with us? We'd love to hear from you.
            </p>
            
             <a href="mailto:hello@aitoolfinder.com"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)', color: '#0a0a0a' }}
            >
              hello@aitoolfinder.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}