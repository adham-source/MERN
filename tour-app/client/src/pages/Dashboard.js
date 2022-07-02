import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MDBBtn, MDBContainer, MDBRow } from "mdb-react-ui-kit"
import { Link } from "react-router-dom"
import { getUserTours } from "../features/tour/tourSlice"
import CardTourDashboard from "./../components/CardTourDashboard"
import Spinner from "../components/Spinner"

const Dashboard = () => {
  const dispatch = useDispatch()
  const { userTours, isLoading } = useSelector((state) => ({ ...state.tour }))
  const { user } = useSelector((state) => ({ ...state.auth }))
  const userId = user?.id
  useEffect(() => {
    if (userId) {
      dispatch(getUserTours(userId))
    }
  }, [dispatch, userId])

  if (isLoading) return <Spinner />

  return (
    <main className="mt-5 py-5 bg-light">
      <MDBContainer>
        <MDBRow>
          {userTours?.length === 0 && (
            <h2>No tour available to : {user?.name}</h2>
          )}

          {userTours?.length > 0 && (
            <div className="d-flex justify-content-center align-items-center mb-2">
              <h5 className="text-capitalize"> Dashboard : {user?.name}</h5>
            </div>
          )}

          <Link to="/addtour">
            <MDBBtn className="d-block">Add Tour</MDBBtn>
          </Link>
          {userTours &&
            userTours.map((tour, index) => (
              <CardTourDashboard key={index} {...tour} />
            ))}
        </MDBRow>
      </MDBContainer>
    </main>
  )
}

export default Dashboard
