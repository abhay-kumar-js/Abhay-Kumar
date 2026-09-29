import React from 'react';

/**
 * TaskCard Component
 * Floating white project/task card overlaying the bottom-left of the feature image.
 *
 * @param {Object} props
 * @param {string} [props.title='Sprint Tasks'] - Card header title
 * @param {string} [props.badge='In Progress'] - Status badge text
 * @param {Array<{id: string|number, title: string, status: 'completed'|'pending', stateText: string}>} [props.tasks] - Task list items
 * @param {string} [props.className=''] - Additional CSS classes
 */
export const TaskCard = ({
  title = 'Sprint Tasks',
  badge = 'Active',
  tasks = [
    { id: 1, title: 'UI Design System', status: 'completed', stateText: 'Completed' },
    { id: 2, title: 'Client Feedback Review', status: 'completed', stateText: 'Completed' },
    { id: 3, title: 'Interactive Prototype', status: 'pending', stateText: 'Pending' },
    { id: 4, title: 'Final Production Handoff', status: 'pending', stateText: 'Pending' },
  ],
  className = '',
}) => {
  return (
    <div className={`floating-task-card ${className}`} role="region" aria-label="Task progress preview">
      <div className="task-card-header">
        <h4 className="task-card-title">{title}</h4>
        <span className="task-card-pill">{badge}</span>
      </div>

      <div className="task-card-list">
        {tasks.map((task) => {
          const isCompleted = task.status === 'completed';
          return (
            <div key={task.id} className="task-row">
              <div className="task-row-left">
                <span
                  className={`task-status-dot ${isCompleted ? 'completed' : 'pending'}`}
                  aria-hidden="true"
                >
                  {isCompleted && (
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor">
                      <polyline points="2.5 6.5 4.8 9 9.5 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className="task-name">{task.title}</span>
              </div>
              <span className={`task-state-label ${isCompleted ? 'done' : ''}`}>
                {task.stateText || (isCompleted ? 'Completed' : 'Pending')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskCard;
