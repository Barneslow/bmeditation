export function hasImageUri({ author }) {
  console.log(author);

  if (!author) return;

  const profileImage = require("../assets/images/icons/unknown-avatar.png");
  const profileImageUri = { uri: author?.imageUrl };

  const profiler = profileImageUri.uri ? profileImageUri : profileImage;

  return profiler;
}
