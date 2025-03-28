import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const Responses = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axiosInstance.get("/responces");
        setResponses(response.data);
      } catch (error) {
        console.error("Error fetching responses:", error.response?.data || error.message);
      }
    };
    fetchResponses();
  }, []);

  return (
    <div>
      <h2>Responses</h2>
      <ul>
        {responses.map((response) => (
          <li key={response.id}>{response.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Responses;
