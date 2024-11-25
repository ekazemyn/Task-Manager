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
    const availableSlots = freeTime[task.day] || [];
    const taskDuration = task.duration * 60; // Task duration in minutes

    for (let i = 0; i < availableSlots.length; i++) {
      const slot = availableSlots[i];
      const slotDuration = slot.end - slot.start;

      if (slotDuration >= taskDuration) {
        const taskStartTime = slot.start;
        const taskEndTime = taskStartTime + taskDuration;

        setTasks((prev) => [
          ...prev,
          { ...task, start: taskStartTime, end: taskEndTime },
        ]);

        const updatedSlots = [
          ...availableSlots.slice(0, i),
          ...(slotDuration === taskDuration
            ? availableSlots.slice(i + 1) // Remove the slot if fully occupied
            : [{ start: taskEndTime, end: slot.end }]), // Update the remaining slot
        ];

        setFreeTime((prev) => ({ ...prev, [task.day]: updatedSlots }));
        showPopup(`Added task "${task.name}" to ${task.day}`);
        return;
      }
    }

    alert(`No free time available for task "${task.name}" on ${task.day}`);
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
