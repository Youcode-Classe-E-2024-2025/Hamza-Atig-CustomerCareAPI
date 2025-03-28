import TicketStatusBadge from '../common/TicketStatusBadge';
import ResponseForm from './ResponseForm';

const TicketList = ({ tickets, onWorkOnTicket, onResponse, userId }) => {
  return (
    <ul>
      {tickets.map((ticket) => (
        <li key={ticket.id} className="bg-gray-100 p-4 mb-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800">{ticket.title}</h3>
          <p className="text-gray-600 mb-2">{ticket.description}</p>
          <p className="text-sm text-gray-500">
            Status: <TicketStatusBadge status={ticket.status} />
          </p>
          <div className="mt-4">
            {ticket.status === 'pending' && userId === ticket.agent_id && (
              <ResponseForm onSubmit={(response) => onResponse(ticket.id, response)} />
            )}
            {ticket.status === 'open' && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={() => onWorkOnTicket(ticket.id)}
              >
                Work on this Ticket
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TicketList;