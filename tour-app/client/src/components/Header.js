import {
  MDBNavbar,
  MDBNavbarNav,
  MDBCollapse,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBContainer,
  MDBIcon,
  MDBNavbarBrand,
  MDBBtn,
} from "mdb-react-ui-kit"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout, setLogout } from "../features/auth/authSlice"
import { getToursBySearch } from "../features/tour/tourSlice"
import jwt_decode from "jwt-decode"

const Header = () => {
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState("")

  const { user } = useSelector((state) => ({ ...state.auth }))

  const token = user?.token

  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (token) {
    const decodeToken = jwt_decode(token)
    if (decodeToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout())
    }
  }

  const handleLogout = () => {
    dispatch(logout(navigate))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (search) {
      dispatch(getToursBySearch(search))
      navigate(`/tours/search?searchQuery=${search}`)
      setSearch("")
    } else {
      navigate("/")
    }
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }
  return (
    <header>
      <MDBNavbar expand="lg" fixed="top" light bgColor="white">
        <MDBContainer fluid>
          <MDBNavbarBrand
            href="/"
            style={{ fontWeight: "600", fontSize: "1.5rem" }}
          >
            Tour
          </MDBNavbarBrand>

          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShow(!show)}
          >
            <MDBIcon fas icon="bars" />
          </MDBNavbarToggler>

          <MDBCollapse show={show} navbar>
            <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
              <MDBNavbarItem active>
                <MDBNavbarLink aria-current="page" href="/">
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              {user?.id && (
                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">Dashboard</MDBNavbarLink>
                </MDBNavbarItem>
              )}

              {user?.id ? (
                <MDBNavbarItem>
                  <MDBNavbarLink href="/login" onClick={handleLogout}>
                    Logout
                  </MDBNavbarLink>
                </MDBNavbarItem>
              ) : (
                <MDBNavbarItem>
                  <MDBNavbarLink href="/login">Login</MDBNavbarLink>
                </MDBNavbarItem>
              )}

              {user?.id && (
                <MDBNavbarItem>
                  <MDBNavbarLink style={{ fontWeight: "600" }}>
                    Logged in as :{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {user?.name?.split(" ")[0]}
                    </span>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              )}
              <MDBNavbarItem>
                <form
                  className="d-flex input-group w-auto"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="search"
                    value={search}
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Search tour title"
                    aria-label="Search"
                  />
                  <MDBBtn color="primary">Search</MDBBtn>
                </form>
              </MDBNavbarItem>
              {/* <form className="d-flex input-group w-auto">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Type query"
                  aria-label="Search"
                />
                <MDBBtn color="primary">Search</MDBBtn>
              </form> */}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </header>
  )
}

export default Header
