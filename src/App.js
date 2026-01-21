import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Productlist from './components/Productlist';
import AddEdit from './components/AddEdit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginRegister from './components/LoginRegiste';
import PrivateRoute from './components/PrivateRoute';  // Renommé ici
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './redux/actions/authActions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()); // Récupérer l'utilisateur authentifié
  }, [dispatch]);

  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<PrivateRoute><Productlist /></PrivateRoute>} />
        <Route path='/add-product' element={<PrivateRoute><AddEdit /></PrivateRoute>} />
        <Route path='/register' element={<LoginRegister />} />
        <Route path='/login' element={<LoginRegister />} />
      </Routes>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;

