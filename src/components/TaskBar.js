import React from 'react';

const TaskBar = ({ setCurrentView }) => {
  return (
    <nav className="taskbar-container">
      <ul className="taskbar">
        {['Dashboard', 'Add Free Time', 'Add Task', 'See Schedule'].map((view) => (
          <li
            key={view}
            className="taskbar-item"
            onClick={() => setCurrentView(view)}
          >
            {view}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TaskBar;
