
import ChatInterface from '@/components/ChatInterface';
import Footer from '@/components/Footer';

const Chat = () => {
  return (
    <div className="min-h-screen bg-theme-dark flex flex-col">
      <div className="pt-24 px-4 pb-4 flex-grow">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-6">
            <h1 className="font-pixel text-3xl text-theme-pink mb-2">TEKNO INSIGHTS AI ASSISTANT</h1>
            <p className="font-mono text-muted-foreground">
              Ask questions about legal tech market data and get instant insights from our comprehensive database.
            </p>
          </div>
          
          <div className="h-[calc(100vh-220px)] border border-theme-purple rounded-lg overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chat;
