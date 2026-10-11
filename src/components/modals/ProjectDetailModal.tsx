import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import { ProjectCoverArt } from '../ui/ProjectCoverArt';
import {
  X,
  Github,
  ExternalLink,
  Edit3,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

export const ProjectDetailModal: React.FC = () => {
  const {
    selectedProject,
    setSelectedProject,
    setEditingProject,
  } = useProfile();

  if (!selectedProject) return null;

  const handleEditThisProject = () => {
    const proj = selectedProject;
    setSelectedProject(null);
    setEditingProject(proj);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={() => setSelectedProject(null)}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
        {/* Cover Art Visual */}
        <div className="relative h-56 sm:h-64 w-full">
          <ProjectCoverArt
            projectId={selectedProject.id}
            category={selectedProject.category}
            title={selectedProject.title}
            className="h-full w-full"
          />

          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-neutral-300 hover:text-white border border-neutral-700 backdrop-blur-xs transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-neutral-800 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
                <span className="text-indigo-400 font-medium">{selectedProject.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-neutral-400">{selectedProject.status}</span>
              </div>
              <h2 className="text-2xl font-bold text-neutral-100 tracking-tight">
                {selectedProject.title}
              </h2>
              <p className="text-sm text-indigo-300 mt-1 font-medium">
                {selectedProject.tagline}
              </p>
            </div>

            <button
              onClick={handleEditThisProject}
              className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded-lg text-xs font-medium transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Edit Details</span>
            </button>
          </div>

          {/* Deep Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Architecture & Overview
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {selectedProject.fullDescription || selectedProject.overview}
            </p>
          </div>

          {/* Key Features List */}
          {selectedProject.features && selectedProject.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Key Capabilities & Implemented Systems
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {selectedProject.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/80 text-xs text-neutral-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology Stack Badges */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Verified Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-neutral-800/80 border border-neutral-700 text-neutral-200 font-mono text-xs rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-neutral-800 bg-neutral-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-lg text-xs font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View Source Repository</span>
              </a>
            )}

            {selectedProject.demoUrl && (
              <a
                href={selectedProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Live Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={() => setSelectedProject(null)}
            className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
