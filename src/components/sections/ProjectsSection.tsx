import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { ProjectItem } from '../../types/portfolio';
import { ProjectCoverArt } from '../ui/ProjectCoverArt';
import {
  FolderGit2,
  Plus,
  Search,
  ExternalLink,
  Github,
  ChevronRight,
  Edit3,
  Trash2,
  Cpu,
  Layers,
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const {
    profile,
    setSelectedProject,
    setEditingProject,
    setIsAddProjectOpen,
    deleteProject,
  } = useProfile();
  const { projects } = profile;

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory = activeCategory === 'all' || proj.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-12 border-t border-neutral-800/80">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
              04 · Applied Engineering & Prototypes
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100 tracking-tight">
              Featured Projects
            </h2>
            <p className="text-xs text-neutral-400">
              Production-oriented machine learning architectures, acoustic signal processing, and legal intelligence software.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddProjectOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Project</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-neutral-800 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                }`}
              >
                {cat === 'all' ? 'All Projects' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or stack..."
              className="w-full text-xs bg-neutral-900 border border-neutral-800 rounded-lg pl-8 pr-3 py-2 text-neutral-200 placeholder:text-neutral-500 focus:outline-hidden focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 overflow-hidden flex flex-col justify-between transition-all duration-200"
            >
              <div>
                {/* Visual Cover Art / Canvas Visualization */}
                <div className="h-48 sm:h-56 w-full cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <ProjectCoverArt
                    projectId={project.id}
                    category={project.category}
                    title={project.title}
                    className="h-full w-full"
                  />
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Category & Status (Unboxed text with typographic separator) */}
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <span className="text-indigo-400 font-medium">{project.category}</span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="font-mono text-[11px] text-neutral-400">{project.status}</span>
                    </div>

                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingProject(project);
                        }}
                        className="p-1 text-neutral-400 hover:text-indigo-400 transition-colors"
                        title="Edit project details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(project.id);
                        }}
                        className="p-1 text-neutral-400 hover:text-rose-400 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="text-xl font-bold text-neutral-100 hover:text-indigo-300 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs text-indigo-300/80 mt-0.5 font-medium">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Overview Text */}
                  <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                    {project.overview}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-neutral-800/80 border border-neutral-700/60 text-neutral-300 font-mono text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 border-t border-neutral-800/60 bg-neutral-950/40 flex items-center justify-between text-xs">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-1 font-medium text-neutral-200 hover:text-indigo-400 transition-colors"
                >
                  <span>View Full Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-neutral-400 hover:text-neutral-100 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}

                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-neutral-400 hover:text-indigo-400 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono text-neutral-400">
                      Repo Link Configurable
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-2 p-12 text-center rounded-2xl bg-neutral-900/30 border border-dashed border-neutral-800 text-neutral-400 text-sm">
              No projects found matching your search. Click &quot;Add New Project&quot; above to create one.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
