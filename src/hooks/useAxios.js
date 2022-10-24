import { useState, useEffect } from "react";

// https://axios-http.com/docs/req_config
const useAxios = (configObj) => {
  const { axiosInstance, url, method, requestConfig = {} } = configObj;

  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [reload, setReload] = useState(0);

  // the concept here is to merely change the state in order to
  // make useEffect trigger on that change
  const refetch = () => {
    setReload((prev) => prev + 1);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const resp = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });
        // console.log(resp.data.joke);
        setResponse(resp.data);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    console.log(reload);
    fetchData();

    // use effect cleanup
    return () => controller.abort;
    // eslint-disable-next-line
  }, [reload]);

  //   return [Response, Error, Loading, refetch];
  return [response, error, loading, refetch];
};

export default useAxios;
