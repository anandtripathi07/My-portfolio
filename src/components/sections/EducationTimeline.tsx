import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import { GraduationCap, Calendar, MapPin, CheckCircle2, Edit3, Plus, Trash2 } from 'lucide-react';

export const EducationTimeline: React.FC = () => {
  const { profile, setIsEditProfileOpen, deleteEducation } = useProfile();
  const { education } = profile;

  return (
    <section id="education" className="py-12 border-t border-neutral-800/80">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
              05 · Academic Foundations
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100 tracking-tight">
              Education & Engineering Progression
            </h2>
            <p className="text-xs text-neutral-400">
              Verified diploma credentials and engineering academic timeline.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg text-xs font-medium text-neutral-300 hover:text-neutral-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-400" />
              <span>Add / Update Education</span>
            </button>
          </div>
        </div>

        {/* Education Timeline */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 sm:before:left-4 before:w-px before:bg-neutral-800">
          {education.map((item) => (
            <div key={item.id} className="relative flex items-start gap-4 sm:gap-6 group">
              {/* Node Icon */}
              <div className="relative z-10 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-neutral-900 border-2 border-emerald-500 flex items-center justify-center shrink-0 mt-1 shadow-md">
                <GraduationCap className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-400" />
              </div>

              {/* Card Container */}
              <div className="flex-1 p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700/80 transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/60 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-neutral-100">
                      {item.qualification}
                    </h3>
                    <div className="text-xs text-emerald-400 font-medium mt-0.5">
                      {item.institution}
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
                    <span className="font-mono text-[11px] bg-neutral-800/80 px-2 py-0.5 rounded text-neutral-200">
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="my-3 text-xs text-neutral-300 leading-relaxed">
                  {item.details}
                </div>

                {item.achievements.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-neutral-800/60 space-y-1.5">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                      Key Highlights & Coursework
                    </div>
                    <ul className="space-y-1 text-xs text-neutral-300">
                      {item.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-3 pt-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEditProfileOpen(true)}
                      className="p-1 text-neutral-400 hover:text-indigo-400 transition-colors"
                      title="Edit education"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteEducation(item.id)}
                      className="p-1 text-neutral-400 hover:text-rose-400 transition-colors"
                      title="Delete education"
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
