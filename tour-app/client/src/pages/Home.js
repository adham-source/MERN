import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit"
import CardTour from "../components/CardTour"
import { getTours, setCurrentPage } from "../features/tour/tourSlice"
import Spinner from "../components/Spinner"
import Pagination from "../components/Pagination"
import { useLocation } from "react-router-dom"

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const { tours, currentPage, numberOfPages, isLoading } = useSelector(
    (state) => ({
      ...state.tour,
    })
  )

  const dispatch = useDispatch()

  const query = useQuery()
  const searchQuery = query.get("searchQuery")
  const location = useLocation()

  useEffect(() => {
    dispatch(getTours(currentPage))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])
  if (isLoading) {
    return <Spinner />
  }
  return (
    <main className="mt-5 py-5 bg-light">
      <MDBContainer>
        {tours.length === 0 && location === "/" && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No tours found
          </MDBTypography>
        )}

        {tours.length === 0 && location !== "/" && (
          <MDBTypography className="text-center mb-0" tag="h2">
            We couldn't find ann title for "{searchQuery}"
          </MDBTypography>
        )}

        <MDBRow>
          {tours &&
            tours.map((tour, index) => <CardTour key={index} {...tour} />)}
        </MDBRow>
        {tours?.length > 0 && location === "/" && (
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            dispatch={dispatch}
          />
        )}
      </MDBContainer>
    </main>
  )
}

export default Home
