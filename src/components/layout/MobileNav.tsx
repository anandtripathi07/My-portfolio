import React from 'react';
import { Sidebar } from './Sidebar';
import { X } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative z-10 w-72 max-w-[85vw] h-full bg-neutral-950 shadow-2xl flex flex-col">
        <div className="absolute top-3 right-3 z-20">
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 rounded-lg bg-neutral-900 border border-neutral-800"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <Sidebar onNavigate={onClose} />
      </div>
    </div>
  );
};
