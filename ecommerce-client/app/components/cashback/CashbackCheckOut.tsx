"use client";
import { useCashbackStore } from "@/app/store/CashbackStore";
import { CashbackParam } from "@/app/types/cashback/interfaces";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const CashbackCheckOut = () => {
  const { data: session, status } = useSession();  
  const { fetchCashback, cashback, setExchangeCashback } = useCashbackStore();
  const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 0) {
      value = 0;
    } else if (cashback.totalAvailabelCashabck && value > cashback.totalAvailabelCashabck) {
      value = cashback.totalAvailabelCashabck;
    }
    e.target.value = value.toString();
    setExchangeCashback(parseInt(value.toString()))
  };

  useEffect(() => {
    if(session){
      const param: Partial<CashbackParam> = {
        filters: {
          'summarize': "all",
        }
      };
      fetchCashback(param)
    }
  }, [session]);
  
  return (
    <>
      {session?.user?.user_role == "employee" && status == "authenticated" && (
        <>
          <h2 className="text-lg font-medium text-gray-900">
            Cashback (เครดิตเงินคืน)
          </h2>
          <div className="mt-4 mb-5 rounded-lg border border-gray-200 bg-white shadow-sm">
            <dl className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex items-center justify-between pt-3">
                <dt className="text-sm text-gray-600">
                  เครดิตเงินคืนที่สามารถใช้ได้
                </dt>
                <dd className="text-sm font-medium text-yellow-800">
                  {cashback?.totalAvailabelCashabck?.toLocaleString("th-TH",{ minimumFractionDigits: 2, maximumFractionDigits: 2}) ?? 0} &copy;
                </dd>
              </div>
              <div className="flex items-center justify-between pt-3">
                <dt className="text-sm text-gray-600">
                  ต้องการแลกเครดิตเงินคืน
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      type="text"
                      name="cashback"
                      id="cashback"
                      className="block w-32 rounded-md border-0 py-0.5 pl-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                      placeholder="0"
                      step={1}
                      min={0}
                      max={cashback?.totalAvailabelCashabck}
                      pattern="[0-9]*"
                      disabled={
                        (cashback?.totalAvailabelCashabck ?? 0) > 0 ? false : true
                      }
                      onChange={validateInput}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span
                        className="mr-2 text-gray-500 sm:text-sm"
                        id="price-currency"
                      >
                        &copy;
                      </span>
                    </div>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </>
      )}
    </>
  );
};

export default CashbackCheckOut;
