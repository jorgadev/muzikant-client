import { useState } from "react";
import { ApiManager } from "../ApiManager";

export const useAdmin = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null,
  });

  const updateDatabase = async () => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }));

    try {
      const response = await ApiManager.updateDatabase();
      setState((prevState) => ({
        ...prevState,
        data: response.data,
        loading: false,
      }));
    } catch (err) {
      setState((prevState) => ({
        ...prevState,
        error: err.response.data,
        loading: false,
      }));
      console.error(err);
    }
  };

  const clearData = () => {
    setState((prevState) => ({ ...prevState, data: null, error: null }));
  };

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    updateDatabase,
    clearData,
  };
};
