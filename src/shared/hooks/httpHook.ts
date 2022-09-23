import { ErrorT } from "lib/types";
import { useState, useCallback, useRef } from "react";

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

const apiHeaders = () => ({
  // Authorization: `Bearer ${Token.get()}`,
  "Content-Type": "application/json",
});

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (url: string, method: Method = Method.GET, body: any = null) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers: apiHeaders(),
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        console.log("ti?", err);

        setError(
          (err as ErrorT).message || "Something went wrong, please try again."
        );
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  //   useEffect(() => {
  //     return () => {
  //       activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
  //     };
  //   }, []);

  return { isLoading, error, sendRequest, clearError };
};
