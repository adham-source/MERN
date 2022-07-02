import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBBtn,
  MDBIcon,
  MDBCardFooter,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter,
} from "mdb-react-ui-kit"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { deleteTour } from "../features/tour/tourSlice"
import { excerpt } from "../utility"

const CardTourDashboard = ({ _id, title, description, tags, imageFile }) => {
  const [centredModal, setCentredModal] = useState(false)

  const toggleShow = () => setCentredModal(!centredModal)

  const dispatch = useDispatch()

  const handleDelete = (id) => {
    if (window.confirm("Are user sure to delete this tour ?")) {
      dispatch(deleteTour({ id, toast }))
    }
  }

  return (
    <MDBCol size="md" md="6" sm="12" className=" g-4">
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

        <MDBCardBody>
          <MDBCardTitle>{title}</MDBCardTitle>
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
        <div
          style={{
            position: "absolute",
            top: "210px",
            right: "1rem",
            display: "flex",
            alignItems: "center",
            gap: ".8rem",
          }}
        >
          <MDBBtn className="my-1" tag="a" color="none">
            <MDBIcon
              fas
              icon="trash"
              size="lg"
              className="text-danger"
              onClick={toggleShow}
            />
          </MDBBtn>

          <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
            <MDBModalDialog centered>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>
                    Are you sure to delete this tour ?
                  </MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                  ></MDBBtn>
                </MDBModalHeader>

                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={toggleShow}>
                    Cancel
                  </MDBBtn>
                  <MDBBtn
                    color="danger"
                    title="Delete"
                    onClick={() => handleDelete(_id)}
                  >
                    Confirm delete
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>

          <Link to={`/edittour/${_id}`}>
            <MDBIcon
              fas
              icon="edit"
              size="lg"
              className="text-info"
              title="Edit"
            />
          </Link>
        </div>
      </MDBCard>
    </MDBCol>
  )
}
export default CardTourDashboard
