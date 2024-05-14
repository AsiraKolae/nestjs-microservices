"use client";

import { useOrderStore } from "@/app/store/OrderStore";
import {
  Order,
  OrderParam,
  OrderResponse,
  fetchOrder,
} from "@/app/types/order/interfaces";
import { Tab } from "@/app/types/profile/interfaces";
import {
  ArrowPathIcon,
  CheckIcon,
  ChevronUpDownIcon,
  ClockIcon,
  DocumentTextIcon,
  TruckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button, Chip } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Pagination } from "../Pagination";
import { Combobox } from "@headlessui/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function OrderHistory() {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 1,
      nameTH: "คำสั่งซื้อทั้งหมด",
      nameEN: "All my order history",
      current: true,
    },
    { id: 2, nameTH: "ที่ต้องชำระ", nameEN: "To Pay", current: false },
    { id: 3, nameTH: "จัดส่งแล้ว", nameEN: "Completed", current: false },
  ]);

  const { OrderParam, fetchOrder, updateOrderParam, orders, setOrderParam } =
    useOrderStore();

  const handleTabClick = (id: number, name: string) => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      current: tab.nameTH === name,
    }));
    setTabs(updatedTabs);
    if (id === 1) {
      const param: OrderParam = {
        per_page: 5,
        page: 1,
        sorted: {
          created_at: "desc",
        },
      };
      setOrderParam(param);
    } else if (id === 2) {
      const param: OrderParam = {
        per_page: 5,
        page: 1,
        filters: {
          status: "pending",
        },
        sorted: {
          created_at: "desc",
        },
      };
      updateOrderParam(param);
    } else {
      const param: OrderParam = {
        per_page: 5,
        page: 1,
        filters: {
          status: "success",
        },
        sorted: {
          created_at: "desc",
        },
      };
      updateOrderParam(param);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    const param: OrderParam = {
      per_page: OrderParam?.per_page,
      page: pageNumber,
      sorted: {
        created_at: "desc",
      },
    };

    if (OrderParam?.filters) {
      param.filters = {
        status: OrderParam?.filters.staus,
      };
    }
    setOrderParam(param);
  };

  const selectedTabName = tabs.find((tab) => tab.current)?.nameTH || "";
  const selectedTabId = tabs.find((tab) => tab.current)?.id || "";

  useEffect(() => {
    if (Object.keys(OrderParam).length > 0) {
      fetchOrder(OrderParam);
    }
  }, [OrderParam]);
  
  return (
    <>
      <div className="space-y-5">
        {/* Tab */}
        <div>
          <div className="inline-flex items-center space-x-2">
            <TruckIcon className="h-6 w-6" />
            <h2 className="text-xl font-semibold leading-7 text-gray-900 py-4">
              รายการคำสั่งซื้อ
            </h2>
          </div>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
             เลือก
            </label>

            <Combobox as="div" value={selectedTabName}>
              <div className="relative mt-2">
                <Combobox.Input
                  className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                  displayValue={selectedTabName}
                  readOnly
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
                {tabs.length > 0 && (
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {tabs.map((tab) => (
                      <Combobox.Option
                        key={tab.id}
                        value={tab}
                        className={({ active }) =>
                          classNames(
                            "relative cursor-default select-none py-2 pl-3 pr-9",
                            active ? "bg-gray-600 text-white" : "text-gray-900"
                          )
                        }
                        onClick={(e) => handleTabClick(tab.id, tab.nameTH)}
                      >
                        {({ active, selected }) => (
                          <>
                            <span
                              className={classNames(
                                "block truncate",
                                selected && "font-semibold"
                              )}
                            >
                              {tab.nameTH}
                            </span>

                            {selected && (
                              <span
                                className={classNames(
                                  "absolute inset-y-0 right-0 flex items-center pr-4",
                                  active ? "text-white" : "text-gray-400"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
              </div>
            </Combobox>
          </div>
          <div className="hidden sm:block">
            <div className="flex justify-center px-10 bg-gray-100/30 rounded-lg">
              <nav className="flex space-x-10" aria-label="Tabs">
                {tabs.map((tab) => (
                  <a
                    key={tab.nameTH}
                    className={classNames(
                      tab.current
                        ? "border-coolGreen text-coolGreen"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-400",
                      "whitespace-nowrap border-b-2 pt-4 pb-3 px-1 mb-5 text-md font-medium cursor-pointer"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                    onClick={(e) => handleTabClick(tab.id, tab.nameTH)}
                  >
                    <div className="flex-auto">{tab.nameTH}</div>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        {/* Order History */}
        <div className="bg-white">
          {Object.keys(orders).length > 0 ? (
            <>
              <div>
                <table className="w-full text-gray-500">
                  <caption className="sr-only">Products</caption>
                  <thead className="sr-only text-sm text-gray-500 sm:not-sr-only">
                    <tr>
                      <th
                        scope="col"
                        className="text-left font-normal sm:w-2/5 lg:w-1/3"
                      >
                        หมายเลขคำสั่งซื้อ
                      </th>
                      <th
                        scope="col"
                        className="text-center font-normal sm:table-cell"
                      >
                        สถานะ
                      </th>
                      <th scope="col" className="font-normal"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                    {orders?.data?.map(
                      (fetchOrder: fetchOrder, idx: number) => (
                        <>
                          <tr key={fetchOrder.id}>
                            <td className="py-3">
                              <div className="flex items-center">
                                <div>
                                  <div className="mt-1 sm:hidden">
                                    หมายเลขคำสั่งซื้อ
                                  </div>
                                  <div className="font-medium text-gray-900">
                                    {fetchOrder.order_number}
                                  </div>

                                  <div className="sm:hidden pr-10">
                                    <Chip
                                      color={
                                        fetchOrder?.status === "pending"
                                          ? "amber"
                                          : fetchOrder?.status === "success"
                                            ? "green"
                                            : fetchOrder?.status === "processing"
                                              ? "cyan"
                                              : "red"
                                      }
                                      size="sm"
                                      value={
                                        fetchOrder?.status === "pending"
                                          ? "รอดำเนินการ"
                                          : fetchOrder?.status === "success"
                                            ? "จัดส่งแล้ว"
                                            : fetchOrder?.status === "processing"
                                              ? "กำลังดำเนินการ"
                                              : "ยกเลิก"
                                      }
                                      className="mt-1 text-center text-xs rounded-md"
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 hidden sm:table-cell">
                              <div className="flex justify-center items-center">
                                <Chip
                                  color={
                                    fetchOrder?.status === "pending"
                                      ? "amber"
                                      : fetchOrder?.status === "success"
                                        ? "green"
                                        : fetchOrder?.status === "processing"
                                          ? "cyan"
                                          : "red"
                                  }
                                  size="lg"
                                  value={
                                    fetchOrder?.status === "pending"
                                      ? "รอดำเนินการ"
                                      : fetchOrder?.status === "success"
                                        ? "จัดส่งแล้ว"
                                        : fetchOrder?.status === "processing"
                                          ? "กำลังดำเนินการ"
                                          : "ยกเลิก"
                                  }
                                  className="text-center text-xs rounded-md px-3"
                                  icon={
                                    fetchOrder?.status === "pending" ? (
                                      <ClockIcon className="h-4 w-4 mt-1"/>
                                    ) : fetchOrder?.status === "success" ? (
                                      <CheckIcon className="h-4 w-4 mt-1"/>
                                    ) : fetchOrder?.status === "processing" ? (
                                      <ArrowPathIcon className="h-4 w-4 mt-1"/>
                                    ) : (
                                      <XMarkIcon className="h-4 w-4 mt-1"/>
                                    )
                                  }
                                />
                              </div>
                            </td>
                            <td className="py-3 whitespace-nowrap text-center font-medium">
                              <div className="grid grid-cols-2 gap-4 justify-items-center">
                                <div>
                                  <a
                                    target="_blank"
                                    title="ดูเพิ่มเติม"
                                    href={
                                      fetchOrder.invoice_number
                                        ? `/profile/invoice/${fetchOrder.invoice_number}`
                                        : "#"
                                    }
                                    className="text-gray-700 hover:text-gray-500 cursor-pointer"
                                  >
                                    {fetchOrder.invoice_number && (
                                      <>
                                        <DocumentTextIcon className="h-5 w-5" />
                                        <span>INV</span>
                                      </>
                                    )}
                                  </a>
                                </div>
                                <div>
                                  {fetchOrder.status === "success" &&
                                    selectedTabId === 1 ? ( // กรณีเป็นสถานะ success จะแสดงปุ่มสามารถดูสถานะการจัดส่ง
                                    fetchOrder.tracking_number && (
                                      <a
                                        href={
                                          fetchOrder?.tracking_number
                                            ? fetchOrder.shipping_url +
                                            fetchOrder.tracking_number
                                            : "#"
                                        }
                                        className="text-coolGreen"
                                      >
                                        <Button
                                          placeholder="Tracking Number"
                                          title="ติดตามสถานะจัดส่ง"
                                          className=""
                                        >
                                          {fetchOrder.tracking_number}
                                        </Button>
                                      </a>
                                    )
                                  ) : fetchOrder.status === "processing" &&
                                    (selectedTabId === 2 ||
                                      selectedTabId === 1) ? ( // กรณีเป็นสถานะ processing จะแสดงปุ่มชำระเงิน
                                    <a
                                      href={
                                        fetchOrder.invoice_number
                                          ? `/payment/${fetchOrder.invoice_number}`
                                          : "#"
                                      }
                                      className="text-coolGreen"
                                    >
                                      <Button placeholder="Payment">
                                        กดชำระเงิน
                                      </Button>
                                    </a>
                                  ) : fetchOrder.status === "success" &&
                                    selectedTabId === 3 ? ( // กรณีเป็นสถานะ success จะแสดงปุ่มสามารถดูสถานะการจัดส่ง
                                    fetchOrder.tracking_number && (
                                      <a
                                        href={
                                          fetchOrder?.tracking_number
                                            ? fetchOrder.shipping_url +
                                            fetchOrder.tracking_number
                                            : "#"
                                        }
                                        className="text-coolGreen"
                                      >
                                        <Button
                                          placeholder="Tracking Number"
                                          title="ติดตามสถานะจัดส่ง"
                                          className=""
                                        >
                                          {fetchOrder.tracking_number}
                                        </Button>
                                      </a>
                                    )
                                  ) : null}
                                </div>
                              </div>
                            </td>
                          </tr>
                        </>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}
        </div>
        {Object.keys(orders).length > 0 ? (
          <div className="py-3">
            <Pagination
              active={parseInt(JSON.stringify(OrderParam.page))}
              total={parseInt(JSON.stringify(orders?.meta.last_page))}
              onClick={handlePageChange}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
