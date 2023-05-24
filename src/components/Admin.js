import React from "react";
import { useAuth } from "../lib/hooks/useAuth";
import { useAdmin } from "../lib/hooks/useAdmin";
import Navigation from "./Navigation";

function Admin() {
  const { logout } = useAuth();
  const { data, loading, error, updateDatabase, clearData } = useAdmin();

  return (
    <React.Fragment>
      <Navigation home hideCoins />
      <main className="main admin">
        <div className="container">
          <div className="col left">
            {" "}
            <button disabled={loading} onClick={updateDatabase}>
              Update tracks
            </button>
            <br />
            <br />
            <button disabled={loading} onClick={clearData}>
              Clear data
            </button>
          </div>
          <div className="col right">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {data && (
              <React.Fragment>
                <ol>
                  {data.inserted.map((track) => (
                    <li key={`${track.id}_${track.playlist_id}`}>
                      {track.artists.join(", ")} - {track.name}
                    </li>
                  ))}
                </ol>
              </React.Fragment>
            )}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

export default Admin;
