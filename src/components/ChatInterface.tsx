
import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello, I am LegalInsight AI. I can provide you with insights on legal tech market data, funding information, and investment trends. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial suggestions
  const suggestions = [
    "What are the top 5 legal tech companies by funding in 2023?",
    "Show me trends in legal document automation startups",
    "Compare burn rates of AI legal research tools",
    "What features do successful legal tech platforms share?",
    "Which legal tech verticals are seeing the most investor interest?",
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const generateResponseFromAI = async (userMessage: string): Promise<string> => {
    // This is a mock function - in a real app, this would call your AI backend
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const responses = [
      `Based on our data, the top legal tech companies by funding in 2023 were:
      
1. Clio - $250M (Series D)
2. LegalZoom - $535M (IPO)
3. Relativity - $100M (Private Equity)
4. ContractPodAi - $115M (Series C)
5. Everlaw - $85M (Series D)

These companies focus on areas such as practice management, document management, contract analysis, and e-discovery.`,
      
      `We're seeing strong growth in legal document automation startups, with a 34% increase in funding compared to last year. Key trends include:

- AI-enhanced template generation
- Integration with existing legal workflows
- Regulatory compliance automation
- Multilingual capabilities
- Blockchain-based document verification

Companies like Ironclad, ContractPodAi, and Juro are leading this segment.`,
      
      `Our analysis shows that AI legal research tools have varying burn rates:

- Early-stage startups: $150K-$300K monthly
- Growth-stage companies: $500K-$1.2M monthly
- Late-stage players: $2M+ monthly

Tools focused on specialized practice areas tend to have better unit economics and lower customer acquisition costs.`,
      
      `Our data indicates successful legal tech platforms share these key features:

1. Intuitive user interfaces designed for legal workflows
2. Strong security and compliance frameworks
3. Integration capabilities with other legal software
4. Customizable reporting and analytics
5. Cloud-based deployment with on-premises options
6. Mobile accessibility for court/client interactions`,
      
      `Current investor interest is highest in these legal tech verticals:

1. Regulatory compliance and risk management (36% of funding)
2. Contract lifecycle management (28% of funding)
3. Legal operations & analytics (17% of funding)
4. E-discovery and litigation support (12% of funding)
5. Access to justice platforms (7% of funding)

Early-stage funding is particularly strong in regulatory tech.`
    ];
    
    setIsLoading(false);
    
    // Return a response based on the query (simplified for demo)
    if (userMessage.includes("top") && userMessage.includes("funding")) {
      return responses[0];
    } else if (userMessage.includes("document") && userMessage.includes("automation")) {
      return responses[1];
    } else if (userMessage.includes("burn rates")) {
      return responses[2];
    } else if (userMessage.includes("features")) {
      return responses[3];
    } else if (userMessage.includes("investor interest") || userMessage.includes("verticals")) {
      return responses[4];
    } else {
      return "I don't have enough specific data on that query. Could you rephrase or ask about legal tech funding, market trends, burn rates, or investor interest in specific verticals?";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Generate AI response
    const aiResponse = await generateResponseFromAI(userMessage.content);
    
    // Add AI response
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: aiResponse,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={cn(
              "flex gap-3 max-w-[80%] animate-pixel-fade-in",
              message.type === 'user' ? "ml-auto" : "mr-auto"
            )}
          >
            <div 
              className={cn(
                "flex items-start gap-3 rounded-lg p-3",
                message.type === 'user' 
                  ? "bg-theme-purple text-white ml-auto order-2" 
                  : "bg-theme-dark border border-theme-purple text-white"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                message.type === 'user' ? "bg-theme-pink" : "bg-theme-dark border border-theme-pink"
              )}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-theme-pink" />
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="whitespace-pre-line text-sm">{message.content}</div>
                <div className="text-xs opacity-50 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 max-w-[80%] animate-pulse">
            <div className="bg-theme-dark border border-theme-purple text-white rounded-lg p-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-theme-dark border border-theme-pink">
                <Bot className="w-4 h-4 text-theme-pink" />
              </div>
              <div className="flex items-center mt-2">
                <Loader2 className="w-4 h-4 text-theme-pink animate-spin mr-2" />
                <span className="text-sm text-muted-foreground">Generating response...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="px-4 mb-4">
          <h3 className="text-sm font-pixel mb-2 text-theme-pink">Suggested questions:</h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs px-3 py-1.5 bg-theme-dark border border-theme-purple rounded-md hover:bg-theme-purple transition-colors text-white"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t border-theme-purple bg-theme-dark p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ask about legal tech market data..."
            className="flex-1 bg-theme-dark border border-theme-purple rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-theme-pink"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className={`p-2 rounded-md ${
              !inputValue.trim() || isLoading 
                ? 'bg-theme-purple/50 cursor-not-allowed' 
                : 'bg-theme-pink hover:bg-theme-pink/80'
            } transition-colors`}
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
