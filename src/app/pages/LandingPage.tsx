import { Link } from 'react-router';
import { Sparkles, Zap, Shield, TrendingUp, Code, Pencil, Image, Video, Star, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useEffect, useRef, useState } from 'react';

// Particle component
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full opacity-30"
          style={{
            background: '#FFD700',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `particle ${3 + Math.random() * 5}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

// Animated counter
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref}>{count.toLocaleString()}{suffix}</div>;
}

export function LandingPage() {
  const { theme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#f8f8f8]'}>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-20"
          >
            <source src="https://cdn.pixabay.com/video/2022/10/18/135408-762572612_large.mp4" type="video/mp4" />
          </video>
          <div className={`absolute inset-0 ${
            theme === 'dark'
              ? 'bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/60 to-[#0a0a0a]'
              : 'bg-gradient-to-b from-[#f8f8f8]/80 via-[#f8f8f8]/60 to-[#f8f8f8]'
          }`} />
        </div>

        {/* Particles */}
        <Particles />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 fade-in-up">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
                style={{
                  background: 'rgba(255,215,0,0.1)',
                  borderColor: 'rgba(255,215,0,0.3)',
                  color: '#FFD700'
                }}>
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Tool Discovery</span>
              </div>

              {/* Heading */}
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight ${
                theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'
              }`}>
                Find the Perfect{' '}
                <span className="shimmer">AI Tool</span>
                {' '}for Your Task
              </h1>

              <p className={`text-xl leading-relaxed ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Use smart AI-powered filters to discover the best tools for coding, writing, design, and more.
                Compare features, pricing, and performance in one place.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/explore"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-xl font-bold transition-all duration-300 hover:scale-105 pulse-gold"
                  style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)', color: '#0a0a0a' }}
                >
                  Start Exploring
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/compare"
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-xl font-medium border transition-all duration-300 hover:scale-105 ${
                    theme === 'dark'
                      ? 'border-[rgba(255,215,0,0.3)] text-[#FFD700] hover:bg-[rgba(255,215,0,0.1)]'
                      : 'border-[rgba(184,134,11,0.3)] text-[#B8860B] hover:bg-[rgba(184,134,11,0.1)]'
                  }`}
                >
                  Compare Tools
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FFD700]">
                    <Counter target={76} suffix="+" />
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    AI Tools
                  </div>
                </div>
                <div className={`w-px h-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`} />
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FFD700]">
                    <Counter target={50000} suffix="+" />
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Happy Users
                  </div>
                </div>
                <div className={`w-px h-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`} />
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FFD700]">
                    <Counter target={98} suffix="%" />
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Accuracy
                  </div>
                </div>
              </div>
            </div>

            {/* Right side — floating cards */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-96">

                {/* Main card */}
                <div className={`absolute top-0 right-0 w-72 rounded-2xl p-6 border float ${
                  theme === 'dark'
                    ? 'bg-[#111111] border-[rgba(255,215,0,0.2)]'
                    : 'bg-white border-[rgba(184,134,11,0.2)]'
                }`}
                style={{ boxShadow: '0 20px 60px rgba(255,215,0,0.1)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)' }}>
                      🤖
                    </div>
                    <div>
                      <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                        GitHub Copilot
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#FFD700] text-[#FFD700]" />
                        <span className="text-xs text-[#FFD700]">4.8</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className={`rounded-lg p-2 text-center ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                      <div className="text-sm font-bold text-[#FFD700]">47.3%</div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>HumanEval</div>
                    </div>
                    <div className={`rounded-lg p-2 text-center ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
                      <div className="text-sm font-bold text-[#FFD700]">58.2%</div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>MBPP</div>
                    </div>
                  </div>
                </div>

                {/* AI Recommendation card */}
                <div className={`absolute bottom-0 left-0 w-64 rounded-2xl p-4 border ${
                  theme === 'dark'
                    ? 'bg-[#111111] border-[rgba(255,215,0,0.2)]'
                    : 'bg-white border-[rgba(184,134,11,0.2)]'
                }`}
                style={{
                  boxShadow: '0 20px 60px rgba(255,215,0,0.1)',
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: '1.5s'
                }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)' }}>
                      <Sparkles className="w-4 h-4 text-black" />
                    </div>
                    <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
                      AI Ranked
                    </span>
                  </div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    LLaMA ranks tools based on your exact needs from our database
                  </p>
                </div>

                {/* Match card */}
                <div className="absolute top-32 left-4 rounded-xl p-3 border"
                  style={{
                    background: 'rgba(255,215,0,0.1)',
                    borderColor: 'rgba(255,215,0,0.3)',
                    animation: 'float 3s ease-in-out infinite',
                    animationDelay: '0.8s'
                  }}>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#FFD700]" />
                    <div>
                      <div className="text-sm font-bold text-[#FFD700]">98% Match</div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Accuracy</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${
        theme === 'dark' ? 'bg-[#0d0d0d]' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
              Why Choose <span className="shimmer">AI Tool Finder?</span>
            </h2>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
              Smart AI-powered filtering to match your exact needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-7 h-7 text-black" />,
                title: 'Smart AI Filtering',
                desc: 'LLaMA AI understands your needs and recommends the perfect tools from our database instantly.'
              },
              {
                icon: <Shield className="w-7 h-7 text-black" />,
                title: 'Detailed Comparisons',
                desc: 'Compare features, pricing, benchmarks, and user ratings side-by-side to make informed decisions.'
              },
              {
                icon: <TrendingUp className="w-7 h-7 text-black" />,
                title: 'Real Benchmarks',
                desc: 'See actual HumanEval and MBPP scores to understand true tool performance and capabilities.'
              }
            ].map((feature, i) => (
              <div key={i} className={`rounded-2xl p-8 border card-hover gold-border transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#111111] border-[rgba(255,215,0,0.15)]'
                  : 'bg-[#f8f8f8] border-[rgba(184,134,11,0.15)]'
              }`}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
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
        </div>
      </section>

      {/* Use Cases Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${
        theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#f8f8f8]'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'}`}>
              Find AI Tools for <span className="shimmer">Any Task</span>
            </h2>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
              Discover specialized tools for your specific needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Code className="w-6 h-6" />, label: 'Coding', desc: 'AI assistants for programming' },
              { icon: <Pencil className="w-6 h-6" />, label: 'Writing', desc: 'Content creation tools' },
              { icon: <Image className="w-6 h-6" />, label: 'Image Generation', desc: 'Create stunning visuals' },
              { icon: <Video className="w-6 h-6" />, label: 'Video Generation', desc: 'AI-powered video creation' },
            ].map((item, i) => (
              <Link key={i} to="/explore"
                className={`rounded-xl p-6 border card-hover group transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#111111] border-[rgba(255,215,0,0.15)] hover:border-[rgba(255,215,0,0.5)]'
                    : 'bg-white border-[rgba(184,134,11,0.15)] hover:border-[rgba(184,134,11,0.5)]'
                }`}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 text-[#FFD700]"
                  style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)' }}>
                  {item.icon}
                </div>
                <h4 className={`font-bold mb-2 group-hover:text-[#FFD700] transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-[#0a0a0a]'
                }`}>
                  {item.label}
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #1a1500, #0a0a0a, #1a1500)' }} />
        <Particles />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Ready to Find Your <span className="shimmer">Perfect AI Tool?</span>
          </h2>
          <p className="text-xl mb-8 text-gray-400">
            Start exploring our AI-powered collection and discover tools that will transform your workflow.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 text-lg rounded-xl font-bold transition-all duration-300 hover:scale-105 pulse-gold"
            style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)', color: '#0a0a0a' }}
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}