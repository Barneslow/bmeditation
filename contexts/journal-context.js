import { createContext, useEffect, useState } from "react";
import {
  createFolderAndWriteFile,
  folderExists,
  readStorageFile,
  updatedFolder,
} from "../helpers/fileStorage";

// const DUMMY_ENTRIES = [
//   {
//     id: new Date(Date.now()) * Math.random(),
//     date: new Date(Date.now() - 86400000),
//     title: "Explore Your Mind",
//     text: "Journaling is a powerful tool for personal growth, self-reflection, and stress relief. It allows for creative expression, problem-solving, and memory preservation.",
//   },
// ];

export const JournalContext = createContext({
  entries: [],
  addEntry: () => {},
  removeEntry: () => {},
  editEntry: () => {},
  addInitialEntries: () => {},
});

const JournalContextProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getJournalFromDisk() {
      const exists = await folderExists("journal");

      if (!exists) {
        await createFolderAndWriteFile("journal", DUMMY_ENTRIES);
      }

      const data = await readStorageFile("journal");

      data.forEach((entry) => {
        entry.date = new Date(entry.date);
        addInitialEntries(entry);
      });
    }

    getJournalFromDisk();
  }, []);

  async function addEntry(entry) {
    setEntries((currentEntries) => [...currentEntries, entry]);

    try {
      const data = [...entries, entry];

      await updatedFolder("journal", data);
    } catch (err) {
      console.log(err);
    }
  }

  async function addInitialEntries(entry) {
    setEntries((currentEntries) => [...currentEntries, entry]);
  }

  async function editEntry(data, id) {
    const newArray = entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, ...data };
      }
      return entry;
    });

    setEntries(newArray);

    await updatedFolder("journal", newArray);
  }

  async function removeEntry(data) {
    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== data.id)
    );

    try {
      const newArray = entries.filter((entry) => entry.id !== data.id);

      await updatedFolder("journal", newArray);
    } catch (err) {
      console.log(err);
    }
  }

  const value = {
    entries,
    addEntry,
    removeEntry,
    editEntry,
    addInitialEntries,
  };
  return (
    <JournalContext.Provider value={value}>{children}</JournalContext.Provider>
  );
};

export default JournalContextProvider;
