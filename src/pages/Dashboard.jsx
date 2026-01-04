import { useMemes } from "../context/MemeContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
const StatCard = ({ title, value, color }) => (<div className={`p-6 rounded-lg shadow-md text-white ${color}`}><h3 className="text-lg font-semibold opacity-90">{title}</h3><p className="text-4xl font-bold mt-2">{value}</p></div>);
const Dashboard = () => {
  const { memes, loading } = useMemes();
  const { cart } = useCart();
  if (loading) return <div className="p-8">Loading dashboard...</div>;
  const categoriesCount = new Set(memes.map(m => m.category)).size;
  const topMeme = [...memes].sort((a, b) => b.rating - a.rating)[0];
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Celkem memů" value={memes.length} color="bg-blue-500" />
        <StatCard title="Kategorie" value={categoriesCount} color="bg-purple-500" />
        <StatCard title="Položky v košíku" value={cart.length} color="bg-green-500" />
        <StatCard title="Nejlepší rating" value="5" color="bg-yellow-500" />
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Meme týdne</h2>
          {topMeme && (<div className="flex gap-4 items-center"><img src={topMeme.url} alt="Top" className="w-32 h-32 object-cover rounded" /><div><p className="font-bold">{topMeme.name}</p><p className="text-yellow-500">Rating: {topMeme.rating}/5</p></div></div>)}
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold mb-4">Rychlá akce</h2>
          <Link to="/memes" className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-700">Přejít na Memy</Link>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;