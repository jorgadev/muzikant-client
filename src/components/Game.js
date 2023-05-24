import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ApiManager } from "../lib/ApiManager";
import Navigation from "./Navigation";

function Game() {
  const router = useRouter();
  const [state, setState] = useState({
    data: null,
    loading: false,
    type: null,
  });

  useEffect(() => {
    setState({ ...state, loading: true });
    ApiManager.getPlaylists()
      .then((res) => {
        const categories = res.data.filter(
          (playlist) => playlist.type === "category"
        );
        const artists = res.data.filter(
          (playlist) => playlist.type === "artist"
        );
        setState({ data: { categories, artists }, loading: false });
      })
      .catch((err) => {
        setState({ ...state, loading: false });
        console.error(err);
      });
  }, []);

  const handleTypeSelect = (type) => {
    setState((prevState) => ({ ...prevState, type }));
  };

  const resetType = () => {
    setState((prevState) => ({ ...prevState, type: null }));
  };

  return (
    <React.Fragment>
      <Navigation hideCoins={true} goBack={state.type ? resetType : null} />
      {!state.type ? (
        <main className="main game select">
          <section
            onClick={() => handleTypeSelect("categories")}
            className="half"
          >
            <button className="btn btn-transparent">Kategorije</button>
          </section>
          <section onClick={() => handleTypeSelect("artists")} className="half">
            <button className="btn btn-transparent">Izvajalci</button>
          </section>
        </main>
      ) : (
        <main className="main game list">
          <div className="wrapper">
            {state.data?.[state.type].map((item) => (
              <div
                className="item"
                key={item.id}
                onClick={() => router.push(`/play/${item.id}`)}
              >
                <button className="btn btn-transparent">{item.name}</button>
              </div>
            ))}
          </div>
        </main>
      )}
    </React.Fragment>
  );
}

export default Game;
