import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./app";
import { Provider } from "react-redux";
import { store } from "./storage/store";

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HelmetProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </HelmetProvider>
);
