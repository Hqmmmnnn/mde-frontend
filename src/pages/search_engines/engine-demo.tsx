import {
  Card,
  makeStyles,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Grid,
  CircularProgress,
  Box,
  CardActionArea,
} from "@material-ui/core";

import { useStore } from "effector-react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { $engines, getEnginesFx, lastFetchedEngineIdChanged } from "./model";
import { LoadMoreEnginesButton } from "./load-more-engines-button";
import { Link as RouterLink } from "react-router-dom";

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
  const isLoading = useStore(getEnginesFx.pending);

  useEffect(() => {
    const searchParams = new URLSearchParams(history.location.search);
    lastFetchedEngineIdChanged(0);
    searchParams.delete("lastFetchedEngineId");
    history.push({ search: searchParams.toString().replaceAll("%2C", ",") });
    getEnginesFx(history.location.search);
  }, []);

  return (
    <>
      {console.log(engines.length)}
      {isLoading && engines.length === 0 && (
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
      )}

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
                      <CardMedia
                        className={styles.card}
                        component="img"
                        alt="Картинка двигателя"
                        height="140"
                        image={`/images/${engine.id}`}
                      />
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
                  <CardActions>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        variant="outlined"
                        size="medium"
                        color="primary"
                        className={styles.margin}
                      >
                        Подробнее
                      </Button>
                      <Button size="medium" className={styles.margin} color="secondary">
                        Удалить
                      </Button>
                    </div>
                  </CardActions>
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
