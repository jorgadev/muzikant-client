import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ApiManager } from "../lib/ApiManager";
import { areStringsSimilar, calculatePrize } from "../lib/functions";
import { useStoreContext } from "../lib/hooks/useStoreContext";
import Navigation from "./Navigation";
import CountUp from "react-countup";

function Play() {
  const router = useRouter();

  const { playlistId } = router.query;
  const { user, dispatch } = useStoreContext();

  const [correctAudio, setCorrectAudio] = useState();
  const [wrongAudio, setWrongAudio] = useState();

  const [state, setState] = useState({
    data: null,
    loading: false,

    step: 0,
    input: "",
    lettersShown: 0,
    wordsShown: 0,
    correct: 0,
    incorrect: 0,

    finalPrize: 0,
    startTime: null,
    end: false,
  });

  // Fetch tracks
  useEffect(() => {
    getTracks();
    setCorrectAudio(new Audio("/sounds/correct.mp3"));
    setWrongAudio(new Audio("/sounds/wrong.mp3"));
  }, []);

  // Check input change
  useEffect(() => {
    if (!!state.input.length) {
      if (areStringsSimilar(state.data[state.step].name, state.input)) {
        setState((prevState) => ({
          ...prevState,
          data: prevState.data.map((track, i) =>
            i === prevState.step ? { ...track, correct: true } : track
          ),
        }));

        setTimeout(() => {
          goToNext(null, true);
        }, 200);
      }
    }
  }, [state.input]);

  // End of game
  useEffect(() => {
    if (state.end) {
      const elapsedTime = Date.now() - state.startTime;
      const numOfCorrect = state.data.filter((track) => track.correct).length;
      const coins = calculatePrize(elapsedTime, numOfCorrect);
      ApiManager.updateUserCoins(user.id, coins)
        .then((res) => {
          setState((prevState) => ({ ...prevState, finalPrize: coins }));
          dispatch({ type: "UPDATE_USER", payload: res.data.user });
        })
        .catch((err) => console.error(err));
    }
  }, [state.end]);

  const handleHelp1 = () => {
    if (user.coins >= 10) {
      ApiManager.updateUserCoins(user.id, -10)
        .then((res) => {
          dispatch({ type: "UPDATE_USER", payload: res.data.user });
          setState((prevState) => {
            const name = prevState.data[prevState.step].name;
            return {
              ...prevState,
              input: name.slice(0, prevState.lettersShown + 1),
              lettersShown: prevState.lettersShown + 1,
            };
          });
        })
        .catch((err) => console.error(err));
    }
  };

  const handleHelp2 = () => {
    if (user.coins >= 50) {
      ApiManager.updateUserCoins(user.id, -50)
        .then((res) => {
          dispatch({ type: "UPDATE_USER", payload: res.data.user });
          setState((prevState) => {
            const name = prevState.data[prevState.step].name;

            return {
              ...prevState,
              input:
                name
                  .split(" ")
                  .filter((word, index) => index <= prevState.wordsShown)
                  .join(" ") + " ",
              lettersShown: `${name
                .split(" ")
                .filter((word, index) => index <= prevState.wordsShown)
                .join(" ")} `.length,
              wordsShown: prevState.wordsShown + 1,
            };
          });
        })
        .catch((err) => console.error(err));
    }
  };

  const goToNext = (e, isCorrect = false) => {
    if (isCorrect) {
      correctAudio.play();
    } else {
      wrongAudio.play();
    }

    if (state.step + 1 < state.data.length) {
      setState((prevState) => ({
        ...prevState,
        step: prevState.step + 1,
        lettersShown: 0,
        wordsShown: 0,
        input: "",
        correct: isCorrect ? prevState.correct + 1 : prevState.correct,
        incorrect: !isCorrect ? prevState.incorrect + 1 : prevState.incorrect,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        step: prevState.step + 1,
        end: true,
        correct: isCorrect ? prevState.correct + 1 : prevState.correct,
        incorrect: !isCorrect ? prevState.incorrect + 1 : prevState.incorrect,
      }));
    }
  };

  const getTracks = () => {
    setState({ ...state, loading: true });

    let id;
    if (playlistId) {
      id = playlistId;
    } else {
      const url = window.location.href;
      id = url.substring(url.lastIndexOf("/") + 1);
    }

    ApiManager.getPlaylistTracks(id)
      .then((res) => {
        const data = res.data.map((track) => ({ ...track, correct: false }));
        setState((prevState) => ({
          ...prevState,
          data,
          loading: false,

          step: 0,
          input: "",
          lettersShown: 0,
          wordsShown: 0,
          finalPrize: 0,
          startTime: Date.now(),
          correct: 0,
          incorrect: 0,

          end: false,
        }));
      })
      .catch((err) => {
        setState({ ...state, loading: false });
        console.error(err);
      });
  };

  return (
    <React.Fragment>
      <Navigation inGame={true} />
      {state.data && !!state.data.length && (
        <main className="main play">
          <div className="game-bar">
            <div
              style={{
                width: `${(state.correct / state.data.length) * 100}%`,
              }}
              className="percentage correct"
            ></div>
            <div
              style={{
                width: `${(state.incorrect / state.data.length) * 100}%`,
              }}
              className="percentage incorrect"
            ></div>
          </div>
          {!state.end ? (
            <React.Fragment>
              <div className="wrapper">
                <audio
                  src={state.data[state.step].url}
                  controls
                  loop
                  autoPlay
                />
                <div className="form__group field">
                  <input
                    type="text"
                    className="form__field"
                    autoFocus
                    onChange={(e) =>
                      setState((prevState) => ({
                        ...prevState,
                        input: e.target.value,
                      }))
                    }
                    value={state.input}
                  />
                </div>
                <div className="buttons">
                  <div className="helps">
                    <button
                      className={`btn btn-green ${
                        user?.coins < 10 ? "disabled" : ""
                      }`}
                      onClick={handleHelp1}
                    >
                      A
                    </button>
                    <button
                      className={`btn btn-green ${
                        user?.coins < 50 ? "disabled" : ""
                      }`}
                      onClick={handleHelp2}
                    >
                      &#8629;
                    </button>
                  </div>

                  <button className="btn btn-red" onClick={goToNext}>
                    Skip
                  </button>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div className="end">
              <h1>
                +<CountUp end={state.finalPrize} />
                &#11088;
              </h1>
              <div className="tracks">
                {state.data.map((track) => (
                  <p
                    className={`${track.correct ? "correct" : "red"} `}
                    key={track.id}
                  >
                    {track.artists.join(", ")} - {track.name}{" "}
                  </p>
                ))}
              </div>
              <button onClick={getTracks} className="btn">
                &#8634;
              </button>
            </div>
          )}
        </main>
      )}
    </React.Fragment>
  );
}

export default Play;
