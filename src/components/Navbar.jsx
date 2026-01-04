import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart, LogOut } from "lucide-react";
const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <nav className="bg-slate-800 text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
      <div className="flex gap-4 items-center">
        <Link to="/dashboard" className="text-xl font-bold text-yellow-400">MEME MARKET PRO</Link>
        <Link to="/memes" className="hover:text-yellow-200">Katalog</Link>
      </div>
      <div className="flex gap-6 items-center">
        <Link to="/cart" className="relative flex items-center">
          <ShoppingCart size={24} />
          {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1.5 py-0.5">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>}
        </Link>
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{user.username}</span>
            <button onClick={logout} className="hover:text-red-400"><LogOut size={20}/></button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;