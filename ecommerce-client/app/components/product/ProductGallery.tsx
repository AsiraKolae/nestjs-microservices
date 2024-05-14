"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import { Params, ProductByIdProps } from "@/app/types/product/interfaces";
import LoadingIndicator from "../LoadingIndicator";
const ProductGallery: React.FC<ProductByIdProps> = ({ product }) => {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [])

  return (

    <>
      {isLoaded ? (
        <>
          <Swiper
            style={{
              "--swiper-navigation-color": "#5b5b5b",
              "--swiper-pagination-color": "#5b5b5b",
              // '--swiper-theme-color: #000'
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {product?.product_img != null && product?.product_img.length > 0 ? (
              product?.product_img.map((img: any, index: any) => (
                <SwiperSlide key={index}>
                  <Image
                    className="rounded-md"
                    src={Object.keys(img)[0]}
                    alt="product"
                    width={500}
                    height={500}
                    priority
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <Image
                  className="rounded-md"
                  src="/image-coming-soon.jpeg"
                  alt="product"
                  width={500}
                  height={500}
                  priority
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </SwiperSlide>
            )}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="m-3"
          >
            {product?.product_img != null && product?.product_img.length > 0 ? (
               product?.product_img.map((img: any, index: any) => (
                <SwiperSlide key={index}>
                  <Image
                    className="rounded-md border"
                    src={Object.keys(img)[0]}
                    alt="product"
                    width={500}
                    height={500}
                    priority
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </SwiperSlide>
              ))
            ): null}
          </Swiper>
        </>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
};

export default ProductGallery;
