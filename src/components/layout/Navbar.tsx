import React from 'react';
import { useProfile, SectionId } from '../../context/ProfileContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Sun,
  Moon,
  Linkedin,
  FileDown,
  Menu,
  ExternalLink,
} from 'lucide-react';

interface NavbarProps {
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileMenu }) => {
  const { profile, activeSection, setIsResumeViewerOpen } = useProfile();
  const { theme, toggleTheme } = useTheme();

  const sectionTitles: Record<SectionId, string> = {
    overview: 'Portfolio Overview',
    about: 'About Me',
    experience: 'Professional & Internship Experience',
    skills: 'Technical Skills Matrix',
    projects: 'Featured Engineering Projects',
    education: 'Education & Academics',
    certifications: 'Licenses & Certifications',
    contact: 'Contact & Collaboration',
  };

  return (
    <header className="h-14 border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between gap-4">
      {/* Zone 1: Section Breadcrumb & Brand */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900 rounded-lg transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs truncate">
          <span className="font-semibold text-neutral-100 whitespace-nowrap">
            Anand Tripathi
          </span>
          <span className="text-neutral-600 hidden sm:inline" aria-hidden="true">
            /
          </span>
          <span className="text-neutral-400 font-medium hidden sm:inline truncate">
            {sectionTitles[activeSection] || 'Portfolio'}
          </span>
        </div>
      </div>

      {/* Zone 2: Navigation Shortcuts & Status Note */}
      <div className="hidden lg:flex items-center gap-3 text-xs text-neutral-400">
        <span className="text-neutral-400 font-mono text-[11px]">
          IT Diploma · Thakur Polytechnic
        </span>
      </div>

      {/* Zone 3: Actions: Theme Toggle, LinkedIn, Resume Download */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* LinkedIn shortcut */}
        <a
          href={profile.personalInfo.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800/80 border border-neutral-800 rounded-lg text-xs font-medium text-neutral-300 hover:text-neutral-100 transition-colors whitespace-nowrap"
          title="Open Anand's LinkedIn profile"
        >
          <Linkedin className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">LinkedIn</span>
          <ExternalLink className="w-3 h-3 text-neutral-400" />
        </a>

        {/* Download / View Resume Button */}
        <button
          onClick={() => setIsResumeViewerOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium shadow-xs shadow-indigo-950 transition-colors whitespace-nowrap"
          title="Download or Preview Resume"
        >
          <FileDown className="w-3.5 h-3.5" />
          <span>Resume</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900 border border-neutral-800/60 rounded-lg transition-colors"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label="Toggle color theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-400" />
          )}
        </button>
      </div>
    </header>
  );
};
