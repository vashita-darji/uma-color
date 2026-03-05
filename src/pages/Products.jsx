import { useContext, useState, useEffect } from "react";
// products data was moved/renamed to productsData.js
import products from "./productsData";
import { CartContext } from "./CartContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Products() {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) navigate("/signin");
  }, [user, navigate]);

  // wrapper to show feedback
  const handleAdd = (product, quantity) => {
    addToCart(product, quantity);
    setMessage(`${product.name} added to cart`);
    // clear after 2 seconds
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div style={styles.container}>
      {message && <div style={styles.message}>{message}</div>}

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={handleAdd}
        />
      ))}
    </div>
  );
}

function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div style={styles.card}>
      
      {/* Image Placeholder */}
      <div style={styles.imageBox}>
        Image Here
      </div>

      <h3>{product.name}</h3>

      <p style={{ fontWeight: "bold" }}>₹ {product.price}</p>

      <div style={styles.bottomSection}>
        <div style={styles.qtyControl}>
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            style={styles.qtyBtn}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={styles.qtyInput}
          />
          <button
            onClick={() => setQuantity((q) => q + 1)}
            style={styles.qtyBtn}
          >
            +
          </button>
        </div>
        <button
          onClick={() => addToCart(product, quantity)}
          style={styles.button}
        >
          Add
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px"
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  },
  imageBox: {
    height: "150px",
    backgroundColor: "#f2f2f2",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  bottomSection: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px"
  },
  qtyControl: {
    display: "flex",
    alignItems: "center",
  },
  qtyBtn: {
    width: "30px",
    height: "30px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "18px",
    lineHeight: "1",
    borderRadius: "4px"
  },
  qtyInput: {
    width: "50px",
    textAlign: "center",
    margin: "0 5px",
  },
  input: {
    width: "50px"
  },
  button: {
    backgroundColor: "#1E3A8A",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer"
  },
  message: {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#4ade80",
    color: "#064e3b",
    padding: "10px 20px",
    borderRadius: "5px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    zIndex: 1000,
    fontWeight: "bold"
  }
};

export default Products;