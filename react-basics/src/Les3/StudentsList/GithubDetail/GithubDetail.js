import useGithubApi from "../../../hooks/useGithubApi";
import Loading from "../../Design/Loading/Loading";

const GithubDetail = ({ username }) => {
  const { isLoading, data, error } = useGithubApi(
    `https://api.github.com/users/${username}`
  );

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
