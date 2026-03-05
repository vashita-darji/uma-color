import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav style={styles.nav}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <h2 style={{ color: "white", margin: 0 }}>Uma Colors</h2>
        {user && (
          <div style={styles.brandRight}>
            <div style={styles.avatar}>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</div>
            <div style={styles.userName}>{user.name}</div>
          </div>
        )}
      </div>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
        {user ? (
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        ) : (
          <Link to="/signin" style={styles.link}>Sign In</Link>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    backgroundColor: "#1E3A8A",
    alignItems: "center"
  },
  link: {
    color: "white",
    marginLeft: "20px",
    textDecoration: "none",
    fontWeight: "500"
  },
  logoutBtn: {
    marginLeft: "20px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "4px",
    fontWeight: "500"
  }
  ,
  brandRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'white'
  },
  avatar: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    backgroundColor: '#f3f4f6',
    color: '#111827',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700'
  },
  userName: {
    color: 'white',
    fontWeight: '600'
  }
}



export default Navbar