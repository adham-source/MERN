import axios from "axios"

const DEV_ENV = process.env.NODE_ENV !== "production"

const { REACT_APP_BEV_API, REACT_APP_PROD_API } = process.env

const API_URL = axios.create({
  baseURL: `${DEV_ENV ? REACT_APP_BEV_API : REACT_APP_PROD_API}`,
})

API_URL.interceptors.request.use((config) => {
  if (localStorage.getItem("profile")) {
    const token = JSON.parse(localStorage.getItem("profile")).token
    config.headers["x-auth-token"] = `Bearer ${token}`
  }
  return config
})

const getTours = (page) => API_URL.get(`/tours?page=${page}`)
const getToursBySearch = (searchQuery) =>
  API_URL.get(`/tours/search?searchQuery=${searchQuery}`)
const getTour = (id) => API_URL.get(`/tours/${id}`)

const getToursByTag = (tag) => API_URL.get(`/tours/tags/${tag}`)
const getRelatedTours = (tags) => API_URL.post("/tours/related", tags)

const getUserTours = (userId) => API_URL.get(`/tours/userTours/${userId}`)
const likeTour = (id) => API_URL.patch(`/tours/like/${id}`)

const createTour = (newDataTour) => API_URL.post("/tours", newDataTour)
const updateTour = (id, updatedTourData) =>
  API_URL.patch(`/tours/${id}`, updatedTourData)
const deleteTour = (id) => API_URL.delete(`/tours/${id}`)

const tourService = {
  getTours,
  getToursBySearch,
  getTour,

  getToursByTag,
  getRelatedTours,

  getUserTours,
  likeTour,

  createTour,
  updateTour,
  deleteTour,
}

export default tourService
