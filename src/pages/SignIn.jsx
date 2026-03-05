import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function SignIn() {
  const navigate = useNavigate();
  const { sendOtp, verifyOtp, register, login, user } = useContext(AuthContext);

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [otp, setOtp] = useState("");
  const [stage, setStage] = useState("phone"); // phone, details, otp
  const [error, setError] = useState("");
  const [sentCode, setSentCode] = useState("");

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.some((u) => u.phone === phone);
    // send otp regardless
    const code = await sendOtp(phone);
    setSentCode(code);
    if (exists) {
      setStage("otp");
    } else {
      setStage("details");
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    if (!name || !city || !phone) {
      setError("Please fill all fields");
      return;
    }
    const code = await sendOtp(phone);
    setSentCode(code);
    setStage("otp");
    setError("");
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const ok = await verifyOtp(phone, otp);
    if (ok) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const exists = users.some((u) => u.phone === phone);
      if (exists) {
        login(phone);
      } else {
        register({ name, city, phone });
      }
      // after successful sign in/registration navigate to home page
      navigate("/");
    } else {
      setError("Incorrect OTP");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign In / Register</h2>
      {stage === "phone" && (
        <form onSubmit={handlePhoneSubmit} style={styles.form}>
          <label>
            Phone number:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>
            Continue
          </button>
        </form>
      )}

      {stage === "details" && (
        <form onSubmit={handleDetailsSubmit} style={styles.form}>
          <label>
            Enterprise/Shop name:
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <label>
            City:
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <label>
            Phone number:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>
            Send OTP
          </button>
        </form>
      )}

      {stage === "otp" && (
        <>
          <p style={styles.info}>
            OTP sent to {phone}. (For demo: <strong>{sentCode}</strong>)
          </p>
          <form onSubmit={handleVerify} style={styles.form}>
            <label>
              Enter OTP:
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                style={styles.input}
              />
            </label>
            <button type="submit" style={styles.button}>
              Verify
            </button>
          </form>
        </>
      )}

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "#1E3A8A",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  error: {
    color: "#dc2626",
    marginTop: "10px",
  },
  info: {
    marginBottom: "10px",
    color: "#333",
  },
};

export default SignIn;