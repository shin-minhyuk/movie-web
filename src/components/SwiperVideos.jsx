import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../App.scss";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function SwiperVideos({ videos }) {
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true} // Enable navigation
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {videos.slice(0, 5).map((el) => (
          <SwiperSlide key={el.key}>
            <iframe
              src={`https://www.youtube.com/embed/${el.key}?controls=0`}
              width="100%"
              title={el.name}
              style={{ border: 0 }}
              height="678.375px"
            ></iframe>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
