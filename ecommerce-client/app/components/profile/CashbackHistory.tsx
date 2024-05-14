"use client";
import React, { useEffect, useState } from "react";
import { useCashbackStore } from "@/app/store/CashbackStore";
import { CashbackParam } from "@/app/types/cashback/interfaces";
import { useSession } from "next-auth/react";
import { Tab } from "@/app/types/profile/interfaces";
import {
  CheckIcon,
  ChevronUpDownIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";
import { Combobox } from "@headlessui/react";
import Image from "next/image";

const CashbackHistory = () => {
  const { data: session, status } = useSession();
  const { fetchCashback, cashback, cashbackSummarize } = useCashbackStore();

  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, nameTH: "ทั้งหมด", nameEN: "All", current: true },
    { id: 2, nameTH: "ได้รับ", nameEN: "Recieved", current: false },
    { id: 3, nameTH: "ใช้แล้ว", nameEN: "Used", current: false },
  ]);
  const selectedTabName = tabs.find((tab) => tab.current)?.nameTH || "";

  const handleTabClick = (id: number, name: string) => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      current: tab.nameTH === name,
    }));
    setTabs(updatedTabs);
    var user_id = session?.user?.id;
    if (id === 1) {
      var param: Partial<CashbackParam> = {
        per_page: 10,
        page: 1,
        filters: {
          user_id: user_id,
        },
        sorted: {
          created_at: "desc",
        },
      };
    } else if (id === 2) {
      var param: Partial<CashbackParam> = {
        per_page: 10,
        page: 1,
        filters: {
          user_id: user_id,
          type: "recieved",
        },
        sorted: {
          created_at: "desc",
        },
      };
    } else {
      var param: Partial<CashbackParam> = {
        per_page: 10,
        page: 1,
        filters: {
          user_id: user_id,
          type: "used",
        },
        sorted: {
          created_at: "desc",
        },
      };
    }
    fetchCashback(param);
  };

  useEffect(() => {
    if (session) {
      const user_id = session?.user?.id;
      const paramSum: Partial<CashbackParam> = {
        per_page: 10,
        page: 1,
        filters: {
          summarize: 'all',
        },
      };
      fetchCashback(paramSum);
      const param: Partial<CashbackParam> = {
        per_page: 10,
        page: 1,
        filters: {
          user_id: user_id,
        },
        sorted: {
          created_at: "desc",
        },
      };
      fetchCashback(param);
    }
  }, [session]);

  console.log(cashback, cashbackSummarize);


  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <div className="space-y-5">
        <div>
          <div className="inline-flex items-center space-x-2">
            <CircleStackIcon className="h-6 w-6" />
            <h2 className="text-xl font-semibold leading-7 text-gray-900 py-4">
              ประวัติเครดิตเงินคืน
            </h2>
          </div>
          <div>
            <div className="relative flex items-center space-x-3 rounded-lg  bg-white px-6 py-5">
              <div className="min-w-0 flex-1">
                <h3 className="truncate sm:text-lg text-md font-medium text-right text-whereGreen">
                  เงินคืน  {cashbackSummarize?.totalAvailabelCashabck.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
                <h3 className="sm:text-sm text-xs font-medium text-right text-gray-500">
                  สิ้นสุด {cashbackSummarize.expireYear}
                </h3>
              </div>
            </div>
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
        {/* Cashback History */}
        {cashback.length > 0 ? (
          <>
            <ul role="list" className="divide-y divide-gray-200">
              {cashback.map((item: any, index: any) => (
                <li key={index} className="py-0.5">
                  <div className="flex w-full items-center justify-between space-x-3 p-6">
                    <Image
                      className="sm:w-10 sm:h-10 w-6 h-6"
                      src="/coin.png"
                      alt="Your Company"
                      width={30}
                      height={30}
                    />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        {item.type === "recieved" ? (
                          <h3 className="sm:text-sm text-xs font-medium text-gray-900">
                            คำสั่งซิ้อ {item?.orders}
                          </h3>
                        ) : (
                          <h3 className="sm:text-sm text-xs font-medium text-gray-900">
                            คำสั่งซิ้อ {item?.invoices}
                          </h3>
                        )}
                      </div>
                      <p className="mt-1 truncate sm:text-sm text-xs text-gray-600">
                        {new Date(item?.created_at).toLocaleString("th-TH")}
                      </p>
                    </div>
                    {item.type === "recieved" ? (
                      <div className="flex-1 truncate text-right">
                        <div className="items-center space-x-3">
                          {item?.is_expired === false ? (
                            <h1 className="truncate sm:text-lg text-md font-medium text-right text-whereGreen">
                              +{item?.amount.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </h1>
                          ) : (
                            <h1 className="truncate sm:text-lg text-md font-medium text-right text-gray-400">
                              +{item?.amount.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </h1>
                          )}
                        </div>
                        {item?.is_expired === false ? (
                          <p className="mt-1 truncate text-xs text-gray-500">
                            หมดอายุ{" "}
                            {new Date(item?.created_at).toLocaleDateString(
                              "th-TH"
                            )}
                          </p>
                        ) : (
                          <span className="inline-flex flex-shrink-0 items-center rounded-full bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                            หมดอายุแล้ว
                          </span>
                        )}
                      </div>
                    ) : item.type === "used" ? (
                      <h1 className="truncate sm:text-lg text-md font-medium text-gray-700">
                        -{item?.amount.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}


                      </h1>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div >
    </>
  );
};

export default CashbackHistory;
