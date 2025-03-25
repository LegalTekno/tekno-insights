
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MessageSquare, FileText, BarChart3, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // In a real app, this would clear auth tokens
    navigate('/');
  };

  const navLinks = [
    { name: 'Chat', path: '/chat', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Reports', path: '/reports', icon: <FileText className="w-4 h-4" /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 className="w-4 h-4" /> }
  ];
  
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-theme-dark/90 backdrop-blur' : 'py-4 bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/chat" className="flex items-center">
            <div className="w-8 h-8 mr-2">
              <img 
                src="/lovable-uploads/632c7713-ef1f-462e-8f53-223c2d8aa085.png" 
                alt="Logo" 
                className="w-8 h-8" 
              />
            </div>
            <span className="font-pixel text-lg text-theme-pink">Tekno Insights</span>
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
            
            <button
              onClick={handleLogout}
              className="flex items-center text-theme-light hover:text-theme-pink transition-all duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="font-mono">Sign Out</span>
            </button>
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
              
              <button
                onClick={handleLogout}
                className="flex items-center py-2 text-theme-light hover:text-theme-pink transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="font-mono">Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
