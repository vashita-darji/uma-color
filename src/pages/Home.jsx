import { useContext, useEffect } from "react";
import "./Home.css"
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  if (!user) return null;
  return (
    <div className="container">
      <h1 className="title">Bring Your Walls to Life 🎨</h1>

      {user && <p className="subtitle">Logged in as: {user.name}</p>}
      <p className="subtitle">
        Welcome to Uma Colors - Your trusted local paint shop in Anand.
      </p>

      <div className="boxContainer">
        <div className="box">
          <h3>Interior Paints</h3>
          <p>Premium smooth finish for your home interiors.</p>
        </div>

        <div className="box">
          <h3>Exterior Paints</h3>
          <p>Weather resistant paints for long-lasting protection.</p>
        </div>

        <div className="box">
          <h3>Waterproofing</h3>
          <p>Protect your walls from leakage and dampness.</p>
        </div>
      </div>
    </div>
  )
}

export default Home