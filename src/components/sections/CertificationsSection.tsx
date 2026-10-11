import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import { Award, ExternalLink, Plus, Edit3, Trash2, Calendar, CheckCircle } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  const { profile, setIsEditProfileOpen, deleteCertification } = useProfile();
  const { certifications } = profile;

  return (
    <section id="certifications" className="py-12 border-t border-neutral-800/80">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
              06 · Credentials & Accreditations
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100 tracking-tight">
              Certifications & Training
            </h2>
            <p className="text-xs text-neutral-400">
              Technical coursework and verified foundational certifications.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg text-xs font-medium text-neutral-300 hover:text-neutral-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-400" />
              <span>Add Certification</span>
            </button>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="group p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700/80 flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-400 shrink-0" />
                    <h3 className="text-sm font-bold text-neutral-100">
                      {cert.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setIsEditProfileOpen(true)}
                      className="p-1 text-neutral-400 hover:text-indigo-400 transition-colors"
                      title="Edit certification"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteCertification(cert.id)}
                      className="p-1 text-neutral-400 hover:text-rose-400 transition-colors"
                      title="Delete certification"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-indigo-300/90 font-medium">
                  {cert.issuer}
                </div>

                <div className="flex items-center gap-2 text-xs text-neutral-400 mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-neutral-500" />
                    <span className="font-mono text-[11px]">{cert.issueDate}</span>
                  </span>
                  {cert.credentialId && (
                    <>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="font-mono text-[11px] text-neutral-400">
                        ID: {cert.credentialId}
                      </span>
                    </>
                  )}
                </div>

                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-neutral-800/60">
                    {cert.skills.map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-neutral-800/60 text-neutral-300 rounded text-[10px] font-mono"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {cert.credentialUrl && (
                <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verified Credential
                  </span>

                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>View Record</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
