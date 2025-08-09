import React from 'react';
import { MessageStatus } from '../types';

export const CheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 18 18" width="18" height="18" className={className}>
    <path
      fill="currentColor"
      d="M17.394 5.035l-1.23-1.23-8.164 8.165-3.32-3.32-1.23 1.23 4.55 4.551z"
    ></path>
  </svg>
);

export const DoubleCheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 18 18" width="18" height="18" className={className}>
    <path
      fill="currentColor"
      d="M17.394 5.035l-1.23-1.23-8.164 8.165-1.5-1.5 1.23-1.23 1.5 1.5 6.934-6.935zm-4.55 0l-1.23-1.23-8.164 8.165-3.32-3.32-1.23 1.23 4.55 4.551z"
    ></path>
  </svg>
);

export const MessageStatusIcon = ({ status }: { status: MessageStatus }) => {
  switch (status) {
    case MessageStatus.SENT:
      return <CheckIcon className="text-gray-400" />;
    case MessageStatus.DELIVERED:
      return <DoubleCheckIcon className="text-gray-400" />;
    case MessageStatus.READ:
      return <DoubleCheckIcon className="text-[#34b7f1]" />;
    default:
      return null;
  }
};

export const MenuIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="text-[#54656f]">
        <path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
    </svg>
);

export const CommunityIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="text-[#54656f]">
        <path fill="currentColor" d="M12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5zM4.125 12a7.875 7.875 0 1 1 15.75 0 7.875 7.875 0 0 1-15.75 0zm5.138-3.235a.625.625 0 0 1 .637.625v1.25h1.25a.625.625 0 1 1 0 1.25h-1.25v1.25a.625.625 0 1 1-1.25 0v-1.25H8.65a.625.625 0 0 1 0-1.25h1.25v-1.25a.625.625 0 0 1 .625-.637z"></path>
    </svg>
);

export const StatusIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="text-[#54656f]">
        <path fill="currentColor" d="M12 20.25a8.25 8.25 0 1 1 0-16.5 8.25 8.25 0 0 1 0 16.5zm0-1.5a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5z"></path><path fill="currentColor" d="M12 7.25a.75.75 0 0 1 .75.75v3.25a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75zM12 13a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
    </svg>
);

export const NewChatIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="text-[#54656f]">
        <path fill="currentColor" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.525-3.525h12.48c1.032 0 1.646-.614 1.646-1.646V4.821c0-1.032-.614-1.646-1.646-1.646zm-3.174 8.014h-2.501v2.501a1.001 1.001 0 0 1-2.002 0v-2.501h-2.501a1.001 1.001 0 0 1 0-2.002h2.501v-2.501a1.001 1.001 0 1 1 2.002 0v2.501h2.501a1.001 1.001 0 1 1 0 2.002z"></path>
    </svg>
);

export const SearchIcon = ({className}: {className?: string}) => (
    <svg viewBox="0 0 24 24" width="24" height="24" className={className}>
        <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
    </svg>
);

export const SendIcon = () => (
    <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="text-white" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24">
        <path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path>
    </svg>
);

export const AttachmentIcon = () => (
     <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="text-[#54656f]" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24">
        <path fill="currentColor" d="M12.001,2.001c-5.523,0-10,4.477-10,10s4.477,10,10,10s10-4.477,10-10S17.523,2.001,12.001,2.001 M12.001,20.001c-4.411,0-8-3.589-8-8s3.589-8,8-8s8,3.589,8,8S16.411,20.001,12.001,20.001 M13.001,11.001v-4h-2v4h-4v2h4v4h2v-4h4v-2H13.001z"></path>
    </svg>
);

export const EmojiIcon = () => (
    <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="text-[#54656f]" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24">
        <path fill="currentColor" d="M9.153,11.603c0.795,0,1.439-0.879,1.439-1.962s-0.644-1.962-1.439-1.962s-1.439,0.879-1.439,1.962S8.358,11.603,9.153,11.603 z M5.969,9.641c-0.795,0-1.439,0.879-1.439,1.962s0.644,1.962,1.439,1.962s1.439-0.879,1.439-1.962S6.764,9.641,5.969,9.641 z M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2 M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8 s8,3.589,8,8S16.411,20,12,20 M15.999,14.5c-0.048,0-0.096-0.002-0.144-0.004c-0.237-0.011-0.466-0.098-0.669-0.252 c-1.342-1.023-3.043-1.54-4.848-1.54c-1.787,0-3.479,0.51-4.819,1.52c-0.206,0.155-0.44,0.244-0.678,0.255 c-0.048,0.002-0.096,0.004-0.143,0.004c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1c0.001,0,0.002,0,0.003,0 c0.047,0,0.093-0.002,0.14-0.004c0.238-0.011,0.468-0.099,0.671-0.253c1.55-1.178,3.522-1.793,5.505-1.793 c2.001,0,3.991,0.623,5.545,1.808c0.203,0.154,0.432,0.241,0.668,0.252c0.047,0.002,0.094,0.004,0.141,0.004 c0.552,0,1,0.448,1,1C17,14.052,16.552,14.5,15.999,14.5z"></path>
    </svg>
);

export const MicIcon = () => (
    <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="text-[#54656f]">
        <path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"></path>
    </svg>
);

export const BackIcon = ({className}: {className?: string}) => (
    <svg viewBox="0 0 24 24" width="24" height="24" className={className}>
        <path fill="currentColor" d="M12 4l1.41 1.41L7.83 11H20v2H7.83l5.58 5.59L12 20l-8-8 8-8z"></path>
    </svg>
);
