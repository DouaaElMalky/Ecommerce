import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "./components/component.admin.layout";
import { ProductList } from "./components/component.product.list";
import { ProductNew } from "./components/component.product.new";
import { ProductEdit } from "./components/component.product.edit";
import { Signup } from "./components/component.signup";
import { Login } from "./components/component.login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route path="products" element={<ProductList />}></Route>
          <Route path="products/new" element={<ProductNew />}></Route>
          <Route path="products/edit/:id" element={<ProductEdit />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="login" element={<Login />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
