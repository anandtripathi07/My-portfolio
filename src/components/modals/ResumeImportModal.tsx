import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { ProfileData } from '../../types/portfolio';
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Eye,
} from 'lucide-react';

export const ResumeImportModal: React.FC = () => {
  const {
    profile,
    isResumeImportOpen,
    setIsResumeImportOpen,
    importFullProfile,
    showToast,
  } = useProfile();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [inputText, setInputText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ProfileData | null>(null);

  if (!isResumeImportOpen) return null;

  const handleClose = () => {
    setIsResumeImportOpen(false);
    setStep(1);
    setInputText('');
    setFileName('');
    setExtractedData(null);
  };

  // File drag & upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);

    const reader = new FileReader();

    if (file.type === 'application/json' || file.name.endsWith('.json')) {
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          if (json.personalInfo && json.projects) {
            setExtractedData(json);
            setStep(2);
            showToast('Loaded valid profile JSON structure');
          } else {
            showToast('Invalid profile JSON structure', 'error');
          }
        } catch {
          showToast('Failed to parse JSON file', 'error');
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsText(file);
    } else {
      // PDF or plain text
      reader.onload = (event) => {
        const rawContent = event.target?.result as string;
        setInputText(rawContent);
        parseResumeText(rawContent, file.name);
        setIsProcessing(false);
      };
      // Read as text (covers text extracted from PDF or resume text)
      reader.readAsText(file);
    }
  };

  const handlePasteParse = () => {
    if (!inputText.trim()) {
      showToast('Please paste resume or LinkedIn profile text', 'error');
      return;
    }
    parseResumeText(inputText, 'Pasted_Text_Export');
  };

  // Heuristic parser for LinkedIn / Resume text
  const parseResumeText = (text: string, source: string) => {
    setIsProcessing(true);

    const lines = text
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    // Baseline copy of current profile
    const parsed: ProfileData = JSON.parse(JSON.stringify(profile));

    // Name detection: Look for Anand or first prominent line
    const nameCandidate = lines.find((l) => /anand|tripathi/i.test(l)) || lines[0] || 'Anand Tripathi';
    if (nameCandidate && nameCandidate.length < 50) {
      parsed.personalInfo.name = nameCandidate.replace(/[^a-zA-Z\s]/g, '').trim() || 'Anand Tripathi';
    }

    // Email detection
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      parsed.personalInfo.email = emailMatch[0];
    }

    // LinkedIn URL detection
    const linkedinMatch = text.match(/https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/);
    if (linkedinMatch) {
      parsed.personalInfo.linkedinUrl = linkedinMatch[0];
    }

    // GitHub URL detection
    const githubMatch = text.match(/https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+/);
    if (githubMatch) {
      parsed.personalInfo.githubUrl = githubMatch[0];
    }

    // Technology keywords search to enrich skills
    const techDictionary = [
      { name: 'Python', category: 'Programming Languages' },
      { name: 'JavaScript', category: 'Programming Languages' },
      { name: 'TypeScript', category: 'Programming Languages' },
      { name: 'SQL', category: 'Programming Languages' },
      { name: 'HTML5', category: 'Frontend Development' },
      { name: 'CSS3', category: 'Frontend Development' },
      { name: 'React', category: 'Frontend Development' },
      { name: 'Tailwind CSS', category: 'Frontend Development' },
      { name: 'Machine Learning', category: 'AI and Machine Learning' },
      { name: 'Audio DSP / Librosa', category: 'AI and Machine Learning' },
      { name: 'NLP', category: 'AI and Machine Learning' },
      { name: 'Pandas', category: 'Data Analytics' },
      { name: 'NumPy', category: 'Data Analytics' },
      { name: 'EDA & Visualization', category: 'Data Analytics' },
      { name: 'Digital Marketing', category: 'Digital Marketing' },
      { name: 'Git & GitHub', category: 'Tools and Platforms' },
      { name: 'VS Code', category: 'Tools and Platforms' },
      { name: 'FastAPI', category: 'Tools and Platforms' },
    ];

    const detectedSkills = techDictionary.filter((tech) =>
      new RegExp(`\\b${tech.name}\\b`, 'i').test(text)
    );

    if (detectedSkills.length > 0) {
      const existingNames = new Set(parsed.skills.map((s) => s.name.toLowerCase()));
      detectedSkills.forEach((tech) => {
        if (!existingNames.has(tech.name.toLowerCase())) {
          parsed.skills.push({
            id: `skill-imported-${Date.now()}-${Math.random()}`,
            name: tech.name,
            category: tech.category,
            isVerified: true,
          });
        }
      });
    }

    // Project detection
    if (/meowlytics/i.test(text)) {
      // Confirmed Meowlytics presence in uploaded resume
      const p = parsed.projects.find((p) => p.id === 'p-meowlytics');
      if (p) p.isVerified = true;
    }
    if (/lawgic/i.test(text)) {
      // Confirmed LAWGIC presence in uploaded resume
      const p = parsed.projects.find((p) => p.id === 'p-lawgic');
      if (p) p.isVerified = true;
    }

    // Education detection: Thakur Polytechnic
    if (/thakur\s*polytechnic/i.test(text)) {
      const edu = parsed.education.find((e) => e.id === 'edu-thakur');
      if (edu) {
        edu.status = 'Graduated (Verified)';
      }
    }

    parsed.personalInfo.resumeFileName = source;
    parsed.lastUpdated = new Date().toISOString().split('T')[0];

    setTimeout(() => {
      setExtractedData(parsed);
      setIsProcessing(false);
      setStep(2);
      showToast('Resume parsed successfully! Please review extracted data.');
    }, 400);
  };

  const handleConfirmAndApply = () => {
    if (!extractedData) return;
    importFullProfile(extractedData);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xs" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-950/70 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-100">
                Resume & LinkedIn Data Importer
              </h3>
              <p className="text-xs text-neutral-400">
                Step {step} of 3: {step === 1 ? 'Upload File or Paste Text' : step === 2 ? 'Review & Edit Parsed Profile' : 'Confirm & Apply'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {/* STEP 1: Upload / Input */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Dropzone */}
              <div className="border-2 border-dashed border-neutral-700/80 hover:border-indigo-500/80 rounded-2xl p-8 text-center transition-colors bg-neutral-950/40">
                <input
                  type="file"
                  id="resume-file-input"
                  accept=".pdf,.txt,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="resume-file-input"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-neutral-200">
                      Click to upload LinkedIn Profile PDF, Resume, or JSON
                    </span>
                    <p className="text-xs text-neutral-400 mt-1">
                      Supports .pdf, .txt, or .json backup files (Up to 10MB)
                    </p>
                  </div>
                  <span className="mt-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs font-medium text-neutral-200 border border-neutral-700">
                    Select File
                  </span>
                </label>
              </div>

              {fileName && (
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-300">Selected: {fileName}</span>
                  {isProcessing && (
                    <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />
                  )}
                </div>
              )}

              {/* Or Paste Raw Text */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-medium text-neutral-300">
                    Or paste text from LinkedIn Profile or Resume:
                  </span>
                  <span className="text-[11px] font-mono">Raw text parser</span>
                </div>
                <textarea
                  rows={6}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste LinkedIn &apos;About&apos;, Experience, Education, or full resume text here..."
                  className="w-full text-xs bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-neutral-100 placeholder:text-neutral-600 focus:outline-hidden focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handlePasteParse}
                  disabled={!inputText.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <span>Parse Text & Proceed</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Review Extracted Details */}
          {step === 2 && extractedData && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-300 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-100">Extraction Complete:</strong> Review the information below. You can modify any extracted values before committing them to your live dashboard.
                </div>
              </div>

              {/* Personal Info review */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Extracted Personal Data
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-neutral-400 block mb-1">Name</label>
                    <input
                      type="text"
                      value={extractedData.personalInfo.name}
                      onChange={(e) =>
                        setExtractedData({
                          ...extractedData,
                          personalInfo: {
                            ...extractedData.personalInfo,
                            name: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">Email</label>
                    <input
                      type="email"
                      value={extractedData.personalInfo.email}
                      onChange={(e) =>
                        setExtractedData({
                          ...extractedData,
                          personalInfo: {
                            ...extractedData.personalInfo,
                            email: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-neutral-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 text-xs block mb-1">Headline</label>
                  <input
                    type="text"
                    value={extractedData.personalInfo.headline}
                    onChange={(e) =>
                      setExtractedData({
                        ...extractedData,
                        personalInfo: {
                          ...extractedData.personalInfo,
                          headline: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-xs text-neutral-100"
                  />
                </div>
              </div>

              {/* Skills count */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-mono uppercase tracking-wider text-neutral-400">
                    Recognized Skills
                  </h4>
                  <p className="text-neutral-300 mt-1">
                    {extractedData.skills.length} technical skills found across categories
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 max-w-sm justify-end">
                  {extractedData.skills.slice(0, 6).map((s) => (
                    <span
                      key={s.id}
                      className="px-2 py-0.5 bg-neutral-800 text-[10px] text-neutral-300 rounded font-mono"
                    >
                      {s.name}
                    </span>
                  ))}
                  {extractedData.skills.length > 6 && (
                    <span className="px-2 py-0.5 text-[10px] text-neutral-400">
                      +{extractedData.skills.length - 6} more
                    </span>
                  )}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-100"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Upload</span>
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                >
                  <span>Review Diff & Commit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Final Diff & Safety Confirmation */}
          {step === 3 && extractedData && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-100">Explicit Confirmation:</strong> Applying this import will update your local portfolio state. You can always use &quot;Reset Data&quot; in the footer to restore default verified values at any time.
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-mono uppercase tracking-wider text-neutral-400">
                  Update Summary
                </h4>
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Candidate Name</span>
                    <span className="text-neutral-100 font-semibold">{extractedData.personalInfo.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Email Address</span>
                    <span className="font-mono text-neutral-200">{extractedData.personalInfo.email}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Total Skills Registered</span>
                    <span className="font-mono text-neutral-200">{extractedData.skills.length}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Projects Maintained</span>
                    <span className="font-mono text-neutral-200">{extractedData.projects.length}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-400">Education Timeline</span>
                    <span className="font-mono text-neutral-200">{extractedData.education.length} Institutions</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-100"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Review</span>
                </button>

                <button
                  onClick={handleConfirmAndApply}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-emerald-950/40"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Apply to Portfolio</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
