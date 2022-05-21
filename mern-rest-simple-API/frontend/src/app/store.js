import { configureStore } from "@reduxjs/toolkit"
// import counterReducer from '../features/counter/counterSlice';

import authReducer from "../features/auth/authSlice"
import goalReducer from "../features/goals/goalSlice"

export const store = configureStore({
  reducer: {
    // counter: counterReducer
    auth: authReducer,
    goals: goalReducer,
  },
})
