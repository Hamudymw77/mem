import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { MemeProvider } from "./context/MemeContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Memes from "./pages/Memes";
import MemeDetail from "./pages/MemeDetail";
import Cart from "./pages/Cart";
const NotFound = () => <div className="text-center mt-20 text-2xl">404 - Not Found</div>;
function App() {
  return (
    <Router>
      <AuthProvider>
        <MemeProvider>
          <CartProvider>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/memes" element={<Memes />} />
                <Route path="/memes/:id" element={<MemeDetail />} />
                <Route path="/cart" element={<Cart />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </MemeProvider>
      </AuthProvider>
    </Router>
  );
}
export default App;