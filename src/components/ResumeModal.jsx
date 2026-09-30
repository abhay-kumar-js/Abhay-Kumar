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
                Abhay_Kumar_Web-Dev-CV.pdf
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Official Curriculum Vitae • Web Developer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/assets/Abhay_Kumar_Web-Dev-CV.pdf?view=inline"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
              title="Open authentic PDF in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>Open PDF</span>
            </a>

            <a
              href="/assets/Abhay_Kumar_Web-Dev-CV.pdf"
              download="Abhay_Kumar_Web-Dev-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-all shadow-md shadow-blue-600/30"
              title="Download authentic CV PDF"
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
              ABHAY KUMAR
            </h1>
            <p className="text-base font-semibold text-slate-300 font-sans">
              Web Developer
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-1">
              <span>•</span>
              <a href="tel:+917379289932" className="hover:text-white">+91-7379289932</a>
              <span>•</span>
              <a href="mailto:webdevabhay@gmail.com" className="hover:text-white">webdevabhay@gmail.com</a>
              <span>•</span>
              <a href="https://linkedin.com/in/abhay-kumar" target="_blank" rel="noreferrer" className="hover:text-blue-400">Linkedin/Abhay Kumar</a>
              <span>•</span>
              <a href="https://github.com/abhay-kumar-js" target="_blank" rel="noreferrer" className="hover:text-blue-400">GitHub/abhay-kumar-js</a>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-blue-400 border-b border-slate-800 pb-1">
              SUMMARY
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Full-StackMERN Developer with 4+ years of professional experience, including 3+ years of expertise in Shopify and WordPress development. Experienced in building scalable web applications, custom eCommerce solutions, REST APIs, and performance-optimized websites with a focus on delivering seamless user experiences.
            </p>
          </div>

          {/* TECHNICAL SKILLS */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-blue-400 border-b border-slate-800 pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <p className="font-bold text-slate-200 uppercase text-[11px]">Shopify:</p>
                <ul className="space-y-1 text-slate-300">
                  <li>• Shopify Liquid</li>
                  <li>• Shopify Store Development</li>
                  <li>• Shopify Theme Customization</li>
                  <li>• Shopify Apps Integration</li>
                  <li>• Shopify Store Optimization</li>
                  <li>• Payment Gateway Integration</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <p className="font-bold text-slate-200 uppercase text-[11px]">WordPress:</p>
                <ul className="space-y-1 text-slate-300">
                  <li>• Custom WordPress Development</li>
                  <li>• Elementor, WooCommerce</li>
                  <li>• Theme Customization</li>
                  <li>• Plugin Configuration, Website Migration</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <p className="font-bold text-slate-200 uppercase text-[11px]">Frontend:</p>
                <ul className="space-y-1 text-slate-300">
                  <li>• React.js &amp; Redux, HTML5</li>
                  <li>• CSS3, Tailwind CSS, Bootstrap,</li>
                  <li>• JavaScript (ES6+), TypeScript</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <p className="font-bold text-slate-200 uppercase text-[11px]">Tools &amp; Platforms:</p>
                <ul className="space-y-1 text-slate-300">
                  <li>• Git &amp; GitHub, Vercel, Netlify, Figma</li>
                </ul>
              </div>
            </div>
          </div>

          {/* WORK EXPERIENCE */}
          <div className="space-y-5">
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-blue-400 border-b border-slate-800 pb-1">
              WORK EXPERIENCE
            </h2>

            {/* Role 1 */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="text-sm font-medium text-slate-300">
                    Arabian Aroma Perfume | Dec, 2024 - Present | <a href="https://arabianaroma.in/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">arabianaroma.in</a>
                  </h3>
                  <p className="text-sm font-bold text-white font-sans mt-0.5">Senior Web Developer</p>
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
                  <h3 className="text-sm font-medium text-slate-300">
                    Real Victory Group | March, 2023 - Aug, 2024
                  </h3>
                  <p className="text-sm font-bold text-white font-sans mt-0.5">Front-End Developer</p>
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
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-blue-400 border-b border-slate-800 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
                <span className="text-slate-200">AxisInstituteofHigher Education, Bachelor of Computer Applications</span>
                <span className="text-slate-300 font-bold">2022</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
                <span className="text-slate-200">BNSD Inter College, Intermediat UP Board</span>
                <span className="text-slate-300 font-bold">2019</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-200">Bal Mandir Maharashtra Mandal, High School UP Board</span>
                <span className="text-slate-300 font-bold">2017</span>
              </div>
            </div>
          </div>

          {/* PERSONAL DETAILS */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-blue-400">
              PERSONAL DETAILS
            </h2>
            <div className="flex flex-wrap gap-6 text-xs font-mono text-slate-300">
              <span>• Father: Late Mr. Rajesh Kumar</span>
              <span>• DOB: 17/11/2000</span>
              <span>• Languages: English, Hindi</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#0A0F1D]">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Abhay_Kumar_Web-Dev-CV.pdf (Exact authentic document)
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
            <a
              href="/assets/Abhay_Kumar_Web-Dev-CV.pdf?view=inline"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>Open in Tab</span>
            </a>
            <a
              href="/assets/Abhay_Kumar_Web-Dev-CV.pdf"
              download="Abhay_Kumar_Web-Dev-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition-all shadow-lg shadow-blue-600/30"
            >
              <Download className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
