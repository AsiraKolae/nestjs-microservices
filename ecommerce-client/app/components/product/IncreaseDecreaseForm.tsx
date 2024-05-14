"use client";

import { useProductAmountStore } from "@/app/store/CartStore";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import LoadingIndicator from "../LoadingIndicator";

const IncreaseDecreaseForm = () => {
  const [counter, setCounter] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const setAmount = useProductAmountStore((state) => state.setAmount)

  const handleIncrement = (e:any) => {
    e.preventDefault();
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleDecrement = (e:any) => {
    e.preventDefault();
    setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
  };

  const handleChange = (e:any) => {
    const inputValue = parseInt(e.target.value, 10) || 0;
    setCounter(inputValue);
  };

  useEffect(() => {
    setAmount(counter)
    setIsLoaded(true);
  }, [counter])

  return (
    <>
      {isLoaded ? (
        <form className="mt-6">
          <div>
            <h3 className="text-sm text-gray-500">จำนวน</h3>
            <div className="flex items-center ">
              <div className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none">
                <button onClick={handleDecrement}>
                  <MinusIcon
                    className="mt-3 mr-2 h-6 w-6 flex-none text-gray-500"
                    aria-hidden="true"
                  />
                </button>
                <div className="mt-4">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-24 rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6"
                    placeholder="1"
                    value={counter}
                    onChange={handleChange}
                  />
                </div>
                <button onClick={handleIncrement}>
                  <PlusIcon
                    className="mt-3 ml-2 h-6 w-6 flex-none text-gray-500"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
};

export default IncreaseDecreaseForm;
