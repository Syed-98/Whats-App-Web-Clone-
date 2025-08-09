
import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '../types';
import { SearchIcon, MenuIcon, AttachmentIcon, EmojiIcon, MicIcon, SendIcon, MessageStatusIcon, BackIcon } from './icons';
import ChatWindowPlaceholder from './ChatWindowPlaceholder';

interface ChatWindowProps {
  chat: Chat | null;
  onSendMessage: (text: string) => void;
  onBack?: () => void; // For mobile view
}

const formatMessageTimestamp = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, onSendMessage, onBack }) => {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // A small delay to allow the DOM to update before scrolling
    setTimeout(scrollToBottom, 100);
  }, [chat?.messages]);

   useEffect(() => {
    // Clear message input when switching chats
    setMessageText('');
   }, [chat?.user.id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      onSendMessage(messageText.trim());
      setMessageText('');
    }
  };
  
  if (!chat) {
    return <ChatWindowPlaceholder />;
  }

  return (
    <div className="flex flex-col h-full bg-[#e5ddd5]" style={{backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")'}}>
      {/* Chat Header */}
      <header className="flex items-center p-3 bg-[#f0f2f5] border-b border-gray-200 shrink-0">
        {onBack && (
            <button onClick={onBack} className="mr-2 md:hidden" aria-label="Back to chats">
                <BackIcon className="text-[#54656f]" />
            </button>
        )}
        <img src={chat.user.avatar} alt={chat.user.name} className="w-10 h-10 rounded-full mr-4" />
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{chat.user.name}</p>
          <p className="text-xs text-gray-500">online</p>
        </div>
        <div className="flex items-center space-x-4">
          <button aria-label="Search"><SearchIcon className="text-[#54656f] h-6 w-6" /></button>
          <button aria-label="Menu"><MenuIcon /></button>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-2">
        {chat.messages.map(message => (
          <div key={message.id} className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs lg:max-w-md p-2 px-3 rounded-lg shadow ${
                message.isSender ? 'bg-[#dcf8c6]' : 'bg-white'
              }`}
            >
              <p className="text-sm text-gray-800" style={{wordBreak: 'break-word'}}>{message.text}</p>
              <div className="flex justify-end items-center mt-1">
                <p className="text-xs text-gray-400 mr-1">{formatMessageTimestamp(message.timestamp)}</p>
                {message.isSender && <MessageStatusIcon status={message.status} />}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Message Input */}
      <footer className="p-2 bg-[#f0f2f5] shrink-0">
        <form className="flex items-center space-x-3" onSubmit={handleSendMessage}>
          <button type="button" aria-label="Emoji"><EmojiIcon /></button>
          <button type="button" aria-label="Attach file"><AttachmentIcon /></button>
          <input
            type="text"
            placeholder="Type a message"
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
            className="flex-1 p-2 rounded-lg border-none focus:outline-none text-sm"
            aria-label="Message input"
          />
          {messageText ? (
            <button type="submit" className="bg-[#00a884] p-2 rounded-full" aria-label="Send message">
                <SendIcon />
            </button>
          ) : (
            <button type="button" aria-label="Record voice message"><MicIcon /></button>
          )}
        </form>
      </footer>
    </div>
  );
};

export default ChatWindow;
