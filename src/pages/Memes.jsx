import { useState, useEffect } from "react";
import { useMemes } from "../context/MemeContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../utils/helpers";
const Memes = () => {
  const { memes, loading, error } = useMemes();
  const { addItem } = useCart();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortType, setSortType] = useState("name");
  useEffect(() => { const timer = setTimeout(() => setDebouncedSearch(search), 300); return () => clearTimeout(timer); }, [search]);
  const filteredMemes = memes.filter(m => category === "All" || m.category === category).filter(m => m.name.toLowerCase().includes(debouncedSearch.toLowerCase())).sort((a, b) => { if (sortType === "rating") return b.rating - a.rating; if (sortType === "size") return (b.width * b.height) - (a.width * a.height); return a.name.localeCompare(b.name); });
  if (loading) return <div className="p-8 text-center text-xl">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white p-4 rounded-lg shadow mb-8 flex flex-col md:flex-row gap-4 justify-between">
        <input type="text" placeholder="Hledat..." className="border p-2 rounded w-full md:w-1/3" onChange={(e) => setSearch(e.target.value)} />
        <select className="border p-2 rounded" onChange={(e) => setCategory(e.target.value)}><option value="All">Všechny kategorie</option>{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select>
        <select className="border p-2 rounded" onChange={(e) => setSortType(e.target.value)}><option value="name">Název A-Z</option><option value="rating">Nejlepší rating</option><option value="size">Podle velikosti</option></select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMemes.map((meme) => (
          <div key={meme.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
            <div className="h-48 overflow-hidden bg-gray-200"><img src={meme.url} alt={meme.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" /></div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-lg mb-1 truncate" title={meme.name}>{meme.name}</h3>
              <div className="flex justify-between text-sm text-gray-600 mb-2"><span>{meme.category}</span><span className="text-yellow-500">Rating: {meme.rating}</span></div>
              <div className="mt-auto flex gap-2"><Link to={`/memes/${meme.id}`} className="flex-1 bg-gray-200 text-center py-2 rounded text-sm font-semibold hover:bg-gray-300">Detail</Link><button onClick={() => addItem(meme)} className="flex-1 bg-slate-800 text-white py-2 rounded text-sm hover:bg-slate-700">Do košíku</button></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Memes;