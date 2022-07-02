import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import tourService from "./tourService"

export const getTours = createAsyncThunk(
  "tour/getTours",
  async (page, { rejectWithValue }) => {
    try {
      const response = await tourService.getTours(page)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getTour = createAsyncThunk(
  "tour/getTour",
  async (id, { rejectWithValue }) => {
    try {
      const response = await tourService.getTour(id)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  }
)

export const getToursBySearch = createAsyncThunk(
  "tour/getToursBySearch",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await tourService.getToursBySearch(searchQuery)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  }
)

export const getToursByTag = createAsyncThunk(
  "tour/getToursByTag",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await tourService.getToursByTag(tag)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  }
)

export const getRelatedTours = createAsyncThunk(
  "tour/getRelatedTours",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await tourService.getRelatedTours(tags)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  }
)

export const getUserTours = createAsyncThunk(
  "tour/getUserTours",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await tourService.getUserTours(userId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  }
)

export const likeTour = createAsyncThunk(
  "tour/likeTour",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await tourService.likeTour(_id)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  }
)

export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await tourService.createTour(updatedTourData)
      toast.success("Tour added successfully")
      navigate("/dashboard", { replace: true })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ id, updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await tourService.updateTour(id, updatedTourData)
      toast.success("Updated tour successfully")
      navigate("/dashboard", { replace: true })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  }
)

export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await tourService.deleteTour(id)
      toast.success("Tour deleted successfully .")
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  }
)

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    currentPage: 1,
    numberOfPages: null,
    userTours: [],
    tagTours: [],
    relatedTours: [],
    error: "",
    isLoading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  // extraReducers: {
  //   [getTours.pending]: (state) => {
  //     state.isLoading = true
  //   },
  //   [getTours.fulfilled]: (state, action) => {
  //     state.isLoading = false
  //     state.tours = action.payload.tours
  //     state.numberOfPages = action.payload.numberOfPages
  //     state.currentPage = action.payload.currentPage
  //   },
  //   [getTours.rejected]: (state, action) => {
  //     state.isLoading = false
  //     state.error = action.payload.message
  //   },

  //   [likeTour.pending]: () => {},
  //   [likeTour.fulfilled]: (state, action) => {
  //     state.isLoading = false
  //     const {
  //       arg: { _id },
  //     } = action.meta
  //     if (_id) {
  //       state.tours = state.tours.map((tour) =>
  //         tour._id === _id ? action.payload : tour
  //       )
  //     }
  //   },
  //   [likeTour.rejected]: (state, action) => {
  //     state.error = action.payload.message
  //   },
  // },
  extraReducers: (builder) => {
    builder

      .addCase(getTours.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTours.fulfilled, (state, action) => {
        state.isLoading = false
        state.tours = action.payload.tours
        state.numberOfPages = action.payload.numberOfPages
        state.currentPage = action.payload.currentPage
      })
      .addCase(getTours.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message
      })

      .addCase(getTour.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTour.fulfilled, (state, action) => {
        state.isLoading = false
        state.tour = action.payload
      })
      .addCase(getTour.rejected, (state, action) => {
        state.error = action.payload.message
      })

      .addCase(getToursBySearch.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getToursBySearch.fulfilled, (state, action) => {
        state.isLoading = false
        state.tours = action.payload
      })
      .addCase(getToursBySearch.rejected, (state, action) => {
        state.error = action.payload.message
      })

      .addCase(getToursByTag.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getToursByTag.fulfilled, (state, action) => {
        state.isLoading = false
        state.tagTours = action.payload
      })
      .addCase(getToursByTag.rejected, (state, action) => {
        state.error = action.payload.message
      })
      .addCase(getRelatedTours.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRelatedTours.fulfilled, (state, action) => {
        state.isLoading = false
        state.relatedTours = action.payload
      })
      .addCase(getRelatedTours.rejected, (state, action) => {
        state.error = action.payload.message
      })

      .addCase(getUserTours.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserTours.fulfilled, (state, action) => {
        state.isLoading = false
        state.userTours = action.payload
      })
      .addCase(getUserTours.rejected, (state, action) => {
        state.error = action.payload.message
      })

      .addCase(likeTour.pending, () => {})
      .addCase(likeTour.fulfilled, (state, action) => {
        state.isLoading = false
        const {
          arg: { _id },
        } = action.meta
        if (_id) {
          state.tours = state.tours.map((tour) =>
            tour._id === _id ? action.payload : tour
          )
        }
      })
      .addCase(likeTour.rejected, (state, action) => {
        state.error = action.payload.message
      })

      .addCase(createTour.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTour.fulfilled, (state, action) => {
        state.isLoading = false
        state.tours = [action.payload]
      })
      .addCase(createTour.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message
      })

      .addCase(updateTour.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateTour.fulfilled, (state, action) => {
        state.isLoading = false
        const {
          arg: { id },
        } = action.meta
        if (id) {
          state.userTours = state.userTours.map((tour) =>
            tour._id === id ? action.payload : tour
          )
          state.tours = state.tours.map((tour) =>
            tour._id === id ? action.payload : tour
          )
        }
      })
      .addCase(updateTour.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message
      })

      .addCase(deleteTour.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTour.fulfilled, (state, action) => {
        state.isLoading = false
        const {
          arg: { id },
        } = action.meta
        if (id) {
          state.userTours = state.userTours.filter((tour) => tour._id !== id)
          state.tours = state.tours.filter((tour) => tour._id !== id)
        }
      })
      .addCase(deleteTour.rejected, (state, action) => {
        state.error = action.payload.message
      })
  },
})

export const { setCurrentPage } = tourSlice.actions

export default tourSlice.reducer
