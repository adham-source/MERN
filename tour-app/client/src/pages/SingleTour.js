import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRelatedTours, getTour } from "../features/tour/tourSlice"
import { useNavigate, useParams } from "react-router-dom"
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBCardLink,
} from "mdb-react-ui-kit"

import moment from "moment"
import Spinner from "../components/Spinner"
import RelatedTours from "../components/RelatedTours"

const SingleTour = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { tour, relatedTours, isLoading } = useSelector((state) => ({
    ...state.tour,
  }))
  const { id } = useParams()
  const { title, description, tags, createdAt, imageFile, name } = tour

  useEffect(() => {
    tags && dispatch(getRelatedTours(tags))
  }, [dispatch, tags])

  useEffect(() => {
    if (id) {
      dispatch(getTour(id))
    }
  }, [dispatch, id])

  if (isLoading) return <Spinner />

  return (
    <main className="mt-5 py-5 bg-light">
      {tour && (
        <MDBContainer>
          <MDBCard className="py-3 mb-2">
            <MDBRow className="g-1">
              <MDBCol md="4">
                <MDBCardImage
                  src={imageFile}
                  alt={title}
                  fluid
                  position="left"
                  style={{ height: "100%", objectFit: "contain" }}
                />
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody className="text-start">
                  <MDBCardTitle className="text-capitalize fw-bolder">
                    {title}
                  </MDBCardTitle>
                  <MDBCardText className="text-capitalize">
                    Created By : <span className="fw-bold">{name}</span>
                  </MDBCardText>
                  <MDBCardText>
                    {tags?.map((tag, index) => (
                      <span key={index} className="me-2">{`#${tag}`}</span>
                    ))}
                  </MDBCardText>
                  <MDBIcon far icon="calendar-alt" size="lg" className="me-2" />
                  <small className="text-muted">
                    {moment(createdAt).fromNow()}
                  </small>

                  <MDBCardText className="lead py-2">{description}</MDBCardText>
                  <MDBCardLink onClick={() => navigate(-1)}>
                    {/* If using with navidate (0) rediret in the same page */}
                    <MDBBtn className="my-2 d-flex">go back</MDBBtn>
                  </MDBCardLink>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>

          <RelatedTours related={relatedTours} id />
        </MDBContainer>
      )}
    </main>
  )
}

export default SingleTour
