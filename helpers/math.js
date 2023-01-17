export function randomFromArray(array) {
  const item = array[Math.floor(Math.random() * array.length)];

  return item;
}

export function countQuotes(array) {
  const counts = {};

  for (const quote of array) {
    const name = quote.author;

    if (!counts[name]) {
      counts[name] = 0;
    }

    counts[name]++;
  }
  const result = [];
  for (const name in counts) {
    result.push({
      name: name,
      quotes: counts[name],
    });
  }

  return result;
}
