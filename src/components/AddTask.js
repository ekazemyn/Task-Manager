import React, { useState } from 'react';

const AddTask = ({ addTask }) => {
  const [task, setTask] = useState({ name: '', duration: '', priority: '', days: [] });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.name && task.duration && task.priority && task.days.length > 0) {
      addTask({ ...task, duration: parseFloat(task.duration) });
      setTask({ name: '', duration: '', priority: '', days: [] });
    }
  };

  const toggleDay = (day) => {
    setTask((prev) => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter((d) => d !== day) : [...prev.days, day],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Add Task</h2>
      <div className="form-group">
        <label>Task Name</label>
        <input
          type="text"
          placeholder="Enter task name"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Duration (hours)</label>
        <input
          type="number"
          placeholder="Enter task duration"
          value={task.duration}
          onChange={(e) => setTask({ ...task, duration: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Priority</label>
        <select value={task.priority} onChange={(e) => setTask({ ...task, priority: e.target.value })}>
          <option value="">Select priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="form-group">
        <label>Select Days</label>
        <div className="days-selector">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <button
              type="button"
              key={day}
              className={`day-button ${task.days.includes(day) ? 'selected' : ''}`}
              onClick={() => toggleDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      <button type="submit" className="submit-button">
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
