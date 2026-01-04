import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cart, removeItem, addItem, decreaseCount, clearCart, getTotalPrice } = useCart();
  if (cart.length === 0) return (<div className="text-center p-12"><h2 className="text-2xl mb-4">Váš košík je prázdný</h2><Link to="/memes" className="text-blue-500 underline">Jít nakupovat</Link></div>);
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Váš Košík</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 border-b last:border-0">
            <div className="flex items-center gap-4"><img src={item.url} alt={item.name} className="w-16 h-16 object-cover rounded" /><div><h3 className="font-bold">{item.name}</h3><p className="text-gray-500 text-sm">{item.price} Kč / ks</p></div></div>
            <div className="flex items-center gap-4">
               <div className="flex items-center border rounded"><button onClick={() => decreaseCount(item.id)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200">-</button><span className="px-3">{item.quantity}</span><button onClick={() => addItem(item)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200">+</button></div>
               <p className="font-bold w-20 text-right">{item.price * item.quantity} Kč</p>
               <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">Remove</button>
            </div>
          </div>
        ))}
        <div className="p-6 bg-gray-50 flex justify-between items-center"><button onClick={clearCart} className="text-red-500 text-sm underline">Vyprázdnit košík</button><div className="text-right"><p className="text-gray-500">Celkem k úhradě:</p><p className="text-3xl font-bold">{getTotalPrice()} Kč</p></div></div>
      </div>
    </div>
  );
};
export default Cart;