import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { MDBContainer, MDBRow } from "mdb-react-ui-kit"
import CardTour from "../components/CardTour"
import { getTours, setCurrentPage } from "../features/tour/tourSlice"
import Spinner from "../components/Spinner"
import Pagination from "../components/Pagination"

const Home = () => {
  const dispatch = useDispatch()

  const { tours, currentPage, numberOfPages, isLoading } = useSelector(
    (state) => ({
      ...state.tour,
    })
  )
  useEffect(() => {
    dispatch(getTours(currentPage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])
  if (isLoading) return <Spinner />
  return (
    <main className="mt-5 py-5 bg-light">
      <MDBContainer>
        <MDBRow>
          {tours &&
            tours.map((tour, index) => <CardTour key={index} {...tour} />)}
        </MDBRow>
        {tours?.length > 0 && (
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
