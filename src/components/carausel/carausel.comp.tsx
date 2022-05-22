/* eslint-disable import/no-unresolved */

import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const StylesImageTag = styled(Image)`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const stylesSwiper = {
  TextAlign: "center",
  fontSize: "18px",
  background: "#fff",

  /* Center slide text vertically */
  //   display: "-webkit-box",
  //   display: "-ms-flexbox",
  //   display: "-webkit-flex",
  display: "flex",
  //   -webkit-box-pack: "center",
  //   -ms-flex-pack: center,
  //   -webkit-justify-content: center,
  justifyContent: "center",
  //   -webkit-box-align: "center",
  //   -ms-flex-align: "center",
  //   -webkit-align-items: "center",
  alignItems: "center",
};

export default function HomeCarausel() {
  return (
    <Swiper
      style={{
        height: "300px",
      }}
      spaceBetween={30}
      centeredSlides
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation
      modules={[Autoplay, Pagination, Navigation]}
    >
      <SwiperSlide style={stylesSwiper}>
        <StylesImageTag
          loading="lazy"
          src="https://wxmwctiasizeoqlubrjn.supabase.co/storage/v1/object/public/seat/carousel/seat1.jpg"
          alt="1"
          layout="fill"
        />
      </SwiperSlide>
      <SwiperSlide style={stylesSwiper}>
        <StylesImageTag
          loading="lazy"
          src="https://wxmwctiasizeoqlubrjn.supabase.co/storage/v1/object/public/seat/carousel/seat2.jpg"
          alt="1"
          layout="fill"
        />
      </SwiperSlide>
      <SwiperSlide style={stylesSwiper}>
        <StylesImageTag
          loading="lazy"
          src="https://wxmwctiasizeoqlubrjn.supabase.co/storage/v1/object/public/seat/carousel/seat3.jpeg"
          alt="1"
          layout="fill"
        />
      </SwiperSlide>
      <SwiperSlide style={stylesSwiper}>
        <StylesImageTag
          loading="lazy"
          src="https://wxmwctiasizeoqlubrjn.supabase.co/storage/v1/object/public/seat/carousel/seat4.jpg"
          alt="1"
          layout="fill"
        />
      </SwiperSlide>
    </Swiper>
  );
}
