import { configureStore } from '@reduxjs/toolkit'

import taskReducer from './features/task/taskSlice';
import paginationReducer from './features/pagination/paginationSlice';

export const store = configureStore({
  reducer: {
    task: taskReducer,
    pagination: paginationReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch