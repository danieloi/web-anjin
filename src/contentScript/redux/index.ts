import { configureStore } from '@reduxjs/toolkit'
import activeReducer from './slices/active.slice'

export const store = configureStore({
  reducer: {
    active: activeReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
