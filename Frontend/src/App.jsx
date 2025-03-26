import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Tickets from "./components/Tickets";
import Responses from "./components/Responses";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/responses" element={<Responses />} />
      </Routes>
    </Router>
  );
}

export default App;
