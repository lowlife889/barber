"use client"
import { useEffect, useState } from 'react';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "@/app/home.css"
import "swiper/css";


function ImgGallery({width}) {
  //Cantidad de imagenes segun el width
  const [images, setImages] = useState(3);
  
  //Cambia el state del width para la cantidad de imagenes que se muestran en la galeria
  useEffect(() => {
    if(width<500){
      setImages(1)
    }else if(width<800){
      setImages(2)
    }
    else{
      setImages(3)
    }
  }, [width]);
  

  return (
    <div className="imagenes-container">
      <Swiper
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "center",
        }}
        spaceBetween={10}
        slidesPerView={images}
      >
        <SwiperSlide className="img">

            <img className="img" src="/images/1.jpg" alt="" />

        </SwiperSlide>
        <SwiperSlide className="img">

            <img className="img" src="/images/2.jpg" alt="" />

        </SwiperSlide>
        <SwiperSlide className="img">
            <img className="img" src="/images/3.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="img">

            <img className="img"  src="/images/corte1.jpg" alt="" />

        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ImgGallery;
