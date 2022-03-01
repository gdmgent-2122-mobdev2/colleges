import { useEffect, useState } from "react";

const TimerBox = ({ time, children }) => {
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    // reset show content when time changed
    setShowContent(false);
    // set timeout to show content
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, time * 1000);
    // pass cleaning function to react
    return () => clearTimeout(timeout);
  }, [time]);

  return !showContent ? <p>Laden ({time}s)</p> : children;
};

const Timer = () => {
  const [seconds, setSeconds] = useState(4);

  const handleChange = (e) => {
    setSeconds(e.target.value);
  };

  return (
    <>
      <input
        name="seconds"
        type="range"
        onChange={handleChange}
        value={seconds}
        min="1"
        max="10"
        step="1"
      />
      <span>{seconds}</span>
      <TimerBox time={seconds}>
        <h1>Hallo</h1>
      </TimerBox>
    </>
  );
};

export default Timer;
