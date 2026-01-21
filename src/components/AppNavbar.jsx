import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser, toggleLogin, toggleRegister } from '../redux/actions/authActions';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AppNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const navigator = useNavigate();




  const handleLogout = () => {
    dispatch(logoutUser());
    navigator('/');
  };
  return (
     <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">GB APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {user && (<>
              <Nav.Link as={Link} to="/products">Products</Nav.Link>
              <Nav.Link as={Link} to="/add-product">Add Product</Nav.Link>
            </> )}
            
          </Nav>
          {/* Add login/ Register links here */}
          <Nav className="ms-auto">
            {!user ? (<>
              <Nav.Link as={Link} to="/login" onClick={() => dispatch(toggleLogin())}>Login</Nav.Link>
              <Nav.Link as={Link} to="/register" onClick={() => dispatch(toggleRegister())}>Register</Nav.Link>
            </>) : (
              <>
              <Nav.Link>Welcome, {user.username}</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>

            )}
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default AppNavbar
