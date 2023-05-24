import React, { useState } from "react";
import { useRouter } from "next/router";
import Navigation from "./Navigation";
import { useStoreContext } from "../lib/hooks/useStoreContext";

function Home() {
  const { user } = useStoreContext();
  const router = useRouter();

  return (
    <React.Fragment>
      <Navigation home={true} />
      <main className="main home">
        <section>
          <div className={`character character-${user?.character}`}></div>
          <div className="buttons">
            <button
              onClick={() => router.push("/game")}
              className="btn btn-green"
            >
              Igra
            </button>
            <button
              onClick={() => router.push("/shop")}
              className="btn btn-red"
            >
              Shop
            </button>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}

export default Home;
