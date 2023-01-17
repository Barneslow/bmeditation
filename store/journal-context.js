import { createContext, useEffect, useState } from "react";
// import {
//   createFolderAndWriteFile,
//   folderExists,
//   readStorageFile,
//   updatedFolder,
// } from "../helpers/fileStorage";

const DUMMY_ENTRIES = [
  {
    id: 1,
    date: new Date(Date.now()),
    title: "1 MORE TIME",
    text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
  },
  {
    id: 2,
    date: new Date(Date.now()),
    title: "WE'RE GONNA CELEBRATE",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
  },
  {
    id: 3,
    date: new Date(Date.now()),
    title: "MUSIC'S GOT ME FEELING THE NEED",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
  },
  {
    id: 4,
    date: new Date(Date.now()),
    title: "MUSIC'S GOT ME FEELING SO FREE",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
  },
];

export const JournalContext = createContext({
  entries: [],
  addEntry: () => {},
  removeEntry: () => {},
  editEntry: () => {},
  addInitialEntries: () => {},
});

const JournalContextProvider = ({ children }) => {
  const [initalLoad, setInitalLoad] = useState(false);
  const [entries, setEntries] = useState([]);

  // useEffect(() => {
  //   async function getJournalFromDisk() {
  //     const exists = await folderExists("journal");

  //     if (!exists) {
  //       await createFolderAndWriteFile("journal", DUMMY_ENTRIES);
  //     }

  //     const data = await readStorageFile("journal");

  //     data.forEach((entry) => {
  //       entry.date = new Date(entry.date);
  //       addInitialEntries(entry);
  //     });

  //     setInitalLoad(false);
  //   }
  //   setInitalLoad(false);

  //   getJournalFromDisk();
  // }, []);

  async function addEntry(entry) {
    setEntries((currentEntries) => [...currentEntries, entry]);

    try {
      const data = [...entries, entry];

      // await updatedFolder("journal", data);
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

    // await updatedFolder("journal", newArray);
  }

  async function removeEntry(data) {
    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== data.id)
    );

    try {
      const newArray = entries.filter((entry) => entry.id !== data.id);

      // await updatedFolder("journal", newArray);
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
