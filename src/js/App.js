// App.js
import React, { useState } from 'react';
import Task from './component/Task';




function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return; // Don't add empty tasks
    setTasks([...tasks, newTask]);
    setNewTask('');
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Task List</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') addTask();
          }}
        />
        <button onClick={addTask}>Add</button>
      </div>
      {tasks.length === 0 ? (
        <p>No tasks, add a task</p>
      ) : (
        <div className="task-list">
          {tasks.map((task, index) => (
            <Task key={index} text={task} onDelete={() => deleteTask(index)} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
