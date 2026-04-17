import { Link, useLocation } from 'react-router';
import { Sparkles } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Tool Finder
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link 
                to="/" 
                className={`transition-colors ${isActive('/') && location.pathname === '/' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Home
              </Link>
              <Link 
                to="/explore" 
                className={`transition-colors ${isActive('/explore') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Explore Tools
              </Link>
              <Link 
                to="/compare" 
                className={`transition-colors ${isActive('/compare') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Compare
              </Link>
              <Link 
                to="/about" 
                className={`transition-colors ${isActive('/about') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main>
        {children}
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600">
            <p>© 2026 AI Tool Finder. Discover the perfect AI tools for your needs.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
