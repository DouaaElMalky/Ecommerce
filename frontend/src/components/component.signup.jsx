import React, { useState } from "react";
import { signup } from "../services/login.services";
import ReCAPTCHA from "react-google-recaptcha";
import http from "../services/http_common";

export function Signup({ handleFormSubmit }) {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const handleRecaptchaChange = (value) => {
    setCaptchaValue(value);
    setCaptchaError("");
  };

  async function handleForm(e) {
    e.preventDefault();

    // Vérifier si le ReCAPTCHA a été validé
    if (!captchaValue) {
      setCaptchaError("Veuillez valider le ReCAPTCHA.");
      return;
    }
    const user = {
      fName: fName,
      lName: lName,
      email: email,
      password: password,
    };

    try {
      await signup(user);
      if (handleFormSubmit) {
        handleFormSubmit(user);
      }
      console.log(captchaValue);
      const response = await http.post("/validate_captcha", { captchaValue });
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  }

  return (
    <form onSubmit={handleForm}>
      <label className="form-label">Nom :</label>
      <input
        className="form-control"
        type="text"
        onChange={(e) => setLName(e.target.value)}
      />
      <label className="form-label">Prenom :</label>
      <input
        className="form-control"
        type="text"
        onChange={(e) => setFName(e.target.value)}
      />
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
      <ReCAPTCHA
        sitekey="6LfGuYQpAAAAAKh3a8jUO4fbk99bkocjQmwonBS_"
        onChange={handleRecaptchaChange}
      />
      {captchaError && <p className="text-danger">{captchaError}</p>}
      <input className="btn btn-primary" type="submit" />
      <input className="btn btn-danger" type="reset" />
    </form>
  );
}
