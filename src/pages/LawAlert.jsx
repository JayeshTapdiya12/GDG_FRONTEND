import React, { useState } from "react";
import axios from "axios";
import Footer from "../copoments/Footer";
import Nacbar from "../copoments/Nacbar";
import ReactMarkdown from "react-markdown";
const LawAlert = () => {
  const [country, setCountry] = useState("");
  const [update, setUpdate] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    if (!country.trim()) return;
    setLoading(true);
    setShow(false);
    axios
      .get(`https://gdg-backend-4-pvet.onrender.com/api/v1/visa-updates/${country.trim()}`)
      .then((res) => {
        setUpdate(res.data.update);
        setShow(true);
      })
      .catch(() => {
        setUpdate("Unable to fetch latest update.");
        setShow(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Nacbar />
      <div style={{ margin: "1rem" }}>
        <input
          type="text"
          placeholder="Enter country name"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginRight: "0.5rem",
          }}
        />
        <button onClick={handleFetch} style={{ padding: "0.5rem 1rem" }}>
          Get Update
        </button>

        {loading && <p>Loading...</p>}

        {show && update && (
          <div
            style={{
              background: "#fff8c6",
              border: "1px solid #ccc",
              padding: "1rem",
              marginTop: "1rem",
              borderRadius: "8px",
            }}
          >
            <strong>Latest Update for {country.trim().toUpperCase()}:</strong>
            <ReactMarkdown>{update}</ReactMarkdown>
            <button
              onClick={() => setShow(false)}
              style={{ marginTop: "0.5rem" }}
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default LawAlert;
