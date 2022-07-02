import { useEffect, useState } from "react"

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBSpinner,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit"
import ChipInput from "material-ui-chip-input"
import FileBase64 from "react-file-base64"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { createTour, updateTour } from "../features/tour/tourSlice"

const initialState = {
  title: "",
  description: "",
  tags: [],
}
const AddEditTour = () => {
  const [tourData, setTourData] = useState(initialState)
  const [errorTagMessage, setErrorTagMassage] = useState(null)

  const { title, description, tags } = tourData

  const { user } = useSelector((state) => ({ ...state.auth }))

  const { error, isLoading, userTours } = useSelector((state) => ({
    ...state.tour,
  }))

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id)
      setTourData({ ...singleTour })
    }
  }, [userTours, id])

  useEffect(() => {
    error &&
      toast.error(
        Array.isArray(error)
          ? `${error[0]?.instancePath
              ?.charAt(1)
              .toUpperCase()}${error[0]?.instancePath?.slice(2)}
                ${error[0]?.message}`
          : error
      )
  }, [error])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!tags.length) setErrorTagMassage("Please provide some tags .")
    // if (!tags.length) return toast.error(`Please enter any tags .`)
    if (user && user.token) {
      if (title && description && tags) {
        const updatedTourData = { ...tourData, name: user?.name }
        if (!id) {
          dispatch(createTour({ updatedTourData, navigate, toast }))
        } else {
          dispatch(updateTour({ id, updatedTourData, navigate, toast }))
        }
        // handleClearInputs()
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setTourData({ ...tourData, [name]: value })
  }

  const handleAddTag = (tag) => {
    setErrorTagMassage(null)
    setTourData({ ...tourData, tags: [...tourData.tags, tag] })
  }
  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    })
  }

  const handleClearInputs = () => {
    setTourData(initialState)
  }

  return (
    <section
      style={{
        margin: "auto",
        padding: "1rem",
        maxWidth: "30rem",
        alignContent: "center",
        marginTop: "5rem",
      }}
    >
      <MDBCard alignment="center">
        <h5 className="mt-2">{id ? "Update" : "Add"} tour</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <MDBValidationItem
              feedback="Please provide title."
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Title"
                type="text"
                value={title}
                name="title"
                onChange={handleChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              invalid
              feedback="Please provide description."
              className="col-md-12"
            >
              <MDBTextArea
                label="Description"
                value={description}
                name="description"
                onChange={handleChange}
                required
                rows={4}
              />
            </MDBValidationItem>

            <MDBValidationItem
              feedback="Please provide any tags."
              invalid
              className="col-md-12"
            >
              <ChipInput
                variant="outlined"
                placeholder="Enter any tags."
                fullWidth
                value={tags}
                name="tags"
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
              {errorTagMessage && (
                <div
                  className="text-danger mt-1 text-start"
                  style={{ fontSize: "14px" }}
                >
                  {errorTagMessage}
                </div>
              )}
            </MDBValidationItem>

            <div className="d-flex col-md-12 justify-content-start">
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTourData({ ...tourData, imageFile: base64 })
                }
              />
            </div>

            <div className="col-12">
              <MDBBtn
                type="submit"
                className={`w-100 mt-2 ${isLoading && "disabled"}`}
              >
                {isLoading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                {id ? "Update" : "Add"} tour
              </MDBBtn>
              <MDBBtn
                color="danger"
                className={`w-100 mt-2 ${isLoading && "disabled"}`}
                onClick={handleClearInputs}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </section>
  )
}

export default AddEditTour
