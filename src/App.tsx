import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ProfileProvider, useProfile, SectionId } from './context/ProfileContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';

// Sections
import { HeroSection } from './components/sections/HeroSection';
import { OverviewCards } from './components/sections/OverviewCards';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceTimeline } from './components/sections/ExperienceTimeline';
import { SkillsGrid } from './components/sections/SkillsGrid';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { EducationTimeline } from './components/sections/EducationTimeline';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';

// Modals
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { AddEditProjectModal } from './components/modals/AddEditProjectModal';
import { EditProfileModal } from './components/modals/EditProfileModal';
import { ResumeImportModal } from './components/modals/ResumeImportModal';
import { ResumeViewerModal } from './components/modals/ResumeViewerModal';
import { ToastContainer } from './components/ui/Toast';

const DashboardContent: React.FC = () => {
  const { setActiveSection } = useProfile();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Scroll spy to highlight active section in sidebar
  useEffect(() => {
    const sectionIds: SectionId[] = [
      'overview',
      'about',
      'experience',
      'skills',
      'projects',
      'education',
      'certifications',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col md:flex-row antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Persistent Desktop Sidebar */}
      <div className="hidden md:block w-64 shrink-0 h-screen sticky top-0 z-30">
        <Sidebar />
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Sticky Top Navbar */}
        <Navbar onToggleMobileMenu={() => setIsMobileNavOpen(true)} />

        {/* Page Container */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
          <HeroSection />
          <OverviewCards />
          <AboutSection />
          <ExperienceTimeline />
          <SkillsGrid />
          <ProjectsSection />
          <EducationTimeline />
          <CertificationsSection />
          <ContactSection />
          <Footer />
        </main>
      </div>

      {/* Global Interactive Modals */}
      <ProjectDetailModal />
      <AddEditProjectModal />
      <EditProfileModal />
      <ResumeImportModal />
      <ResumeViewerModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <DashboardContent />
      </ProfileProvider>
    </ThemeProvider>
  );
}
