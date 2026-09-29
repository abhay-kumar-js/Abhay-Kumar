import React from 'react';

/**
 * FeatureList Component
 * Displays the 4-item checklist with circular purple checkmark icons.
 *
 * @param {Object} props
 * @param {Array<string>} [props.items] - List of feature strings
 * @param {string} [props.className=''] - Additional CSS classes
 */
export const FeatureList = ({
  items = [
    'Create tasks and subtasks',
    'Assign to team members',
    'Set priorities and deadlines',
    'Track progress in real-time',
  ],
  className = '',
}) => {
  return (
    <ul className={`feature-checklist ${className}`} role="list">
      {items.map((text, idx) => (
        <li key={idx} className="checklist-item">
          <span className="check-icon-circle" aria-hidden="true">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
            </svg>
          </span>
          <span className="checklist-text">{text}</span>
        </li>
      ))}
    </ul>
  );
};

export default FeatureList;
