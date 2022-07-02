import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import authService from "./authService"

export const register = createAsyncThunk(
  "auth/register",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await authService.register(formData)
      toast.success("Register successfuly")
      navigate("/login")
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const login = createAsyncThunk(
  "auth/login",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await authService.login(formData)

      toast.success("Login successfully")
      navigate("/", { replace: true })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async ({ data, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await authService.googleLogin(data)
      toast.success("Google login successfully")
      navigate("/", { replace: true })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const response = authService.logout()

      navigate("/login", { replace: true })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setLogout: (state) => {
      localStorage.removeItem("profile")
      localStorage.clear()
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.error = action.payload.message
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }))
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.error = action.payload.message
      })
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }))
        state.user = action.payload
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.error = action.payload.message
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false
        state.user = null
      })
  },
  // extraReducers: {
  //   [register.pending]: (state) => {
  //     state.isLoading = true
  //   },
  //   [register.fulfilled]: (state, action) => {
  //     state.isLoading = false
  //     state.user = action.payload
  //   },
  //   [register.rejected]: (state, action) => {
  //     state.isLoading = false
  //     state.user = null
  //     state.error = action.payload.message
  //   },
  //   [login.pending]: (state) => {
  //     state.isLoading = true
  //   },
  //   [login.fulfilled]: (state, action) => {
  //     state.isLoading = false
  //     localStorage.setItem("profile", JSON.stringify({ ...action.payload }))
  //     state.user = action.payload
  //   },
  //   [login.rejected]: (state, action) => {
  //     state.isLoading = false
  //     state.user = null
  //     state.error = action.payload.message
  //   },
  // },
})

export const { setUser, setLogout } = authSlice.actions

export default authSlice.reducer
