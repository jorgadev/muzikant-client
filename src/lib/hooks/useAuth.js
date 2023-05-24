import { useRouter } from "next/router";
import { useState } from "react";
import { ApiManager } from "../ApiManager";
import { useStoreContext } from "./useStoreContext";

export const useAuth = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
  });
  const { dispatch } = useStoreContext();
  const router = useRouter();

  const login = async (email, password) => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }));

    try {
      const response = await ApiManager.login(email, password);
      localStorage.setItem("user", response.data.token);
      dispatch({ type: "USER_LOGIN", payload: response.data.user });
      setState((prevState) => ({ ...prevState, loading: false }));
    } catch (err) {
      setState((prevState) => ({
        ...prevState,
        error: err.response.data,
        loading: false,
      }));
      console.error(err);
    }
  };

  const register = async (username, email, password) => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }));

    try {
      const response = await ApiManager.register(username, email, password);
      localStorage.setItem("user", response.data.token);
      dispatch({ type: "USER_LOGIN", payload: response.data.user });
      setState((prevState) => ({ ...prevState, loading: false }));
    } catch (err) {
      setState((prevState) => ({
        ...prevState,
        error: err.response.data,
        loading: false,
      }));
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "USER_LOGOUT" });
    router.push("/");
  };

  return {
    loading: state.loading,
    error: state.error,
    login,
    register,
    logout,
  };
};
