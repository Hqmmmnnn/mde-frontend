import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import { Routes } from "./routes";

import { AccountLoader } from "./lib/accout-loader";

const App = () => (
  <>
    <Router>
      <AccountLoader>
        <Routes />
      </AccountLoader>
    </Router>
  </>
);

export default App;
