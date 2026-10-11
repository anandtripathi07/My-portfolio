import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import {
  X,
  Printer,
  Download,
  Mail,
  Linkedin,
  MapPin,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code,
  FolderGit2,
} from 'lucide-react';

export const ResumeViewerModal: React.FC = () => {
  const {
    profile,
    isResumeViewerOpen,
    setIsResumeViewerOpen,
    exportProfileJSON,
  } = useProfile();

  if (!isResumeViewerOpen) return null;

  const { personalInfo, skills, projects, experience, education } = profile;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs"
        onClick={() => setIsResumeViewerOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-neutral-100">
              {personalInfo.name} — Curriculum Vitae
            </span>
            <span className="text-xs text-neutral-400 hidden sm:inline">
              (Live Printable Format)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={exportProfileJSON}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded-lg text-xs font-medium transition-colors"
              title="Download Data"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON Backup</span>
            </button>

            <button
              onClick={() => setIsResumeViewerOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-neutral-100 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet Canvas */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-neutral-950 text-neutral-200 space-y-6 print:bg-white print:text-neutral-900 print:p-0">
          {/* Resume Header */}
          <div className="border-b border-neutral-800 print:border-neutral-300 pb-5 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white print:text-neutral-900 tracking-tight">
              {personalInfo.name}
            </h1>
            <p className="text-sm font-medium text-indigo-400 print:text-indigo-700">
              {personalInfo.role} · {personalInfo.headline}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 print:text-neutral-600 pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-indigo-400 print:text-neutral-700" />
                <span className="font-mono">{personalInfo.email}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 print:text-neutral-700" />
                <span>{personalInfo.location}</span>
              </span>
              <span>·</span>
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-indigo-400 print:text-neutral-800"
              >
                <Linkedin className="w-3.5 h-3.5 text-indigo-400 print:text-neutral-700" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-400 print:text-neutral-800 font-bold">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 print:text-neutral-800 leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-400 print:text-neutral-800 font-bold flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs space-y-1">
                  <div className="flex justify-between font-bold text-neutral-100 print:text-neutral-900">
                    <span>{edu.qualification}</span>
                    <span className="font-mono text-neutral-400 print:text-neutral-600">{edu.period}</span>
                  </div>
                  <div className="text-neutral-300 print:text-neutral-700 font-medium">
                    {edu.institution} — {edu.location} ({edu.status})
                  </div>
                  <p className="text-neutral-400 print:text-neutral-600 leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience & Internships */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-400 print:text-neutral-800 font-bold flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              Work & Internship Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="text-xs space-y-1.5">
                  <div className="flex justify-between font-bold text-neutral-100 print:text-neutral-900">
                    <span>{exp.role}</span>
                    <span className="font-mono text-neutral-400 print:text-neutral-600">{exp.period}</span>
                  </div>
                  <div className="text-neutral-300 print:text-neutral-700 font-medium">
                    {exp.company} · {exp.location} ({exp.employmentType})
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-neutral-400 print:text-neutral-600">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-400 print:text-neutral-800 font-bold flex items-center gap-1.5">
              <FolderGit2 className="w-4 h-4" />
              Engineering Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs space-y-1">
                  <div className="flex justify-between font-bold text-neutral-100 print:text-neutral-900">
                    <span>{proj.title} — {proj.tagline}</span>
                    <span className="font-mono text-neutral-400 print:text-neutral-600">{proj.status}</span>
                  </div>
                  <p className="text-neutral-300 print:text-neutral-700 leading-relaxed">
                    {proj.overview}
                  </p>
                  <div className="text-[11px] font-mono text-indigo-400 print:text-indigo-800">
                    Stack: {proj.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Matrix */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-400 print:text-neutral-800 font-bold flex items-center gap-1.5">
              <Code className="w-4 h-4" />
              Technical Skills Matrix
            </h2>
            <div className="text-xs text-neutral-300 print:text-neutral-800 space-y-1">
              <div>
                <strong className="text-neutral-100 print:text-neutral-900 font-semibold">Languages & Web:</strong>{' '}
                {skills
                  .filter((s) => s.category.includes('Programming') || s.category.includes('Frontend'))
                  .map((s) => s.name)
                  .join(' · ')}
              </div>
              <div>
                <strong className="text-neutral-100 print:text-neutral-900 font-semibold">AI, ML & Analytics:</strong>{' '}
                {skills
                  .filter((s) => s.category.includes('AI') || s.category.includes('Data'))
                  .map((s) => s.name)
                  .join(' · ')}
              </div>
              <div>
                <strong className="text-neutral-100 print:text-neutral-900 font-semibold">Tools & Marketing:</strong>{' '}
                {skills
                  .filter((s) => s.category.includes('Tools') || s.category.includes('Marketing'))
                  .map((s) => s.name)
                  .join(' · ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
