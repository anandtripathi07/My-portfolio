import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import {
  ArrowRight,
  FileDown,
  Linkedin,
  Github,
  Instagram,
  Terminal,
  MapPin,
  CheckCircle2,
  Code2,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { profile, scrollToSection, setIsResumeViewerOpen } = useProfile();
  const { personalInfo } = profile;

  return (
    <section id="overview" className="relative py-10 md:py-16">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Personal Brand & Hero Copy */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status & Location kicker without pill badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              {personalInfo.location}
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-emerald-400 font-medium">
              {personalInfo.availability}
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400 font-mono text-[11px]">Thakur Polytechnic</span>
          </div>

          {/* Headline & Subheadline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-100 tracking-tight leading-tight text-balance">
              {personalInfo.headline}
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              {personalInfo.subheadline}
            </p>
          </div>

          {/* Short Bio Paragraph */}
          <p className="text-sm text-neutral-400 leading-relaxed max-w-xl">
            {personalInfo.bio}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => scrollToSection('projects')}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold shadow-md shadow-indigo-950/40 transition-colors"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsResumeViewerOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-200 rounded-lg text-sm font-medium transition-colors"
            >
              <FileDown className="w-4 h-4 text-neutral-400" />
              <span>Download Resume</span>
            </button>

            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-200 rounded-lg text-sm font-medium transition-colors"
            >
              <Linkedin className="w-4 h-4 text-indigo-400" />
              <span>Connect on LinkedIn</span>
            </a>

            {personalInfo.githubUrl && (
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-lg transition-colors"
                title="View GitHub profile"
                aria-label="GitHub profile"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {personalInfo.instagramUrl && (
              <a
                href={personalInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-lg transition-colors"
                title="View Instagram profile"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Right Column: High-Tech Profile Console Card */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl bg-neutral-900/90 border border-neutral-800 p-6 shadow-2xl backdrop-blur-md">
            {/* Header of console */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span className="font-mono text-[11px] text-neutral-300">anand_tripathi.config</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Verified IT Candidate
              </span>
            </div>

            {/* Profile Avatar Card within console */}
            <div className="py-5 flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-800 p-0.5 shadow-lg shrink-0">
                <div className="w-full h-full rounded-[10px] bg-neutral-950 flex flex-col items-center justify-center text-white">
                  <span className="font-bold text-lg tracking-wider">AT</span>
                  <span className="text-[8px] font-mono text-indigo-400">DEV</span>
                </div>
              </div>

              <div className="min-w-0">
                <h3 className="text-base font-bold text-neutral-100 truncate">
                  {personalInfo.name}
                </h3>
                <p className="text-xs text-indigo-400 font-medium">
                  {personalInfo.role}
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5 truncate">
                  Thakur Polytechnic (Diploma in IT)
                </p>
              </div>
            </div>

            {/* Core Competencies Quick Summary */}
            <div className="space-y-2.5 text-xs border-t border-neutral-800/80 pt-4">
              <div className="flex items-center justify-between py-1 text-neutral-300">
                <span className="text-neutral-400">Primary Languages</span>
                <span className="font-mono text-neutral-200">Python · JavaScript · HTML/CSS</span>
              </div>
              <div className="flex items-center justify-between py-1 text-neutral-300">
                <span className="text-neutral-400">Applied AI Projects</span>
                <span className="font-mono text-neutral-200">Meowlytics · LAWGIC</span>
              </div>
              <div className="flex items-center justify-between py-1 text-neutral-300">
                <span className="text-neutral-400">Internship Focus</span>
                <span className="font-mono text-neutral-200">AI/ML & Data Analytics</span>
              </div>
              <div className="flex items-center justify-between py-1 text-neutral-300">
                <span className="text-neutral-400">Next Stage</span>
                <span className="font-mono text-indigo-300">Engineering Degree & Roles</span>
              </div>
            </div>

            {/* Interactive snippet footer */}
            <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400">
              <span className="flex items-center gap-1.5 text-neutral-400">
                <Code2 className="w-3.5 h-3.5 text-neutral-400" />
                Active Repository Explorer
              </span>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                Send Message →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
