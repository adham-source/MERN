import { useSelector } from "react-redux"
import LoadingToRedirect from "./LoadingToRedirect"

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth }))

  return user && user.token ? children : <LoadingToRedirect />
}

export default PrivateRoute
