import { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/signin");
  }, [user, navigate]);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={styles.container}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p style={styles.empty}>No products added yet.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <h4>{item.name}</h4>
              <p>Price: ₹ {item.price}</p>

              <div style={styles.quantityRow}>
                <div style={styles.qtyControl}>
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    style={styles.qtyBtn}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    style={styles.qtyInput}
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={styles.qtyBtn}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>

              <p style={styles.itemTotal}>Total: ₹ {item.price * item.quantity}</p>
            </div>
          ))}

          <div style={styles.summary}>
            <h3>Grand Total: ₹ {totalAmount}</h3>
            <button onClick={clearCart} style={styles.clearButton}>Empty Cart</button>
            <button style={styles.checkoutButton}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  empty: {
    fontStyle: "italic",
  },
  cartItem: {
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
    position: "relative",
  },
  quantityRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "5px",
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
    width: "60px",
    marginLeft: "5px",
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  itemTotal: {
    fontWeight: "bold",
    marginTop: "10px",
  },
  summary: {
    marginTop: "30px",
    textAlign: "right",
  },
  clearButton: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 15px",
    marginRight: "10px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  checkoutButton: {
    backgroundColor: "#1E3A8A",
    color: "white",
    border: "none",
    padding: "8px 15px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default Cart;