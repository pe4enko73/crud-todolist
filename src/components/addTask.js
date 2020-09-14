import React, {useState } from "react";
import TaskDataService from "../service/TaskService";
import {refresh} from "./TaskList"



const AddTask = () => {
    const initTaskState={
        id: null,
        name: '',
        completed: false
    };
    const [task,setTask]=useState(initTaskState);
    const [submitted, setSubmitted] = useState(false);
    const handleInputChange= event =>{
        const {name , value} =event.target;
        setTask({...task,[name]:value });
    }

        const saveTask= () => {
            if (task.name!=='' ) {
                var data = {
                    name: task.name,
                    completed: task.completed
                };

                TaskDataService.create(data)
                    .then(response => {
                        setTask({
                            id: response.data.id,
                            name: response.data.name,
                            completed: response.data.completed
                        });
                        setSubmitted(true);
                        refresh();
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
            else {
                let answer = window.alert('Enter task!!!')

                if (!answer) {
                    setSubmitted(false);
                }
            }
    };
    const eventsaveTask= event => {
        if (event.key === 'Enter') {
            saveTask();
        }
    }
    const newAddTask = () => {
        setTask(initTaskState);
        setSubmitted(false);
        refresh();

    };
    return(
        <div>
            {submitted ? (
                    <div>
                        <h4>You added successfully!</h4>
                        <button className="btn btn-success" onClick={newAddTask}>
                            New Add
                        </button>
                    </div>
                ):(
                    <div className="input-field">
                        <input
                            type="text"
                            className="inputTask"
                            id="task"
                            value={task.name}
                            onChange={handleInputChange}
                            name="name"
                            onKeyPress={eventsaveTask}
                        />
                        <label>Task</label>

                        <button onClick={saveTask} className="m-3 btn btn-sm btn-danger">
                            Add
                        </button>
                    </div>
                )}
        </div>
    );

}
export default AddTask;