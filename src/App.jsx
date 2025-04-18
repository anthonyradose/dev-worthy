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
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <h1 className="text-success text-center">Hello Bootstrap!</h1>
    </>
  )
}

export default App;
