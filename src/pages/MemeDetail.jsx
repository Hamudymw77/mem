import { useParams, Link } from "react-router-dom";
import { useMemes } from "../context/MemeContext";
import { useCart } from "../context/CartContext";
const MemeDetail = () => {
  const { id } = useParams();
  const { memes } = useMemes();
  const { addItem } = useCart();
  const meme = memes.find((m) => m.id === id);
  if (!meme) return <div className="p-8">Meme not found</div>;
  const relatedMemes = memes.filter(m => m.category === meme.category && m.id !== meme.id).slice(0, 3);
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Link to="/memes" className="text-slate-500 hover:underline mb-4 block">← Zpět na seznam</Link>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-4"><img src={meme.url} alt={meme.name} className="max-h-[500px] w-auto object-contain shadow-sm" /></div>
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">{meme.name}</h1>
          <p className="text-gray-500 mb-4 uppercase tracking-wide">{meme.category}</p>
          <div className="mb-6 space-y-2"><p>Rating: <span className="text-yellow-500 text-xl">{meme.rating}/5</span></p><p>Rozměry: {meme.width} x {meme.height} px</p><p className="text-2xl font-bold mt-4 text-slate-800">{meme.price} Kč</p></div>
          <button onClick={() => addItem(meme)} className="w-full bg-slate-800 text-white py-3 rounded-lg text-lg font-bold hover:bg-slate-700 transition">Přidat do košíku</button>
        </div>
      </div>
      <h3 className="text-xl font-bold mt-12 mb-4">Podobné ve stejné kategorii</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedMemes.map(r => (
          <Link key={r.id} to={`/memes/${r.id}`} className="block bg-white p-4 rounded shadow hover:shadow-lg"><img src={r.url} alt={r.name} className="w-full h-40 object-cover rounded mb-2" /><p className="font-bold truncate">{r.name}</p></Link>
        ))}
      </div>
    </div>
  );
};
export default MemeDetail;