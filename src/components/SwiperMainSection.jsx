import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { useSelector } from "react-redux";
import "../styles/detail.scss";

const { VITE_IMG_URL_ORIGINAL } = import.meta.env;

export default function SwiperMainSection() {
  const { now_playing } = useSelector((state) => state.movieMain);

  return (
    <>
      <Swiper className="mySwiper">
        {now_playing.map((el) => (
          <SwiperSlide key={el.id}>
            <div
              className="main_slide_backdrop"
              style={{
                backgroundImage: `url(${
                  VITE_IMG_URL_ORIGINAL + el.backdrop_path
                } )`,
              }}
            ></div>
            <div className="main_slide_backdrop_bg_left"></div>
            <div className="main_slide_backdrop_bg_bottom"></div>
            <div className="detail_sec_info2_container">
              <div className="detail_sec_info2">
                <h1 className="detail_sec_title2">
                  {el.title} {el.release_date.slice(0, 4)}
                </h1>
                <div className="detail_sec_position2">
                  <div className="card_more_average">
                    <span>{el.vote_average.toString().slice(0, 4)}</span>
                  </div>
                </div>
                <div className="detail_sec_des2">{el.overview}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
