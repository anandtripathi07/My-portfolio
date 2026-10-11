import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProfileData,
  PersonalInfo,
  SkillItem,
  ProjectItem,
  ExperienceItem,
  EducationItem,
  CertificationItem,
} from '../types/portfolio';
import { initialProfileData } from '../data/profile';

const STORAGE_KEY = 'anand_tripathi_profile_v1';

export type SectionId =
  | 'overview'
  | 'about'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'education'
  | 'certifications'
  | 'contact';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface ProfileContextType {
  profile: ProfileData;
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  scrollToSection: (section: SectionId) => void;
  
  // Updates
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;
  
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  
  addEducation: (edu: Omit<EducationItem, 'id'>) => void;
  updateEducation: (id: string, edu: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;
  
  addCertification: (cert: Omit<CertificationItem, 'id'>) => void;
  updateCertification: (id: string, cert: Partial<CertificationItem>) => void;
  deleteCertification: (id: string) => void;

  resetToDefaults: () => void;
  importFullProfile: (data: ProfileData) => void;
  exportProfileJSON: () => void;
  
  // Modals & UI
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: (open: boolean) => void;
  isResumeImportOpen: boolean;
  setIsResumeImportOpen: (open: boolean) => void;
  selectedProject: ProjectItem | null;
  setSelectedProject: (project: ProjectItem | null) => void;
  editingProject: ProjectItem | null;
  setEditingProject: (project: ProjectItem | null) => void;
  isAddProjectOpen: boolean;
  setIsAddProjectOpen: (open: boolean) => void;
  isResumeViewerOpen: boolean;
  setIsResumeViewerOpen: (open: boolean) => void;

  // Feedback Toast
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.personalInfo && parsed.projects) {
            return parsed;
          }
        }
      } catch (e) {
        console.error('Failed to load saved profile data from localStorage', e);
      }
    }
    return initialProfileData;
  });

  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isResumeImportOpen, setIsResumeImportOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isResumeViewerOpen, setIsResumeViewerOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist to localStorage whenever profile changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile to localStorage', e);
    }
  }, [profile]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const scrollToSection = (section: SectionId) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const updatePersonalInfo = (data: Partial<PersonalInfo>) => {
    setProfile((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data },
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
    showToast('Personal information updated');
  };

  const addSkill = (skill: Omit<SkillItem, 'id'>) => {
    const newSkill: SkillItem = {
      ...skill,
      id: `skill-${Date.now()}`,
    };
    setProfile((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
    showToast(`Added skill: ${skill.name}`);
  };

  const updateSkill = (id: string, skill: Partial<SkillItem>) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...skill } : s)),
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
    showToast('Skill updated');
  };

  const deleteSkill = (id: string) => {
    const skillName = profile.skills.find((s) => s.id === id)?.name || 'Skill';
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
    showToast(`Removed ${skillName}`, 'info');
  };

  const addProject = (proj: Omit<ProjectItem, 'id'>) => {
    const newProject: ProjectItem = {
      ...proj,
      id: `proj-${Date.now()}`,
    };
    setProfile((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
    showToast(`Added project: ${proj.title}`);
  };

  const updateProject = (id: string, proj: Partial<ProjectItem>) => {
    setProfile((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...proj } : p)),
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
    showToast('Project updated');
  };

  const deleteProject = (id: string) => {
    const title = profile.projects.find((p) => p.id === id)?.title || 'Project';
    setProfile((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
    showToast(`Deleted ${title}`, 'info');
  };

  const addExperience = (exp: Omit<ExperienceItem, 'id'>) => {
    const newExp: ExperienceItem = {
      ...exp,
      id: `exp-${Date.now()}`,
    };
    setProfile((prev) => ({
      ...prev,
      experience: [newExp, ...prev.experience],
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
    showToast(`Added experience: ${exp.role}`);
  };

  const updateExperience = (id: string, exp: Partial<ExperienceItem>) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, ...exp } : e)),
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
    showToast('Experience updated');
  };

  const deleteExperience = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
    showToast('Experience removed', 'info');
  };

  const addEducation = (edu: Omit<EducationItem, 'id'>) => {
    const newEdu: EducationItem = {
      ...edu,
      id: `edu-${Date.now()}`,
    };
    setProfile((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
    showToast(`Added education record`);
  };

  const updateEducation = (id: string, edu: Partial<EducationItem>) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...edu } : e)),
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
    showToast('Education record updated');
  };

  const deleteEducation = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
    showToast('Education entry deleted', 'info');
  };

  const addCertification = (cert: Omit<CertificationItem, 'id'>) => {
    const newCert: CertificationItem = {
      ...cert,
      id: `cert-${Date.now()}`,
    };
    setProfile((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
    showToast(`Added credential: ${cert.title}`);
  };

  const updateCertification = (id: string, cert: Partial<CertificationItem>) => {
    setProfile((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) => (c.id === id ? { ...c, ...cert } : c)),
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
    showToast('Certification updated');
  };

  const deleteCertification = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
      lastUpdated: new Date().toISOString().split('T')[0],
    }));
    showToast('Certification removed', 'info');
  };

  const resetToDefaults = () => {
    setProfile(initialProfileData);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Profile restored to default verified values', 'info');
  };

  const importFullProfile = (data: ProfileData) => {
    setProfile(data);
    showToast('Profile successfully imported and applied!');
  };

  const exportProfileJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `anand_tripathi_profile_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Profile backup exported as JSON file');
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        activeSection,
        setActiveSection,
        scrollToSection,
        updatePersonalInfo,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addCertification,
        updateCertification,
        deleteCertification,
        resetToDefaults,
        importFullProfile,
        exportProfileJSON,
        isEditProfileOpen,
        setIsEditProfileOpen,
        isResumeImportOpen,
        setIsResumeImportOpen,
        selectedProject,
        setSelectedProject,
        editingProject,
        setEditingProject,
        isAddProjectOpen,
        setIsAddProjectOpen,
        isResumeViewerOpen,
        setIsResumeViewerOpen,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
