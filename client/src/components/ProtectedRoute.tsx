import { Navigate } from 'react-router-dom';
import auth from '../utils/auth';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!auth.loggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;