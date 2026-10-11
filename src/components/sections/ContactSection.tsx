import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import {
  Mail,
  Linkedin,
  Github,
  Copy,
  Check,
  Send,
  MessageSquare,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { profile, showToast } = useProfile();
  const { personalInfo } = profile;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Please include a message';
    else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    showToast(`Email copied: ${personalInfo.email}`, 'success');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Open mailto fallback with prefilled details
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${formData.subject}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;

    setIsSubmitted(true);
    showToast('Inquiry drafted! Mail client opened with your message.', 'success');
  };

  return (
    <section id="contact" className="py-12 border-t border-neutral-800/80">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
            07 · Connect & Collaborate
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-xs text-neutral-400">
            Reach out regarding engineering opportunities, AI/ML internships, project collaborations, or technology discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-5 space-y-4">
            {/* Primary Email Card */}
            <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
                  Direct Email
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-indigo-400 transition-colors p-1"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-sm font-mono font-medium text-neutral-200 hover:text-indigo-400 transition-colors truncate"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>

            {/* LinkedIn Card */}
            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 flex items-center justify-between group transition-colors block"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center text-indigo-400">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-neutral-100 group-hover:text-indigo-300 transition-colors">
                    LinkedIn Network
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Connect for professional networking & updates
                  </p>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-200 transition-colors" />
            </a>

            {/* GitHub Card if available */}
            {personalInfo.githubUrl && (
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 flex items-center justify-between group transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-neutral-300">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-neutral-100 group-hover:text-neutral-200 transition-colors">
                      GitHub Repositories
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Explore code repositories & project contributions
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-200 transition-colors" />
              </a>
            )}

            {/* Service transparency note */}
            <div className="p-4 rounded-xl bg-neutral-950/50 border border-neutral-800/60 text-xs text-neutral-400 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                To guarantee message deliverability without unauthenticated third-party SMTP intermediaries, sending opens your mail client directly to <strong>{personalInfo.email}</strong>.
              </span>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800/60 mb-5">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-sm font-bold text-neutral-100">
                    Send Direct Message
                  </h3>
                </div>
                <span className="text-[11px] text-neutral-400 font-mono">
                  Response within 24-48 hrs
                </span>
              </div>

              {isSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-neutral-100">
                    Message Prepared & Client Opened!
                  </h4>
                  <p className="text-xs text-neutral-300 max-w-md mx-auto">
                    Your email client has been launched with your inquiry pre-filled. If it didn&apos;t open automatically, you can send an email directly to{' '}
                    <strong className="text-neutral-100">{personalInfo.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline pt-2"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Your Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priya Sharma"
                        className={`w-full text-xs bg-neutral-950 border rounded-lg px-3 py-2.5 text-neutral-100 placeholder:text-neutral-600 focus:outline-hidden ${
                          errors.name ? 'border-rose-500' : 'border-neutral-800 focus:border-indigo-500'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Your Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. priya@company.com"
                        className={`w-full text-xs bg-neutral-950 border rounded-lg px-3 py-2.5 text-neutral-100 placeholder:text-neutral-600 focus:outline-hidden ${
                          errors.email ? 'border-rose-500' : 'border-neutral-800 focus:border-indigo-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Subject <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. AI/ML Engineering Internship Opportunity"
                      className={`w-full text-xs bg-neutral-950 border rounded-lg px-3 py-2.5 text-neutral-100 placeholder:text-neutral-600 focus:outline-hidden ${
                        errors.subject ? 'border-rose-500' : 'border-neutral-800 focus:border-indigo-500'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details about the role, project, or collaboration..."
                      className={`w-full text-xs bg-neutral-950 border rounded-lg px-3 py-2.5 text-neutral-100 placeholder:text-neutral-600 focus:outline-hidden resize-none ${
                        errors.message ? 'border-rose-500' : 'border-neutral-800 focus:border-indigo-500'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-950 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Anand</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
