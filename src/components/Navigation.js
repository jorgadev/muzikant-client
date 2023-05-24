import { useRouter } from "next/router";
import React from "react";
import CountUp from "react-countup";
import { useAuth } from "../lib/hooks/useAuth";
import { useStoreContext } from "../lib/hooks/useStoreContext";

function Navigation({
  home = false,
  hideCoins = false,
  goBack,
  inGame = false,
}) {
  const { user } = useStoreContext();
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="nav">
      <div className="buttons">
        {home ? (
          <button onClick={logout} className="btn btn-transparent">
            x
          </button>
        ) : (
          <button
            onClick={goBack ? goBack : () => router.back()}
            className="btn btn-transparent"
          >
            {`<`}
          </button>
        )}
      </div>
      {!hideCoins && (
        <div className="coins">
          <button className="btn btn-transparent with-text">
            {inGame ? (
              <span>
                <CountUp preserveValue end={user?.coins} />
                &#11088;
              </span>
            ) : (
              <span>{user?.coins}&#11088;</span>
            )}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
