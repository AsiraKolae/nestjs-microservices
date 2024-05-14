"use client";
import { useInvoiceStore } from "@/app/store/InvoiceStore";
import { InvoiceProps, Order, OrderItem } from "@/app/types/invoice/interfaces";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoadingIndicator from "../LoadingIndicator";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const LoadingComponent = dynamic(
  () => import('../LoadingPage'),
  {
    loading: () => <LoadingIndicator />,
  }
);

const Invoice: React.FC<InvoiceProps> = ({ invoiceNumber }) => {

  const { invoice, showInvoice } = useInvoiceStore();
  const [subTotal, setSubTotal] = useState<number>(0.00);
  const [discount, setDiscount] = useState<number>(0.00);
  const [subTotalDiscount, setSubTotalDiscount] = useState<number>(0.00);
  const [vat, setVat] = useState<number>(0.00);
  const [total, setTotal] = useState<number>(0.00);

  const positionCall: string[] = ['แสน', 'หมื่น', 'พัน', 'ร้อย', 'สิบ', ''];
  const numberCall: string[] = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];

  const numberFormat = (value: number, decimalPlaces: number): string => {
    return value.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const readNumber = (num: number): string => {
    let ret: string = '';
    num += 0;

    if (num === 0) {
      return ret;
    }

    if (num > 1000000) {
      ret += readNumber(Math.floor(num / 1000000)) + 'ล้าน';
      num = Math.floor(num % 1000000);
    }

    let divider: number = 100000;
    let pos: number = 0;

    while (num > 0) {
      const d: number = Math.floor(num / divider);
      ret += divider === 10 && d === 2 ? 'ยี่' : (divider === 10 && d === 1 ? '' : (divider === 1 && d === 1 && ret !== '' ? 'เอ็ด' : numberCall[d]));
      ret += d ? positionCall[pos] : '';
      num %= divider;
      divider /= 10;
      pos++;
    }

    return ret;
  };

  const convert = (amountNumber: number): string => {
    if (amountNumber === 0) {
      return 'ศูนย์บาทถ้วน';
    }

    let amountString = amountNumber.toFixed(2).toString();
    const pt = amountString.indexOf('.');
    let number = '';
    let fraction = '';

    if (pt === -1) {
      number = amountString;
    } else {
      number = amountString.substring(0, pt);
      fraction = amountString.substring(pt + 1);
    }

    let ret = '';
    const baht = readNumber(Number(number));
    if (baht !== '') {
      ret += baht + 'บาท';
    }

    const satang = readNumber(Number(fraction));
    if (satang !== '') {
      ret += satang + 'สตางค์';
    } else {
      ret += 'ถ้วน';
    }

    return ret;
  };

  useEffect(() => {
    showInvoice(invoiceNumber);
  }, [invoiceNumber, showInvoice]);

  useEffect(() => {

    let tempSubTotal = 0;
    invoice?.orders?.forEach(order => {
      order.items.forEach(item => {
        let itemPrice = 0;
        switch (invoice.vat_type) {
          case "in-vat":
            itemPrice = item?.product?.product_attr?.price_ex_vat ?? 0;
            break;
          case "ex-vat":
            itemPrice = item?.product?.product_attr?.price ?? 0;
            break;
          default:
            itemPrice = 0;
            break;
        }
        tempSubTotal += item.amount * itemPrice;
      });
    });
    setSubTotal(tempSubTotal);
  }, [invoice]);

  useEffect(() => {
    const calculatedDiscount = (subTotal * invoice.discount) / 100 || 0.00;
    const calculatedSubTotalDiscount = subTotal - calculatedDiscount - (invoice.used_cashback?.amount ?? 0.00);
    const calculatedVat = (calculatedSubTotalDiscount * 7) / 100;
    const calculatedTotal = calculatedSubTotalDiscount + calculatedVat;

    setDiscount(calculatedDiscount);
    setSubTotalDiscount(calculatedSubTotalDiscount);
    setVat(calculatedVat);
    setTotal(calculatedTotal);

  }, [subTotal, invoice.discount]);

  return (
    <>
      {(Object.keys(invoice).length > 0) ? (
        <>
          <LoadingComponent />
          <div className="leading-6 mx-auto text-xs sm:text-base">
            <div className="my-5">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="align-top">
                      <div>
                        <p>
                          <span className="font-bold">วันที่: </span>
                          {invoice?.created_at ? new Date(invoice.created_at).toLocaleDateString('en-GB') : '-'}
                        </p>
                        <p>
                          <span className="font-bold">ครบกำหนด: </span>
                          {invoice?.payment_duedate ? new Date(invoice.payment_duedate).toLocaleDateString('en-GB') : '-'}
                        </p>
                      </div>
                    </td>
                    <td className="align-top">
                      <div className="text-right">
                        <p>
                          <span className="font-bold">เลขที่: </span>
                          {invoice?.invoice_number || '-'}
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="border-b my-3"></div>
              <table className="w-full my-5 overflow-hidden">
                <tbody>
                    <tr className="flex flex-wrap sm:flex-nowrap">
                      <td className="align-top w-full sm:w-1/2">
                        {invoice.orders?.map((orderData: Order, index: number) => {
                          return (
                            <div key={index}>
                              <p className="font-bold">ข้อมูลจัดส่ง:</p>
                              <p>{orderData.addresses?.name}</p>
                              <p>{orderData.addresses?.tel}</p>
                              <p>{orderData.addresses?.address}</p>
                              <p>เลขประจำตัวผู้เสียภาษี {invoice.user?.user_info?.tax_id}</p>
                            </div>
                          );
                        })}
                      </td>
                      <td className="align-top w-full sm:w-1/2 mt-5 sm:mt-0">
                        <div className="text-right">
                          <p className="font-bold">บริษัท โคโคนัท ซอฟต์ ครีเอชั่น จำกัด</p>
                          <p>8/1 ซอย 2 (แก้วสมิทธิ์) ตำบลหาดใหญ่</p>
                          <p>อำเภอหาดใหญ่ จังหวัดสงขลา 90110</p>
                          <p>เลขประจำตัวผู้เสียภาษี 0905565005959</p>
                          <p>manager@ccns-th.com</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
              </table>
              <div className="p-3 border border-solid border-gray-300 rounded-md shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="w-full divide-y divide-gray-300 overflow-hidden">
                  <thead>
                    <tr className="mx-5">
                      <td className="font-bold text-center">#</td>
                      <td colSpan={2} className="font-bold text-center">รายการ</td>
                      <td className="font-bold text-center">จำนวน</td>
                      <td className="font-bold text-center">ราคาต่อหน่วย</td>
                      <td className="font-bold text-center">มูลค่า</td>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.orders?.map((groupedItem: Order, index: number) => (
                      groupedItem?.items?.map((item: OrderItem, itemIndex: number) => (
                        <tr key={`${index}-${itemIndex}`}>
                          <td className="text-center">{itemIndex + 1}</td>
                          {/* รูป */}
                          <td className="text-center">
                            <div className="hidden sm:flex h-20 w-20">
                              <Image
                                src={(item && item.product && item.product.product_img && item.product.product_img.length > 0) ? Object.keys(item.product.product_img[0])[0] : "/image-coming-soon.jpeg"}
                                alt={`imgProduct ${itemIndex + 1}` || 'imgProduct'}
                                width={300}
                                height={300}
                                priority
                                sizes="100vw"
                                style={{
                                  width: '100%',
                                  height: 'auto',
                                }}
                                className="mx-auto"
                              />
                            </div>
                          </td>
                          {/* ชื่อสินค้า */}
                          <td>{item?.product?.name}</td>
                          {/* จำนวน */}
                          <td className="text-right">{item.amount}</td>
                          {/* ราคาต่อหน่วย */}
                          <td className="text-right">
                            {numberFormat(
                              invoice.vat_type === 'in-vat'
                                ? parseFloat((item && item.product && item.product.product_attr && item.product.product_attr.price_ex_vat) ? item.product.product_attr.price_ex_vat.toString() : '0')
                                : invoice.vat_type === 'ex-vat'
                                  ? parseFloat((item && item.product && item.product.product_attr && item.product.product_attr.price) ? item.product.product_attr.price.toString() : '0')
                                  : 0,
                              2
                            )}
                          </td>
                          {/* ราคารวม */}
                          <td className="text-right">
                            {numberFormat(
                              (invoice.vat_type === 'in-vat'
                                ? parseFloat((item && item.product && item.product.product_attr && item.product.product_attr.price_ex_vat) ? item.product.product_attr.price_ex_vat.toString() : '0')
                                : invoice.vat_type === 'ex-vat'
                                  ? parseFloat((item && item.product && item.product.product_attr && item.product.product_attr.price) ? item.product.product_attr.price.toString() : '0')
                                  : 0) * item.amount,
                              2
                            )}
                          </td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                  <tfoot className="text-xs sm:text-base">
                    <tr>
                      <td className="text-right font-semibold sm:font-bold" colSpan={5}>รวมเป็นเงิน:</td>
                      <td className="text-right">{numberFormat(subTotal, 2)}</td>
                    </tr>
                    <tr>
                      <td className="text-right font-semibold sm:font-bold" colSpan={5}>ส่วนลด ({Math.round(invoice.discount || 0)}%):</td>
                      <td className="text-right text-red-500 font-semibold sm:font-bold">{'- '}{numberFormat(discount, 2)}</td>
                    </tr>
                    <tr>
                      <td className="text-right font-semibold sm:font-bold" colSpan={5}>ส่วนลดเงินคืนสะสม (Cashback):</td>
                      <td className="text-right text-red-500 font-semibold sm:font-bold">
                        {'- ' + numberFormat(parseFloat(invoice.used_cashback?.amount ?? 0), 2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-right font-semibold sm:font-bold" colSpan={5}>ราคาหลังหักส่วนลด:</td>
                      <td className="text-right">{numberFormat(subTotalDiscount, 2)}</td>
                    </tr>
                    <tr>
                      <td className="text-right font-semibold sm:font-bold" colSpan={5}>VAT 7%:</td>
                      <td className="text-right">{numberFormat(vat, 2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="font-semibold sm:font-bold">
                        <p className="hidden sm:flex">
                          ({convert(total)})
                        </p>
                      </td>
                      <td className="text-right font-semibold sm:font-bold">จำนวนเงินรวมทั้งสิ้น:</td>
                      <td className="text-right">{numberFormat(total, 2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : <></>
      }
    </>
  );
};
export default Invoice;
