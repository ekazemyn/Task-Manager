// Dashboard.js
import React from 'react';

const Dashboard = ({ freeTime, tasks, deleteFreeTime, deleteTask, minutesToTime }) => {
  return (
    <div className="dashboard-section">
      <h2>Free Time Slots</h2>
      {Object.keys(freeTime).length === 0 ? (
        <p>No free time slots added.</p>
      ) : (
        Object.keys(freeTime).map((day) => (
          <div key={day}>
            <h3>{day}</h3>
            <ul>
              {freeTime[day].map((slot, index) => (
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
        <p>No tasks added.</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task.name} on {task.day} from {minutesToTime(task.start)} to {minutesToTime(task.end)}
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
