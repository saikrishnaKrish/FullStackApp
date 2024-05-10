import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const RequireAuth = () => {

    const { userDetails} = useAuthContext();
    const location = useLocation();

  return (
    Object.keys(userDetails).length > 0  ? <Outlet/> : 
    <Navigate to="/signonportal" state={{ from: location }} replace/>
  )
}

export default RequireAuth