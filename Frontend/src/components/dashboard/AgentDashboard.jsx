import { useState, useEffect } from 'react';
import { fetchAllTickets, postResponse, updateTicketStatus } from '../../api/ticketService';
import LogoutButton from '../common/LogoutButton';
import TicketList from '../tickets/TicketList';

const AgentDashboard = ({ userId }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const loadTickets = async () => {
      const ticketsData = await fetchAllTickets();
      setTickets(ticketsData);
    };
    loadTickets();
  }, []);

  const handleResponse = async (ticketId, response) => {
    try {
      await postResponse(ticketId, response, userId);
      await updateTicketStatus(ticketId, { 
        status: 'closed', 
        closed_at: new Date() 
      });
      const updatedTickets = await fetchAllTickets();
      setTickets(updatedTickets);
    } catch (error) {
      console.error('Error handling response:', error);
    }
  };

  const handleWorkOnTicket = async (ticketId) => {
    try {
      await updateTicketStatus(ticketId, { 
        status: 'pending', 
        agent_id: userId, 
        tacked_at: new Date() 
      });
      const updatedTickets = await fetchAllTickets();
      setTickets(updatedTickets);
    } catch (error) {
      console.error('Error working on ticket:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <LogoutButton />
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">All Tickets</h2>
      <TicketList 
        tickets={tickets} 
        onWorkOnTicket={handleWorkOnTicket}
        onResponse={handleResponse}
        userId={userId}
      />
    </div>
  );
};

export default AgentDashboard;