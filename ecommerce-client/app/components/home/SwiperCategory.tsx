"use client";
import { useHomeContext } from "@/app/context/home.context";
import { SwiperCategoryProps } from "@/app/types/category/interfaces";
import Image from "next/image";
import React, { useEffect } from 'react';
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const SwiperCategory: React.FC<SwiperCategoryProps> = ({ perView, delayView, classNameImage, params }) => {

    const { imgUrlCategory, fetchCategories } = useHomeContext()

    useEffect(() => {
        fetchCategories(params);
    }, []);

    const swiperOptions = {
        slidesPerView: 1,
        loopAddBlankSlides: true,
        slidesPerGroup: 1,
        spaceBetween: 10,
        navigation: {
            enabled: false,
        },
        breakpoints: {
            640: {
                slidesPerView: perView,
                slidesPerGroup: 1,
                navigation: {
                    enabled: true,
                },
            }
        },
        pagination: {
            clickable: true,
        },
        centeredSlides: true,
        autoplay: {
            delay: delayView,
            reverseDirection: true
        },
        loop: true,
    }

    return (
        <>
            <Swiper
                {...swiperOptions}
                modules={[
                    FreeMode, Pagination, Navigation, Autoplay
                ]}
            >
                {(imgUrlCategory?.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={Object?.keys(image)[0] ?? 'https://via.placeholder.com/1752x640.png/d9d9d9?text=...'}
                            alt={`imgCategory ${index + 1}` || 'imgCategory'}
                            width={500}
                            height={500}
                            priority
                            sizes="100vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                            className={classNameImage}
                        />
                    </SwiperSlide>
                ))) ?? (
                        <SwiperSlide>
                            <Image
                                src='https://via.placeholder.com/1752x640.png/d9d9d9?text=...'
                                alt='imgCategory'
                                width={500}
                                height={500}
                                priority
                                sizes="100vw"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                                className={`${classNameImage}`}
                            />
                        </SwiperSlide>
                    )}
            </Swiper>
        </>
    );
};
export default SwiperCategory;