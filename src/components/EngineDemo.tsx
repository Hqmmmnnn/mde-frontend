import {
  Card,
  makeStyles,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";

import { useStore } from "effector-react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { $engines, getEnginesFx } from "../engines_search/model";

const useStyles = makeStyles({
  root: {
    minWidth: 345,
    marginRight: "2rem",
    marginBottom: "2rem",
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
  const history = useHistory();

  useEffect(() => {
    getEnginesFx(history.location.search);
  }, []);

  const engines = useStore($engines);
  const styles = useStyles();

  return (
    <>
      {engines.length > 0 ? (
        <div className="engine-container">
          {engines.map((engine) => (
            <Card className={styles.root} variant="outlined" key={engine.id}>
              <CardMedia
                className={styles.card}
                component="img"
                alt="Картинка двигателя"
                height="140"
                image={`/images/${engine.id}`}
                title="Картинка двигателя"
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
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    количество цилиндров
                  </Typography>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    {engine.cylinderQuantity}
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    вес без оборудования
                  </Typography>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    {engine.weightDryNoImplements}
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    рейтинг нагрузки
                  </Typography>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    {engine.loadMode}
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    тип фланца
                  </Typography>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    {engine.flangeType}
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    назначение
                  </Typography>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    {engine.assignment}
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    мощность
                  </Typography>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    {engine.powerRating}
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    IMO
                  </Typography>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    {engine.imoEcoStandard}
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    EPA
                  </Typography>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    {engine.epaEcoStandard}
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    EU
                  </Typography>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    {engine.euEcoStandard}
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    UIC
                  </Typography>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
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
                  {engine.classificationSociety}
                </Typography>
              </CardContent>
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
          ))}
        </div>
      ) : (
        <div>Двигатели не найдены :(</div>
      )}
    </>
  );

  /*return (
    <Card className={styles.root} variant="outlined">
      <CardMedia
        className={styles.card}
        component="img"
        alt="Картинка двигателя"
        height="140"
        image={engineImage}
        title="Картинка двигателя"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" align="center">
          12DZC-1000-166
        </Typography>
        <Typography
          align="center"
          gutterBottom
          variant="body2"
          color="textSecondary"
          component="p"
        >
          MTU Friedrichshafen GmbH
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
            16
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
            2300
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
            блабла
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
            блабла
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
            блабла
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
            2534 л.с.
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
            блабла
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
            блабла
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
            блабла
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
            блабла
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
          25м00 x 4205м x 3005м
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          color="textSecondary"
          component="p"
          align="center"
        >
          Российский Морской Регистр Судоходства
        </Typography>
      </CardContent>
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
  ); */

  /*return (
    <>
      {engines.length > 0 ? (
        <>
          {engines.map((engine) => (
            <Card key={engine.id}>
              <div>модель: {engine.model}</div>
              <div>производитель: {engine.manufacturerName}</div>
              <div>мощность: {engine.powerRating}</div>
              <div>скорость вращения: {engine.rotationSpeed}</div>
              <div>количество цилиндров: {engine.cylinderQuantity}</div>
              <div>тип фланца: {engine.flangeType}</div>
              <div>вес без оборудования: {engine.weightDryNoImplements}</div>
              <div>длина: {engine.length}</div>
              <div>ширина: {engine.width}</div>
              <div>высота: {engine.height}</div>
              <div>рейтинг нагрузки: {engine.loadMode}</div>
              <div>назначение: {engine.assignment}</div>
              <div>IMO: {engine.imoEcoStandard}</div>
              <div>EPA: {engine.epaEcoStandard}</div>
              <div>EU: {engine.euEcoStandard}</div>
              <div>UIC: {engine.uicEcoStandard}</div>
              <div>
                Классифиционное общество: {engine.classificationSociety}
              </div>
            </Card>
          ))}
        </>
      ) : (
        <div>Двигатели не найдены :(</div>
      )}
    </> 
  ); */
};
