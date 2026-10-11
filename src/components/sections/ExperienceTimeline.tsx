import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import { Briefcase, Calendar, MapPin, Plus, Edit3, Trash2, CheckCircle2 } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const { profile, setIsEditProfileOpen, deleteExperience } = useProfile();
  const { experience } = profile;

  return (
    <section id="experience" className="py-12 border-t border-neutral-800/80">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
              02 · Career & Internships
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100 tracking-tight">
              Work & Internship Experience
            </h2>
            <p className="text-xs text-neutral-400">
              Confirmed experiences verified from profile details. Click edit to refine company names and dates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg text-xs font-medium text-neutral-300 hover:text-neutral-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-400" />
              <span>Add / Edit Experience</span>
            </button>
          </div>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 sm:before:left-4 before:w-px before:bg-neutral-800">
          {experience.map((item) => (
            <div key={item.id} className="relative flex items-start gap-4 sm:gap-6 group">
              {/* Timeline marker node */}
              <div className="relative z-10 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-neutral-900 border-2 border-indigo-500 flex items-center justify-center shrink-0 mt-1 shadow-md">
                <Briefcase className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-indigo-400" />
              </div>

              {/* Card Container */}
              <div className="flex-1 p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700/80 transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/60 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-neutral-100">
                      {item.role}
                    </h3>
                    <div className="text-xs text-indigo-300 font-medium mt-0.5">
                      {item.company}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="font-mono text-[11px]">{item.period}</span>
                    </span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{item.location}</span>
                    </span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span className="text-neutral-300 font-mono text-[11px] bg-neutral-800/70 px-2 py-0.5 rounded">
                      {item.employmentType}
                    </span>
                  </div>
                </div>

                {/* Responsibilities list */}
                <div className="my-4 space-y-2">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    Key Contributions & Responsibilities
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {item.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400/80 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills tags */}
                <div className="pt-3 border-t border-neutral-800/60 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-400">
                    <span className="text-[11px] text-neutral-400 mr-1">Skills applied:</span>
                    {item.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-neutral-800/80 border border-neutral-700/60 text-neutral-200 px-2 py-0.5 rounded text-[11px] font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setIsEditProfileOpen(true)}
                      className="p-1 text-neutral-400 hover:text-indigo-400 transition-colors"
                      title="Edit this role"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteExperience(item.id)}
                      className="p-1 text-neutral-400 hover:text-rose-400 transition-colors"
                      title="Delete experience"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
