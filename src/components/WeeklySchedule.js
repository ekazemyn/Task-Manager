import React from 'react';

const WeeklySchedule = ({ tasks, freeTime, minutesToTime }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i); // Full hour range (0 to 23)

  const renderFreeTime = (day, hour) => {
    const freeSlots = freeTime[day] || [];
    return freeSlots.some(
      (slot) => slot.start <= hour * 60 && slot.end > hour * 60
    )
      ? 'free-time'
      : '';
  };

  const renderTasks = (day, hour) => {
    return tasks
      .filter(
        (task) =>
          task.day === day &&
          task.start >= hour * 60 &&
          task.start < (hour + 1) * 60
      )
      .map((task, index) => (
        <div
          key={index}
          className="task"
          style={{
            position: 'absolute',
            top: `${((task.start % 60) / 60) * 100}%`,
            height: `${((task.end - task.start) / 60) * 100}%`,
          }}
        >
          {task.name}
        </div>
      ));
  };

  return (
    <div className="schedule-container">
      <div className="schedule-wrapper">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Day/Time</th>
              {hours.map((hour) => (
                <th key={hour}>{String(hour).padStart(2, '0')}:00</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
              (day) => (
                <tr key={day}>
                  <td>{day}</td>
                  {hours.map((hour) => (
                    <td
                      key={`${day}-${hour}`}
                      className={renderFreeTime(day, hour)}
                    >
                      {renderTasks(day, hour)}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklySchedule;
