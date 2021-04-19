import "./App.css";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { useStore } from "effector-react";
import {
  $engineFilter,
  getEnginesFx,
  lastFetchedEngineIdChanged,
} from "./engines_search/model";
import Button from "@material-ui/core/Button";
import { getQueryParams } from "./lib/getQueryParams";
import { EngineSearch } from "./components/EngineSearch";
import { ImoEcoStandard } from "./components/ImoEcoStandard";
import { EpaEcoStandard } from "./components/EpaEcoStandard";
import { PowerRatingSlider } from "./components/PowerRatingSlider";
import { EngineDemo } from "./components/EngineDemo";
import { LoadMoreEnginesButton } from "./components/LoadMoreEnginesButton";
import { Routes } from "./routes";

const Aside = () => {
  const engineFilter = useStore($engineFilter);
  const history = useHistory();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <EngineSearch />
      <ImoEcoStandard />
      <EpaEcoStandard />
      <PowerRatingSlider />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          const params = getQueryParams(engineFilter);
          lastFetchedEngineIdChanged(0);
          params.delete("lastFetchedEngineId");
          history.push({ search: params.toString() });
          return getEnginesFx(history.location.search);
        }}
      >
        Поиск
      </Button>
    </div>
  );
};

export const MainPage = () => (
  <div className="wrapper">
    <header className="header">header</header>
    <aside className="aside">
      <Aside />
    </aside>
    <main className="main">
      <EngineDemo />
      <LoadMoreEnginesButton />
    </main>
    <footer className="footer">footer</footer>
  </div>
);

function App() {
  return (
    <>
      <Router>
        <Routes />
      </Router>
    </>
  );
}

export default App;
