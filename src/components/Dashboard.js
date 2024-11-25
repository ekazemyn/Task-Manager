import React from 'react';

const Dashboard = ({ freeTime, tasks, deleteFreeTime, minutesToTime }) => {
  return (
    <div className="dashboard-section">
      <h2>Free Time Slots</h2>
      {Object.keys(freeTime).length === 0 ? (
        <p>No free time added yet.</p>
      ) : (
        Object.entries(freeTime).map(([day, slots]) => (
          <div key={day}>
            <h3>{day}</h3>
            <ul>
              {slots.map((slot, index) => (
                <li key={index}>
                  {minutesToTime(slot.start)} - {minutesToTime(slot.end)}
                  <button onClick={() => deleteFreeTime(day, index)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        tasks.map((task, index) => (
          <div key={index}>
            <h3>{task.name}</h3>
            <p>
              {task.day}: {minutesToTime(task.start)} - {minutesToTime(task.end)}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
