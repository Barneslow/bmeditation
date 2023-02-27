import { createContext, useEffect, useState } from "react";
import {
  createFolderAndWriteFile,
  folderExists,
  readStorageFile,
  updatedFolder,
} from "../helpers/fileStorage";
import { getTodaysData } from "../helpers/todaysData";

export default {
  waterfall: require("../assets/audio/waterfall.mp3"),
  forest_stream: require("../assets/audio/forest_stream.mp3"),
  beach: require("../assets/audio/beach.mp3"),
  rainforest: require("../assets/audio/rainforest.mp3"),
  arabic: require("../assets/audio/arabic.mp3"),
  tibet: require("../assets/audio/tibet.mp3"),
  japan: require("../assets/audio/japan.mp3"),
  africa: require("../assets/audio/africa.mp3"),
  thunderstorm: require("../assets/audio/thunderstorm.mp3"),
  frequency: require("../assets/audio/frequency.mp3"),
  deep_atonal: require("../assets/audio/deep-atonal.mp3"),
  three_prayers: require("../assets/audio/prayer1.mp3"),
  autumn_sky: require("../assets/audio/autumn-sky.mp3"),
};

export const MeditationContext = createContext({
  dailyMeditationSessions: [],
  dailyTime: 0,
  addTime: () => {},
});

const DUMMY_TIME = {
  date: new Date(Date.now()),
  time: 0,
};

export const MeditationContextProvider = ({ children }) => {
  const [dailyMeditationSessions, setDailyMeditationSessions] = useState([]);
  const [dailyTime, setDailyTime] = useState(0);

  useEffect(() => {
    const todaysSessions = getTodaysData(dailyMeditationSessions);

    const totalTime = todaysSessions.reduce((acc, cur) => acc + cur.time, 0);

    setDailyTime(totalTime);
  }, [dailyMeditationSessions]);

  useEffect(() => {
    async function getMeditationFromDisk() {
      const exists = await folderExists("meditate");

      if (!exists) {
        await createFolderAndWriteFile("meditate", [DUMMY_TIME]);
      }

      const data = await readStorageFile("meditate");

      data.forEach((entry) => {
        entry.date = new Date(entry.date);
        addInitialEntries(entry);
      });
    }

    getMeditationFromDisk();
  }, []);

  async function addInitialEntries(entry) {
    setDailyMeditationSessions((currentEntries) => [...currentEntries, entry]);
  }

  async function addTime(data) {
    setDailyMeditationSessions((prev) => [...prev, data]);

    try {
      const newData = [...dailyMeditationSessions, data];

      await updatedFolder("meditate", newData);
    } catch (err) {
      console.log(err);
    }
  }

  const value = {
    dailyMeditationSessions,
    dailyTime,
    addTime,
  };

  return (
    <MeditationContext.Provider value={value}>
      {children}
    </MeditationContext.Provider>
  );
};
