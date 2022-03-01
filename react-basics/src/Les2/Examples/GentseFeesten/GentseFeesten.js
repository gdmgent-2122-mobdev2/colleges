import { useEffect, useState } from "react";

const GentseFeesten = () => {
  const [events, setEvents] = useState();

  useEffect(() => {
    fetch("https://www.pgm.gent/data/gentsefeesten/events_500.json")
      .then((data) => data.json())
      .then((events) => setEvents(events))
      .catch((error) => {
        // TODO
      });
  }, []);

  if (!events) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <ul>
        <li></li>
      </ul>
    </div>
  );
};

export default GentseFeesten;
