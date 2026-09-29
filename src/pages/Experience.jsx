import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Download,
  Eye,
  Building2,
  GraduationCap,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ResumeModal from '../components/ResumeModal.jsx';

export const Experience = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    document.title = 'Experience | Abhay Kumar Web Developer';
  }, []);

  const workHistory = [
    {
      company: 'Arabian Aroma Perfume',
      role: 'Senior Web Developer',
      period: 'Dec, 2024 - Present',
      url: 'https://arabianaroma.in/',
      location: 'India',
      type: 'Full-Time E-Commerce Engineering',
      highlights: [
        "Manage and execute website development requirements for the company's eCommerce platform.",
        'Develop, customize, and maintain website features to improve functionality and user experience.',
        'Collaborate with stakeholders to gather requirements and implement technical solutions.',
        'Optimize website performance, responsiveness, and conversion rates.',
        'Troubleshoot technical issues and ensure smooth website operations.',
      ],
      skills: ['Shopify Liquid', 'Custom Sections', 'Core Web Vitals', 'CRO', 'Payment Gateways'],
    },
    {
      company: 'Real Victory Group',
      role: 'Front-End Developer',
      period: 'March, 2023 - Aug, 2024',
      url: '',
      location: 'India',
      type: 'Web Development & UI/UX',
      highlights: [
        'Real Victory Group designed and developed responsive, user-friendly, and visually engaging websites.',
        'Ensured a seamless and optimized user experience across all platforms.',
        'Built the Real-Victory-Group website from initial wireframes to production release.',
      ],
      skills: ['React.js', 'Tailwind CSS', 'JavaScript', 'Responsive Design', 'Cross-Browser UI'],
    },
  ];

  const education = [
    {
      institution: 'Axis Institute of Higher Education',
      degree: 'Bachelor of Computer Applications (BCA)',
      year: '2022',
      details: 'Computer Science, Data Structures, Web Technologies, Database Systems.',
    },
    {
      institution: 'BNSD Inter College',
      degree: 'Intermediate UP Board',
      year: '2019',
      details: 'Science & Mathematics curriculum.',
    },
    {
      institution: 'Bal Mandir Maharashtra Mandal',
      degree: 'High School UP Board',
      year: '2017',
      details: 'Secondary Education.',
    },
  ];

  return (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12 sm:py-16 space-y-16">
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Header & Resume Download Action */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Verified Work History &amp; Credentials</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-slate-900 dark:text-white mb-3">
            Professional Experience &amp; Career Track
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Full-Stack MERN Developer with 4+ years of professional engineering experience, including 3+ years of specialized expertise in Shopify and WordPress development.
          </p>
        </div>

        {/* Download Resume Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/assets/Abhay_Kumar_Resume.pdf"
            download="Abhay_Kumar_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5"
            title="Download Abhay Kumar's Resume"
          >
            <Download className="w-4 h-4" />
            <span>Download Official Resume (PDF)</span>
          </a>

          <button
            onClick={() => setIsResumeOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-mono transition-all cursor-pointer shadow-sm"
          >
            <Eye className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Preview Resume</span>
          </button>
        </div>
      </div>

      {/* WORK EXPERIENCE SECTION */}
      <div className="space-y-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
          <Building2 className="w-4 h-4" />
          <span>Work Experience</span>
        </div>

        <div className="space-y-6">
          {workHistory.map((job) => (
            <div
              key={job.company}
              className="rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:to-[#0A0F1D] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                      {job.company}
                    </h2>
                    {job.url && (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline decoration-blue-500/30"
                      >
                        <span>Visit Store</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                    {job.role}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-1.5 rounded-lg self-start sm:self-auto">
                  <Calendar className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                  <span>{job.period}</span>
                </div>
              </div>

              {/* Bullet highlights from resume */}
              <ul className="space-y-2.5">
                {job.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">
                  Core Skills:
                </span>
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDUCATION SECTION */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
          <GraduationCap className="w-4 h-4" />
          <span>Education &amp; Academic Background</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="p-6 rounded-2xl bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-blue-400 mb-2">
                  <span>Graduated</span>
                  <span className="font-bold text-blue-700 dark:text-white bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-500/20">
                    {edu.year}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display mb-1">
                  {edu.degree}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">
                  {edu.institution}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {edu.details}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Credential</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CTA BAR */}
      <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-blue-50 via-slate-100 to-blue-100/40 dark:from-blue-950/40 dark:via-[#0E1628] dark:to-slate-900 border border-blue-200 dark:border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
            Looking for a Senior Web &amp; E-Commerce Developer?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Available for full-time roles, contracts, and bespoke Shopify/MERN architecture.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/assets/Abhay_Kumar_Resume.pdf"
            download="Abhay_Kumar_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-800 dark:text-white text-xs font-mono font-semibold transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            <span>Download Resume</span>
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition-all shadow-md shadow-blue-600/30"
          >
            <span>Let's Talk</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Experience;
