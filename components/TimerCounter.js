import { useContext, useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import { MeditationContext } from "../contexts/audio-context";
import { msToTime } from "../helpers/time";

export function Countdown({ time }) {
  const [timeRemaining, setTimeRemaining] = useState(time); // Start with 1 minute

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(timeRemaining - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeRemaining]);

  return (
    <Text style={{ color: "white", fontSize: 40, fontFamily: "OpenSansBold" }}>
      {msToTime(timeRemaining)}
    </Text>
  );
}

export function CountUp() {
  const [totalTime, setTotalTime] = useState(0);
  const timeRef = useRef(totalTime);
  const audioCtx = useContext(MeditationContext);

  useEffect(() => {
    return () => {
      audioCtx.addTime({ date: new Date(Date.now()), time: timeRef.current });
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      timeRef.current++;
      setTotalTime(totalTime + 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [totalTime]);

  return (
    <Text style={{ color: "white", fontSize: 40, fontFamily: "OpenSansBold" }}>
      {msToTime(totalTime)}
    </Text>
  );
}
