import React, { useState } from 'react';

const AddFreeTime = ({ addFreeTime }) => {
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (day && startTime && endTime) {
      addFreeTime(day, startTime, endTime);
      setDay('');
      setStartTime('');
      setEndTime('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Add Free Time</h2>
      <div className="form-group">
        <label>Select Day</label>
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="">Choose a day</option>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
            (d) => (
              <option key={d} value={d}>
                {d}
              </option>
            )
          )}
        </select>
      </div>
      <div className="form-group">
        <label>Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <button type="submit" className="submit-button">
        Add Free Time
      </button>
    </form>
  );
};

export default AddFreeTime;
