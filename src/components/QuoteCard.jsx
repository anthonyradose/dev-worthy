import React, { useEffect, useState } from "react";
import styles from "../styles/QuoteCard.module.css";
import { Alert } from "react-bootstrap";

const QuoteCard = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quoteType, setQuoteType] = useState("life");
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  // Function to fetch the quote
  const fetchQuote = async () => {
    setLoading(true);
    try {
      let quoteData;
      const randomQueryParam = new Date().getTime(); // Prevent caching

      if (quoteType === "life") {
        const response = await fetch(
          `https://quotes-api-self.vercel.app/quote?ts=${randomQueryParam}`
        );
        const data = await response.json();
        quoteData = {
          quote: data.quote || data.content,
          author: data.author || "Unknown",
        };
      } else if (quoteType === "dev") {
        const response = await fetch(
          `https://api.allorigins.win/get?url=https://programming-quotes-api-pi.vercel.app/quotes/random&ts=${randomQueryParam}`
        );
        const data = await response.json();
        const quoteObject = JSON.parse(data.contents);

        quoteData = {
          quote: quoteObject.en,
          author: quoteObject.author,
        };
      }

      setQuote(quoteData);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote({ quote: "Failed to load quote.", author: "" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote(); // Fetch a new quote whenever the quoteType changes
  }, [quoteType]);

  // Function to save the quote to favourites
  const saveToFavourites = () => {
    const existing = JSON.parse(localStorage.getItem("favourites")) || [];
    const isDuplicate = existing.some((fav) => fav.quote === quote.quote);

    if (!isDuplicate) {
      localStorage.setItem("favourites", JSON.stringify([...existing, quote]));
      setAlert({
        show: true,
        message: "Quote saved to favourites!",
        variant: "success",
      });
      setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 3000);
    } else {
      setAlert({
        show: true,
        message: "Quote is already in favourites.",
        variant: "warning",
      });
      setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 3000);
    }
  };

  // Handlers for changing quote type
  const handleLifeQuote = () => setQuoteType("life");
  const handleDevQuote = () => setQuoteType("dev");

  return (
    <section className="section-app container">
      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ ...alert, show: false })}
          dismissible
        >
          {alert.message}
        </Alert>
      )}
      <h1 className={styles["quote-title"]}>
        Get Inspired!
      </h1>

      <div className={styles["button-group"]}>
        <button
          onClick={handleLifeQuote}
          className={quoteType === "life" ? styles.active : ""}
        >
          Affirmations
        </button>
        <button
          onClick={handleDevQuote}
          className={quoteType === "dev" ? styles.active : ""}
        >
          Dev Tips
        </button>
      </div>

      <div className={styles["quote-box"]}>
        {loading ? (
          <div className={styles.loader}></div>
        ) : (
          <div>
            <p className={styles.quote}>"{quote?.quote}"</p>
            <p className={styles.author}>— {quote?.author}</p>
          </div>
        )}
      </div>

      <div className={styles["button-box"]}>
        <button onClick={fetchQuote} disabled={loading}>
          <i className="bi bi-arrow-repeat"></i> New Quote
        </button>
        <button onClick={saveToFavourites} disabled={loading || !quote}>
          <i className="bi bi-heart"></i> Save to Favourites
        </button>
      </div>
    </section>
  );
};

export default QuoteCard;
