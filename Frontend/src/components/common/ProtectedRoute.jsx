import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { role, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!role) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;