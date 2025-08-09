import React, { useState, useEffect } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import { useChatData } from './hooks/useChatData'; // Updated hook name
import { Chat } from './types'; // Assuming you have a Chat type

function App() {
  const {
    chats,
    getChatById,
    sendMessage,
    markAsRead,
    isLoading,
    error,
    refreshChats
  } = useChatData(); // Using a more generic hook name
  
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  // Handle initial chat selection and window resize
  useEffect(() => {
    if (chats.length > 0 && !selectedChatId) {
      setSelectedChatId(chats[0].id);
    }

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      // If we switch to desktop view and have no selected chat, select the first one
      if (window.innerWidth >= 768 && !selectedChatId && chats.length > 0) {
        setSelectedChatId(chats[0].id);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chats, selectedChatId]);

  // Auto-refresh chats periodically
  useEffect(() => {
    if (isLoading) return;
    
    const interval = setInterval(() => {
      refreshChats();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [isLoading, refreshChats]);

  const selectedChat = selectedChatId ? getChatById(selectedChatId) : null;

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    markAsRead(chatId);
  };

  const handleSendMessage = async (text: string) => {
    if (!selectedChatId) return;
    
    try {
      await sendMessage(selectedChatId, text);
      // Optimistically update the chat list
      refreshChats();
    } catch (err) {
      console.error('Failed to send message:', err);
      // You might want to show an error to the user here
    }
  };

  const handleBackToChatList = () => {
    setSelectedChatId(null);
  };

  if (isLoading && chats.length === 0) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center text-gray-600">
        <div className="text-xl mb-4">Loading your chats...</div>
        <div className="w-12 h-12 border-4 border-t-blue-500 border-r-blue-500 border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center text-red-600 p-4">
        <div className="text-xl mb-4">Error loading chats</div>
        <div className="text-sm mb-6 text-center max-w-md">{error.message || 'Unknown error occurred'}</div>
        <button 
          onClick={refreshChats}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-[#f0f2f5] p-0 md:p-4">
      <div className="mx-auto w-full h-full max-w-[1600px] flex shadow-2xl">
        {/* Chat List - always visible on desktop, conditionally on mobile */}
        <div className={`${isMobileView && selectedChatId ? 'hidden' : 'flex'} w-full md:w-[30%] lg:w-[30%] xl:w-[25%] bg-white h-full flex-col border-r border-gray-200`}>
          <ChatList
            chats={chats}
            selectedChatId={selectedChatId}
            onSelectChat={handleSelectChat}
            isLoading={isLoading}
          />
        </div>

        {/* Chat Window - shown based on viewport and selection */}
        {selectedChat ? (
          <div className={`${isMobileView && !selectedChatId ? 'hidden' : 'flex'} flex-col w-full md:w-[70%] lg:w-[70%] xl:w-[75%] h-full bg-white`}>
            <ChatWindow
              chat={selectedChat}
              onSendMessage={handleSendMessage}
              onBack={handleBackToChatList}
              isMobile={isMobileView}
            />
          </div>
        ) : (
          <div className="hidden md:flex flex-col w-[70%] lg:w-[70%] xl:w-[75%] h-full items-center justify-center bg-white">
            <div className="text-gray-500 text-center p-6">
              <h2 className="text-xl font-medium mb-2">No chat selected</h2>
              <p>Select a chat from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

