import { useState, useEffect } from 'react';
import { fetchTickets, createTicket } from '../../api/ticketService';
import LogoutButton from '../common/LogoutButton';
import TicketForm from '../tickets/TicketForm';
import TicketStatusBadge from '../common/TicketStatusBadge';

const UserDashboard = ({ userId }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        setLoading(true);
        const ticketsData = await fetchTickets();
        setTickets(ticketsData || []);
      } catch (err) {
        setError(err.message || 'Failed to load tickets');
      } finally {
        setLoading(false);
      }
    };
    loadTickets();
  }, []);

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      await createTicket({
        title: formData.get('title'),
        description: formData.get('description'),
        owner_id: userId
      });
      e.target.reset();
      const ticketsData = await fetchTickets();
      setTickets(ticketsData || []);
    } catch (err) {
      setError(err.message || 'Failed to create ticket');
    }
  };

  if (loading) return <div className="p-4 text-center">Loading tickets...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <LogoutButton />
      <h2 className="text-2xl font-bold text-center text-gray-700">Create a Ticket</h2>
      <TicketForm onSubmit={handleSubmitTicket} />
      
      <h2 className="text-2xl font-bold text-center text-gray-700 mt-8">Your Tickets</h2>
      <div>
        {tickets.length === 0 ? (
          <p className="text-center text-gray-500">You don't have any tickets yet, create one first</p>
        ) : (
          <ul className="space-y-4">
            {tickets.map((ticket) => (
              <li key={ticket.id} className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{ticket.title}</h3>
                    <p className="text-gray-600">{ticket.description}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Status: <TicketStatusBadge status={ticket.status} />
                  </p>
                </div>

                {ticket.status === 'closed' && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">
                      {ticket.responses?.length > 0 
                        ? 'Agent Responses:' 
                        : 'No responses yet'}
                    </h4>
                    {ticket.responses?.length > 0 ? (
                      <ul className="space-y-2">
                        {ticket.responses.map((response) => (
                          <li key={response.id} className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-gray-800">{response.response}</p>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-xs text-gray-500">
                                {new Date(response.created_at).toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-500">
                                Agent ID: {response.agent_id || 'Unknown'}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        This ticket was closed without a response
                      </p>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;