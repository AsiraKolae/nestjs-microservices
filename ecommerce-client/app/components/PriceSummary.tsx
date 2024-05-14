"use client";

import React, { useEffect, useState } from "react";
import { cartItems } from "../types/cart/interfaces";
import { useCartStore } from "../store/CartStore";
import { useCashbackStore } from "../store/CashbackStore";
import { useSession } from "next-auth/react";

const PriceSummary = () => {
  const { data: session } = useSession();
  const { cartItems } = useCartStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [cartItem, setCartItem] = useState<cartItems[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { exchangeCashback } = useCashbackStore();
  
  useEffect(() => {
    setIsLoaded(true);
    setCartItem(cartItems)
    const newTotalPrice = cartItem?.reduce((acc: number, item: any) => {
      const subtotal: number = item.product.product_attr.price * item.amount;
      return acc + subtotal;
    }, 0) | 0;
    setTotalPrice(newTotalPrice - (exchangeCashback ?? 0));
  }, [cartItems, cartItem, exchangeCashback]);

  return (

    <>
      {isLoaded ? (
        <>
          <h2 className="text-lg font-medium text-gray-900">สรุปรายการสั่งซื้อสินค้า</h2>
          <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
            <dl className="border-t border-gray-200 px-4 py-6 sm:px-6">  
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItem?.map((item: any) => (
                    <li key={item?.id ?? ''} className="flex py-6">
                      <div className="flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3 className="text-sm">
                              {item.product.name ?? '-'}
                            </h3>
                            <p className="ml-4">{new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(item.product.product_attr.price) ?? '฿0.00'}</p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">จำนวน {item.amount ?? '0'}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-5">
                <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                  <dt className="text-sm text-gray-600">ค่าจัดส่ง</dt>
                  <dd className="text-sm font-medium text-gray-900">฿0.00</dd>
                </div>
              </div>
              <div className="flex items-center justify-between border-gray-200 pt-3">
                <dt className="text-sm font-bold">ยอดรวมสุทธิ</dt>
                <dd className="text-sm font-bold text-gray-900">
                  {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(totalPrice) ?? '฿0.00'}
                </dd>
              </div>
              {session?.user?.user_role === 'employee' && ( 
                <div className="flex items-center justify-between border-gray-200 pt-3">
                  <dt className="text-sm font-bold">ได้รับเงินคืนสะสม (Cashback)</dt>
                  <dd className="text-sm font-medium text-yellow-700">
                    {
                      cartItem?.reduce((acc: number, item: any) => {
                        const subtotal: number = (item?.product.product_attr.price - item.product.product_attr.price_npd_in_vat) * item.amount;
                        return acc + subtotal;
                      }, 0).toLocaleString("th-TH",{ minimumFractionDigits: 2, maximumFractionDigits: 2})
                    } &copy;
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default PriceSummary;
