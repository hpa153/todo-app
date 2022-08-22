import React from 'react';
import { useDispatch } from "react-redux";
import { FiEdit3 } from 'react-icons/fi';

import './style.scss';
import { removeTask, setTask, setTaskToUpdate } from '../../redux/features/task/taskSlice';
import { updateCount } from '../../redux/features/pagination/paginationSlice';

export type TaskProps = {
  id: string,
  title: string,
  description: string,
  priority: string,
  isCompleted: boolean,
}

const Task = ({id, title, description, priority, isCompleted}: TaskProps) => {
  const dispatch = useDispatch();

  const handleRemoveClick = (id: string): void => { 
    dispatch(removeTask(id));
    dispatch(updateCount(-1));
  };

  const handleCompleted = (id: string): void => {
    dispatch(setTask(id));
  };

  const handleUpdate = (id: string): void => {
    dispatch(setTaskToUpdate(id));
  };

  return (
    <div className="component-container shadow">
      <div className="task-title-container">
        <h3 className="task--title">{title}</h3>
        <span onClick={() => handleUpdate(id)}>
          <FiEdit3 className="task--edit-btn" />
        </span>
      </div>
      <p><span>Description:</span> {description}</p>
      <p><span>Priority:</span> {priority}</p>
      <div className="task--btn-container">
        <div className='task--checkbox'>
          <input
            type="checkbox"
            checked={isCompleted}
            className={isCompleted ? "task--completed-check" : ""}
            onChange={() => handleCompleted(id)}
          />
          <label style={{color: isCompleted ? "green" : ""}}> Completed</label>
        </div>
        <button className='component-btn task--btn-remove' onClick={() => handleRemoveClick(id)}>Remove Task</button>
      </div>
    </div>
  )
}

export default Task;