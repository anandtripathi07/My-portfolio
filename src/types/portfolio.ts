export interface PersonalInfo {
  name: string;
  role: string;
  headline: string;
  subheadline: string;
  bio: string;
  email: string;
  location: string;
  availability: string;
  linkedinUrl: string;
  githubUrl?: string;
  instagramUrl?: string;
  portfolioWebsite?: string;
  resumeFileName?: string;
  verifiedFromLinkedIn: boolean;
  avatarUrl?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  iconName?: string;
  isVerified?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  overview: string;
  fullDescription: string;
  features: string[];
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  isVerified: boolean;
  status: string;
  accentColor?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  employmentType: string;
  period: string;
  location: string;
  responsibilities: string[];
  skills: string[];
  link?: string;
  isVerified: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  qualification: string;
  field: string;
  period: string;
  location: string;
  status: string;
  details: string;
  achievements: string[];
  isVerified: boolean;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
  isVerified: boolean;
}

export interface ProfileData {
  personalInfo: PersonalInfo;
  skills: SkillItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  lastUpdated: string;
}
