import React, { useState } from 'react';
import { Chat } from '../types';
import { CommunityIcon, StatusIcon, NewChatIcon, MenuIcon, SearchIcon } from './icons';

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const now = new Date();
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (now.getDate() - date.getDate() === 1 && now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) {
      return "Yesterday";
  }
  return date.toLocaleDateString();
};

const ChatItem: React.FC<{
  chat: Chat;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ chat, isSelected, onSelect }) => {
  const lastMessage = chat.messages[chat.messages.length - 1];

  return (
    <div
      className={`flex items-center p-3 cursor-pointer hover:bg-[#f0f2f5] ${isSelected ? 'bg-[#f0f2f5]' : ''}`}
      onClick={onSelect}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
    >
      <img src={chat.user.avatar} alt={chat.user.name} className="w-12 h-12 rounded-full mr-4" />
      <div className="flex-1 min-w-0 border-t border-gray-100 pt-3">
        <div className="flex justify-between items-center">
          <p className="font-semibold truncate text-gray-800">{chat.user.name}</p>
          {lastMessage && (
            <p className={`text-xs ${chat.unreadCount > 0 ? 'text-green-500 font-bold' : 'text-gray-500'}`}>
              {formatTimestamp(lastMessage.timestamp)}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-500 truncate">{lastMessage?.text || 'No messages yet'}</p>
          {chat.unreadCount > 0 && (
            <span className="bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatList: React.FC<ChatListProps> = ({ chats, selectedChatId, onSelectChat }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-white">
      <header className="flex items-center justify-between p-3 bg-[#f0f2f5] border-r border-gray-200">
        <img src="https://i.pravatar.cc/150?u=my-user" alt="My Avatar" className="w-10 h-10 rounded-full" />
        <div className="flex items-center space-x-4">
          <button aria-label="Communities"><CommunityIcon /></button>
          <button aria-label="Status"><StatusIcon /></button>
          <button aria-label="New chat"><NewChatIcon /></button>
          <button aria-label="Menu"><MenuIcon /></button>
        </div>
      </header>

      <div className="p-2 bg-white border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <SearchIcon className="text-gray-400 h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#f0f2f5] rounded-lg text-sm focus:outline-none"
            aria-label="Search chats"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChats.map(chat => (
          <ChatItem
            key={chat.user.id}
            chat={chat}
            isSelected={selectedChatId === chat.user.id}
            onSelect={() => onSelectChat(chat.user.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
