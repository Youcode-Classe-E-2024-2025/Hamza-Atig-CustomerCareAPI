const ResponseForm = ({ onSubmit }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const response = e.target.response.value;
      onSubmit(response);
      e.target.response.value = '';
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <textarea
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="response"
            placeholder="Write a response..."
            required
          />
          <button
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            type="submit"
          >
            Send Response
          </button>
        </div>
      </form>
    );
  };
  
  export default ResponseForm;