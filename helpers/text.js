export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    text = text.substr(0, maxLength) + "...";
  }

  return text;
}
