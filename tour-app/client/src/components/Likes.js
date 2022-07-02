import { MDBBtn, MDBIcon, MDBTooltip } from "mdb-react-ui-kit"
import { useDispatch, useSelector } from "react-redux"
import { likeTour } from "../features/tour/tourSlice"

const Likes = ({ _id, likes }) => {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const userId = user?.id
  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(likeTour({ _id }))
  }

  const content = () => {
    if (likes.length > 0)
      return likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" className="me-2" />
          {likes.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={`You and ${likes.length - 1} other user likes`}
            >
              {likes.length} Likes
            </MDBTooltip>
          ) : (
            `${likes.length} Like${likes.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        <b className="text-primary">
          <MDBIcon far icon="thumbs-up" className="me-2" />
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </b>
      )
  }
  return (
    <>
      <MDBBtn
        tag="a"
        color="none"
        style={{ userSelect: "none" }}
        onClick={handleLike}
      >
        {content()}
        <MDBIcon far icon="thumbs-up" className="me-2" />
        Likes
      </MDBBtn>
    </>
  )
}

export default Likes
