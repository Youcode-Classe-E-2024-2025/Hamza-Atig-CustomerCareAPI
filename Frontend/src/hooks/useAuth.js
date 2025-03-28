import { useState, useEffect } from 'react';
import { fetchUserData } from '../api/ticketService';

export const useAuth = () => {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const userData = await fetchUserData();
        setRole(userData.role);
        setUserId(userData.id);
      } catch (error) {
        console.error('Error initializing user:', error);
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  return { role, userId, loading };
};