import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import { Wrench, FolderGit2, Briefcase, GraduationCap, ArrowUpRight } from 'lucide-react';

export const OverviewCards: React.FC = () => {
  const { profile, scrollToSection } = useProfile();
  const { skills, projects, experience, education } = profile;

  // Categories count
  const skillCategories = Array.from(new Set(skills.map((s) => s.category)));

  const cards = [
    {
      title: 'Technical Skills',
      value: `${skills.length} Skills`,
      subtitle: `${skillCategories.length} Domains (Frontend, Python, AI/ML, Data)`,
      icon: Wrench,
      targetSection: 'skills' as const,
      color: 'text-indigo-400',
      tag: 'Verified Stack',
    },
    {
      title: 'Engineering Projects',
      value: `${projects.length} Systems`,
      subtitle: 'Meowlytics & LAWGIC AI Architectures',
      icon: FolderGit2,
      targetSection: 'projects' as const,
      color: 'text-cyan-400',
      tag: 'Audio DSP & Legal Tech',
    },
    {
      title: 'Internship Experience',
      value: `${experience.length} Roles`,
      subtitle: 'AI/ML, Data Analytics & Tech Media',
      icon: Briefcase,
      targetSection: 'experience' as const,
      color: 'text-purple-400',
      tag: 'Hands-on Applied',
    },
    {
      title: 'Education',
      value: 'Diploma in IT',
      subtitle: 'Thakur Polytechnic → Next Stage',
      icon: GraduationCap,
      targetSection: 'education' as const,
      color: 'text-emerald-400',
      tag: 'Computer Engineering',
    },
  ];

  return (
    <section className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => scrollToSection(card.targetSection)}
              className="group cursor-pointer p-5 rounded-xl bg-neutral-900/60 hover:bg-neutral-900/90 border border-neutral-800/80 hover:border-neutral-700/80 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${card.color}`} />
                    <span className="font-medium text-neutral-300">{card.title}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-200 transition-colors" />
                </div>

                <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-100 tracking-tight tabular-nums">
                  {card.value}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-800/60 text-xs text-neutral-400 flex items-center justify-between">
                <span className="truncate">{card.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
