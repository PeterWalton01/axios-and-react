import React, { useEffect } from "react";
import useAxiosFunction from "../hooks/useAxiosFunction";
import axios from "../apis/jsonPH";

const Posts = () => {
  const [posts, loading, error, axiosFetch] = useAxiosFunction();

  const getData = () => {
    axiosFetch({ axiosInstance: axios, method: "GET", url: "/posts" });
  };

  useEffect(
    () => {
      getData();
    },
    // eslint-disable-next-line

    []
  );

  console.log(posts);

  const handleSubmit = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: "/posts",
      requestConfig: {
        data: {
          userId: 10,
          title: "axios stuff",
          body: "axios hook stuff",
        },
      },
    });
  };
  return (
    <article>
      <h2>Posts</h2>

      <div className="row">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={getData}>Refetch</button>
      </div>

      {loading && <p>Loading..</p>}

      {!loading && error && <p className="errMsg">{error}</p>}

      {!loading && !error && posts?.length && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>{`${post.id}. ${post.title}`}</li>
          ))}
        </ul>
      )}

      {!loading && !error && !posts?.length && posts.data && (
        <p>{`userId: ${posts.data?.userId}, title: ${posts.data?.title}, body: ${posts.data?.body}`}</p>
      )}

      {!loading && !error && !posts && <p>No posts to display</p>}
      <br />
    </article>
  );
};

export default Posts;

// {!loading && !error && !posts?.length && posts.data && (
//   <p>{`userId: ${posts.data?.userId}, title: ${posts.data?.title}, body: ${posts.data?.body}`}</p>
// )}
