import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import Card from "./Card";

export default function SwiperSection({ movies }) {
  return (
    <>
      <div className="card_container">
        <div>
          <div className="titme_box">
            <h1 className="text-[24px] ">현재 상영중</h1>
            <div className="bg-[red] w-[100px] h-[5px]"></div>
          </div>
          <Swiper
            slidesPerView={5}
            spaceBetween={0}
            modules={[Pagination]}
            className="mySwiper"
            breakpoints={{
              100: {
                slidesPerView: 2,
              },
              550: {
                slidesPerView: 3,
              },
              856: {
                slidesPerView: 4,
              },
              1158: {
                slidesPerView: 5,
              },
            }}
          >
            {movies.map((el) => (
              <SwiperSlide key={el.id}>
                <Card movie={el} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
