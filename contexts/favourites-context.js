import { createContext, useContext, useState, useEffect } from "react";
import {
  createFolderAndWriteFile,
  folderExists,
  readStorageFile,
  updatedFolder,
} from "../helpers/fileStorage";
import { QuoteContext } from "./quote-context";

const DUMMY_FAVOR = [
  {
    quote: "I will not walk backward in life.",
    author: "J.R.R Tolkien",
    profession: "Englist Author",
    liked: true,
    topics: ["Life", "Mentoring", "Motivational"],
    id: 316,
    date: new Date(Date.now()),
  },
];

export const FavouritesContext = createContext({
  favourites: [],
  seletectedFavourites: [],
  addFavourite: () => {},
  removeFavourite: () => {},
  selectedFavouritesHandler: () => {},
  addInitialFavourites: () => {},
});

const FavouritesContextProvider = ({ children }) => {
  const [initalLoad, setInitalLoad] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [seletectedFavourites, setSeletectedFavourites] = useState([]);

  const { quotes } = useContext(QuoteContext);

  useEffect(() => {
    async function getFavouritesFromDisk() {
      const exists = await folderExists("favourites");

      if (!exists) {
        await createFolderAndWriteFile("favourites", DUMMY_FAVOR);
      }

      const data = await readStorageFile("favourites");

      data.forEach((entry) => {
        entry.date = new Date(entry.date);
        addInitialFavourites(entry);
      });

      setInitalLoad(false);
    }
    setInitalLoad(false);

    getFavouritesFromDisk();
  }, []);

  async function addInitialFavourites(favourite) {
    const quote = quotes.find((quote) => quote.id === favourite.id);

    if (quote) quote.liked = true;
    setFavourites((currentFavourites) => [...currentFavourites, favourite]);
    setSeletectedFavourites((currentFavourites) => [
      ...currentFavourites,
      favourite,
    ]);
  }

  async function addFavourite(favourite) {
    if (favourite.liked) {
      removeFavourite(favourite);
    }
    const quote = quotes.find((quote) => quote.id === favourite.id);

    if (quote) quote.liked = true;

    setFavourites((currentFavourites) => [...currentFavourites, favourite]);

    try {
      const data = [...favourites, favourite];

      await updatedFolder("favourites", data);
    } catch (err) {
      console.log(err);
    }
  }

  async function removeFavourite(favourite) {
    const quote = quotes.find((quote) => quote.id === favourite.id);

    if (quote) quote.liked = false;

    setFavourites((currentFavourites) =>
      currentFavourites.filter((fav) => fav.id !== favourite.id)
    );

    try {
      const newArray = favourites.filter((fav) => fav.id !== favourite.id);

      await updatedFolder("favourites", newArray);
    } catch (err) {
      console.log(err);
    }
  }

  function selectedFavouritesHandler(author) {
    if (author === "All") {
      setSeletectedFavourites(favourites);
      return;
    }
    setSeletectedFavourites(
      favourites.filter((quote) => quote.author === author)
    );
  }

  const value = {
    favourites,
    addFavourite,
    removeFavourite,
    seletectedFavourites,
    selectedFavouritesHandler,
  };
  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContextProvider;
