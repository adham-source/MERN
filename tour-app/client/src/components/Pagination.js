import { MDBPagination, MDBPaginationItem, MDBBtn } from "mdb-react-ui-kit"

const Pagination = ({
  setCurrentPage,
  currentPage,
  numberOfPages,
  dispatch,
}) => {
  const renderPagination = () => {
    if (currentPage === numberOfPages && currentPage === 1) return null
    if (currentPage === 1) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <b className=" fs-5 ">1</b>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              className="mx-2"
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      )
    } else if (currentPage !== numberOfPages) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              className="mx-2"
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              Previous
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <b className=" fs-5 ">{currentPage}</b>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              className="mx-2"
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      )
    } else {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              className="mx-2"
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              Previous
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <b className=" fs-5 ">{currentPage}</b>
          </MDBPaginationItem>
        </MDBPagination>
      )
    }
  }
  return (
    <nav
      aria-label="pagination"
      className="my-3 py-2 d-flex justify-content-center align-items-center"
    >
      {renderPagination()}
    </nav>
  )
}

export default Pagination
