import React from 'react';
import AddTask from './components/addTask'
import TaskList from './components/TaskList'
/*import './App.css';*/


function App() {
  return (
      <div className="container">
          <h1>Task List</h1>
          <div >
              <AddTask/>

          </div>
          <div>
              <TaskList/>
          </div>
        </div>
  );
}

export default App;
