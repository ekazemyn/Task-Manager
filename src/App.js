// App.js
import React, { useState } from 'react';
import AddFreeTime from './components/AddFreeTime';
import AddTask from './components/AddTask';
import Dashboard from './components/Dashboard';
import WeeklySchedule from './components/WeeklySchedule';
import TaskBar from './components/TaskBar';
import './styles.css';

const App = () => {
  const [currentView, setCurrentView] = useState('Dashboard');
  const [freeTime, setFreeTime] = useState({});
  const [tasks, setTasks] = useState([]);
  const [popup, setPopup] = useState('');

  const addFreeTime = (day, startTime, endTime) => {
    const newSlot = { start: timeToMinutes(startTime), end: timeToMinutes(endTime) };
    setFreeTime((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), newSlot],
    }));
    showPopup(`Added free time for ${day}: ${startTime} - ${endTime}`);
  };

  const deleteFreeTime = (day, index) => {
    setFreeTime((prev) => {
      const updatedSlots = [...prev[day]];
      updatedSlots.splice(index, 1);

      if (updatedSlots.length === 0) {
        // Remove the day if no slots remain
        const { [day]: _, ...remaining } = prev;
        return remaining;
      }

      return { ...prev, [day]: updatedSlots };
    });
    showPopup(`Deleted free time slot from ${day}`);
  };

  const addTask = (task) => {
    const taskDuration = task.duration * 60; // Task duration in minutes
    let taskScheduledDays = [];
    let unscheduledDays = [];

    for (const day of task.days) {
      const availableSlots = freeTime[day] || [];
      let taskScheduled = false;

      for (let i = 0; i < availableSlots.length; i++) {
        const slot = availableSlots[i];
        const slotDuration = slot.end - slot.start;

        if (slotDuration >= taskDuration) {
          const taskStartTime = slot.start;
          const taskEndTime = taskStartTime + taskDuration;

          setTasks((prev) => [
            ...prev,
            { ...task, start: taskStartTime, end: taskEndTime, day },
          ]);

          const updatedSlots = [
            ...availableSlots.slice(0, i),
            ...(slotDuration === taskDuration
              ? availableSlots.slice(i + 1) // Remove the slot if fully occupied
              : [
                  // Update the remaining slot
                  { start: taskEndTime, end: slot.end },
                ]),
          ];

          setFreeTime((prev) => ({ ...prev, [day]: updatedSlots }));
          taskScheduled = true;
          break; // Exit the slot loop for this day
        }
      }

      if (taskScheduled) {
        taskScheduledDays.push(day);
        showPopup(`Added task "${task.name}" to ${day}`);
      } else {
        unscheduledDays.push(day);
      }
    }

    if (unscheduledDays.length > 0) {
      alert(
        `No free time available for task "${task.name}" on ${unscheduledDays.join(
          ', '
        )}`
      );
    }
  };

  const deleteTask = (taskIndex) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const [removedTask] = updatedTasks.splice(taskIndex, 1);

      // Re-add the time slot back to freeTime
      setFreeTime((prevFreeTime) => {
        const day = removedTask.day;
        const updatedSlots = prevFreeTime[day] ? [...prevFreeTime[day]] : [];
        updatedSlots.push({ start: removedTask.start, end: removedTask.end });

        // Merge overlapping free time slots
        const mergedSlots = mergeFreeTimeSlots(updatedSlots);

        return { ...prevFreeTime, [day]: mergedSlots };
      });

      return updatedTasks;
    });
    showPopup(`Deleted task "${tasks[taskIndex].name}"`);
  };

  // Helper function to merge overlapping free time slots
  const mergeFreeTimeSlots = (slots) => {
    if (slots.length === 0) return [];
    slots.sort((a, b) => a.start - b.start);
    const merged = [slots[0]];

    for (let i = 1; i < slots.length; i++) {
      const last = merged[merged.length - 1];
      const current = slots[i];

      if (current.start <= last.end) {
        last.end = Math.max(last.end, current.end);
      } else {
        merged.push(current);
      }
    }
    return merged;
  };

  const showPopup = (message) => {
    setPopup(message);
    setTimeout(() => setPopup(''), 3000);
  };

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">Task Scheduler</h1>
        <TaskBar setCurrentView={setCurrentView} />
      </header>
      <main>
        {currentView === 'Dashboard' && (
          <Dashboard
            freeTime={freeTime}
            tasks={tasks}
            deleteFreeTime={deleteFreeTime}
            deleteTask={deleteTask}
            minutesToTime={minutesToTime}
          />
        )}
        {currentView === 'Add Free Time' && <AddFreeTime addFreeTime={addFreeTime} />}
        {currentView === 'Add Task' && <AddTask addTask={addTask} />}
        {currentView === 'See Schedule' && (
          <WeeklySchedule
            tasks={tasks}
            freeTime={freeTime}
            minutesToTime={minutesToTime}
          />
        )}
      </main>
      {popup && (
        <div className="popup">
          <p>{popup}</p>
          <div className="countdown-bar"></div>
        </div>
      )}
    </div>
  );
};

export default App;
