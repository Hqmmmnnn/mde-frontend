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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import { useStore } from "effector-react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import {
  $deleteEngineModal,
  $engines,
  deleteEngineFxWithToken,
  deleteEngineModalClosed,
  deleteEngineModalOpened,
  getEnginesFx,
  lastFetchedEngineIdChanged,
  $currentDeletedEngineId,
  currentDeletedEngineIdChanged,
  downloadEngineInCSVFx,
  loadEngineDataForCreateFxWithToken,
} from "./model";
import { LoadMoreEnginesButton } from "./load-more-engines-button";
import { Link as RouterLink } from "react-router-dom";
import { $session } from "../../features/common/session/session-model";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 350,
    borderRadius: "16px",
  },
  media: {
    height: 140,
  },
  card: {
    objectFit: "contain",
  },
  cardItemContainer: {
    display: "flex",
    justifyContent: "space-between",
  },

  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    textTransform: "inherit",
    margin: theme.spacing(0.5),
  },
}));

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
                          backgroundImage: `url(/api/images/${engine.id})`,
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

                        <div className={styles.cardItemContainer}>
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
                        <div className={styles.cardItemContainer}>
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
                        <div className={styles.cardItemContainer}>
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
                        <div className={styles.cardItemContainer}>
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
                        <div className={styles.cardItemContainer}>
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
                        <div className={styles.cardItemContainer}>
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
                        <div className={styles.cardItemContainer}>
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
                        <div className={styles.cardItemContainer}>
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
                        <div className={styles.cardItemContainer}>
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
                        <div className={styles.cardItemContainer}>
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
                          downloadEngineInCSVFx({ engineId: engine.id, engineModel: engine.model })
                        }
                        size="medium"
                        className={styles.btnText}
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
                          flexDirection: "column",
                          width: "100%",

                          marginBottom: "8px",
                        }}
                      >
                        <div className={styles.btnContainer}>
                          <Button
                            size="medium"
                            color="default"
                            className={styles.btnText}
                            component={RouterLink}
                            to={"/createEngine"}
                            onClick={() => loadEngineDataForCreateFxWithToken(engine.id)}
                          >
                            Добавить на основе этого двигателя
                          </Button>
                        </div>
                        <div className={styles.btnContainer}>
                          <Button
                            size="medium"
                            color="primary"
                            className={styles.btnText}
                            component={RouterLink}
                            to={`/editEngine/${engine.id}`}
                          >
                            Редактировать
                          </Button>

                          <Button
                            onClick={() => {
                              currentDeletedEngineIdChanged(engine.id);
                              deleteEngineModalOpened();
                            }}
                            size="medium"
                            className={styles.btnText}
                            color="secondary"
                          >
                            Удалить
                          </Button>
                        </div>
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
          <ConfirmDeleteEngineDialog />
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

const ConfirmDeleteEngineDialog = () => {
  const currentDeletedEngineId = useStore($currentDeletedEngineId);
  const isDeleteEngineModalOpened = useStore($deleteEngineModal);

  return (
    <Dialog open={isDeleteEngineModalOpened} onClose={() => deleteEngineModalClosed()}>
      <div
        style={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "500px",
            textAlign: "center",
            backgroundColor: "#fff",
            padding: "1rem",
            borderRadius: "16px",
          }}
        >
          <DialogTitle>Удаление двигателя</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Удаление двигателя затронет его данные, фотографию и все связанные с ним файлы.
            </DialogContentText>
            <DialogContentText>Вы действительно хотите удалить двигатель?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              onClick={() => {
                deleteEngineFxWithToken(currentDeletedEngineId);
                deleteEngineModalClosed();
              }}
            >
              Да
            </Button>
            <Button onClick={() => deleteEngineModalClosed()} color="primary">
              Нет
            </Button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
};
