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
import { Pagination as MaterialPagination } from "@material-ui/lab";

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
  $currentEngineIdForDelete,
  currentEngineIdForDeleteChanged,
  downloadEngineInCSVFx,
  loadEngineDataForCreateFxWithToken,
  $currentPage,
  currentPageChanged,
  searchParamsChanged,
} from "./model";
import { Link as RouterLink } from "react-router-dom";
import { $session } from "../../features/common/session-model";

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
  const enginesData = useStore($engines);
  const currentUser = useStore($session);
  const isLoading = useStore(getEnginesFx.pending);

  useEffect(() => {
    const searchParams = new URLSearchParams(history.location.search);
    history.push({ search: searchParams.toString().replaceAll("%2C", ",") });
    getEnginesFx(history.location.search);
  }, []);

  if (isLoading && enginesData.engines.length === 0) {
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
      {enginesData.engines.length > 0 ? (
        <>
          <Grid container spacing={4} justify="center">
            {enginesData.engines.map((engine) => (
              <Grid item key={engine.id}>
                <Card className={styles.root} variant="outlined" key={engine.id}>
                  <CardActionArea>
                    <RouterLink
                      to={`/engines/${engine.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "8px 0",
                        }}
                      >
                        <div
                          aria-label={`engine image, model: ${engine.model} `}
                          style={{
                            backgroundImage: `url(/api/images/${engine.id})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            height: "230px",
                            width: "230px",
                          }}
                        ></div>
                      </Box>

                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" align="center">
                          {engine.model}
                        </Typography>
                        <Typography align="center" gutterBottom variant="h6" component="h3">
                          {engine.series}
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
                            диаметр цилиндра
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {engine.cylinderDiameter}
                          </Typography>
                        </div>
                        <div className={styles.cardItemContainer}>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            ход поршня
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {engine.pistonStroke}
                          </Typography>
                        </div>
                        <div className={styles.cardItemContainer}>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            частота вращения
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {engine.rotationFrequency}
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
                            {engine.imoEcoStandard || "-"}
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
                            {engine.epaEcoStandard || "-"}
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
                            {engine.euEcoStandard || "-"}
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
                            {engine.uicEcoStandard || "-"}
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
                          {engine.length}мм x {engine.width}мм x {engine.height}мм
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
                        Скачать в CSV
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
                            className={styles.btnText}
                            component={RouterLink}
                            to={`/editEngine/${engine.id}`}
                            style={{ color: "#1967d2" }}
                          >
                            Редактировать
                          </Button>

                          <Button
                            onClick={() => {
                              currentEngineIdForDeleteChanged(engine.id);
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
            <Pagination totalPages={enginesData.totalPages} />
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
          <Typography variant="h6">Двигатели не найдены</Typography>
        </div>
      )}
    </>
  );
};

type PaginationProps = {
  totalPages: number;
};

const Pagination = ({ totalPages }: PaginationProps) => {
  const currentPage = useStore($currentPage);
  const history = useHistory();

  const handleChange = (_: React.ChangeEvent<unknown>, page: number) => {
    currentPageChanged(page);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    searchParamsChanged(history);
  }, [currentPage]);

  return (
    <MaterialPagination
      size="large"
      color="primary"
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
    />
  );
};

const ConfirmDeleteEngineDialog = () => {
  const currentEngineIdForDelete = useStore($currentEngineIdForDelete);
  const isDeleteEngineModalOpened = useStore($deleteEngineModal);

  return (
    <Dialog
      PaperProps={{ style: { borderRadius: "16px" } }}
      open={isDeleteEngineModalOpened}
      onClose={() => deleteEngineModalClosed()}
    >
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
                deleteEngineFxWithToken(currentEngineIdForDelete);
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
