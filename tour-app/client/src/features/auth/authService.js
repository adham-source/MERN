import axios from "axios"

const API_URL = axios.create({
  baseURL: "http://localhost:4000",
  // headers: {
  //   Authorization:
  //     `Bearer ` + JSON.parse(localStorage.getItem("profile")).token,
  // },
})

// const user = JSON.parse(localStorage.getItem("profile"))

// API_URL.interceptors.request.use((config) => {
//   if (user) {
//     config.headers["x-auth-token"] = `Bearer ${user.token}`
//   }
//   console.log(config.headers, user)

//   return config
// })

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
