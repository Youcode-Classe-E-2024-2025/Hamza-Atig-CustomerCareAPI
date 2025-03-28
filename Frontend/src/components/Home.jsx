import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';

const Home = () => {
  const [tickets, setTickets] = useState([]);
  const [alltickets, setAllTickets] = useState([]);
  const [responses, setResponses] = useState([]);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = response.data;

        console.log(data);

        if (data.id && data.role) {
          setRole(data.role);
          setUserId(data.id);
        } else {
          console.error('User data is missing');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        window.location.href = '/login';
      }
    };

    const fetchTickets = async () => {
      try {
        const ticketsResponse = await axios.get('/tickets');
        if (ticketsResponse.data) {
          setTickets(ticketsResponse.data);
        }
        console.log(ticketsResponse.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
      fetchResponses();
    };

    const fetchAllTickets = async () => {
      try {
        const ticketsResponse = await axios.get('/alltickets');
        if (ticketsResponse.data) {
          setAllTickets(ticketsResponse.data);
        }
        console.log(ticketsResponse.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    const fetchResponses = async () => {
      try {
        const responsesResponse = await axios.get('/responses');
        if (responsesResponse.data) {
          setResponses(responsesResponse.data);
        }
        console.log(responsesResponse.data);
      } catch (error) {
        console.error('Error fetching responses:', error);
      }
    };

    fetchUserData().then(() => {
      if (role === 'agent') {
        fetchAllTickets();
      } else {
        fetchTickets();
      }
    });
  }, [role]);

  const handleResponse = async (ticketId, response) => {
    await axios.post(`/responses`, { ticket_id: ticketId, response, user_id: userId }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    await axios.put(`/tickets/${ticketId}`, { status: 'closed', closed_at: new Date() }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  };

  const handleWorkOnTicket = async (ticketId) => {
    await axios.put(`/tickets/${ticketId}`, { status: 'pending', agent_id: userId, tacked_at: new Date() }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  };

  const handleDeleteTicket = async (ticketId) => {
    await axios.delete(`/tickets/${ticketId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  const handlelogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  const handlesubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get('title');
    const description = formData.get('description');

    const ticketData = {
      title,
      description,
      owner_id: userId,
    };

    await axios.post('/tickets', {
      title: title,
      description: description,
      owner_id: userId
    });
  };


  if (role === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {role === 'agent' ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <button onClick={handlelogout}>logout</button>
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">All Tickets</h2>
          <ul>
            {alltickets.map((ticket) => (
              <li key={ticket.id} className="bg-gray-100 p-4 mb-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-800">{ticket.title}</h3>
                <p className="text-gray-600 mb-2">{ticket.description}</p>
                <p className="text-sm text-gray-500">Status: <span className={`font-bold ${ticket.status === 'open' ? 'text-green-500' : ticket.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>{ticket.status}</span></p>
                <div className="mt-4">
                  {ticket.status === 'pending' && userId === ticket.agent_id && (
                    <>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const response = e.target.response.value;
                        handleResponse(ticket.id, response);
                        e.target.response.value = '';
                      }}>
                        <div className="mt-2">
                          <textarea
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="response"
                            placeholder="Write a response..."
                          />
                          <button
                            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                            type="submit"
                          >
                            Send Response
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                  {ticket.status === 'open' && (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600 transition"
                      onClick={() => handleWorkOnTicket(ticket.id)}
                    >
                      Work on this Ticket
                    </button>
                  )}
                  {ticket.status === 'pending' && <span className="text-yellow-500 font-medium">In Progress</span>}
                  {ticket.status === 'closed' && <span className="text-red-500 font-medium">Ticket Closed</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : role === 'user' ? (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <button onClick={handlelogout}>Logout</button>
          <h2 className="text-2xl font-bold text-center text-gray-700">Create a Ticket</h2>
          <form className="mt-6" onSubmit={handlesubmit} >
            <input
              name='title'
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ticket Title"
              required
            />
            <textarea
              name='description'
              className="w-full px-4 py-2 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ticket Description"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Ticket
            </button>
          </form>
          <h2 className="text-2xl font-bold text-center text-gray-700 mt-8">Your Tickets</h2>
          <div>
            <h2>All Tickets</h2>
            <ul>
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <li key={ticket.id} className="bg-white p-4 my-2 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold">{ticket.title}</h3>
                    <p className="text-gray-600">{ticket.description}</p>
                    {ticket.status === 'closed' && (
                      <>
                        <p className="text-gray-600 mt-2">Closed</p>
                        <p className="text-gray-600 mt-2">
                          {}
                        </p>
                      </>
                    )}
                    {ticket.status === 'pending' && (
                      <>
                        <p className="text-gray-600 mt-2">In Progress</p>
                        <p className="text-gray-600 mt-2">{}</p>
                      </>
                    )}
                  </li>
                ))
              ) : (
                <p>No tickets available.</p>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;

