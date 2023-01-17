import { useEffect, useState } from "react";
import { Text } from "react-native";
import { msToTime } from "../helpers/time";

export default function Countdown({ time }) {
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
