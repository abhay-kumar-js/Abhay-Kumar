import React from 'react';
import FeatureList from './FeatureList';

/**
 * FeatureContent Component
 * Right column text block with eyebrow, constrained 2-line heading,
 * checklist, and pill CTA button.
 *
 * @param {Object} props
 * @param {string} [props.eyebrow='MANAGE PROJECTS'] - Category tag
 * @param {string} [props.heading='Plan, collaborate and deliver projects on time'] - Main title
 * @param {Array<string>} [props.checklist] - Feature list items
 * @param {string} [props.ctaText='Learn More'] - Button text
 * @param {string} [props.ctaHref='#'] - Button target URL
 * @param {() => void} [props.onCtaClick] - Button click handler
 * @param {string} [props.className=''] - Additional CSS classes
 */
export const FeatureContent = ({
  eyebrow = 'MANAGE PROJECTS',
  heading = 'Plan, collaborate and deliver projects on time',
  checklist,
  ctaText = 'Learn More',
  ctaHref = '#',
  onCtaClick,
  className = '',
}) => {
  return (
    <div className={`feature-content-area ${className}`}>
      {/* Eyebrow Label */}
      <span className="feature-eyebrow">{eyebrow}</span>

      {/* Main Heading */}
      <h2 className="feature-heading">
        Plan, collaborate and<br />deliver projects on time
      </h2>

      {/* Feature Checklist */}
      <FeatureList items={checklist} />

      {/* Black Pill-shaped CTA Button */}
      <a
        href={ctaHref}
        onClick={onCtaClick}
        className="feature-cta-btn"
        role="button"
        aria-label={`${ctaText} about project management features`}
      >
        <span>{ctaText}</span>
        <span className="cta-arrow" aria-hidden="true">
          →
        </span>
      </a>
    </div>
  );
};

export default FeatureContent;
