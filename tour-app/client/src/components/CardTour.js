import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBBtn,
  MDBCardFooter,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { likeTour } from "../features/tour/tourSlice"
import { excerpt } from "../utility"

const CardTour = ({ _id, title, description, tags, imageFile, likes }) => {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const userId = user?.id
  const dispatch = useDispatch()

  const Likes = () => {
    if (likes.length > 0)
      return likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" className="me-2" />
          {likes.length > 2 ? (
            <MDBTooltip
              tag="span"
              title={`You and ${likes.length - 1} other user likes`}
            >
              {likes.length} Likes
            </MDBTooltip>
          ) : (
            `${likes.length} Like${likes.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        <>
          {/* <b className="text-primary"> */}
          <MDBIcon far icon="thumbs-up" className="me-2" />
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
          {/* </b> */}
        </>
      )
    return (
      <>
        <MDBIcon far icon="thumbs-up" className="me-2" />
        Like
      </>
    )
  }

  const handleLike = () => {
    dispatch(likeTour({ _id }))
  }

  return (
    <MDBCol md="6" sm="12" lg="4" className=" g-4">
      <MDBCard style={{ position: "relative" }}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: ".5rem",
          }}
        />
        {/* {name && (
          <h5
            className="position-absolute start-0 text-capitalize bg-info p-2"
            style={{ borderRadius: ".3rem", top: "-.2rem" }}
          >
            {name}
          </h5>
        )} */}

        <MDBCardBody>
          <MDBCardTitle>{title}</MDBCardTitle>
          <div className="text-end">
            <MDBBtn
              tag="a"
              color="none"
              style={{ userSelect: "none" }}
              onClick={!user ? null : handleLike}
            >
              {!user ? (
                <MDBTooltip tag="span" title="Please login to like tour">
                  <Likes />
                </MDBTooltip>
              ) : (
                <Likes />
              )}
            </MDBBtn>
          </div>
          <MDBCardText>{excerpt(description, 40)}</MDBCardText>
          <Link to={`/tours/${_id}`}>
            <MDBBtn>Read more</MDBBtn>
          </Link>
        </MDBCardBody>
        <MDBCardFooter className="d-flex justify-content-center">
          {tags.map((tag, index) => (
            <div className="me-2" key={index}>
              <Link to={`/tours/tags/${tag}`}>{`#${tag}`}</Link>
            </div>
          ))}
        </MDBCardFooter>
      </MDBCard>
    </MDBCol>
  )
}
export default CardTour
