
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would validate with a backend
    // For now, we'll just simulate a login
    setTimeout(() => {
      setIsLoading(false);
      navigate('/chat');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-theme-dark flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/b3beca76-6258-499f-a032-b06ec3d5f1bf.png" 
            alt="Tekno Insights Logo" 
            className="w-32 h-32"
          />
        </div>
        
        <h1 className="text-center font-pixel text-4xl text-theme-pink mb-2">
          Tekno Insights
        </h1>
        <p className="text-center font-mono text-muted-foreground mb-8">
          The ultimate data platform for legal tech investments
        </p>

        <div className="bg-theme-dark border border-theme-purple rounded-lg p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-mono text-theme-light">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-theme-dark border border-theme-purple rounded-md focus:outline-none focus:ring-2 focus:ring-theme-pink text-white"
                placeholder="name@company.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-mono text-theme-light">
                  Password
                </label>
                <button type="button" className="text-xs font-mono text-theme-pink hover:underline">
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-theme-dark border border-theme-purple rounded-md focus:outline-none focus:ring-2 focus:ring-theme-pink text-white"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full pixel-button ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm font-mono text-muted-foreground">
              Don't have an account?{' '}
              <button className="text-theme-pink hover:underline">
                Contact us
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
