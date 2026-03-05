import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import { CartProvider } from "./pages/CartContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      {/* Provide authentication and cart context to all pages */}
      <AuthProvider>
        <CartProvider>
          <div style={styles.wrapper}>
            <Navbar />

            <div style={styles.content}>
              <Routes>
                {/* Home page as default; SignIn available at /signin */}
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>

            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  content: {
    flex: 1,
    padding: "40px"
  }
}

export default App