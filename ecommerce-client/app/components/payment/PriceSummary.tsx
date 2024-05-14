"use client";

import { useInvoiceStore } from "@/app/store/InvoiceStore";
import React, { useEffect, useState } from "react";


const PaymentPriceSummary = () => {
    const { invoice, showInvoice } = useInvoiceStore();
    const [isLoaded, setIsLoaded] = useState(false);
    const [total, setTotal] = useState<number>(0.00);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {

        setIsLoaded(true);
        let newTotalPrice: number = invoice?.orders?.[0]?.items.reduce((acc: number, item: any) => {
            const subtotal: number = item.product.product_attr.price * item.amount;
            return acc + subtotal;
        }, 0) || 0;
        
        if (invoice?.used_cashback) {
            newTotalPrice -= invoice.used_cashback.amount
        }

        setTotalPrice(newTotalPrice);

    }, [invoice]);

    return (

        <>
            {isLoaded ? (
                <>
                    <h2 className="text-lg font-medium text-gray-900">สรุปรายการสั่งซื้อสินค้า</h2>
                    <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                        <dl className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {invoice?.orders?.[0]?.items.map((item: any) => (
                                        <li key={item?.id ?? ''} className="flex py-6">
                                            <div className="flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
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
                                {invoice.used_cashback && (
                                    <div className="flex items-center justify-between  pt-3">
                                        <dt className="text-sm text-gray-600">ส่วนลดเงินคืนสะสม (Cashback)</dt>
                                        <dd className="text-sm font-medium text-gray-900">- {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(invoice.used_cashback.amount) ?? '฿0.00'}</dd>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-between border-gray-200 pt-3">
                                <dt className="text-sm font-bold">ยอดรวมสุทธิ</dt>
                                <dd className="text-sm font-bold text-gray-900">
                                    {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(totalPrice) ?? '฿0.00'}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default PaymentPriceSummary;
