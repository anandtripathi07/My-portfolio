import React from 'react';
import { Activity, Scale, Layers, Sparkles, Volume2, BookOpen } from 'lucide-react';

interface ProjectCoverArtProps {
  projectId: string;
  category: string;
  title: string;
  className?: string;
}

export const ProjectCoverArt: React.FC<ProjectCoverArtProps> = ({
  projectId,
  category,
  title,
  className = '',
}) => {
  if (projectId === 'p-meowlytics' || title.toLowerCase().includes('meowlytics')) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-indigo-950/90 via-purple-950/70 to-neutral-950 border border-indigo-500/20 flex flex-col justify-between p-6 ${className}`}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(168, 85, 247, 0.4) 1px, transparent 0)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Ambient glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar info */}
        <div className="relative z-10 flex items-center justify-between text-xs text-indigo-300/80">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-[11px] uppercase tracking-wider">Acoustic Audio DSP & ML</span>
          </div>
          <span className="font-mono text-[10px] text-indigo-300/60 bg-indigo-950/60 border border-indigo-800/40 px-2 py-0.5 rounded">
            MFCCs · Spectrogram
          </span>
        </div>

        {/* Dynamic Waveform & Spectrogram Visualization */}
        <div className="relative z-10 my-4 flex flex-col gap-3">
          {/* Animated Waveform bars */}
          <div className="h-20 w-full flex items-end justify-between gap-1 px-2 pt-2 pb-1 bg-black/40 rounded-lg border border-indigo-900/40 backdrop-blur-xs">
            {[
              24, 45, 60, 30, 85, 92, 65, 40, 78, 95,
              100, 75, 48, 88, 62, 35, 70, 84, 52, 90,
              65, 42, 80, 55, 30, 68, 82, 45, 72, 38
            ].map((height, i) => (
              <div
                key={i}
                className="w-full rounded-t-xs transition-all duration-300"
                style={{
                  height: `${height}%`,
                  background: `linear-gradient(to top, rgba(99, 102, 241, 0.4), rgba(168, 85, 247, ${height > 70 ? '0.9' : '0.6'}))`,
                }}
              />
            ))}
          </div>

          {/* Classification Targets */}
          <div className="grid grid-cols-4 gap-2 text-[10px] font-mono text-center">
            <div className="bg-neutral-900/70 border border-indigo-900/30 rounded py-1 px-1 text-emerald-400">
              Contentment
            </div>
            <div className="bg-neutral-900/70 border border-indigo-900/30 rounded py-1 px-1 text-amber-400">
              Hunger Alert
            </div>
            <div className="bg-neutral-900/70 border border-indigo-900/30 rounded py-1 px-1 text-rose-400">
              Distress / Pain
            </div>
            <div className="bg-neutral-900/70 border border-indigo-900/30 rounded py-1 px-1 text-indigo-400">
              Greeting / Social
            </div>
          </div>
        </div>

        {/* Bottom card footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-neutral-400 border-t border-indigo-950/60 pt-3">
          <span className="text-neutral-300 font-medium">Acoustic Sentiment Inference</span>
          <span className="font-mono text-[11px] text-indigo-400">Python · Librosa · Scikit-Learn</span>
        </div>
      </div>
    );
  }

  if (projectId === 'p-lawgic' || title.toLowerCase().includes('lawgic')) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-blue-950/90 via-slate-950 to-neutral-950 border border-blue-500/20 flex flex-col justify-between p-6 ${className}`}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.4) 1px, transparent 0)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Ambient glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar info */}
        <div className="relative z-10 flex items-center justify-between text-xs text-blue-300/80">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-blue-400" />
            <span className="font-mono text-[11px] uppercase tracking-wider">AI Legal Intelligence</span>
          </div>
          <span className="font-mono text-[10px] text-blue-300/60 bg-blue-950/60 border border-blue-800/40 px-2 py-0.5 rounded">
            IPC Statute · NLP · Bilingual
          </span>
        </div>

        {/* Legal Intelligence Interface Mockup */}
        <div className="relative z-10 my-4 flex flex-col gap-2">
          <div className="bg-neutral-900/80 border border-blue-900/40 rounded-lg p-3 backdrop-blur-xs flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] border-b border-neutral-800 pb-2">
              <span className="text-neutral-300 font-medium flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                IPC Section Mapping Engine
              </span>
              <span className="font-mono text-[10px] text-blue-400">Bilingual (EN / हिंदी)</span>
            </div>
            
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between bg-black/40 px-2.5 py-1.5 rounded border border-neutral-800/60">
                <span className="text-neutral-200">Incident Narrative Analysis</span>
                <span className="font-mono text-[10px] text-emerald-400">Section 378/420 Relevant</span>
              </div>
              <div className="flex items-center justify-between bg-black/40 px-2.5 py-1.5 rounded border border-neutral-800/60">
                <span className="text-neutral-200">Bilingual Judicial Brief</span>
                <span className="font-mono text-[10px] text-cyan-400">FIR Summary Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom card footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-neutral-400 border-t border-blue-950/60 pt-3">
          <span className="text-neutral-300 font-medium">Judicial Research & NLP</span>
          <span className="font-mono text-[11px] text-blue-400">NLP · FastAPI · Python</span>
        </div>
      </div>
    );
  }

  // Default clean engineering fallback
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 flex flex-col justify-between p-6 ${className}`}
    >
      <div className="flex items-center justify-between text-xs text-neutral-400">
        <span className="flex items-center gap-1.5 font-medium text-neutral-300">
          <Layers className="w-4 h-4 text-indigo-400" />
          {category}
        </span>
        <span className="font-mono text-[11px] text-neutral-500">Engineering</span>
      </div>

      <div className="my-6">
        <h4 className="text-xl font-bold text-neutral-100 tracking-tight">{title}</h4>
      </div>

      <div className="flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-800/80 pt-3">
        <span>Software & Systems Architecture</span>
        <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
      </div>
    </div>
  );
};
