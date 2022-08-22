import { createSlice } from '@reduxjs/toolkit'

import { safeToLocalStorage } from '../../../utils/helpers';

export interface PaginationState {
  currentPage: number,
  totalCount: number
}

// Get data from local storage
const previousTasks = window.localStorage.getItem("tasks");
const previousPage = window.localStorage.getItem("curPage");

const initialState = {
  pages: {
    currentPage: previousPage ? parseInt(previousPage) : 1,
    totalCount: previousTasks ? JSON.parse(previousTasks).length : 0
  }
}

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.pages.currentPage = action.payload;
      safeToLocalStorage("curPage", state.pages.currentPage);
    },
    updateCount: (state, action) => {
      state.pages.totalCount = state.pages.totalCount + action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { changePage, updateCount } = paginationSlice.actions

export default paginationSlice.reducer