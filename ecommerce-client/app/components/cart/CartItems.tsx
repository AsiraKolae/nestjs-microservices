"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { CheckIcon, ClockIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { List, ListItem } from "@material-tailwind/react";
import ListWithIcon from "./ListWithIcon";
import PriceSummary from "../PriceSummary";
import Button from "../Button";
import { useCartStore } from "@/app/store/CartStore";

const CartItems = () => {
  const { cartItems, fetchCartData } = useCartStore();

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData])

  return (
    <>
      {(cartItems && cartItems.length > 0) ? (
        <>
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              <li>
                <List placeholder=''>
                  {(cartItems.map((cartItem) => (
                      <ListItem key={cartItem.id ?? ''} ripple={false} className="bg-white hover:bg-white cursor-auto" placeholder=''>
                        <div className="flex-shrink-0 h-20 w-20">
                          <Image
                            src={(cartItem?.product?.product_img?.length > 0) ? Object?.keys(cartItem?.product?.product_img[0])[0] : "/image-coming-soon.jpeg"}
                            alt={`imgProduct ${cartItem.id}` || 'imgProduct'}
                            width={300}
                            height={300}
                            priority
                            sizes="100vw"
                            style={{
                              width: '100%',
                              height: 'auto',
                            }}
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <a title="ดูเพิ่มเติม" href={`product/` + cartItem.product?.id ?? '#'} className="cursor-pointer font-medium text-gray-700 hover:text-gray-800">
                                    {cartItem.product.name}
                                  </a>
                                </h3>
                              </div>
                              <div className="mt-1 flex text-sm">
                                <p className="text-gray-500">{cartItem.product.product_attr.color}</p>
                                {cartItem.product.product_attr.capacity ? (
                                  <p className="ml-2 border-l border-gray-200 pl-2 text-gray-500">{cartItem.product.product_attr.capacity}</p>
                                ) : null}
                              </div>
                              <p className="mt-1 text-sm font-bold text-gray-900">
                                {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(cartItem.product.product_attr.price) ?? '฿0.00'}
                              </p>
                            </div>
                          </div>

                          <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                            {cartItem.product.type === 'instock' ? (
                              <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                            ) : (
                              <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                            )}

                            <span>{cartItem.product.type === 'instock' ? 'In stock' : 'Pre order'}</span>
                          </p>
                        </div>
                        <div className="sm:inline-flex">
                          <ListWithIcon cartItem={cartItem} />
                        </div>
                      </ListItem>
                  )))}
                </List>
              </li>
            </ul>
          </section>
          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <PriceSummary />
            <div className="mt-6">

              <a href={(cartItems) ? '/order' : '#'}>
                <Button
                  disabled={!cartItems}
                  className={`w-full items-center rounded-md ${cartItems ? 'bg-gradient-to-l from-coolGreen to-softCool hover:bg-gradient-to-r border-coolGreen text-Emerald-800' : 'bg-gray-400 border-gray-400'}   text-sm font-medium border  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500`}
                >
                  ทำรายการ
                </Button>
              </a>
            </div>
          </section>
        </>
      ) : (
        <>
          <section aria-labelledby="cart-heading" className="col-span-12 text-center">
            <div className="inline-flex justify-center">
              <XCircleIcon className="stroke-2 text-lg h-16 w-16 text-gray-300"/>
            </div>
            <div>
              <p>ไม่มีสินค้าในตะกร้า</p>
              <p>โปรดเลือกหยิบสินค้าที่ต้องการซื้อลงตะกร้า</p>
            </div>
            <div className="inline-flex justify-center mt-3">
              <a href="/">
                <Button
                  className="w-full items-center rounded-md bg-black hover:bg-gray-400 border-gray-400 text-sm "
                >
                  กลับสู่หน้าหลัก
                </Button>
              </a>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default CartItems;