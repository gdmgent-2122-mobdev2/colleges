import useGithubApi from "../../../hooks/useGithubApi";
import Loading from "../../../Design/Loading/Loading";
import { useEffect } from "react";

// fout
const Button1 = ({ className, children }) => {
  return <button className={className}>{children}</button>;
};

// juist
const Button2 = ({ type = "primary", children }) => {
  return <button className={`btn btn--${type}`}>{children}</button>;
};

const GithubDetail = ({ username }) => {
  const { isLoading, data, error } = useGithubApi(
    `https://api.github.com/users/${username}`
  );

  const handleClick = () => {
    // werkt niet
    return <p>Error</p>;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      // do something
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Er ging iets mis</p>;
  }

  return (
    <>
      <img src={data.avatar_url} alt={data.login} />
      <p>{data.login}</p>
    </>
  );
};

export default GithubDetail;
