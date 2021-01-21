import React, { useState } from "react";
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

import Button from "@material-ui/core/Button";

import api from "../../../services/api";

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
  formControl: {
    width: "100%",
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  // const [form, setForm] = useState("");

  const handleSubmit = async () => {
    const data = {
      name,
      email,
      password,
      type,
    };
    console.log(data);

    //verificação
    if (name !== "" && email !== "" && password !== "" && type !== "") {
      const res = await api.post("/api/users", data);
      if (res.status === 200) {
        window.location.href = "/admin/users";
      } else {
        alert("Erro ao cadastrar usuário");
      }
    }else{
      alert("É necessário que preencha todos os campos")
    }
  };

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
                      id="nome"
                      name="nome"
                      label="Nome completo"
                      fullWidth
                      autoComplete="nome"
                      variant="standard"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      email={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="senha"
                      name="senha"
                      type="password"
                      label="Senha"
                      fullWidth
                      autoComplete="senha"
                      variant="standard"
                      password={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="lableTipo">Tipo</InputLabel>
                      <Select
                        labelId="lableTipo"
                        id="tipo"
                        type={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <MenuItem value={1}>Administrador</MenuItem>
                        <MenuItem value={2}>Funcionário</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Salvar
                    </Button>
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
