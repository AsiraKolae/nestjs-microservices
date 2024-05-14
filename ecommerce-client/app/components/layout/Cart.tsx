"use client";
import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";
import { showCart, useAmountItemsStore, useCartStore } from "@/app/store/CartStore";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface Cart {
  id: number;
  user: object;
  items: any[];
  setCartState: any;
}

const Cart = () => {
  const [cartState, setCartState] = useState<Cart>();
  const { data: session, status } = useSession();

  const { amountItems } = useAmountItemsStore();
  const { cartItems } = useCartStore();

  const initCategory = async () => {
    try {
      const result: any = await showCart();
      setCartState(result.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if(status === 'authenticated'){
      initCategory();
    }
  }, [amountItems, cartItems]);

  return (
    /* Cart */
    <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8">

      <Popover.Button className="group -m-2 flex items-center p-2 focus:outline-none">
        <ShoppingCartIcon
          className="h-6 w-6 flex-shrink-0 text-gray-900 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-someGreen group-hover:text-gray-500">
          {amountItems}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </Popover.Button>

      {/* dropdown */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Panel className="absolute inset-x-0 top-16 mt-16 bg-white pt-6 pb-6 shadow-lg sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
          <h2 className="sr-only">Shopping Cart</h2>

          <form className="mx-auto max-w-2xl px-4">
            <ul role="list" className="divide-y divide-gray-200">
              {cartState?.items.map((cart_item) => (
                <li key={cart_item.id} className="flex items-center py-6">
                  <Image
                    src={(cart_item?.product?.product_img?.length > 0) ? Object?.keys(cart_item?.product?.product_img[0])[0] : "/image-coming-soon.jpeg"}
                    alt={cart_item.product.name || 'imgProduct'}
                    className="h-16 w-16 flex-none rounded-md border border-gray-200"
                    width={500}
                    height={500}
                    priority
                  />
                  <div className="ml-4 flex-auto text-xs">
                    <h3 className="font-medium text-gray-900">
                      <a href={"/product/" + cart_item.product.id}>
                        {cart_item?.product?.name ?? ""} {cart_item?.product?.product_attr?.capacity ?? ""}
                      </a>
                    </h3>
                    <p className="text-gray-500">สี: {cart_item?.product?.product_attr?.color ?? "-"}</p>
                    <p className="text-gray-500">จำนวน: {cart_item?.amount ?? "-"}</p>
                  </div>
                </li>
              ))}
            </ul>
          </form>
          <div className="mx-auto max-w-2xl px-4">
            <a href="/cart">
              <button
                className=" w-full rounded-md border border-gray-800 bg-gray-900 hover:bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                ไปที่ตะกร้า
              </button>
            </a>
          </div>
        </Popover.Panel>
      </Transition>

    </Popover>
  );
};

export default Cart;
