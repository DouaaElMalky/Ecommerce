import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export function AdminLayout() {
  async function logout() {
    localStorage.removeItem("jwtToken");
  }

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              E-Commerce
            </a>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className={"nav-link"}>Accueil</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={"nav-link"} to={"/products"}>
                  Produits
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={"nav-link"}>Categories</NavLink>
              </li>
              <li className="nav-item">
                {localStorage.getItem("jwtToken") ? (
                  <NavLink
                    className={"nav-link"}
                    to={"/login"}
                    onClick={logout}
                  >
                    Deconnexion
                  </NavLink>
                ) : (
                  <NavLink className={"nav-link"} to={"/login"}>
                    Connexion
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer>Copyright mundiapolis</footer>
    </>
  );
}
