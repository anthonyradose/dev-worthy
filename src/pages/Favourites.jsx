import React, { useEffect, useState } from "react";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(favs);
  }, []);

  const removeFavourite = (quoteToRemove) => {
    const updated = favourites.filter(
      (q) => q.quote !== quoteToRemove.quote
    );
    localStorage.setItem("favourites", JSON.stringify(updated));
    setFavourites(updated);
  };

  return (
    <section className="section-app container">
      <h1>Favourite Quotes</h1>
      {favourites.length === 0 ? (
        <p>No favourites yet.</p>
      ) : (
        favourites.map((quote, index) => (
          <div key={index} className="favourite-quote">
            <p>"{quote.quote}"</p>
            <p>— {quote.author}</p>
            <button onClick={() => removeFavourite(quote)}>Remove</button>
          </div>
        ))
      )}
    </section>
  );
};

export default Favourites;