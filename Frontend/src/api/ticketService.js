import axios from '../axiosInstance';

const API_ENDPOINTS = {
  ME: '/me',
  TICKETS: '/tickets',
  ALL_TICKETS: '/alltickets',
  RESPONSES: '/responses'
};

const getAuthHeader = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const fetchUserData = async () => {
  const response = await axios.get(API_ENDPOINTS.ME, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const fetchTickets = async () => {
  const response = await axios.get(API_ENDPOINTS.TICKETS);
  return response.data;
};

export const fetchAllTickets = async () => {
  const response = await axios.get(API_ENDPOINTS.ALL_TICKETS);
  return response.data;
};

export const fetchResponses = async () => {
  const response = await axios.get(API_ENDPOINTS.RESPONSES);
  return response.data;
};

export const postResponse = async (ticketId, response, userId) => {
  return axios.post(API_ENDPOINTS.RESPONSES, {
    ticket_id: ticketId,
    response,
    user_id: userId
  }, {
    headers: getAuthHeader()
  });
};

export const updateTicketStatus = async (ticketId, data) => {
  return axios.put(`${API_ENDPOINTS.TICKETS}/${ticketId}`, data, {
    headers: getAuthHeader()
  });
};

export const createTicket = async (ticketData) => {
  return axios.post(API_ENDPOINTS.TICKETS, ticketData, {
    headers: getAuthHeader()
  });
};

export const deleteTicket = async (ticketId) => {
  return axios.delete(`${API_ENDPOINTS.TICKETS}/${ticketId}`, {
    headers: getAuthHeader()
  });
};