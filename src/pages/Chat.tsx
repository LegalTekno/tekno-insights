
import ChatInterface from '@/components/ChatInterface';

const Chat = () => {
  return (
    <div className="min-h-screen bg-theme-dark pt-24 px-4 pb-4">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="font-pixel text-3xl text-theme-pink mb-2">AI Chat Assistant</h1>
          <p className="font-mono text-muted-foreground">
            Ask questions about legal tech market data and get instant insights from our comprehensive database.
          </p>
        </div>
        
        <div className="h-[calc(100vh-220px)] border border-theme-purple rounded-lg overflow-hidden">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Chat;
