import { createContext, useEffect, useState } from "react";
import DUMMY_QUOTES from "../data/testData.json";

export const QuoteContext = createContext({
  quotes: [],
});

const QuoteContextProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    setQuotes(DUMMY_QUOTES);
  }, []);

  const justQ = quotes.map((quote) => quote.quote);

  const maxLen = justQ.sort((a, b) => a.length < b.length)[0];

  const value = {
    quotes,
  };
  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
  );
};

export default QuoteContextProvider;
