import { Button } from "@material-ui/core";
import { useStore } from "effector-react";
import { useHistory } from "react-router-dom";
import { $engineFilter } from "./model";
import { getQueryParams } from "../../lib/get-query-params";
/*
export const LoadMoreEnginesButton = () => {
  const engineFilter = useStore($engineFilter);
  const history = useHistory();

  return (
    <Button
      color="primary"
      onClick={() => {
        const params = getQueryParams(engineFilter);
        history.push({ search: params.toString().replaceAll("%2C", ",") });
        return loadMoreEnginesFx(history.location.search);
      }}
    >
      загрузить еще
    </Button>
  );
};
**/
