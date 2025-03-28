import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get("/tickets");
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error.response?.data || error.message);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div>
      <h2>Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>{ticket.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tickets;
