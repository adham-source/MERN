import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit"
import { Link } from "react-router-dom"
import { excerpt } from "../utility"

const RelatedTours = ({ related, id }) => {
  return (
    <>
      {related && related.length > 0 && (
        <MDBRow className="mt-5 g-4">
          <MDBCol sm="12" className="my-2 py-2">
            {related.length > 1 && (
              <h3 className="related_tours_title">Related Tours</h3>
            )}
          </MDBCol>

          {related
            .filter((tour) => tour._id !== id)
            .splice(0, 3)
            .map((tour, index) => (
              <MDBCol key={index} lg="4" md="6" sm="12">
                <MDBCard>
                  <Link to={`/tours/${tour._id}`}>
                    <MDBCardImage
                      src={tour.imageFile}
                      alt={tour.title}
                      position="top"
                    />
                  </Link>
                  <MDBCardBody>
                    <MDBCardTitle>{tour.title}</MDBCardTitle>
                    <MDBCardText>{excerpt(tour.description, 30)}</MDBCardText>
                  </MDBCardBody>
                  <MDBCardFooter>
                    <div>
                      {tour.tags.map((tag, index) => (
                        <Link
                          className="me-2"
                          key={index}
                          to={`/tours/tags/${tag}`}
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>
            ))}
        </MDBRow>
      )}
    </>
  )
}

export default RelatedTours
