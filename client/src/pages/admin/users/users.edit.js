import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuAdmin from "../../../components/menu.admin";
import Footer from "../../../components/footer.admin";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";
import api from "../../../services/api";

import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: { display: "flex" },
  title: { flexGrow: 1 },
  appBarSpacer: theme.mixins.toolbar,
  content: { flexGrow: 1, height: "100vh", overflow: "auto" },
  container: { paddingTop: theme.spacing(2), paddingBottom: theme.spacing(4) },
  paper: {
    padding: 35,
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  formControl: { width: "100%" },
  btnSuccess: {
    backgroundColor: "green",
    color: "#fff",
    "&:hover": { backgroundColor: "#12b912" },
  },
}));

export default function UsuarioCadastrar() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const { idUser } = useParams();

  useEffect(() => {
    async function getUsers() {
      var response = await api.get("/api/users.details/" + idUser);

      setName(response.data.name);
      setEmail(response.data.email);
      setPassword(response.data.password);
      setType(response.data.type);
    }

    getUsers();
  }, [idUser]);

  async function handleSubmit() {
    const data = {
      name,
      email,
      setPassword,
      type,
    };

    if (name !== "" && email !== "" && password !== "" && type !== "") {
      const response = await api.put("/api/users/", data);

      if (response.status === 200) {
        console.log(response)
      } else {
        alert("Erro ao atualizar o usuário!");
      }
    } else {
      alert("Por favor, preencha todos os dados!");
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={"USUÁRIOS"} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button
                style={{ marginBottom: 10, marginRight: 5 }}
                variant="contained"
                href={"/admin/users"}
              >
                <ArrowBackIcon /> Voltar
              </Button>
              <Button
                style={{ marginBottom: 10 }}
                variant="contained"
                color="primary"
                href={"/admin/users/register"}
              >
                <AddIcon />
                Cadastrar
              </Button>
              <Paper className={classes.paper}>
                <h2>Atualização de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome completo"
                      fullWidth
                      autoComplete="nome"
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="labelTipo">Tipo</InputLabel>
                      <Select
                        labelId="labelTipo"
                        id="tipo"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <MenuItem value={1}>Administrador</MenuItem>
                        <MenuItem value={2}>Funcionário</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="password"
                      required
                      id="senha"
                      name="senha"
                      label="Senha"
                      fullWidth
                      autoComplete="senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      className={classes.btnSuccess}
                    >
                      <SaveIcon /> Salvar
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
