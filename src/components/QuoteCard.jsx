import React, { useEffect, useState } from "react";
import styles from "../styles/QuoteCard.module.css";

const QuoteCard = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://quotes-api-self.vercel.app/quote");
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
    <>
      <section className="section-app container">
        <h1 className={`${styles["quote-title"]}`}>Random Quote Generator</h1>
        <div className={`${styles["quote-box"]}`}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div>
                <p className={`${styles.quote}`}>"{quote.quote}"</p>
                <p className={`${styles.author}`}>— {quote.author}</p>
              </div>
            </>
          )}
        </div>
        <button onClick={fetchQuote}>Get New Quote</button>
      </section>
    </>
  );
};

export default QuoteCard;
