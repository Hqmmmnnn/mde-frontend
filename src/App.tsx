import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { Routes } from "./routes";

import { AccountLoader } from "./lib/accout-loader";

const App = () => (
  <>
    <Router>
      <SnackbarProvider maxSnack={3}>
        <AccountLoader>
          <Routes />
        </AccountLoader>
      </SnackbarProvider>
    </Router>
  </>
);

export default App;
