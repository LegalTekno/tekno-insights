
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-theme-dark border-t border-theme-purple py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img 
              src="/lovable-uploads/6f470fff-915b-4b8e-9d19-729d5438fbf5.png" 
              alt="Legal Tekno" 
              className="h-16 mb-4" 
            />
            <p className="font-mono text-theme-light max-w-md">
              We are technologists who studied law.
            </p>
            <p className="font-mono text-muted-foreground max-w-md mt-2">
              We know the legal tech market better than most because we care.
            </p>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex space-x-6 mb-4">
              <Link to="/chat" className="text-theme-light hover:text-theme-pink transition-colors font-mono">
                Chat
              </Link>
              <Link to="/reports" className="text-theme-light hover:text-theme-pink transition-colors font-mono">
                Reports
              </Link>
              <Link to="/analytics" className="text-theme-light hover:text-theme-pink transition-colors font-mono">
                Analytics
              </Link>
            </div>
            <div className="text-muted-foreground text-sm font-mono">
              © {new Date().getFullYear()} Legal Tekno. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
