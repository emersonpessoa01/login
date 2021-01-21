import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

//IMPORT ADMIN
import Dashboard from "./pages/admin/dashboard";

import Products from "./pages/admin/products";
import ProductEdit from "./pages/admin/products/product.edit";
import ProductRegister from "./pages/admin/products/product.register";

//IMPORT USUÁRIOS
import Users from "./pages/admin/users"
import UserEdit from "./pages/admin/users/users.edit";
import UserRegister from './pages/admin/users/users.register'


//IMPORT CLIENT
import Home from "./pages/client/home";
import ProductDetails from "./pages/client/products/products.details";

export default function Routes(){

  return (
    <BrowserRouter>
      <Switch>
        {/*ROTA CLIENTE */}
        <Route path="/" exact component={Home} />
        <Route path="/products/:idProduct" exact component={ProductDetails} />
        

        {/*ROTA ADMIN */}
        <Route path="/admin" exact component={Dashboard} />

        <Route path="/admin/products" exact component={Products} />
        <Route path="/admin/products/register" exact component={ProductRegister} />
        <Route path="/admin/products/edit/:idProduct" exact component={ProductEdit} />

        {/*ROTA USUÁRIOS */}
        <Route path="/admin/users" exact component={Users} />
        <Route path="/admin/users/register" exact component={UserRegister} />
        <Route path="/admin/users/edit/:idUser" exact component={UserEdit} />


      </Switch>
    </BrowserRouter>
  )
}