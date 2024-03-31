
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Assuming you have jwt-decode library installed
import secureLocalStorage from 'react-secure-storage'

const ProtectedRoute = (props) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = secureLocalStorage.getItem('token');
    const active = secureLocalStorage.getItem('active');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
        if (decodedToken.exp > currentTime) {
          // Token is valid
          setShow(true);
        } else {
          // Token has expired, redirect to login
          navigate('/login');
        }
      } catch (error) {
        // Error decoding token, redirect to login
        navigate('/login');
      }
    } else {
      // Token not found, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  return show && <props.component/>;
};

export default ProtectedRoute;