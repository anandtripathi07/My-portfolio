import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import {
  X,
  Save,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  Trash2,
} from 'lucide-react';

export const EditProfileModal: React.FC = () => {
  const {
    profile,
    isEditProfileOpen,
    setIsEditProfileOpen,
    updatePersonalInfo,
    addExperience,
    deleteExperience,
    addEducation,
    deleteEducation,
    addCertification,
    deleteCertification,
  } = useProfile();

  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'certifications'>('personal');

  // Local state for personal info form
  const [personalForm, setPersonalForm] = useState({ ...profile.personalInfo });

  // New experience form state
  const [newExp, setNewExp] = useState({
    company: '',
    role: '',
    employmentType: 'Internship',
    period: '',
    location: 'Mumbai, India',
    responsibilitiesText: '',
    skillsText: '',
  });

  // New education form state
  const [newEdu, setNewEdu] = useState({
    institution: '',
    qualification: '',
    field: 'Information Technology',
    period: '',
    location: 'Mumbai, India',
    status: 'In Progress',
    details: '',
  });

  // New cert form state
  const [newCert, setNewCert] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    credentialId: '',
    credentialUrl: '',
    skillsText: '',
  });

  if (!isEditProfileOpen) return null;

  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(personalForm);
    setIsEditProfileOpen(false);
  };

  const handleAddExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExp.role || !newExp.company) return;
    addExperience({
      company: newExp.company,
      role: newExp.role,
      employmentType: newExp.employmentType,
      period: newExp.period || '2024',
      location: newExp.location,
      responsibilities: newExp.responsibilitiesText
        ? newExp.responsibilitiesText.split('\n').map((r) => r.trim()).filter(Boolean)
        : ['Assisted in engineering projects and core pipeline tasks'],
      skills: newExp.skillsText ? newExp.skillsText.split(',').map((s) => s.trim()).filter(Boolean) : [],
      isVerified: true,
    });
    setNewExp({
      company: '',
      role: '',
      employmentType: 'Internship',
      period: '',
      location: 'Mumbai, India',
      responsibilitiesText: '',
      skillsText: '',
    });
  };

  const handleAddEducationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEdu.institution || !newEdu.qualification) return;
    addEducation({
      institution: newEdu.institution,
      qualification: newEdu.qualification,
      field: newEdu.field,
      period: newEdu.period || '2024 – Present',
      location: newEdu.location,
      status: newEdu.status,
      details: newEdu.details || 'Coursework in advanced engineering and computer science.',
      achievements: [],
      isVerified: true,
    });
    setNewEdu({
      institution: '',
      qualification: '',
      field: 'Information Technology',
      period: '',
      location: 'Mumbai, India',
      status: 'In Progress',
      details: '',
    });
  };

  const handleAddCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.title || !newCert.issuer) return;
    addCertification({
      title: newCert.title,
      issuer: newCert.issuer,
      issueDate: newCert.issueDate || '2024',
      credentialId: newCert.credentialId,
      credentialUrl: newCert.credentialUrl,
      skills: newCert.skillsText ? newCert.skillsText.split(',').map((s) => s.trim()).filter(Boolean) : [],
      isVerified: true,
    });
    setNewCert({
      title: '',
      issuer: '',
      issueDate: '',
      credentialId: '',
      credentialUrl: '',
      skillsText: '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs"
        onClick={() => setIsEditProfileOpen(false)}
      />

      <div className="relative z-10 w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-100">
              Profile Management Studio
            </h3>
            <p className="text-xs text-neutral-400">
              Customize Anand Tripathi&apos;s personal details, headlines, experience, and academic records.
            </p>
          </div>
          <button
            onClick={() => setIsEditProfileOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/60 px-4 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'personal'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Personal & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'experience'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience ({profile.experience.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'education'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Education ({profile.education.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certifications')}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'certifications'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Certifications ({profile.certifications.length})</span>
          </button>
        </div>

        {/* Tab 1: Personal Info */}
        {activeTab === 'personal' && (
          <form onSubmit={handleSavePersonalInfo} className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={personalForm.name}
                  onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                  className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Professional Role</label>
                <input
                  type="text"
                  value={personalForm.role}
                  onChange={(e) => setPersonalForm({ ...personalForm, role: e.target.value })}
                  className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Hero Headline</label>
              <input
                type="text"
                value={personalForm.headline}
                onChange={(e) => setPersonalForm({ ...personalForm, headline: e.target.value })}
                className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Hero Subheadline</label>
              <textarea
                rows={2}
                value={personalForm.subheadline}
                onChange={(e) => setPersonalForm({ ...personalForm, subheadline: e.target.value })}
                className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">About Me / Bio</label>
              <textarea
                rows={4}
                value={personalForm.bio}
                onChange={(e) => setPersonalForm({ ...personalForm, bio: e.target.value })}
                className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Email</label>
                <input
                  type="email"
                  value={personalForm.email}
                  onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                  className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Location</label>
                <input
                  type="text"
                  value={personalForm.location}
                  onChange={(e) => setPersonalForm({ ...personalForm, location: e.target.value })}
                  className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Availability Status</label>
                <input
                  type="text"
                  value={personalForm.availability}
                  onChange={(e) => setPersonalForm({ ...personalForm, availability: e.target.value })}
                  className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={personalForm.linkedinUrl}
                  onChange={(e) => setPersonalForm({ ...personalForm, linkedinUrl: e.target.value })}
                  className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={personalForm.githubUrl || ''}
                  onChange={(e) => setPersonalForm({ ...personalForm, githubUrl: e.target.value })}
                  className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Instagram URL (Optional)</label>
                <input
                  type="text"
                  value={personalForm.instagramUrl || ''}
                  onChange={(e) => setPersonalForm({ ...personalForm, instagramUrl: e.target.value })}
                  className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditProfileOpen(false)}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Info</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Experience Management */}
        {activeTab === 'experience' && (
          <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
            {/* Existing records */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Current Experience Records
              </h4>
              {profile.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-neutral-200">{exp.role}</span>
                    <span className="text-neutral-400"> at {exp.company}</span>
                    <span className="block text-[11px] font-mono text-neutral-400 mt-0.5">{exp.period}</span>
                  </div>
                  <button
                    onClick={() => deleteExperience(exp.id)}
                    className="p-1 text-neutral-400 hover:text-rose-400 transition-colors"
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new experience */}
            <form onSubmit={handleAddExperienceSubmit} className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3">
              <h4 className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-indigo-400" />
                Add New Internship / Role
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Role (e.g. AI/ML Engineering Intern)"
                  value={newExp.role}
                  onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                  className="text-xs bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
                />
                <input
                  type="text"
                  required
                  placeholder="Company / Organization Name"
                  value={newExp.company}
                  onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                  className="text-xs bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Period (e.g. June 2024 – Aug 2024)"
                  value={newExp.period}
                  onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
                  className="text-xs bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Employment Type (Internship)"
                  value={newExp.employmentType}
                  onChange={(e) => setNewExp({ ...newExp, employmentType: e.target.value })}
                  className="text-xs bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Location (Mumbai, India)"
                  value={newExp.location}
                  onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
                  className="text-xs bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
                />
              </div>

              <textarea
                rows={2}
                placeholder="Responsibilities (one per line)"
                value={newExp.responsibilitiesText}
                onChange={(e) => setNewExp({ ...newExp, responsibilitiesText: e.target.value })}
                className="w-full text-xs bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
              />

              <input
                type="text"
                placeholder="Skills used (comma-separated: Python, Pandas, Scikit-Learn)"
                value={newExp.skillsText}
                onChange={(e) => setNewExp({ ...newExp, skillsText: e.target.value })}
                className="w-full text-xs bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
              />

              <button
                type="submit"
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium"
              >
                Add Experience Record
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Education Management */}
        {activeTab === 'education' && (
          <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Current Education Credentials
              </h4>
              {profile.education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-neutral-200">{edu.qualification}</span>
                    <span className="text-neutral-400"> at {edu.institution}</span>
                    <span className="block text-[11px] font-mono text-neutral-400 mt-0.5">{edu.period} · {edu.status}</span>
                  </div>
                  <button
                    onClick={() => deleteEducation(edu.id)}
                    className="p-1 text-neutral-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddEducationSubmit} className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3">
              <h4 className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-indigo-400" />
                Add Academic Degree / Program
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Institution (e.g. Thakur College of Engineering)"
                  value={newEdu.institution}
                  onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
                  className="text-xs bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
                />
                <input
                  type="text"
                  required
                  placeholder="Degree / Qualification"
                  value={newEdu.qualification}
                  onChange={(e) => setNewEdu({ ...newEdu, qualification: e.target.value })}
                  className="text-xs bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Field of Study"
                  value={newEdu.field}
                  onChange={(e) => setNewEdu({ ...newEdu, field: e.target.value })}
                  className="text-xs bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Period (e.g. 2024 – 2027)"
                  value={newEdu.period}
                  onChange={(e) => setNewEdu({ ...newEdu, period: e.target.value })}
                  className="text-xs bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Status (Pursuing / Graduated)"
                  value={newEdu.status}
                  onChange={(e) => setNewEdu({ ...newEdu, status: e.target.value })}
                  className="text-xs bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
                />
              </div>

              <button
                type="submit"
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium"
              >
                Add Academic Record
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Certifications */}
        {activeTab === 'certifications' && (
          <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Current Credentials
              </h4>
              {profile.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-neutral-200">{cert.title}</span>
                    <span className="text-neutral-400"> ({cert.issuer})</span>
                    <span className="block text-[11px] font-mono text-neutral-400 mt-0.5">{cert.issueDate}</span>
                  </div>
                  <button
                    onClick={() => deleteCertification(cert.id)}
                    className="p-1 text-neutral-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddCertSubmit} className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3">
              <h4 className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-indigo-400" />
                Add Certification
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Certificate Title"
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  className="text-xs bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
                />
                <input
                  type="text"
                  required
                  placeholder="Issuing Organization"
                  value={newCert.issuer}
                  onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                  className="text-xs bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Issue Date / Year"
                  value={newCert.issueDate}
                  onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })}
                  className="text-xs bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Credential ID"
                  value={newCert.credentialId}
                  onChange={(e) => setNewCert({ ...newCert, credentialId: e.target.value })}
                  className="text-xs bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Verification URL"
                  value={newCert.credentialUrl}
                  onChange={(e) => setNewCert({ ...newCert, credentialUrl: e.target.value })}
                  className="text-xs bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
                />
              </div>

              <button
                type="submit"
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium"
              >
                Add Certificate Record
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
