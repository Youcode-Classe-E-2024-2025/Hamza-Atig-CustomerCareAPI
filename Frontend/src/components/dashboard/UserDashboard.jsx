import { useState, useEffect } from 'react';
import { fetchTickets, fetchResponses, createTicket } from '../../api/ticketService';
import LogoutButton from '../common/LogoutButton';
import TicketForm from '../tickets/TicketForm';
import TicketStatusBadge from '../common/TicketStatusBadge';

const UserDashboard = ({ userId }) => {
  const [tickets, setTickets] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [ticketsData, responsesData] = await Promise.all([
        fetchTickets(),
        fetchResponses()
      ]);
      setTickets(ticketsData);
      setResponses(responsesData);
    };
    loadData();
  }, []);

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await createTicket({
      title: formData.get('title'),
      description: formData.get('description'),
      owner_id: userId
    });
    e.target.reset();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <LogoutButton />
      <h2 className="text-2xl font-bold text-center text-gray-700">Create a Ticket</h2>
      <TicketForm onSubmit={handleSubmitTicket} />
      
      <h2 className="text-2xl font-bold text-center text-gray-700 mt-8">Your Tickets</h2>
      <div>
        <ul>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <li key={ticket.id} className="bg-white p-4 my-2 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold">{ticket.title}</h3>
                <p className="text-gray-600">{ticket.description}</p>
                <p className="text-sm text-gray-500">
                  Status: <TicketStatusBadge status={ticket.status} />
                </p>
              </li>
            ))
          ) : (
            <p>No tickets available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;