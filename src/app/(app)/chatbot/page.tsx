import { PageHeader } from '@/components/page-header';
import { ChatPanel } from '@/components/chatbot/chat-panel';

export default function ChatbotPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="AI Chatbot"
        description="Ask me anything about trading, market analysis, or this app."
      />
      <div className="flex-1 p-4 md:p-8">
        <ChatPanel />
      </div>
    </div>
  );
}
