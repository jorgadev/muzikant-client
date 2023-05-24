import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ApiManager } from "../lib/ApiManager";

function Tracks() {
  const [state, setState] = useState({
    data: [],
    loading: false,
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
    ApiManager.getPlaylists()
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          data: res.data,
          loading: false,
        }));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h3>Tracks</h3>
      {!!state.data.length &&
        state.data.map((playlist) => (
          <p>
            <Link href={`/playlist/${playlist.id}`}>{playlist.name}</Link>
          </p>
        ))}
    </div>
  );
}

export default Tracks;
