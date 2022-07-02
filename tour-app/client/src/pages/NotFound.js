import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <main className="mt-5 pt-5">
      <h2 className="mt-5 pt-5 fw-bolder">404</h2>
      <h5 className="my-2 py-2 lead">Not Found Page</h5>
      <button
        className="btn btn-primary"
        onClick={() => navigate(-1, { replace: true })}
      >
        Go Back
      </button>
    </main>
  )
}
export default NotFound
