import React, { useState, useEffect } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { ProjectItem } from '../../types/portfolio';
import { X, Save, FolderGit2 } from 'lucide-react';

export const AddEditProjectModal: React.FC = () => {
  const {
    isAddProjectOpen,
    setIsAddProjectOpen,
    editingProject,
    setEditingProject,
    addProject,
    updateProject,
  } = useProfile();

  const isOpen = isAddProjectOpen || editingProject !== null;

  const [formData, setFormData] = useState({
    title: '',
    category: 'AI and Machine Learning',
    tagline: '',
    overview: '',
    fullDescription: '',
    featuresText: '',
    techText: '',
    githubUrl: '',
    demoUrl: '',
    status: 'Active Development',
  });

  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        category: editingProject.category,
        tagline: editingProject.tagline || '',
        overview: editingProject.overview,
        fullDescription: editingProject.fullDescription || '',
        featuresText: editingProject.features.join('\n'),
        techText: editingProject.technologies.join(', '),
        githubUrl: editingProject.githubUrl || '',
        demoUrl: editingProject.demoUrl || '',
        status: editingProject.status,
      });
    } else {
      setFormData({
        title: '',
        category: 'AI and Machine Learning',
        tagline: '',
        overview: '',
        fullDescription: '',
        featuresText: '',
        techText: 'Python, Machine Learning',
        githubUrl: '',
        demoUrl: '',
        status: 'Active Development',
      });
    }
  }, [editingProject, isAddProjectOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsAddProjectOpen(false);
    setEditingProject(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.overview.trim()) return;

    const technologies = formData.techText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const features = formData.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    if (editingProject) {
      updateProject(editingProject.id, {
        title: formData.title.trim(),
        category: formData.category,
        tagline: formData.tagline.trim(),
        overview: formData.overview.trim(),
        fullDescription: formData.fullDescription.trim(),
        features,
        technologies,
        githubUrl: formData.githubUrl.trim(),
        demoUrl: formData.demoUrl.trim(),
        status: formData.status,
      });
    } else {
      addProject({
        title: formData.title.trim(),
        category: formData.category,
        tagline: formData.tagline.trim(),
        overview: formData.overview.trim(),
        fullDescription: formData.fullDescription.trim(),
        features,
        technologies,
        githubUrl: formData.githubUrl.trim(),
        demoUrl: formData.demoUrl.trim(),
        status: formData.status,
        isVerified: true,
      });
    }

    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xs" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-neutral-100">
              {editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Project'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Project Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Meowlytics, LAWGIC"
                className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-200 focus:outline-hidden focus:border-indigo-500"
              >
                <option value="AI and Machine Learning">AI and Machine Learning</option>
                <option value="AI-Powered Legal Technology">AI-Powered Legal Technology</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Web Applications">Web Applications</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Short Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g. Cat Sound Sentiment Analysis & Behavioral Audio Intelligence"
              className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Brief Overview <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              placeholder="High-level 2-line summary of what the system does..."
              className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              In-Depth Architecture / Description
            </label>
            <textarea
              rows={3}
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              placeholder="Detailed methodology, dataset handling, and technical choices..."
              className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Key Features (One feature per line)
            </label>
            <textarea
              rows={3}
              value={formData.featuresText}
              onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
              placeholder="Audio feature extraction using MFCCs&#10;Supervised affective classification&#10;Spectrogram analysis inspector"
              className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 font-mono focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Technologies (Comma-separated)
            </label>
            <input
              type="text"
              value={formData.techText}
              onChange={(e) => setFormData({ ...formData, techText: e.target.value })}
              placeholder="Python, Librosa, Scikit-Learn, Audio DSP, React"
              className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 font-mono focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                GitHub Repository URL
              </label>
              <input
                type="text"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Live Demo URL
              </label>
              <input
                type="text"
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                placeholder="https://demo..."
                className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-200 focus:outline-hidden focus:border-indigo-500"
              >
                <option value="Active Development">Active Development</option>
                <option value="Completed / Prototype">Completed / Prototype</option>
                <option value="Research & Prototype">Research & Prototype</option>
                <option value="Production Ready">Production Ready</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{editingProject ? 'Save Changes' : 'Create Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
