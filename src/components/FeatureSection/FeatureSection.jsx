import React from 'react';
import './FeatureSection.css';
import FeatureImage from './FeatureImage';
import FeatureContent from './FeatureContent';
import PhoneMockup from './PhoneMockup';
import TaskCard from './TaskCard';
import FeatureList from './FeatureList';

/**
 * FeatureSection Component
 * Reusable, responsive modern SaaS feature section matching the visual reference.
 *
 * @param {Object} props
 * @param {string} [props.eyebrow='MANAGE PROJECTS'] - Category tag
 * @param {string} [props.heading] - Headline text (wraps into 2 lines)
 * @param {Array<string>} [props.checklist] - 4-item checklist
 * @param {string} [props.ctaText='Learn More'] - CTA button text
 * @param {string} [props.ctaHref='#'] - CTA target link
 * @param {() => void} [props.onCtaClick] - CTA click callback
 * @param {string} [props.imageSrc] - Custom hero image URL
 * @param {string} [props.imageAlt] - Image alt text
 * @param {string} [props.phoneImageSrc] - Custom phone mockup image URL
 * @param {Array} [props.tasks] - Custom tasks for the floating task card
 * @param {string} [props.className=''] - Additional CSS classes
 */
export const FeatureSection = ({
  eyebrow = 'MANAGE PROJECTS',
  heading = 'Plan, collaborate and deliver projects on time',
  checklist,
  ctaText = 'Learn More',
  ctaHref = '#',
  onCtaClick,
  imageSrc,
  imageAlt,
  phoneImageSrc,
  tasks,
  className = '',
}) => {
  return (
    <section className={`feature-section-wrapper ${className}`} aria-label="Feature Showcase">
      <div className="feature-section-container">
        <div className="feature-section-grid">
          {/* LEFT SIDE (~48% width): Photo with floating task card & hand-drawn marks */}
          <div className="feature-left-col">
            <FeatureImage
              imageSrc={imageSrc}
              imageAlt={imageAlt}
              tasks={tasks}
            />
          </div>

          {/* RIGHT SIDE (~52% width): Content Area + Phone Mockup */}
          <div className="feature-right-col">
            <FeatureContent
              eyebrow={eyebrow}
              heading={heading}
              checklist={checklist}
              ctaText={ctaText}
              ctaHref={ctaHref}
              onCtaClick={onCtaClick}
            />

            <PhoneMockup imageSrc={phoneImageSrc} />
          </div>
        </div>
      </div>
    </section>
  );
};

// Named exports for modular subcomponent reuse
export { FeatureImage, FeatureContent, PhoneMockup, TaskCard, FeatureList };
export default FeatureSection;
