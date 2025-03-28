import { useState, useEffect } from 'react';
import { fetchTickets, createTicket, deleteTicket, updateTicket } from '../../api/ticketService';
import LogoutButton from '../common/LogoutButton';
import TicketForm from '../tickets/TicketForm';
import TicketStatusBadge from '../common/TicketStatusBadge';

const UserDashboard = ({ userId }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTicket, setEditingTicket] = useState(null); // Moved inside the component

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

                {ticket.status === 'open' && (
                  <div className="mt-2 flex space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                      onClick={() => setEditingTicket(ticket)}
                    >
                      Edit Ticket
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={async () => {
                        try {
                          await deleteTicket(ticket.id);
                          const ticketsData = await fetchTickets();
                          setTickets(ticketsData || []);
                        } catch (err) {
                          setError(err.message || 'Failed to delete ticket');
                        }
                      }}
                    >
                      Delete Ticket
                    </button>
                  </div>
                )}

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

      {editingTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Ticket</h3>
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                const formData = new FormData(e.target);
                await updateTicket(editingTicket.id, {
                  title: formData.get('title'),
                  description: formData.get('description')
                });
                const ticketsData = await fetchTickets();
                setTickets(ticketsData || []);
                setEditingTicket(null);
              } catch (err) {
                setError(err.message || 'Failed to update ticket');
              }
            }}>
              <input
                name="title"
                type="text"
                defaultValue={editingTicket.title}
                className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                name="description"
                defaultValue={editingTicket.description}
                className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                  onClick={() => setEditingTicket(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;