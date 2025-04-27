import React from "react";

interface ModalProps {
  isOpen?: boolean; // Make isOpen optional
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen = true, onClose, title, children }: ModalProps) => {
  if (isOpen === false) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center my-8">
      <div
        className="fixed inset-0 bg-black/40 bg-opacity-50"
        onClick={onClose}
      />

      <div className="bg-white rounded-md shadow-lg relative z-10 w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-white bg-red-500 rounded-md p-1 hover:bg-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
