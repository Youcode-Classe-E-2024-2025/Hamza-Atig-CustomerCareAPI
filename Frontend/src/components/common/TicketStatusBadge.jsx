const TicketStatusBadge = ({ status }) => {
    const statusColors = {
      open: 'text-green-500',
      pending: 'text-yellow-500',
      closed: 'text-red-500'
    };
  
    return (
      <span className={`font-bold ${statusColors[status]}`}>
        {status}
      </span>
    );
  };
  
  export default TicketStatusBadge;