import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Header from "./components/Header"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { setUser } from "./features/auth/authSlice"
import Dashboard from "./pages/Dashboard"
import AddEditTour from "./pages/AddEditTour"
import SingleTour from "./pages/SingleTour"
import PrivateRoute from "./components/PrivateRoute"
import NotFound from "./pages/NotFound"
import TagTours from "./pages/TagTours"

const App = () => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("profile"))

  useEffect(() => {
    dispatch(setUser(user))
  })
  return (
    <Router>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/tours/search" element={<Home />} />
          <Route path="/tours/tags/:tag" element={<TagTours />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/tours/:id" element={<SingleTour />} />
          <Route
            path="/addtour"
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />
          <Route
            path="/edittour/:id"
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
