import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { loginUser, registerUser, toggleLogin, toggleRegister } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const LoginRegiste = () => {
    const login =useSelector((state) => state.authReducer.login);
    const register =useSelector((state) => state.authReducer.register);

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
     // get url path to determine whether it's login or register form 
     const path = window.location.pathname;
     const dispatch = useDispatch();
     if (path === '/login') {
         dispatch(toggleLogin());
     } else if (path === '/register' && !register) {
         dispatch(toggleRegister());
     }

        const navigate = useNavigate();
     //Register new user
     const handleRegister = (e) => {
        e.preventDefault();
        //Navigate to login form only if registration is successful 
        dispatch(registerUser(registerData))
        .then(() => {
            setRegisterData({
                username: '',
                email: '',
                password: ''
            });
            navigate("/login");
            dispatch(toggleLogin());
        })
        .catch((error) => {
            //Registration failed, error is alredy displayed via tost 
        
        });
     }
     //Login user
        const handleLogin = (e) => {
        e.preventDefault();
        // Dispatch login action 
        dispatch(loginUser(loginData))
        .then(() => {
            setLoginData({
                email: '',
                password: ''
            });
            navigate("/");
        })
        .catch((error) => {
            // Login failed, error is already displayed via toast
        }); 
     }
  return (
    <>
        {login && <Form className='mt-4 w-50 mx-auto' onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={loginData.email} onChange={handleLoginChange} />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={loginData.password} onChange={handleLoginChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        login
      </Button>
    </Form>}
        {register && <Form className='mt-4 w-50 mx-auto' onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formBasicEmail" >
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" name="username" value={registerData.username} onChange={handleRegisterChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={registerData.email} onChange={handleRegisterChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={registerData.password} onChange={handleRegisterChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>}
    </>
  )
}

export default LoginRegiste
