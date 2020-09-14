import React, {useEffect, useState} from "react";
import TaskDataService from "../service/TaskService";


export var refresh;

export const TaskList = () =>{
    const initTaskwState={
        name: ''
    };
    const [tasks,setTasks]=useState([]);
    const [taskw,setTaskw]=useState(initTaskwState);
    const [editing, setEditing] = useState(false)
    const [lastInputIndex, setlastInputIndex] = useState(-1)
    const [currentTask, setCurrentTask] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    useEffect(()=>{
        retrTask();
    },[]);

    const handleInputChange= event =>{
        const {name , value} =event.target;
        setTaskw({...taskw,[name]:value });
    }

    const retrTask=()=>{
        TaskDataService.getAll()
            .then(response=>{
                setTasks(response.data);
                console.log(response.data);
            })
            .catch(e=>{
                console.log(e);
            });
    };
    const setActiveTask = (task, index) => {
        setCurrentTask(task);
        setCurrentIndex(index);
    };
    const refreshTaskList = () => {
        retrTask();
        setCurrentTask(null);
        setCurrentIndex(-1);
    };

    refresh=refreshTaskList;

    const DeleteTask =(id)=>{
            TaskDataService.remove(id)
                .then(response => {
                    console.log(response.data);
                    refreshTaskList();
                })
                .catch(e => {
                    console.log(e);
                });

    }


    const updateTask = (id)=>event => {
        if (event.key === 'Enter') {
        TaskDataService.update(id, currentTask)
            .then(response => {
                console.log(response.data);
                /*setMessage("The tutorial was updated successfully!");*/
            })
            .catch(e => {
                console.log(e);
            }); setEditing(false)}

    };

    const updateCompleted =(id,name,status) => event => {
        var data = {
            id: currentTask.id,
            name: currentTask.name,
            completed: status
        };
        TaskDataService.update(id, data)
            .then(response => {
                setCurrentTask({ ...currentTask, completed: status });
                retrTask();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const EditTask =(id,name,index)  =>{

            if (!editing) {
                setEditing(true)
                setlastInputIndex(index)
                taskw.name = name;
            }
            else
                { let answer = window.alert('Data entered')

                    if (!answer) {
                        setEditing(false)
                        setTaskw(initTaskwState)
                        TaskDataService.update(id, currentTask)
                            .then(response => {
                                console.log(response.data);
                                /*setMessage("The tutorial was updated successfully!");*/
                            })
                            .catch(e => {
                                console.log(e);
                            });
                    }
                }
    };

    return(
        <div  >
            {tasks &&
            tasks.map((task, index) => (
                        <li className="todo"
                            onClick={() =>{setCurrentIndex(index);setCurrentTask(task)}}
                            key={index}
                        >
                            <label>
                                {!editing?(
                                <label className="del-icon">
                                            {task.completed ? (
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={true}
                                                        value={task.completed}
                                                        onChange={updateCompleted(task.id,task.name,false)}
                                                    />
                                                    <span></span>
                                                </label>
                                            ):(
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={false}
                                                        /*onMouseOver={()=>setActiveTask(task,index)}*/
                                                        value={task.completed}
                                                        onChange={updateCompleted(task.id,task.name,true)}
                                                    /><span></span>
                                                </label>
                                            )}
                                </label>
                                ):(
                                <label className="del-icon">
                                    {task.completed ? (
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={true}
                                                    disabled="disabled"
                                                />
                                                <span></span>
                                            </label>
                                    ):(
                                        <label>
                                            <input
                                                type="checkbox"
                                                defaultChecked={false}
                                                /*onMouseOver={()=>setActiveTask(task,index)}*/
                                                disabled="disabled"
                                            /><span></span>
                                        </label>)

                                    }
                                </label>)}

                                {editing && lastInputIndex===index ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={task.name=taskw.name}
                                            onMouseOver={()=>setCurrentTask(task)}
                                            onChange={handleInputChange}
                                            onKeyPress={updateTask(task.id)}
                                        />
                                    ):(
                                        <label className="taskl"
                                            onClick={()=>EditTask(task.id,task.name,index)} >
                                            {task.name}
                                        </label>
                                    )}
                                    <button
                                        className="material-icons red-text"
                                        onClick={()=>DeleteTask(task.id)}
                                    >
                                        delete
                                    </button>
                                </label>
                            </li>
            ))}
            <button
                className="m-3 btn btn-sm btn-danger"
                onClick={refreshTaskList}
            >
                Refresh
            </button>
        </div>
    )
}
export default TaskList;