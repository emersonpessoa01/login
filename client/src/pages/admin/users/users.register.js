import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import MenuAdmin from "../../../components/menu.admin";
import Footer from "../../../components/footer.admin";

import TextField from "@material-ui/core/TextField";
import { Paper } from "@material-ui/core";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

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
    padding: 15,
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  formControl:{
    width: "100%",
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MenuAdmin title={"USUÁRIOS"} />

      {/*Drawer recortado */}

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/*Cadastro e atualização*/}
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h5>Cadastro de usuários</h5>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="name"
                      name="name"
                      label="Nome completo"
                      fullWidth
                      autoComplete="name"
                      variant="standard"
                    />
                  </Grid>
                  

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="email"
                      variant="standard"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="password"
                      name="password"
                      label="Senha"
                      fullWidth
                      autoComplete="password"
                      variant="standard"
                    />
                  </Grid>

                  

                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="lableTipo">Tipo</InputLabel>
                      <Select
                        labelId="lableTipo"
                        id="type"
                        // value={age}
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Administrador</MenuItem>
                        <MenuItem value={2}>Funcionário</MenuItem>
                      </Select>
                    </FormControl>

                    <Grid item xs={12} sm={6}></Grid>
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