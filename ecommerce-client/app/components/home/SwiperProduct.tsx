"use client";
import { useHomeContext } from "@/app/context/home.context";
import { SwiperProductProps } from "@/app/types/product/interfaces";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const SwiperProduct: React.FC<SwiperProductProps> = ({
  perView,
  classNameImage,
  type,
  params,
}) => {
  const { data: session } = useSession();
  const { dataProducts, fetchProducts } = useHomeContext();

  useEffect(() => {
    fetchProducts(params);
  }, []);

  const swiperOptions = {
    slidesPerView: 2,
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
      },
    },
  };

  return (
    <>
      {dataProducts && dataProducts.length > 0 && (
          <div className="flex items-center justify-between">
            <h2 className="text-md lg:text-xl font-bold tracking-tight text-gray-900">
              {type}
            </h2>
            <a
              href={`product?per_page=24&page=1&filters={"category":"${type}"}&sorted={"column":"price","order":"desc"}`}
              className="text-md font-medium text-gray-600 hover:text-gray-900"
            >
              <div className="inline-flex items-center">
                <span className="mr-1 text-sm lg:text-md">ดูทั้งหมด</span>
                <ChevronRightIcon className="h-5 w-5" />
              </div>
            </a>
          </div>
        )}
      <Swiper
        {...swiperOptions}
        modules={[Pagination, Navigation]}
        className="!py-6"
      >
        {dataProducts?.map((data, index) => (
          <SwiperSlide key={index} className="!h-auto">
            <a href={`product/` + data.id ?? "#"} title="ดูเพิ่มเติม">
              <div className="group relative mx-1 bg-gray-50 rounded-md cursor-pointer shadow-md hover:shadow-lg h-full">
                {data.product_attr?.capacity && (
                  <span className="bg-indigo-900 text-white text-xs font-semibold px-2 py-1 rounded-full absolute top-0 right-0 mt-2 mr-2">
                    {data.product_attr.capacity}
                  </span>
                )}
                <div className="p-2">
                  <Image
                    src={
                      Object?.keys(data?.product_img)[0] ??
                      "/image-coming-soon.jpeg"
                    }
                    alt={`imgProduct ${index + 1}` || "imgProduct"}
                    width={500}
                    height={500}
                    priority
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    className={`${classNameImage}`}
                  />
                  <h3 className="mt-4 text-sm text-gray-700 font-bold">
                    {data.name}{" "}
                    {" "}
                    {data.product_attr?.capacity && data.product_attr?.capacity !== '-' && data.product_attr?.capacity !== 'N/A' && `${data.product_attr?.capacity}`}
                    {" "}
                    {data.product_attr?.color && data.product_attr?.color !== '-' && data.product_attr?.color !== 'N/A' && `${data.product_attr?.color}`}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 line-clamp-3">
                    {
                      (() => {
                        let title = [
                          'screenSize',
                          'memory',
                          'operatingSystem',
                          'connectivity',
                          'totalpoweroutputW',
                          'frequencyresponse',
                          'connector',
                          'wirelesstechnology',
                          'numberofbuttons',
                          'interface',
                          'sensortechnology',
                          'switch',
                          'lEDBacklight',
                          'mousetechnology',
                          'keyboardtechnology',
                          'wirelessOperatingDistance',
                          'supportOS',
                          'memory',
                          'processorSpeed',
                          'storage',
                          'graphics',
                          'wireless',
                          'resolution',
                          'connectorJack',
                          'widescreen',
                          'resolutionRefreshRate',
                          'lEDBacklightPaneltype',
                          'connectors',
                          'batterylife',
                          'battery',
                        ];
                        return title.map(attr => data.product_attr?.attributes[attr])
                          .filter(value => value !== undefined && value !== null && value !== "-" && value !== "N/A")
                          .join(" | ");
                      }
                      )()
                    }
                    {" "}
                    {data.warranty && data.warranty !== '-' && data.warranty !== 'N/A' && `Warranty: ${data.warranty}`}
                  </p>
                  {session?.user.user_role === "employee"&&
                        data.product_attr.price &&
                        data.product_attr.price_npd_in_vat ? (
                    <div className="mt-1 text-yellow-800">
                      <div className="inline-flex items-center">
                        <PlusIcon className="-ml-1 h-4 w-4 stroke-2" />
                        <p>&copy;</p>
                        <p className="text-xs">
                          {(
                            data.product_attr.price -
                            data.product_attr.price_npd_in_vat
                          ).toLocaleString("th-TH",{ minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </p>
                      </div>
                      <p className="text-xs -mt-1">Cashback</p>
                    </div>
                  ) : (
                    ""
                  )}
                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                    }).format(data.product_attr.price)}
                  </p>
                </div>
              </div>
            </a>
          </SwiperSlide>
        )) ?? (
            <SwiperSlide>
              <>
                <div className="group relative my-6 mx-1 bg-gray-50 rounded-md cursor-pointer shadow-md hover:shadow-lg">
                  <div className="p-2">
                    <Image
                      src="/image-coming-soon.jpeg"
                      alt="imgProduct"
                      width={500}
                      height={500}
                      priority
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                      className={`${classNameImage}`}
                    />
                  </div>
                </div>
              </>
            </SwiperSlide>
          )}
      </Swiper>
    </>
  );
};
export default SwiperProduct;
