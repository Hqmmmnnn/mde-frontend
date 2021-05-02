import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import { Routes } from "./routes";

import { AccountLoader } from "./lib/accout-loader";

function App() {
  return (
    <>
      <Router>
        <AccountLoader>
          <Routes />
        </AccountLoader>
      </Router>
    </>
  );
}

export default App;
