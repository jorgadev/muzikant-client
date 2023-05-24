import "../../public/styles/styles.css";

import { StoreContextProvider } from "../context/StoreContext";

function MyApp({ Component, pageProps }) {
  return (
    <StoreContextProvider>
      <Component {...pageProps} />
    </StoreContextProvider>
  );
}

export default MyApp;
