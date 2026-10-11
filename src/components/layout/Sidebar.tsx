import React, { useState } from 'react';
import { useProfile, SectionId } from '../../context/ProfileContext';
import {
  LayoutDashboard,
  User,
  Briefcase,
  Wrench,
  FolderGit2,
  GraduationCap,
  Award,
  Mail,
  Linkedin,
  Github,
  Upload,
  Edit3,
  Check,
  Circle,
} from 'lucide-react';

interface SidebarProps {
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const {
    profile,
    activeSection,
    scrollToSection,
    setIsEditProfileOpen,
    setIsResumeImportOpen,
    updatePersonalInfo,
  } = useProfile();

  const [isEditingAvailability, setIsEditingAvailability] = useState(false);
  const [tempAvailability, setTempAvailability] = useState(profile.personalInfo.availability);

  const navItems: { id: SectionId; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'about', label: 'About Me', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (id: SectionId) => {
    scrollToSection(id);
    if (onNavigate) onNavigate();
  };

  const handleSaveAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempAvailability.trim()) {
      updatePersonalInfo({ availability: tempAvailability.trim() });
    }
    setIsEditingAvailability(false);
  };

  return (
    <aside className="w-64 h-full flex flex-col justify-between bg-neutral-950 border-r border-neutral-800/80 text-neutral-200 select-none">
      {/* Top Profile Header */}
      <div className="p-5 border-b border-neutral-800/60">
        <div className="flex items-center gap-3">
          {/* Avatar with fallback initials */}
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 p-0.5 shrink-0 shadow-md">
            <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center text-white font-bold text-sm tracking-wider">
              AT
            </div>
            {/* Online / Active status indicator dot */}
            <span
              className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-neutral-950 rounded-full"
              title="Available"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <h2 className="text-sm font-bold text-neutral-100 truncate tracking-tight">
              {profile.personalInfo.name}
            </h2>
            <span className="text-[11px] text-neutral-400 truncate">
              Thakur Polytechnic IT Grad
            </span>
          </div>
        </div>

        {/* Availability Badge / Editor */}
        <div className="mt-3.5 pt-3 border-t border-neutral-800/40">
          {isEditingAvailability ? (
            <form onSubmit={handleSaveAvailability} className="flex items-center gap-1.5">
              <input
                type="text"
                value={tempAvailability}
                onChange={(e) => setTempAvailability(e.target.value)}
                className="w-full text-xs bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
                placeholder="Availability status"
                autoFocus
              />
              <button
                type="submit"
                className="p-1 text-emerald-400 hover:text-emerald-300 transition-colors"
                title="Save availability"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div
              onClick={() => {
                setTempAvailability(profile.personalInfo.availability);
                setIsEditingAvailability(true);
              }}
              className="group cursor-pointer flex items-center justify-between text-[11px] text-neutral-400 hover:text-neutral-200 transition-colors"
              title="Click to edit availability status"
            >
              <div className="flex items-center gap-1.5 truncate">
                <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500 shrink-0" />
                <span className="truncate">{profile.personalInfo.availability}</span>
              </div>
              <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-100 text-neutral-500 shrink-0 transition-opacity" />
            </div>
          )}
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
          Workspace Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors text-left ${
                isActive
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-neutral-500'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions & Profile Tools */}
      <div className="p-3 border-t border-neutral-800/70 space-y-2">
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-neutral-900 hover:bg-neutral-800/80 border border-neutral-800 rounded-md text-[11px] text-neutral-300 hover:text-neutral-100 transition-colors"
            title="Open Profile Editor"
          >
            <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={() => setIsResumeImportOpen(true)}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-neutral-900 hover:bg-neutral-800/80 border border-neutral-800 rounded-md text-[11px] text-neutral-300 hover:text-neutral-100 transition-colors"
            title="Import LinkedIn or Resume PDF"
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span>Import PDF</span>
          </button>
        </div>

        {/* Social Quick Links */}
        <div className="flex items-center justify-between px-2 pt-2 text-[11px] text-neutral-400 border-t border-neutral-800/40">
          <a
            href={profile.personalInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          {profile.personalInfo.githubUrl && (
            <a
              href={profile.personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-neutral-200 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </aside>
  );
};
