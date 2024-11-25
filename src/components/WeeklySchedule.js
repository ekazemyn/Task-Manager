// WeeklySchedule.js
import React from 'react';

const WeeklySchedule = ({ tasks, freeTime, minutesToTime }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="schedule-container">
      <div className="schedule-grid">
        {/* Grid Headers */}
        <div className="grid-header time-column" style={{ gridRow: 1, gridColumn: 1 }}>
          {/* Empty top-left corner */}
        </div>
        {days.map((day, dayIndex) => (
          <div
            key={day}
            className="grid-header"
            style={{ gridRow: 1, gridColumn: dayIndex + 2 }}
          >
            {day}
          </div>
        ))}

        {/* Time Labels */}
        {Array.from({ length: 96 }, (_, i) => {
          const hour = Math.floor(i / 4);
          const minutes = (i % 4) * 15;
          const timeLabel = minutes === 0 ? `${String(hour).padStart(2, '0')}:00` : '';
          return (
            <div
              key={`time-${i}`}
              className="time-label"
              style={{ gridRow: i + 2, gridColumn: 1 }}
            >
              {timeLabel}
            </div>
          );
        })}

        {/* Grid Cells */}
        {Array.from({ length: 96 }, (_, i) =>
          days.map((day, dayIndex) => (
            <div
              key={`cell-${day}-${i}`}
              className="grid-cell"
              style={{ gridRow: i + 2, gridColumn: dayIndex + 2 }}
            ></div>
          ))
        )}

        {/* Free Time Cells */}
        {Object.entries(freeTime).map(([day, slots]) => {
          const dayIndex = days.indexOf(day) + 2; // +2 to account for time labels

          return slots.map((slot, index) => {
            const startRow = Math.floor(slot.start / 15) + 2;
            const endRow = Math.ceil(slot.end / 15) + 2;

            return (
              <div
                key={`freetime-${day}-${index}`}
                className="free-time-cell"
                style={{
                  gridColumn: dayIndex,
                  gridRowStart: startRow,
                  gridRowEnd: endRow,
                }}
              ></div>
            );
          });
        })}

        {/* Tasks */}
        {tasks.map((task, index) => {
          const taskDayIndex = days.indexOf(task.day) + 2; // +2 because time labels are in column 1
          const startRow = Math.floor(task.start / 15) + 2;
          const endRow = Math.ceil(task.end / 15) + 2;

          return (
            <div
              key={`task-${index}`}
              className="task-block"
              data-task-name={`${task.name} (${minutesToTime(task.start)} - ${minutesToTime(
                task.end
              )})`}
              style={{
                gridColumn: taskDayIndex,
                gridRowStart: startRow,
                gridRowEnd: endRow,
              }}
            >
              {task.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklySchedule;
