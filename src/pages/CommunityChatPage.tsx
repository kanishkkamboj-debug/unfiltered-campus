import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ArrowLeft, Send, Trash2, ShieldAlert } from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { mockUsers } from '../utils/mockData';

const initialMessages = [
  { id: '1', communityId: 'cs-study', authorId: '11111111-1111-1111-1111-111111111111', text: 'Hey everyone, when is the next study session?', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '2', communityId: 'cs-study', authorId: '22222222-2222-2222-2222-222222222222', text: 'Tomorrow at 4PM in the library!', createdAt: new Date(Date.now() - 3000000).toISOString() },
];

export function CommunityChatPage() {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState(initialMessages.filter(m => m.communityId === id));
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const currentUser = mockUsers[0]; // alex_campus

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const msg = {
      id: Date.now().toString(),
      communityId: id!,
      authorId: currentUser.id,
      text: newMessage,
      createdAt: new Date().toISOString()
    };
    
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  const handleDelete = (msgId: string) => {
    setMessages(messages.filter(m => m.id !== msgId));
  };

  const handleDeleteChat = () => {
    if(confirm("Are you sure you want to clear the entire chat history for everyone?")) {
        setMessages([]);
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto h-[calc(100vh-64px)] flex flex-col bg-surface border-x border-border">
        {/* Chat Header */}
        <div className="h-16 border-b border-border flex items-center justify-between px-6 shrink-0 bg-surface z-10 sticky top-16">
          <div className="flex items-center gap-4">
            <Link to="/communities" className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-headline-md text-headline-md font-bold text-on-surface">
              {id === 'cs-study' ? 'CS 301 Study Group' : id === 'gaming' ? 'Campus Gamers' : 'Community Chat'}
            </h1>
          </div>
          
          <button 
            onClick={handleDeleteChat}
            className="flex items-center gap-2 px-3 py-1.5 text-error hover:bg-error/10 rounded-lg text-sm font-medium transition-colors"
          >
            <ShieldAlert className="w-4 h-4" /> Clear Chat (Admin)
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-surface-container-lowest">
          {messages.length === 0 ? (
             <div className="h-full flex items-center justify-center text-muted-text">
                 No messages yet. Start the conversation!
             </div>
          ) : (
            messages.map(msg => {
              const author = mockUsers.find(u => u.id === msg.authorId);
              const isMe = author?.id === currentUser.id;
              
              return (
                <div key={msg.id} className={`flex gap-3 max-w-[80%] ${isMe ? 'ml-auto flex-row-reverse' : ''}`}>
                  <div className="shrink-0 mt-auto">
                    <Avatar avatarUrl={author?.avatar_url} username={author?.username} size="sm" />
                  </div>
                  
                  <div className={`flex flex-col gap-1 ${isMe ? 'items-end' : 'items-start'}`}>
                    <span className="text-xs text-muted-text px-1">@{author?.username}</span>
                    <div className={`group relative px-4 py-2.5 rounded-2xl ${
                      isMe 
                        ? 'bg-primary text-on-primary rounded-br-sm' 
                        : 'bg-surface-container text-on-surface rounded-bl-sm border border-outline-variant'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      
                      {isMe && (
                        <button 
                          onClick={() => handleDelete(msg.id)}
                          className="absolute top-1/2 -translate-y-1/2 -left-8 p-1 text-muted-text hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-surface border-t border-border shrink-0">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-end gap-2">
            <textarea 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder="Message community..."
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl pl-4 pr-12 py-3 min-h-[48px] max-h-[120px] resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              rows={1}
            />
            <button 
              type="submit" 
              disabled={!newMessage.trim()}
              className="absolute right-2 bottom-2 p-2 bg-primary text-on-primary rounded-full hover:shadow-md disabled:opacity-50 disabled:hover:shadow-none transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
