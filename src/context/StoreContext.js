import { createContext, useReducer, useEffect, use } from "react";
import { ApiManager } from "../lib/ApiManager";

export const StoreContext = createContext();

export const storeReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, user: action.payload };
    case "USER_LOGOUT":
      return { ...state, user: null };
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const StoreContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, {
    user: null,
  });

  useEffect(() => {
    const userToken = localStorage.getItem("user");

    if (userToken) {
      ApiManager.getUser(userToken)
        .then((response) => {
          dispatch({ type: "USER_LOGIN", payload: response.data });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <StoreContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
