import { useState } from "react";
import { userLogin } from "../services/login.services";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleForm(e) {
    e.preventDefault();
    const user = { email: email, password: password };
    const rep = await userLogin(user);
    console.log(rep);
    const token = rep.data;
    localStorage.setItem("jwtToken", token);
    navigate("/products");
  }

  return (
    <form onSubmit={(e) => handleForm(e)}>
      <label className="form-label">Email :</label>
      <input
        className="form-control"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="form-label">Mot de passe :</label>
      <input
        className="form-control"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <input className="btn btn-primary" type="submit" />
      <input className="btn btn-danger" type="reset" />
    </form>
  );
}
