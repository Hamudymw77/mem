import { createContext, useContext, useState, useEffect } from "react";
import { enrichMemeData } from "../utils/helpers";
const MemeContext = createContext();
export const MemeProvider = ({ children }) => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const json = await res.json();
        if (json.success) { setMemes(json.data.memes.map(enrichMemeData)); } 
        else { setError("Failed to fetch memes"); }
      } catch (err) { setError(err.message); } finally { setLoading(false); }
    };
    fetchMemes();
  }, []);
  return <MemeContext.Provider value={{ memes, loading, error }}>{children}</MemeContext.Provider>;
};
export const useMemes = () => useContext(MemeContext);