import React, { Component,} from 'react';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      newTask: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/Yarnib')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const tasksArray = Array.isArray(data.tasks) ? data.tasks : [];
        this.setState({ tasks: tasksArray, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({ loading: false, tasks: [] });
      });
  }

  handleInputChange = (event) => {
    this.setState({ newTask: event.target.value });
  };

  handleAddTask = () => {
    const { tasks, newTask } = this.state;
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { label: newTask, done: false }];
      this.setState({ tasks: updatedTasks, newTask: '' });
      this.syncTasks(updatedTasks);
    }
  };

  handleDeleteTask = (index) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.filter((task, i) => i !== index);
    this.setState({ tasks: updatedTasks });
    this.syncTasks(updatedTasks);
  };

  handleClearAllTasks = () => {
    this.setState({ tasks: [] });
    this.syncTasks([]);
  };

  syncTasks(tasks) {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/Yarnib', {
      method: 'PUT',
      body: JSON.stringify({ tasks }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Tasks synced successfully:', data);
      })
      .catch((error) => {
        console.error('Error syncing tasks:', error);
      });
  }

  render() {
    const { tasks, newTask, loading } = this.state;

    return (
      <div>
        <h1>Todo List</h1>
        <div>
          <input
            type="text"
            placeholder="Add a task"
            value={newTask}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleAddTask}>Add</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task.label}{' '}
              <button onClick={() => this.handleDeleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <button onClick={this.handleClearAllTasks}>Clear All Tasks</button>
        {loading && <p>Loading...</p>}
        {tasks.length === 0 && !loading && <p>No tasks, add a task</p>}
      </div>
    );
  }
}

export default App;

