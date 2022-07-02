import { MDBSpinner } from "mdb-react-ui-kit"

const Spinner = () => {
  return (
    <MDBSpinner
      grow
      color="primary"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        tranform: "translate(-50%, -50%)",
      }}
    >
      <span className="visually-hidden">Loading ...</span>
    </MDBSpinner>
  )
}
export default Spinner
