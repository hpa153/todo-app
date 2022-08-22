import { createSlice } from '@reduxjs/toolkit';

import { TaskProps } from '../../../components/Task/Task';
import { safeToLocalStorage } from '../../../utils/helpers';

// Get data from local storage
const previousTasks = window.localStorage.getItem("tasks");

const initialState = {
  tasks: previousTasks ? JSON.parse(previousTasks) : [] as Array<TaskProps>,
  curTask: ""
}

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action): void => {
      state.tasks = [...state.tasks, action.payload];
      safeToLocalStorage("tasks", state.tasks);
    },
    setTask: (state, action): void => {
      const taskToSet = state.tasks.find((task: TaskProps) => task.id === action.payload);
      taskToSet.isCompleted = !taskToSet.isCompleted;
      safeToLocalStorage("tasks", state.tasks);
    },
    setTaskToUpdate: (state, action): void => {
      state.curTask = action.payload;
    },
    updateTask: (state, action): void => {
      const taskToSet = state.tasks.find((task: TaskProps) => task.id === action.payload.id);
      taskToSet.title = action.payload.title;
      taskToSet.description = action.payload.description;
      taskToSet.priority = action.payload.priority;
      safeToLocalStorage("tasks", state.tasks);
    },
    removeTask: (state, action): void => {
      state.tasks = state.tasks.filter((task: TaskProps) => task.id !== action.payload);
      safeToLocalStorage("tasks", state.tasks);
    },
  },
})

// Action creators are generated for each case reducer function
export const { addTask, setTask, setTaskToUpdate, removeTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;