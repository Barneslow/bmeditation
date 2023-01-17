import { countQuotes } from "./math";

export function filterAuthorQuoteTypesArray(array, quotes, selectedAuthors) {
  if (selectedAuthors === "all") return countQuotes(quotes);

  const authorType = array.filter((author) => author.type === selectedAuthors);

  const filteredAuthor = authorType.map((author) => author.name);

  const filteredQuotes = quotes.filter((quote) =>
    filteredAuthor.includes(quote.author)
  );

  const authorArray = countQuotes(filteredQuotes);

  return authorArray;
}
