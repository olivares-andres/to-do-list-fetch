import React from 'react'
/* import PropType from 'prop-types'; */

const Task = ({task, index, deleteTask}) => {



    return (
        <li key={index} className="list-group-item myLi">{task} <i className="fas fa-trash" onClick={() => deleteTask(index)}></i></li>
    )
}


/* Task.propTypes = {        
    task: PropType.string,
    index: PropType.number,
    deleteTask: PropType.func 
} */

export default Task;