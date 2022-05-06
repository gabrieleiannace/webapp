
import { useState } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { getCorrectUrl } from './Sidebar';
import { useNavigate } from 'react-router';

function FilmLibraryNavBar(props) {
    const navigate = useNavigate();
    const filters = props.filters;
  
    const [hideElem, setHideElem] = useState(true);
    return (
      <>
        <Navbar collapseOnSelect onToggle={() => { setHideElem(!hideElem) }} expand="sm" bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand><a><i className="bi bi-collection-play" style={{ fontSize: "32px" }}></i> FilmLibrary</a></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center me-auto">
              <Nav className="">
                {filters.map((filter, index) => <Nav.Link hidden={hideElem} key={index} onClick={() => {navigate(getCorrectUrl(filter)); props.filterHandle(index)}}>{filter}</Nav.Link>)}
                <Nav.Link>
                  <input className="form-control me-2 justify-content-center " type="search" placeholder="Search" aria-label="Search" />
                </Nav.Link>
                {hideElem ?
                  <Nav.Link className='position-absolute top-0 end-0'><i className="bi bi-person-circle p-1 " style={{ fontSize: "32px" }}></i>Account</Nav.Link>
                  :
                  <Nav.Link><i className="bi bi-person-circle p-1 " style={{ fontSize: "32px" }}></i>Account</Nav.Link>
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }

  export default FilmLibraryNavBar;