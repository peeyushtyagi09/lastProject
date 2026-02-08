import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <p>Simple Auth System</p>

      <div>
        <Link to="/login">Login</Link>
      </div>

      <div>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Landing;
