import React from "react";
import { CHARACTERS } from "../lib/constants";
import { useStoreContext } from "../lib/hooks/useStoreContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Pagination } from "swiper";
import "swiper/css/pagination";
import Navigation from "./Navigation";
import { ApiManager } from "../lib/ApiManager";

function Shop() {
  const { user, dispatch } = useStoreContext();

  const handleSelect = (character) => {
    if (user?.character !== character) {
      ApiManager.updateUserCharacter(user.id, character)
        .then((res) => {
          dispatch({ type: "UPDATE_USER", payload: res.data.user });
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <React.Fragment>
      <Navigation />
      <main className="main shop">
        <Swiper
          touchRatio={0.25}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div onClick={() => handleSelect(0)} className="container">
              <div
                className={`character character-0 ${
                  user?.character === 0 ? "active" : ""
                }`}
              ></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div onClick={() => handleSelect(1)} className="container">
              <div
                className={`character character-1 ${
                  user?.character === 1 ? "active" : ""
                }`}
              ></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div onClick={() => handleSelect(2)} className="container">
              <div
                className={`character character-2 ${
                  user?.character === 2 ? "active" : ""
                }`}
              ></div>
            </div>
          </SwiperSlide>
        </Swiper>
      </main>
    </React.Fragment>
  );
}

export default Shop;
