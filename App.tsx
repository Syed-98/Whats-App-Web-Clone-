
import React, { useState, useEffect } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import { useMockData } from './hooks/useMockData';

function App() {
  const { chats, getChatById, sendMessage, markAsRead, isLoading, error } = useMockData();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  useEffect(() => {
    if (chats.length > 0 && !selectedChatId) {
      setSelectedChatId(chats[0].user.id);
    }
  }, [chats]);

  const selectedChat = selectedChatId ? getChatById(selectedChatId) : null;

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    markAsRead(chatId);
  };

  const handleSendMessage = (text: string) => {
    if (selectedChatId) {
      sendMessage(selectedChatId, text);
    }
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-gray-600 text-xl">
        Loading chats...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-red-600 text-xl">
        Error loading chats: {error}
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-[#f0f2f5] p-0 md:p-4">
      <div className="mx-auto w-full h-full max-w-[1600px] flex shadow-2xl">
        <div className="w-full md:w-[30%] lg:w-[30%] xl:w-[25%] bg-white h-full flex flex-col border-r border-gray-200">
          <ChatList
            chats={chats}
            selectedChatId={selectedChatId}
            onSelectChat={handleSelectChat}
          />
        </div>
        <div className="hidden md:flex flex-col w-[70%] lg:w-[70%] xl:w-[75%] h-full">
          <ChatWindow
            chat={selectedChat}
            onSendMessage={handleSendMessage}
          />
        </div>
        {/* Mobile view: overlay chat window */}
        {selectedChatId && (
          <div className="md:hidden absolute top-0 left-0 w-full h-full bg-white z-10">
            <ChatWindow
              chat={selectedChat}
              onSendMessage={handleSendMessage}
              onBack={() => setSelectedChatId(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
