import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import { Linkedin, Github, Download, RotateCcw } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile, resetToDefaults, exportProfileJSON, scrollToSection } = useProfile();
  const { personalInfo } = profile;

  return (
    <footer className="mt-16 border-t border-neutral-800/80 py-10 bg-neutral-950/60 text-xs text-neutral-400">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copy */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-bold text-neutral-200">{personalInfo.name}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Developer Portfolio Dashboard</span>
          </div>
          <p className="text-[11px] text-neutral-400">
            Information Technology Diploma Graduate · Thakur Polytechnic, Mumbai
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-neutral-400">
          <button
            onClick={() => scrollToSection('overview')}
            className="hover:text-neutral-200 transition-colors"
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-neutral-200 transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('experience')}
            className="hover:text-neutral-200 transition-colors"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="hover:text-neutral-200 transition-colors"
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="hover:text-neutral-200 transition-colors"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="hover:text-neutral-200 transition-colors"
          >
            Contact
          </button>
        </div>

        {/* Data Tools: Export & Reset */}
        <div className="flex items-center gap-3">
          <button
            onClick={exportProfileJSON}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded text-neutral-300 transition-colors"
            title="Download full profile as JSON"
          >
            <Download className="w-3 h-3 text-indigo-400" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all profile details back to initial verified defaults?')) {
                resetToDefaults();
              }
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded text-neutral-400 hover:text-rose-400 transition-colors"
            title="Reset to default verified data"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Data</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
