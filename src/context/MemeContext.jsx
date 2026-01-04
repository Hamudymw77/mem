import { createContext, useState, useEffect, useContext } from 'react';

const MemeContext = createContext();

export const useMemes = () => useContext(MemeContext);

export const MemeProvider = ({ children }) => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch('https://api.imgflip.com/get_memes');
        const data = await response.json();
        const apiMemes = data.data.memes;

        const myCustomMemes = [
          { id: 'foot-1', name: 'VAR checking for 5 hours', url: 'https://i.imgflip.com/1c1uej.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'foot-2', name: 'Harry Maguire inside the box', url: 'https://i.imgflip.com/2gnnjh.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'foot-3', name: 'Ronaldo vs Messi Debate', url: 'https://i.imgflip.com/24y43o.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'foot-4', name: 'Neymar when someone touches him', url: 'https://i.imgflip.com/3lmzyx.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'foot-5', name: 'Chelsea signing new players', url: 'https://i.imgflip.com/30b1gx.jpg', width: 1200, height: 1200, box_count: 2 },
          { id: 'foot-6', name: 'Goalkeeper in 93rd minute', url: 'https://i.imgflip.com/24y43o.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'foot-7', name: 'My team defending a corner', url: 'https://i.imgflip.com/26am.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'foot-8', name: 'Passing to open teammate vs Shooting', url: 'https://i.imgflip.com/1ihzfe.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'foot-9', name: 'Offside by 1 millimeter', url: 'https://i.imgflip.com/1ur9b0.jpg', width: 1200, height: 800, box_count: 3 },
          { id: 'foot-10', name: 'Arsenal winning the league', url: 'https://i.imgflip.com/1jwhww.jpg', width: 500, height: 500, box_count: 2 },

          { id: 'fifa-1', name: 'Me vs The Guy she tells me not to worry about', url: 'https://i.imgflip.com/1ur9b0.jpg', width: 1200, height: 800, box_count: 3 },
          { id: 'fifa-2', name: 'EA Sports Scripting', url: 'https://i.imgflip.com/28j0te.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'fifa-3', name: 'Buying FIFA Points', url: 'https://i.imgflip.com/30b1gx.jpg', width: 1200, height: 1200, box_count: 2 },
          { id: 'fifa-4', name: 'My Controller is broken', url: 'https://i.imgflip.com/261o3j.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'fifa-5', name: 'Full TOTY Squad Opponent', url: 'https://i.imgflip.com/9vct.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'fifa-6', name: 'Weekend League Rewards', url: 'https://i.imgflip.com/23ls.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'fifa-7', name: '0-0 in 90th minute', url: 'https://i.imgflip.com/1otk96.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'fifa-8', name: 'Disconnecting at 3-0', url: 'https://i.imgflip.com/345v97.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'fifa-9', name: 'Bronze Bench players', url: 'https://i.imgflip.com/3lmzyx.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'fifa-10', name: 'Pro Player Tactics', url: 'https://i.imgflip.com/1w7ygt.jpg', width: 500, height: 500, box_count: 2 },

          { id: 'fn-1', name: 'Building a hotel in 1 second', url: 'https://i.imgflip.com/1bij.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'fn-2', name: 'No Mats in final circle', url: 'https://i.imgflip.com/1otk96.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'fn-3', name: 'Landing Tilted Towers', url: 'https://i.imgflip.com/2gnnjh.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'fn-4', name: 'Revive me bro!', url: 'https://i.imgflip.com/30b1gx.jpg', width: 1200, height: 1200, box_count: 2 },
          { id: 'fn-5', name: 'Victory Royale', url: 'https://i.imgflip.com/1ur9b0.jpg', width: 1200, height: 800, box_count: 3 },
          { id: 'fn-6', name: 'Default Skin hiding in bush', url: 'https://i.imgflip.com/1yxkcp.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'fn-7', name: 'Sniper Headshot 200m', url: 'https://i.imgflip.com/2cp1.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'fn-8', name: 'Battle Pass Grind', url: 'https://i.imgflip.com/1h7in3.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'fn-9', name: 'Finding Legendary Loot', url: 'https://i.imgflip.com/1ii4oc.jpg', width: 500, height: 500, box_count: 2 },
          { id: 'fn-10', name: 'Server Offline', url: 'https://i.imgflip.com/3si4.jpg', width: 500, height: 500, box_count: 2 },
        ];

        const allMemes = [...myCustomMemes, ...apiMemes];

        const memesWithPrices = allMemes.map(meme => ({
          ...meme,
          price: Math.floor(Math.random() * 2000) + 100 
        }));

        setMemes(memesWithPrices);
        setLoading(false);

      } catch (err) {
        console.error("Error:", err);
        setError("Error loading memes");
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  return (
    <MemeContext.Provider value={{ memes, loading, error }}>
      {children}
    </MemeContext.Provider>
  );
};
