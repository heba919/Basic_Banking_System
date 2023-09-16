import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
const divStyle = {color: "#444",
textAlign: "left",
fontSize: "16px",
fontWeight: "100",
textTransform: "uppercase",
marginLeft: "10px",
color:"white"}
const MyNav = () => {
  
  return (
    <Navbar expand="lg" className=' sticky-top indigo-500' style={{ backgroundColor: '#050A30'}}>
      <Container>
        <Navbar.Brand href="home"  style={divStyle} >Bank System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" >

            <Nav.Link style={divStyle} href="AllTrans">All Transaction</Nav.Link>  
            <Nav.Link style={divStyle} href="AllUsers"  >Customers</Nav.Link>
            <Nav.Link style={divStyle} href="#" >Contact US</Nav.Link>
           

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default MyNav;