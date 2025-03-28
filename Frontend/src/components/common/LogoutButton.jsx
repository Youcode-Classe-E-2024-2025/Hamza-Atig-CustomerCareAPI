const LogoutButton = () => {
    const handleLogout = () => {
      localStorage.removeItem('token');
      window.location.href = '/login';
    };
  
    return (
      <button 
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    );
  };
  
  export default LogoutButton;