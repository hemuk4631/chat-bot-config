import React from 'react';

interface SideModalProps {
  children: React.ReactNode;
}
export const SideModal: React.FC<SideModalProps> = ({ children }) => {
  return (
    <>
      <div
        className={`fixed right-0 top-14 z-50 h-screen w-1/4 overflow-scroll overflow-y-auto bg-white p-4 text-gray-0 shadow-lg`}
      >
        {children}
      </div>
    </>
  );
};
