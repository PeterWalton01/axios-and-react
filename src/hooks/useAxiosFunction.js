import { useState, useEffect } from "react";

// https://axios-http.com/docs/req_config
const useAxiosFunction = () => {
  //

  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;

    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);

      const resp = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });
      console.log(resp);
      setResponse(resp.data);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(controller);

    return () => controller && controller.abort;
  }, [controller]);

  return [response, error, loading, axiosFetch];
};

export default useAxiosFunction;
