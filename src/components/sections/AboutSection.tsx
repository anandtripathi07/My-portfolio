import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import {
  Sparkles,
  Edit3,
  Cpu,
  Database,
  Globe,
  Share2,
  CheckCircle,
  Lightbulb,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { profile, setIsEditProfileOpen } = useProfile();
  const { personalInfo } = profile;

  const focusPillars = [
    {
      title: 'Artificial Intelligence & ML',
      description:
        'Building applied machine learning systems, from acoustic audio sentiment classification (Meowlytics) to bilingual legal intelligence NLP pipelines (LAWGIC).',
      icon: Cpu,
      color: 'text-indigo-400',
    },
    {
      title: 'Data Analytics & Insights',
      description:
        'Cleaning, analyzing, and visualizing multi-dimensional datasets with Pandas, NumPy, and SQL to extract actionable insights and quantitative patterns.',
      icon: Database,
      color: 'text-cyan-400',
    },
    {
      title: 'Software Development',
      description:
        'Crafting modern responsive web applications and backend scripts with JavaScript, TypeScript, React, Python, and robust API architectures.',
      icon: Globe,
      color: 'text-emerald-400',
    },
    {
      title: 'Digital Marketing & Content',
      description:
        'Communicating complex engineering and technology concepts clearly through digital media, technical content, and data-driven audience engagement.',
      icon: Share2,
      color: 'text-purple-400',
    },
  ];

  return (
    <section id="about" className="py-12 border-t border-neutral-800/80">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
              01 · Background & Motivation
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100 tracking-tight">
              About Anand Tripathi
            </h2>
          </div>

          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg text-xs font-medium text-neutral-300 hover:text-neutral-100 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Edit About Info</span>
          </button>
        </div>

        {/* Narrative & Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story & Bio */}
          <div className="lg:col-span-7 space-y-5 text-neutral-300 text-sm leading-relaxed">
            <p className="text-base text-neutral-200 leading-relaxed">
              I am an Information Technology diploma graduate from{' '}
              <strong className="text-neutral-100 font-semibold">Thakur Polytechnic</strong>{' '}
              in Mumbai, currently preparing for the next stage of my engineering education.
              Throughout my diploma journey, I discovered my passion at the intersection of
              pragmatic software engineering, artificial intelligence, and applied data science.
            </p>

            <p>
              Rather than viewing technology solely in the classroom, I actively construct real-world
              solutions. Through projects like{' '}
              <span className="text-indigo-300 font-medium">Meowlytics</span>, I explored audio digital
              signal processing and affective state classification for feline acoustic vocalizations.
              With <span className="text-blue-300 font-medium">LAWGIC</span>, I developed a prototype
              bilingual legal intelligence platform assisting in Indian Penal Code (IPC) statutory
              recommendations and case brief summarization.
            </p>

            <p>
              My hands-on internships across AI/ML engineering, data analysis, and digital marketing
              have instilled a deep appreciation for disciplined code, empirical data validation, and
              the necessity of communicating technical impact to end-users clearly and authentically.
            </p>

            {/* Core Values / Strengths list */}
            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                Key Strengths & Principles
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Disciplined Problem Solving</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Curious & Continuous Learner</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Pragmatic Systems Thinker</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Empathetic Technical Communicator</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Technical Pillars */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Core Technical Focus Areas
            </div>

            {focusPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700/80 transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Icon className={`w-4 h-4 ${pillar.color}`} />
                    <h3 className="text-xs font-bold text-neutral-100">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}

            {/* Learning Goals Banner */}
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex items-start gap-3">
              <Lightbulb className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div className="text-xs text-neutral-300">
                <span className="font-semibold text-neutral-100 block mb-0.5">
                  Current Learning Agenda
                </span>
                Deepening knowledge in transformer model architectures, distributed data
                processing, and production engineering deployment.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
