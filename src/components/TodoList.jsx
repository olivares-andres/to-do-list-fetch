import React, { Fragment, useEffect, useRef, useState } from 'react';
import Task from './Task';

const TodoList = () => {

    const inputTask = useRef();
    

    const [task, setTask] = useState([]);

    useEffect(() => {
        console.log("Component Mounted Get Info");
    
        getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
      useEffect(() => {
          
          if (task.length > 0) {
              putInfo();
              console.log("Component Mounted Put info");
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [task]);

   
    const taskPost = () => {

        fetch('https://assets.breatheco.de/apis/fake/todos/user/olivaresandres1',{
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                console.log(resp.ok); // will be true if the response is successfull
                console.log(resp.status); // the status code = 200 or code = 400 etc.
                console.log(resp.text()); // will try return the exact result as string
                return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
            })
            .then(data => {
               
                data = task.label; //this will print on the console the exact object received from the server
            })
            .catch(error => {
                //error handling
                console.log(error);
            });
    }


    const putInfo = () => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/olivaresandres1', {
            method: "PUT",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                console.log(resp.ok); // will be true if the response is successfull        
                console.log(resp.status); // the status code = 200 or code = 400 etc.
                console.log(resp.text()); // will try return the exact result as string
                return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
            })
            .then((data) => {
                addTask();
                console.log(data);
            })
            .catch(error => {
                //error handling
                console.log(error);
            });
    }

    const getInfo = () => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/olivaresandres1')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.msg) {
                    taskPost();
                }
                setTask(data);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    const deleteTasks = () => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/olivaresandres1', {
            method: "DELETE"
        })
        if(task <= 0 ){
            setTask([{
            "label": "Please add a task",
            "done": false
        }]) 
        }
    }

    const addTask = (e) => {
        if (e.keyCode === 13 && e.target.value !== "") {
            const newState = task.concat({ label: e.target.value, done: false });
            setTask(newState)
            console.log(task);
            putInfo();
            inputTask.current.value = "";
        }
    }


    const deleteTask = (index) => {
        console.log(index);
        task.splice(index, 1);
        setTask([...task]);
        putInfo();
    }

    const pendingTasks = task.length;

    return (
        <Fragment>
            <div className="container ">
                <div className="card w-75 ">
                    <div className="card-header d-flex justify-content-center">
                        <h1>To Do List</h1>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            <input ref={inputTask} type="text" placeholder="Insert task here..." onKeyDown={(e) => addTask(e)} />
                            {
                                !!task.length <= 0 ?
                                    <div><h2>'No task yet'</h2></div> :
                                    task.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="list-group ">
                                                    <Task
                                                        task={item.label}
                                                        index={index}
                                                        deleteTask={deleteTask}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                            }
                        </ul>
                        <span>You have {pendingTasks} pending task</span>
                        <div>
                        <i className="fas fa-trash" onClick={() => deleteTasks()}></i>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default TodoList;