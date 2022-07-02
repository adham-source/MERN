import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import CardTour from "../components/CardTour"
import Spinner from "../components/Spinner"
import { getToursByTag } from "../features/tour/tourSlice"

const TagTours = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { tag } = useParams()
  const { isLoading, tagTours } = useSelector((state) => ({ ...state.tour }))

  useEffect(() => {
    if (tag) dispatch(getToursByTag(tag))
  }, [dispatch, tag])

  if (isLoading) return <Spinner />
  return (
    <main className="mt-5 py-5 bg-light">
      <MDBContainer>
        <MDBRow>
          <MDBCol className="d-flex justify-content-between align-items-center">
            <h5>Tours with tags : {tag}</h5>
            <MDBBtn onClick={() => navigate(-1)}>GO BACK</MDBBtn>
          </MDBCol>

          <hr className="mt-2" />
          {tagTours &&
            tagTours.map((tour, index) => <CardTour key={index} {...tour} />)}
        </MDBRow>
      </MDBContainer>
    </main>
  )
}

export default TagTours
