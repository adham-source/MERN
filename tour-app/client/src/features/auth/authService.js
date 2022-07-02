import axios from "axios"

const DEV_ENV = process.env.NODE_ENV !== "production"

const { REACT_APP_BEV_API, REACT_APP_PROD_API } = process.env

const API_URL = axios.create({
  baseURL: `${DEV_ENV ? REACT_APP_BEV_API : REACT_APP_PROD_API}`,
})

const register = (formData) => API_URL.post("/users/register", formData)

const login = (formData) => API_URL.post("/users/login", formData)

const googleLogin = (data) => API_URL.post("/users/googleLogin", data)

const logout = () => {
  localStorage.removeItem("profile")
  localStorage.clear()
}

const authService = {
  register,
  login,
  googleLogin,
  logout,
}

export default authService
