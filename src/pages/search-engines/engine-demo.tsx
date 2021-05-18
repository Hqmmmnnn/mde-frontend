import {
  Card,
  makeStyles,
  CardContent,
  Typography,
  Button,
  CardActions,
  Grid,
  CircularProgress,
  Box,
  CardActionArea,
  Link,
} from "@material-ui/core";

import { useStore } from "effector-react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import {
  $engines,
  deleteEngineFx,
  downloadEngineInCSV,
  getEnginesFx,
  lastFetchedEngineIdChanged,
} from "./model";
import { LoadMoreEnginesButton } from "./load-more-engines-button";
import { Link as RouterLink } from "react-router-dom";
import { $session } from "../../features/common/session/session-model";

const useStyles = makeStyles({
  root: {
    minWidth: 350,
  },
  media: {
    height: 140,
  },
  card: {
    objectFit: "contain",
  },
  margin: {
    margin: 8,
    textTransform: "capitalize",
  },
});

export const EngineDemo = () => {
  const styles = useStyles();
  const history = useHistory();
  const engines = useStore($engines);
  const currentUser = useStore($session);
  const isLoading = useStore(getEnginesFx.pending);

  useEffect(() => {
    const searchParams = new URLSearchParams(history.location.search);
    lastFetchedEngineIdChanged(0);
    searchParams.delete("lastFetchedEngineId");
    history.push({ search: searchParams.toString().replaceAll("%2C", ",") });
    getEnginesFx(history.location.search);
  }, []);

  if (isLoading && engines.length === 0) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {engines.length > 0 ? (
        <>
          <Grid container spacing={4} justify="center">
            {engines.map((engine) => (
              <Grid item key={engine.id}>
                <Card className={styles.root} variant="outlined" key={engine.id}>
                  <CardActionArea>
                    <RouterLink
                      to={`/engines/${engine.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        aria-label={`engine image, model: ${engine.model} `}
                        style={{
                          height: "140px",
                          backgroundImage: `url(/images/${engine.id})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" align="center">
                          {engine.model}
                        </Typography>
                        <Typography
                          align="center"
                          gutterBottom
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {engine.manufacturerName}
                        </Typography>
                        <br />

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            количество цилиндров
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {engine.cylinderQuantity}
                          </Typography>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            вес без оборудования
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {engine.weightDryNoImplements}
                          </Typography>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            рейтинг нагрузки
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {engine.loadMode}
                          </Typography>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            тип фланца
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {engine.flangeType}
                          </Typography>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            назначение
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {engine.assignment}
                          </Typography>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            мощность
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {engine.powerRating}
                          </Typography>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            IMO
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {engine.imoEcoStandard}
                          </Typography>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            EPA
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {engine.epaEcoStandard}
                          </Typography>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            EU
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {engine.euEcoStandard}
                          </Typography>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            UIC
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {engine.uicEcoStandard}
                          </Typography>
                        </div>
                        <br />
                        <Typography
                          gutterBottom
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          align="center"
                        >
                          {engine.length}m x {engine.width}м x {engine.height}м
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          align="center"
                        >
                          {engine.classificationSociety || "Отсутствует классифиционное общество"}
                        </Typography>
                      </CardContent>
                    </RouterLink>
                  </CardActionArea>
                  <CardActions style={{ padding: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        onClick={() =>
                          downloadEngineInCSV({ engineId: engine.id, engineModel: engine.model })
                        }
                        size="medium"
                        className={styles.margin}
                        color="inherit"
                      >
                        Экспорт в CSV
                      </Button>
                    </div>
                  </CardActions>
                  {currentUser?.role === "ADMIN" && (
                    <CardActions style={{ padding: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <Button
                          size="medium"
                          color="primary"
                          className={styles.margin}
                          component={RouterLink}
                          to={`/editEngine/${engine.id}`}
                        >
                          Редактировать
                        </Button>

                        <Button
                          onClick={() => deleteEngineFx(engine.id)}
                          size="medium"
                          className={styles.margin}
                          color="secondary"
                        >
                          Удалить
                        </Button>
                      </div>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" m={2}>
            <LoadMoreEnginesButton />
          </Box>
        </>
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>Двигатели не найдены :(</div>
        </div>
      )}
    </>
  );
};
