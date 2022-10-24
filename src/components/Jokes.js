import React from "react";
import useAxios from "../hooks/useAxios";
import axios from "../apis/dadJokes";

const Jokes = () => {
  const [joke, error, loading, refetch] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/",
    requestConfig: {
      headers: {
        "Content-language": "en-US",
      },
    },
  });

  return (
    <article>
      <h2>Random Dad Jokes</h2>

      {loading && <p>Loading..</p>}

      {!loading && error && <p className="errMsg">{error}</p>}

      {!loading && !error && joke && <p className="joke">{joke?.joke}</p>}

      {!loading && !error && !joke && <p>No dad jokes today</p>}
      <br />
      <button onClick={() => refetch()}>Another</button>
    </article>
  );
};

export default Jokes;
