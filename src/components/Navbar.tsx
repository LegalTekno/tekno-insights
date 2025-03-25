
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, FileText, BarChart3 } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Chat', path: '/chat', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Reports', path: '/reports', icon: <FileText className="w-4 h-4" /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 className="w-4 h-4" /> }
  ];
  
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-theme-dark/90 backdrop-blur' : 'py-4 bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="relative w-10 h-10 mr-2">
              <div className="w-10 h-10 bg-theme-pink rounded-sm animate-pixel-float"></div>
              <div className="absolute top-0 left-0 w-10 h-10 opacity-0 hover:opacity-100 transition-opacity">
                <img 
                  src="/lovable-uploads/671c37be-f7d5-4800-a90e-ae5de6a338f8.png" 
                  alt="Logo" 
                  className="w-10 h-10 pixel-perfect" 
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-pixel text-lg text-theme-pink">Legal</span>
              <span className="font-pixel text-sm text-theme-light">Insight</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center group transition-all duration-200 ${
                  location.pathname === link.path 
                    ? 'text-theme-pink' 
                    : 'text-theme-light hover:text-theme-pink'
                }`}
              >
                {link.icon && <span className="mr-2">{link.icon}</span>}
                <span className="font-mono relative">
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-theme-pink transition-all duration-300 group-hover:w-full ${
                    location.pathname === link.path ? 'w-full' : 'w-0'
                  }`}></span>
                </span>
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-theme-light hover:text-theme-pink focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-2 neon-border animate-pixel-fade-in">
            <div className="flex flex-col space-y-4 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center py-2 transition-colors ${
                    location.pathname === link.path 
                      ? 'text-theme-pink' 
                      : 'text-theme-light hover:text-theme-pink'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon && <span className="mr-2">{link.icon}</span>}
                  <span className="font-mono">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
