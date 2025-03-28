// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Tickets from "./components/Tickets";
import Responses from "./components/Responses";
import Home from "./components/Home";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tickets" element={
          <ProtectedRoute>
            <Tickets />
          </ProtectedRoute>
        } />
        <Route path="/responses" element={
          <ProtectedRoute>
            <Responses />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;