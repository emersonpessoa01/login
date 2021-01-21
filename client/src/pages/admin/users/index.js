import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import MenuAdmin from "../../../components/menu.admin";
import Footer from "../../../components/footer.admin";
import { Paper } from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import api from "../../../services/api";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },

  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function UsersList() {
  const classes = useStyles();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const res = await api.get("/api/users");
      // console.log(res)
      console.log(res.data);
      setUsers(res.data);
    };
    loadUsers();
  }, []);

  async function handleDelete(id) {
    // const API_URL = "/api/users";
    // `${API_URL}/${id}`
    if (window.confirm("Deseja realmente excluir este usuário?")) {
      let result = await api.delete("/api/users/" + id);

      if (result.status === 200) {
        window.location.href = "/admin/users";
      } else {
        console.log("Ocorreu um erro");
      }
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={"USUÁRIOS"} />

      {/*Drawer recortado */}

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/*Exclusão e atualização de listagem de usuários */}
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h5>Listagem de usuários</h5>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Nome</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Tipo</TableCell>
                            <TableCell align="center">
                              Data de cadastro
                            </TableCell>
                            <TableCell align="center">Opções</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {users.map((row) => (
                            <TableRow key={row._id}>
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>

                              <TableCell align="center">{row.email}</TableCell>
                              <TableCell align="center">
                                {row.type === 1 ? (
                                  <Chip label="Administrador" color="primary" />
                                ) : (
                                  <Chip label="Funcionário" color="secondary" />
                                )}
                              </TableCell>
                              <TableCell align="center">
                                {new Date(row.created_at).toLocaleString(
                                  "pt-br"
                                )}
                              </TableCell>
                              <TableCell align="center">
                                <ButtonGroup aria-label="outlined primary button group">
                                  <Button
                                    color="primary"
                                    href={"/admin/users/edit/" + row._id}
                                  >
                                    Atualizar
                                  </Button>
                                  <Button
                                    color="secondary"
                                    onClick={() => handleDelete(row._id)}
                                  >
                                    Excluir
                                  </Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
