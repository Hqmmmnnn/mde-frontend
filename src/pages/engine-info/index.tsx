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
import DescriptionIcon from "@material-ui/icons/Description";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { EngineInfoTable } from "../../api/engines";
import { Header } from "../../features/common/header";
import { ScrollToTop } from "../../lib/scroll-to-top";

import {
  $engineFilenames,
  $engineInfoTables,
  loadEngineFx,
  downloadFileFx,
  loadFileNamesFx,
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
  },
});

export const EngineInfoPage = () => {
  const styles = useStyles();
  const engineInfoTables = useStore($engineInfoTables);
  const { id }: { id: string } = useParams();

  useEffect(() => {
    if (id) {
      loadEngineFx(id).then();
      loadFileNamesFx(id);
    }
  }, [id]);

  return (
    <Grid container direction="column">
      <ScrollToTop />

      <Grid item>
        <Header />
      </Grid>
      <Grid item>
        <Container className={styles.container}>
          <Grid container spacing={6}>
            <Grid item>
              <Box>
                <CardMedia
                  className={styles.card}
                  component="img"
                  alt="Картинка двигателя"
                  image={`/api/images/${id}`}
                  style={{ height: "300px", width: "300px" }}
                />
              </Box>
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
                  <Box pl={0.5}>
                    <Typography variant="h6">Прикрепленные файлы:</Typography>
                  </Box>

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
          <Grid item key={id} onClick={() => downloadFileFx(name)} style={{ cursor: "pointer" }}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Box mr={1}>
                <DescriptionIcon fontSize="large" color="primary" />
              </Box>

              <Typography
                style={{
                  maxWidth: "300px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "block",
                }}
              >
                {name}
              </Typography>
            </Box>
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
        <Box>
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
