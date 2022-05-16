import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authService from "./authService"

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    // user or any name because this argument passing into pages/Register.jsx
    try {
      return await authService.register(user)
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

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk(
  "auth/logout",
  async () => await authService.logout()
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })

      .addCase(register.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = actions.payload
      })
      .addCase(register.rejected, (state, actions) => {
        state.isLoading = false
        // state.isSuccess = false // me
        state.isError = true
        state.user = null
        state.message = actions.payload
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true
      })

      .addCase(login.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = actions.payload
      })
      .addCase(login.rejected, (state, actions) => {
        state.isLoading = false
        state.isError = true
        state.message = actions.payload
        state.user = null
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions

export default authSlice.reducer
