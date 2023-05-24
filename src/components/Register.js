import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import { useAuth } from "../lib/hooks/useAuth";
import { useStoreContext } from "../lib/hooks/useStoreContext";

function Register() {
  const { user } = useStoreContext();
  const [state, setState] = useState({ username: "", email: "", password: "" });
  const { register, loading, error } = useAuth();

  if (user) {
    Router.push("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(state.username, state.email, state.password);
  };

  return (
    <main className="main auth">
      <form>
        <div className="form__group field">
          <input
            type="text"
            value={state.username}
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                username: e.target.value,
              }))
            }
            className="form__field"
            placeholder="Uporabnisko ime"
          />
          <label className="form__label">Uporabniško ime</label>
        </div>
        <div className="form__group field">
          <input
            type="email"
            value={state.email}
            onChange={(e) =>
              setState((prevState) => ({ ...prevState, email: e.target.value }))
            }
            className="form__field"
            placeholder="E-naslov"
          />
          <label className="form__label">E-naslov</label>
        </div>
        <div className="form__group field">
          <input
            type="password"
            value={state.password}
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
            className="form__field"
            placeholder="Geslo"
          />
          <label className="form__label">Geslo</label>
        </div>
        {error && <p className="error">{error}</p>}
        <button
          onClick={handleSubmit}
          className={`btn btn-green ${loading ? "disabled" : ""}`}
        >
          Registracija
        </button>
        <Link className="link" href="/login">
          Prijava?
        </Link>
      </form>
    </main>
  );
}

export default Register;
