import Link from "next/link";
import React, { useState } from "react";
import Router from "next/router";
import { useStoreContext } from "../lib/hooks/useStoreContext";
import { useAuth } from "../lib/hooks/useAuth";

function Login() {
  const { user } = useStoreContext();
  const { login, loading, error } = useAuth();

  if (user) {
    Router.push("/");
  }

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(state.email, state.password);
  };

  return (
    <main className="main auth">
      <form>
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
          Prijava
        </button>
        <Link className="link" href="/register">
          Registracija?
        </Link>
      </form>
    </main>
  );
}

export default Login;
