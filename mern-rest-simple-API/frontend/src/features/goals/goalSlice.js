import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import goalService from "./goalService"

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.createGoal(goalData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getGoals = createAsyncThunk(
  "goals/allGoals",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.getGoals(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// export const updateGoal = createAsyncThunk(
//   "goals/update",
//   async (id, goalData, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token
//       return await goalService.updateGoal(id, goalData, token)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.deleteGoal(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(actions.payload)
      })
      .addCase(createGoal.rejected, (state, actions) => {
        state.isLoading = false
        state.isError = true
        state.message = actions.payload
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGoals.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = actions.payload
      })
      .addCase(getGoals.rejected, (state, actions) => {
        state.isLoading = false
        state.isError = true
        state.message = actions.payload
      })
      // .addCase(updateGoal.pending, (state) => {
      //   state.isLoading = true
      // })
      // .addCase(updateGoal.fulfilled, (state, actions) => {
      //   state.isLoading = false
      //   state.isSuccess = true
      //   state.goals.push(actions.payload)
      // })
      // .addCase(updateGoal.rejected, (state, actions) => {
      //   state.isLoading = false
      //   state.isError = true
      //   state.message = actions.payload
      // })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter(
          (goal) => goal._id !== actions.payload.id
        )
      })
      .addCase(deleteGoal.rejected, (state, actions) => {
        state.isLoading = false
        state.isError = true
        state.message = actions.payload
      })
  },
})

export const { reset } = goalSlice.actions

export default goalSlice.reducer
