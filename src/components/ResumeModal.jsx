import React from 'react';
import {
  X,
  Download,
  ExternalLink,
  Printer,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  Calendar,
  Globe,
  GitBranch,
} from 'lucide-react';

export const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0A0F1D]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Abhay Kumar — Official Resume
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Web Developer • 4+ Years Experience • MERN • Shopify • WordPress
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/assets/Abhay_Kumar_Resume.pdf"
              download="Abhay_Kumar_Resume.pdf"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-all shadow-md shadow-blue-600/30"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close resume preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body: High-Fidelity Resume Document */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-slate-900/60 font-sans text-slate-200">
          {/* Resume Header */}
          <div className="text-center pb-6 border-b border-slate-800 space-y-2">
            <h1 className="text-3xl font-extrabold font-display tracking-tight text-white uppercase">
              Abhay Kumar
            </h1>
            <p className="text-sm font-semibold text-blue-400 font-mono">
              Web Developer / Full-Stack MERN Developer
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <a href="tel:+917379289932" className="hover:text-white">+91-7379289932</a>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <a href="mailto:webdevabhay@gmail.com" className="hover:text-white">webdevabhay@gmail.com</a>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <a href="https://linkedin.com/in/abhay-kumar" target="_blank" rel="noreferrer" className="hover:text-blue-400">Linkedin/Abhay Kumar</a>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5 text-slate-500" />
                <a href="https://github.com/abhay-kumar-js" target="_blank" rel="noreferrer" className="hover:text-blue-400">GitHub/abhay-kumar-js</a>
              </span>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-blue-400 border-b border-blue-500/30 pb-1">
              Summary
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Full-Stack MERN Developer with 4+ years of professional experience, including 3+ years of expertise in Shopify and WordPress development. Experienced in building scalable web applications, custom eCommerce solutions, REST APIs, and performance-optimized websites with a focus on delivering seamless user experiences.
            </p>
          </div>

          {/* TECHNICAL SKILLS */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-blue-400 border-b border-blue-500/30 pb-1">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <p className="font-bold text-emerald-400 uppercase text-[11px]">Shopify</p>
                <ul className="space-y-1 text-slate-300">
                  <li>• Shopify Liquid &amp; Store Development</li>
                  <li>• Shopify Theme Customization &amp; OS 2.0</li>
                  <li>• Shopify Apps Integration &amp; Webhooks</li>
                  <li>• Shopify Store Optimization &amp; CRO</li>
                  <li>• Payment Gateway Integration (Stripe, Razorpay, COD)</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <p className="font-bold text-blue-400 uppercase text-[11px]">WordPress</p>
                <ul className="space-y-1 text-slate-300">
                  <li>• Custom WordPress Development</li>
                  <li>• Elementor Pro &amp; WooCommerce</li>
                  <li>• Theme Customization &amp; Child Themes</li>
                  <li>• Plugin Configuration &amp; Website Migration</li>
                  <li>• Speed &amp; Security Hardening</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <p className="font-bold text-cyan-400 uppercase text-[11px]">Frontend &amp; MERN</p>
                <ul className="space-y-1 text-slate-300">
                  <li>• React.js &amp; Redux Toolkit, HTML5</li>
                  <li>• CSS3, Tailwind CSS, Bootstrap</li>
                  <li>• JavaScript (ES6+), TypeScript</li>
                  <li>• Node.js, Express.js, MongoDB, REST APIs</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <p className="font-bold text-purple-400 uppercase text-[11px]">Tools, SEO &amp; Platforms</p>
                <ul className="space-y-1 text-slate-300">
                  <li>• Git &amp; GitHub, Vercel, Netlify, Figma</li>
                  <li>• Google PageSpeed Insights &amp; Core Web Vitals</li>
                  <li>• Google Search Console &amp; Analytics 4</li>
                  <li>• Yoast SEO, Rank Math, Schema Markup</li>
                </ul>
              </div>
            </div>
          </div>

          {/* WORK EXPERIENCE */}
          <div className="space-y-5">
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-blue-400 border-b border-blue-500/30 pb-1">
              Work Experience
            </h2>

            {/* Role 1 */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="text-base font-bold text-white">Arabian Aroma Perfume</h3>
                  <p className="text-xs font-semibold text-blue-400 font-mono">Senior Web Developer</p>
                </div>
                <div className="text-xs font-mono text-slate-400 sm:text-right">
                  <span>Dec, 2024 - Present</span>
                  <span className="mx-1.5">•</span>
                  <a href="https://arabianaroma.in/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">arabianaroma.in</a>
                </div>
              </div>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 pl-4 list-disc marker:text-blue-500">
                <li>Manage and execute website development requirements for the company's eCommerce platform.</li>
                <li>Develop, customize, and maintain website features to improve functionality and user experience.</li>
                <li>Collaborate with stakeholders to gather requirements and implement technical solutions.</li>
                <li>Optimize website performance, responsiveness, and conversion rates.</li>
                <li>Troubleshoot technical issues and ensure smooth website operations.</li>
              </ul>
            </div>

            {/* Role 2 */}
            <div className="space-y-2 pt-2 border-t border-slate-800/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="text-base font-bold text-white">Real Victory Group</h3>
                  <p className="text-xs font-semibold text-blue-400 font-mono">Front-End Developer</p>
                </div>
                <div className="text-xs font-mono text-slate-400 sm:text-right">
                  <span>March, 2023 - Aug, 2024</span>
                </div>
              </div>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 pl-4 list-disc marker:text-blue-500">
                <li>Real Victory Group designed and developed responsive, user-friendly, and visually engaging websites.</li>
                <li>Ensured a seamless and optimized user experience across all platforms.</li>
                <li>Built the Real-Victory-Group website.</li>
              </ul>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-blue-400 border-b border-blue-500/30 pb-1">
              Education
            </h2>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
                <span className="text-slate-200">Axis Institute of Higher Education — Bachelor of Computer Applications</span>
                <span className="text-blue-400 font-bold">2022</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
                <span className="text-slate-200">BNSD Inter College — Intermediate UP Board</span>
                <span className="text-blue-400 font-bold">2019</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-200">Bal Mandir Maharashtra Mandal — High School UP Board</span>
                <span className="text-blue-400 font-bold">2017</span>
              </div>
            </div>
          </div>

          {/* PERSONAL DETAILS */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-blue-400">
              Personal Details
            </h2>
            <div className="flex flex-wrap gap-6 text-xs font-mono text-slate-300">
              <span><strong>Father:</strong> Late Mr. Rajesh Kumar</span>
              <span><strong>DOB:</strong> 17/11/2000</span>
              <span><strong>Languages:</strong> English, Hindi</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#0A0F1D]">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Authentic verified resume file generated for direct download.
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
            <a
              href="/assets/Abhay_Kumar_Resume.pdf"
              download="Abhay_Kumar_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition-all shadow-lg shadow-blue-600/30"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF File</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
