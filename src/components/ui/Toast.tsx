import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useProfile();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-lg shadow-xl border text-sm backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 ${
              isSuccess
                ? 'bg-neutral-900/95 border-emerald-500/30 text-neutral-100 shadow-emerald-950/20'
                : isError
                ? 'bg-neutral-900/95 border-rose-500/30 text-neutral-100 shadow-rose-950/20'
                : 'bg-neutral-900/95 border-indigo-500/30 text-neutral-100 shadow-indigo-950/20'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {isError && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />}
              {!isSuccess && !isError && <Info className="w-4 h-4 text-indigo-400 shrink-0" />}
              <span className="text-xs font-medium text-neutral-200 leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-neutral-400 hover:text-neutral-100 transition-colors p-1"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
