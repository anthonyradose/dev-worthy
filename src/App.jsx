import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://quotes-api-self.vercel.app/quote');
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote({ content: "Failed to load quote.", author: "" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="container">
      <h1>📜 Random Quote Generator</h1>
      <div className="quote-box">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p className="quote">"{quote.quote}"</p>
            <p className="author">— {quote.author}</p>
          </>
        )}
      </div>
      <button onClick={fetchQuote}>Get New Quote</button>
      <h1 className="text-success text-center">Hello Bootstrap!</h1>
    </div>
  );
}

export default App;
