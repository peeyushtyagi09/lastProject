import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#181A20", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "2rem", marginBottom: "2rem" }}>OpsPulse</h1>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/login" style={{ color: "#23D2D9", textDecoration: "none", fontWeight: 500 }}>Login</Link>
        <Link to="/register" style={{ color: "#23D2D9", textDecoration: "none", fontWeight: 500 }}>Register</Link>
      </div>
    </div>
  );
};

export default Landing;
