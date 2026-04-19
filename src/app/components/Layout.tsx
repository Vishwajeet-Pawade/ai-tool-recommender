import { Link, useLocation } from 'react-router';
import { Sparkles, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-[#0a0a0a] text-white' 
        : 'bg-[#f8f8f8] text-[#0a0a0a]'
    }`}>

      {/* Navbar */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-[#0a0a0a]/90 border-[rgba(255,215,0,0.15)]'
          : 'bg-[#f8f8f8]/90 border-[rgba(184,134,11,0.2)]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center gold-glow transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)' }}>
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-bold shimmer">
                AI Tool Finder
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { path: '/', label: 'Home' },
                { path: '/explore', label: 'Explore Tools' },
                { path: '/compare', label: 'Compare' },
                { path: '/about', label: 'About' },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`relative text-sm font-medium transition-all duration-300 group ${
                    isActive(path)
                      ? 'text-[#FFD700]'
                      : theme === 'dark'
                      ? 'text-gray-400 hover:text-[#FFD700]'
                      : 'text-gray-600 hover:text-[#B8860B]'
                  }`}
                >
                  {label}
                  {/* Gold underline */}
                  <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                    isActive(path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} style={{ background: 'linear-gradient(90deg, #FFD700, #B8860B)' }} />
                </Link>
              ))}
            </nav>

            {/* Right side — theme toggle + mobile menu */}
            <div className="flex items-center gap-3">

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 gold-border ${
                  theme === 'dark'
                    ? 'bg-[#1a1a1a] hover:bg-[#222222]'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {theme === 'dark'
                  ? <Sun className="w-5 h-5 text-[#FFD700]" />
                  : <Moon className="w-5 h-5 text-[#B8860B]" />
                }
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center gold-border"
              >
                {mobileOpen
                  ? <X className="w-5 h-5 text-[#FFD700]" />
                  : <Menu className="w-5 h-5 text-[#FFD700]" />
                }
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className={`md:hidden py-4 border-t ${
              theme === 'dark' ? 'border-[rgba(255,215,0,0.15)]' : 'border-[rgba(184,134,11,0.2)]'
            }`}>
              {[
                { path: '/', label: 'Home' },
                { path: '/explore', label: 'Explore Tools' },
                { path: '/compare', label: 'Compare' },
                { path: '/about', label: 'About' },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2 px-4 rounded-lg mb-1 transition-all duration-300 ${
                    isActive(path)
                      ? 'text-[#FFD700] bg-[rgba(255,215,0,0.1)]'
                      : theme === 'dark'
                      ? 'text-gray-400 hover:text-[#FFD700] hover:bg-[rgba(255,215,0,0.05)]'
                      : 'text-gray-600 hover:text-[#B8860B]'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="fade-in-up">
        {children}
      </main>

      {/* Footer */}
      <footer className={`border-t mt-20 transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-[#0a0a0a] border-[rgba(255,215,0,0.15)]'
          : 'bg-[#f8f8f8] border-[rgba(184,134,11,0.2)]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #FFD700, #B8860B)' }}>
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              <span className="font-bold shimmer">AI Tool Finder</span>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              © 2026 AI Tool Finder. Discover the perfect AI tools for your needs.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}