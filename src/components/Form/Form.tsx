import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";

import './style.scss';
import { TaskProps } from '../Task/Task';
import { addTask, setTaskToUpdate, updateTask } from '../../redux/features/task/taskSlice';
import { updateCount } from '../../redux/features/pagination/paginationSlice';
import { RootState } from "../../redux/store";

const Form = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const curTask = useSelector((state: RootState) => state.task.curTask);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(curTask === "" ? false : true);
  const [isCleared, setIsCleared] = useState<boolean>(false);
  const [task, setTask] = useState<TaskProps>({
    id: uuidv4(),
    title: "",
    description: "",
    priority: "Highest",
    isCompleted: false,
  });

  // Clear errors on clear form click
  useEffect(() => {
    setTitleError(false);
    setDescriptionError(false);
    setIsCleared(false);
    setIsUpdating(false);
    clearForm();
  }, [isCleared, dispatch]);

  // Get task data for update
  useEffect(() => {
    if(curTask !== "") {
      const task = tasks.find((task: TaskProps) => task.id === curTask);
      setIsUpdating(true);

      setTask({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        isCompleted: false,
      });
    }
  }, [curTask, tasks]);

  const clearForm = (): void => {
    setIsCleared(true);

    setTask({
      id: uuidv4(),
      title: "",
      description: "",
      priority: "Highest",
      isCompleted: false,
    });
  }

  const createTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    let errors: number = 0;

    // Validate input
    if(!task.title) {
      setTitleError(true);
      ++errors;
    } else {
      setTitleError(false);
    }

    if(!task.description) {
      setDescriptionError(true);
      ++errors;
    } else {
      setDescriptionError (false);
    }

    if(errors === 0) {
      if(!isUpdating) {
        dispatch(addTask(task));
        dispatch(updateCount(1));
      } else {
        dispatch(updateTask(task));
        setIsUpdating(false);
        dispatch(setTaskToUpdate(""));
      }

      // Reset form
      clearForm();
    }
  };

  return (
    <form className="component-container shadow">
      <h3>{isUpdating ? "Update your task" : "Create a new Task"}</h3>
      { 
        (titleError || descriptionError) && 
        <p style={{color: "red"}}>Please fill out all information!</p>
      }
      <div className="form-input">
        <label>Title: </label>
        <input
          className={titleError ? "form-input--error" : ""}
          type="text"
          maxLength={50}
          value={task.title}
          onChange={(e) => setTask({...task, title: e.target.value})}
        />
      </div>
      <div className="form-input">
        <label>Description: </label>
        <input
          className={descriptionError ? "form-input--error" : ""}
          type="text"
          maxLength={150}
          value={task.description}
          onChange={(e) => setTask({...task, description: e.target.value})}
        />
      </div>
      <div className="form-input">
        <label>Style: </label>
        <select
          value={task.priority}
          onChange={(e) => setTask({...task, priority: e.target.value})}>
            {["Highest", "High", "Normal", "Low", "Lowest"].map((priority, idx) => (
              <option key={idx} value={priority}>{priority}</option>
            ))}
        </select>
      </div>
      <div className="form--btn-container">
        <button className="component-btn form--clear-btn" onClick={clearForm}>Clear Form</button>
        <button type="submit" className="component-btn form--submit-btn" onClick={(e) => createTask(e)}>{isUpdating ? "Update Task" : "Create Task"}</button>
      </div>
    </form>
  )
}

export default Form;