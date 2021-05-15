import {
  CardMedia,
  Container,
  createStyles,
  Grid,
  Link,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Theme,
  Typography,
  withStyles,
  Box,
} from "@material-ui/core";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { Header } from "../../features/common/header";

import {
  $engineFilenames,
  $engineInfoTables,
  loadEngineFx,
  loadFileFx,
  loadFileNamesFx,
  EngineInfoTable,
} from "./engine_info_model";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px",
  },
  card: {
    objectFit: "contain",
    width: "500px",
  },
});

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const EngineInfoPage = () => {
  const styles = useStyles();
  const { id }: { id: string } = useParams();
  const { pathname } = useLocation();

  const engineInfoTables = useStore($engineInfoTables);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (id) {
      loadEngineFx(id).then();
      loadFileNamesFx(id);
    }
  }, [id]);

  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item>
        <Container className={styles.container}>
          <Grid container justify="space-around">
            <Grid item>
              <CardMedia
                className={styles.card}
                component="img"
                alt="Картинка двигателя"
                height="500"
                image={`/images/${id}`}
              />
            </Grid>

            <Grid item>
              <Grid container spacing={4}>
                <Grid item>
                  <Typography variant="h6">Навигация:</Typography>
                  <Grid container direction="column" spacing={1}>
                    {engineInfoTables.map(({ name }) => {
                      const anchor = `#${name}`;
                      return (
                        <Grid item key={name}>
                          <Link href={anchor}>{name}</Link>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>

                <Grid item>
                  <Typography variant="h6">Прикрепленные файлы:</Typography>
                  <AttachedFiles />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{ width: "100%" }}>
            <EngineInfo engineInfoTables={engineInfoTables} />
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

const AttachedFiles = () => {
  const filenames = useStore($engineFilenames);

  return (
    <Grid container direction="column" spacing={1}>
      {filenames.length === 0 ? (
        <Typography>Пока что нет прикрепленных файлов</Typography>
      ) : (
        filenames.map(({ id, name }) => (
          <Grid item key={id}>
            <Link
              onClick={() => loadFileFx(name)}
              style={{
                maxWidth: "300px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "block",
              }}
            >
              {name}
            </Link>
          </Grid>
        ))
      )}
    </Grid>
  );
};

const EngineInfo = ({ engineInfoTables }: { engineInfoTables: EngineInfoTable[] }) => (
  <>
    {engineInfoTables.map(({ name, rows }) => (
      <div style={{ marginBottom: "24px" }} key={name}>
        <Box pl={2}>
          <Typography variant="h6" id={name}>
            {name}
          </Typography>
        </Box>

        <TableContainer style={{ width: "100%" }}>
          <Table>
            <TableBody>
              {rows.map(({ name, value }) => (
                <StyledTableRow key={name}>
                  <StyledTableCell style={{ width: "50%", color: "#333" }}>{name}</StyledTableCell>
                  <StyledTableCell style={{ width: "50%", color: "#333" }}>{value}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    ))}
  </>
);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);
