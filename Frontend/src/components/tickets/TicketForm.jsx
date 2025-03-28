const TicketForm = ({ onSubmit }) => {
    return (
      <form className="mt-6" onSubmit={onSubmit}>
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
          className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Submit Ticket
        </button>
      </form>
    );
  };
  
  export default TicketForm;