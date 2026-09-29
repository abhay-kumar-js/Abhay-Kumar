import React, { useState } from 'react';
import defaultPhoneMockup from './assets/phone-mockup.png';

/**
 * PhoneMockup Component
 * Renders the tilted smartphone device on the right with a soft purple blob,
 * curved dashed decorative arc, paper plane icon, and a project management dashboard UI.
 *
 * @param {Object} props
 * @param {string} [props.imageSrc] - Optional image URL to display inside the screen
 * @param {boolean} [props.preferHtmlUi=false] - Whether to render real HTML/CSS dashboard UI directly
 * @param {string} [props.className=''] - Additional CSS classes
 */
export const PhoneMockup = ({
  imageSrc,
  preferHtmlUi = false,
  className = '',
}) => {
  const [useFallbackUi, setUseFallbackUi] = useState(preferHtmlUi);
  const [currentImg, setCurrentImg] = useState(imageSrc || defaultPhoneMockup);

  const handleImageError = () => {
    // If phone image asset fails to load, gracefully switch to pure HTML/CSS dashboard
    setUseFallbackUi(true);
  };

  return (
    <div className={`phone-mockup-wrapper ${className}`} aria-label="Smartphone showing project dashboard">
      {/* Soft Purple Abstract Blob */}
      <div className="phone-purple-blob" aria-hidden="true" />

      {/* Thin Dotted / Dashed Curved Decorative Line */}
      <svg
        className="phone-dashed-curve"
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M15 125 C 25 35, 95 15, 128 42"
          stroke="#8B5CF6"
          strokeWidth="1.8"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
      </svg>

      {/* Outlined Paper-Plane Style Decorative Icon */}
      <div className="paper-plane-icon" aria-hidden="true">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </div>

      {/* Smartphone Device Frame */}
      <div className="phone-device-frame">
        {/* Dynamic Island / Notch */}
        <div className="phone-top-island" aria-hidden="true">
          <div className="phone-island-pill" />
          <div className="phone-island-camera" />
        </div>

        {/* Screen Bezel / Inner Content */}
        <div className="phone-inner-screen">
          {!useFallbackUi ? (
            <img
              src={currentImg}
              alt="Project management mobile dashboard UI"
              className="phone-screen-img"
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            /* Rich HTML/CSS Project Management Dashboard */
            <div className="phone-screen-content">
              {/* Status Header */}
              <div className="screen-header">
                <div className="screen-badge">Active Sprint</div>
                <div className="screen-time">9:41</div>
              </div>

              {/* Project Title */}
              <div className="screen-project-card">
                <span className="screen-sub">Overview</span>
                <h5 className="screen-title">Fintech App v2.4</h5>
                <div className="screen-due-row">
                  <span className="screen-due-tag">Due: Oct 28</span>
                  <span className="screen-stat-pct">78%</span>
                </div>
                {/* Progress bar */}
                <div className="screen-progress-bar">
                  <div className="screen-progress-fill" style={{ width: '78%' }} />
                </div>
              </div>

              {/* Team Members */}
              <div className="screen-team-section">
                <span className="screen-section-label">Team Members</span>
                <div className="screen-avatar-group">
                  <span className="screen-avatar av-1">AK</span>
                  <span className="screen-avatar av-2">SL</span>
                  <span className="screen-avatar av-3">MR</span>
                  <span className="screen-avatar av-more">+4</span>
                </div>
              </div>

              {/* Mini Task List */}
              <div className="screen-tasks-section">
                <span className="screen-section-label">Tasks & Milestones</span>
                <div className="screen-task-item done">
                  <span className="screen-task-check">✓</span>
                  <span className="screen-task-name">API Contracts</span>
                </div>
                <div className="screen-task-item done">
                  <span className="screen-task-check">✓</span>
                  <span className="screen-task-name">Auth Security</span>
                </div>
                <div className="screen-task-item current">
                  <span className="screen-task-dot" />
                  <span className="screen-task-name">Mobile QA Test</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Glass reflection shine overlay */}
        <div className="phone-glass-glare" aria-hidden="true" />
      </div>
    </div>
  );
};

export default PhoneMockup;
