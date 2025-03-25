
import { useNavigate } from 'react-router-dom';
import { MessageSquare, FileText, TrendingUp, ChevronRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'AI-Powered Chat',
      description: 'Engage with our advanced AI to extract specific insights from our comprehensive legal tech datasets',
      icon: <MessageSquare className="w-6 h-6" />,
      path: '/chat',
      color: 'from-theme-pink to-theme-purple'
    },
    {
      title: 'Investment Reports',
      description: 'Generate detailed reports on market trends, funding data, and competitive landscape',
      icon: <FileText className="w-6 h-6" />,
      path: '/reports',
      color: 'from-theme-purple to-theme-pink'
    },
    {
      title: 'Market Analytics',
      description: 'Visualize key metrics and indicators that drive investment decisions in legal tech',
      icon: <TrendingUp className="w-6 h-6" />,
      path: '/analytics',
      color: 'from-theme-gold to-theme-pink'
    }
  ];

  return (
    <div className="min-h-screen bg-theme-dark text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-theme-purple opacity-30" />
          <img 
            src="/lovable-uploads/decc144a-0dbd-476f-817f-06c7b373a802.png" 
            alt="Background" 
            className="w-full h-full object-cover blend-multiply pixel-perfect"
          />
        </div>
        
        <div className="container mx-auto relative z-10 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="relative mb-4">
                <div className="absolute -top-2 -left-2 w-16 h-16 bg-theme-pink transform rotate-6 opacity-70" />
                <h1 className="font-pixel text-4xl md:text-5xl lg:text-6xl relative z-10 shine-effect">
                  Legal<span className="text-theme-pink">Insight</span>
                </h1>
              </div>
              <h2 className="font-major text-xl mb-6 text-theme-light/90">
                The ultimate data platform for legal tech investments
              </h2>
              <p className="font-mono text-muted-foreground mb-8 max-w-lg">
                Access the most comprehensive dataset on legal tech market trends, 
                funding patterns, burn rates, product features, and customer reviews 
                to drive your investment decisions.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/chat')} 
                  className="pixel-button"
                >
                  Start Exploring
                </button>
                <button 
                  onClick={() => navigate('/reports')} 
                  className="font-pixel bg-transparent border-2 border-theme-pink text-theme-pink px-4 py-2 hover:bg-theme-pink/10 transition-colors"
                >
                  View Reports
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 animate-pixel-float">
                <img 
                  src="/lovable-uploads/671c37be-f7d5-4800-a90e-ae5de6a338f8.png" 
                  alt="Legal Tech" 
                  className="w-full h-full pixel-perfect"
                />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-3 bg-theme-pink/30 rounded-full blur-md"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-pixel text-3xl text-center mb-4 text-theme-pink">Our Platform</h2>
          <p className="text-center font-mono text-muted-foreground mb-12 max-w-2xl mx-auto">
            Unlock the power of comprehensive legal tech market data through 
            our suite of AI-powered research and analysis tools.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-theme-dark border border-theme-purple rounded-lg overflow-hidden group hover:scale-105 transition-all duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-theme-dark border border-theme-pink mr-3">
                      {feature.icon}
                    </div>
                    <h3 className="font-pixel text-lg text-theme-light">{feature.title}</h3>
                  </div>
                  <p className="font-mono text-muted-foreground mb-6 text-sm">
                    {feature.description}
                  </p>
                  <button 
                    onClick={() => navigate(feature.path)}
                    className="flex items-center text-theme-pink text-sm font-mono group-hover:translate-x-1 transition-transform"
                  >
                    Explore <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-theme-purple/10">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="p-6 border border-theme-purple rounded-lg bg-theme-dark">
              <div className="font-pixel text-3xl text-theme-pink mb-2">1500+</div>
              <div className="font-mono text-sm text-muted-foreground">
                Legal Tech Companies Tracked
              </div>
            </div>
            <div className="p-6 border border-theme-purple rounded-lg bg-theme-dark">
              <div className="font-pixel text-3xl text-theme-pink mb-2">$25B</div>
              <div className="font-mono text-sm text-muted-foreground">
                Total Market Cap Analyzed
              </div>
            </div>
            <div className="p-6 border border-theme-purple rounded-lg bg-theme-dark">
              <div className="font-pixel text-3xl text-theme-pink mb-2">5 Yrs</div>
              <div className="font-mono text-sm text-muted-foreground">
                Historical Data Available
              </div>
            </div>
            <div className="p-6 border border-theme-purple rounded-lg bg-theme-dark">
              <div className="font-pixel text-3xl text-theme-pink mb-2">98%</div>
              <div className="font-mono text-sm text-muted-foreground">
                Accuracy on Funding Data
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="relative p-8 md:p-12 border-2 border-theme-pink rounded-lg bg-theme-dark/70 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-full h-full bg-theme-dark opacity-80"></div>
              <img 
                src="/lovable-uploads/decc144a-0dbd-476f-817f-06c7b373a802.png" 
                alt="Background" 
                className="absolute top-0 left-0 w-full h-full object-cover mix-blend-overlay opacity-20 pixel-perfect"
              />
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="font-pixel text-3xl mb-4 text-theme-pink">Ready to Gain the Edge?</h2>
              <p className="font-mono text-muted-foreground mb-8 max-w-2xl mx-auto">
                Leverage our proprietary data to identify the next unicorns in legal tech
                before anyone else. Start exploring our platform today.
              </p>
              <button 
                onClick={() => navigate('/chat')} 
                className="pixel-button mx-auto"
              >
                Start Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
