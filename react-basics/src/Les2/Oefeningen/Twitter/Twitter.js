import { useState } from "react";

const Twitter = () => {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState("");

  const handleChange = (e) => {
    if (e.target.value.length <= 160) {
      setTweet(e.target.value);
    }
  };

  const handleClick = () => {
    setTweets([...tweets, tweet]);
    setTweet("");
  };

  return (
    <>
      <textarea
        value={tweet}
        maxLength={160}
        placeholder="Tweet iets"
        onChange={handleChange}
      />
      <p>{tweet.length}/160</p>
      <button onClick={handleClick}>Tweet</button>

      <ul>
        {tweets.map((tweet) => (
          <li>{tweet}</li>
        ))}
      </ul>
    </>
  );
};

export default Twitter;
