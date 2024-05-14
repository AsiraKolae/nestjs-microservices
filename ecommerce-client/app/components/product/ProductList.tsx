"use client";
import { useProductContext } from "@/app/context/product.context";
import { Params, ProductListProps } from "@/app/types/product/interfaces";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Pagination } from "../Pagination";
import Sorting from "../Sorting";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
const ProductList: React.FC<ProductListProps> = ({ classNameImage }) => {
  const { data: session } = useSession();
  const { productAll, paramFilter, setParamFilter } = useProductContext();
  const path = usePathname();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSortByChange = (e: { target: { value: string } }) => {
    setParamFilter((prevState: Params) => {
      const filtersObject = prevState.sorted
        ? JSON.parse(prevState.sorted)
        : {};
      return {
        ...prevState,
        sorted: JSON.stringify({
          ...filtersObject,
          order: e.target.value,
        }),
        page: 1,
        per_page: 24,
      };
    });
  };

  const handlePageChange = (pageNumber: number) => {
    setParamFilter((prevState: Params) => {
      return {
        ...prevState,
        page: pageNumber,
      };
    });
  };

  useEffect(() => {
    const queryString = new URLSearchParams(paramFilter).toString();
    router.replace(`${path}?${queryString}`);
    setIsLoaded(true);
  }, [paramFilter, path, router]);

  return (
    <>
      <Sorting
        category={JSON.parse(paramFilter.filters as string)?.category}
        productTotal={parseInt(JSON.stringify(productAll.meta.total))}
        sorted={JSON.parse(paramFilter.sorted as string)?.order}
        onChange={handleSortByChange}
      />
      {(isLoaded && productAll && productAll.meta.total && productAll.meta.total != "0") ? (
        <>
          <ul
            role="list"
            className="relative grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
          >
            {productAll.data.map((data, index) => (
              <li
                key={index}
                className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-gray-50 cursor-pointer hover:bg-slate-200 shadow-md hover:shadow-lg"
              >
                <a
                  href={`product/` + data.id ?? "#"}
                  title="ดูเพิ่มเติม"
                  className="group text-sm"
                >
                  <div className="relative flex flex-1 flex-col p-2">
                    {data.product_attr?.capacity && (
                      <span className="bg-indigo-900 text-white text-xs font-semibold px-2 py-1 rounded-full absolute top-0 right-0 mt-2 mr-2">
                        {data.product_attr.capacity}
                      </span>
                    )}

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
                      className={`${classNameImage} mx-auto flex-shrink-0`}
                    />
                    <h3 className="mt-4 text-sm text-gray-700 font-bold">
                      {data.name}
                      {" "}
                      {data.product_attr?.capacity && data.product_attr?.capacity !== '-' && data.product_attr?.capacity !== 'N/A' && `${data.product_attr?.capacity}`}
                      {" "}
                      {data.product_attr?.color && data.product_attr?.color !== '-' && data.product_attr?.color !== 'N/A' && `${data.product_attr?.color}`}
                    </h3>
                    <dl className="mt-1 flex flex-grow flex-col justify-between">
                      <dt className="sr-only">รายละเอียด</dt>
                      <dd className="mt-1">
                        <p className="text-xs text-gray-500 line-clamp-3">
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
                      </dd>
                      <dt className="sr-only">ราคา และ Cashback</dt>
                      <dd className="mt-1">
                        {session?.user.user_role === "employee" &&
                        data.product_attr.price &&
                        data.product_attr.price_npd_in_vat ? (
                          <div className="text-yellow-800">
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
                      </dd>
                    </dl>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <div className="py-3">
            <Pagination
              active={parseInt(JSON.stringify(paramFilter.page))}
              total={parseInt(JSON.stringify(productAll.meta.last_page))}
              onClick={handlePageChange}
            />
          </div>
        </>
      ) : (
        <>
          <section aria-labelledby="cart-heading">
            <div>
              <p className="text-red-400">ไม่พบข้อมูลสินค้า</p>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default ProductList;
