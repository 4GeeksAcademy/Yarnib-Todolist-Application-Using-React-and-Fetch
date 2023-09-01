// Task.js
import React, { useState } from 'react';

const Task = ({ text, onDelete }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="task"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span>{text}</span>
      {hovered && (
        <button className="delete-button" onClick={onDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default Task;
