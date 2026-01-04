export const CATEGORIES = ["animals", "celebrities", "gaming", "school", "random"];
export const enrichMemeData = (meme) => {
  const rating = Math.floor(Math.random() * 5) + 1;
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  return { ...meme, rating, category, price: rating * 25 };
};