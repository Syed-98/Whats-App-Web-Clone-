import React from 'react';

const ChatWindowPlaceholder = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-[#f0f2f5] border-b-8 border-b-emerald-500">
            <div className="text-center">
                 <img src="https://static.whatsapp.net/rsrc.php/v3/y7/r/ujFp5Z7LsmY.png" alt="" width="250" height="250" />
                <h1 className="text-3xl text-gray-600 mt-4">WhatsApp Web</h1>
                <p className="text-sm text-gray-500 mt-2">
                    Send and receive messages without keeping your phone online.
                </p>
                <p className="text-sm text-gray-500">
                    Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
                </p>
            </div>
            <div className="absolute bottom-4 text-sm text-gray-400">
                End-to-end encrypted
            </div>
        </div>
    );
};

export default ChatWindowPlaceholder;
