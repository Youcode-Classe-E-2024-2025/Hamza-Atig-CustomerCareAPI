import { useAuth } from '../hooks/useAuth';
import AgentDashboard from './dashboard/AgentDashboard';
import UserDashboard from './dashboard/UserDashboard';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const { role, userId, loading } = useAuth();

  if (loading) return <p className="p-4">Loading...</p>;

  if (!role && !loading) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto p-4">
      {role === 'agent' ? (
        <AgentDashboard userId={userId} />
      ) : role === 'user' ? (
        <UserDashboard userId={userId} />
      ) : (
        <Navigate to="/login" replace />
      )}
    </div>
  );
};

export default Home;