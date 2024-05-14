"use client";

import React, { useState } from "react";
import { useAboutStore } from "@/app/store/AboutStore";

const Aboutbutton = () => {
  const { setAboutData, aboutData } = useAboutStore();

  return (
    <>
      <div className="about-menutap">
        <div className="list-group space-y-3">
        <div className="cursor-pointer">
          <a
            className={`text-gray-700 transition-colors duration-300 ease-in-out hover:text-someGreen ${
              aboutData === "ติดต่อเรา" ? "text-someGreen" : ""
            }`}
            onClick={() => {
              setAboutData("ติดต่อเรา");
            }}
          >
            ติดต่อเรา
          </a>
        </div>
          <div className="cursor-pointer">
            <a
              className={`text-gray-700 transition-colors duration-300 ease-in-out hover:text-someGreen ${
                aboutData === "เกี่ยวกับ โคโคนัท ซอฟต์" ? "text-someGreen" : ""
              }`}
              onClick={() => {
                setAboutData("เกี่ยวกับ โคโคนัท ซอฟต์");
              }}
            >
              เกี่ยวกับ โคโคนัท ซอฟต์
            </a>
          </div>
          <div className="cursor-pointer">
            <a
              className={`text-gray-700 transition-colors duration-300 ease-in-out  hover:text-someGreen ${
                aboutData === "ข้อกำหนดและเงื่อนไข" ? "text-someGreen" : ""
              }`}
              onClick={() => {
                setAboutData("ข้อกำหนดและเงื่อนไข");
              }}
            >
              ข้อกำหนดและเงื่อนไข
            </a>
          </div>
          <div className="cursor-pointer">
            <a
              className={`text-gray-700 transition-colors duration-300 ease-in-out hover:text-someGreen ${
                aboutData === "การจัดส่งสินค้า" ? "text-someGreen" : ""
              }`}
              onClick={() => {
                setAboutData("การจัดส่งสินค้า");
            }}
            >
              การจัดส่งสินค้า
            </a>
          </div>
          <div className="cursor-pointer">
            <a
              className={`text-gray-700 transition-colors duration-300 ease-in-out hover:text-someGreen ${
                aboutData === "การคืนสินค้า" ? "text-someGreen" : ""
              }`} 
              onClick={() => {
                setAboutData("การคืนสินค้า");
              }}
            >
              การคืนสินค้า
            </a>
          </div>
          <div className="cursor-pointer">
            <a
              className={`text-gray-700 transition-colors duration-300 ease-in-out hover:text-someGreen ${
                aboutData === "การคืนเงิน" ? "text-someGreen" : ""
              }`}
              onClick={() => {
                setAboutData("การคืนเงิน")
              }}
            >
              การคืนเงิน
            </a>
          </div>
          <div className="cursor-pointer">
            <a
              className={`text-gray-700 transition-colors duration-300 ease-in-out hover:text-someGreen ${
                aboutData === 'การยกเลิกรายการสั่งซื้อสินค้า' ? "text-someGreen" : ""
              }`}
              onClick={() => {
                setAboutData("การยกเลิกรายการสั่งซื้อสินค้า");
              }}
            >
              การยกเลิกรายการสั่งซื้อสินค้า
            </a>
          </div>
          <div className="cursor-pointer">
            <a
              className={`text-gray-700 transition-colors duration-300 ease-in-out hover:text-someGreen ${
                aboutData === "นโยบายความเป็นส่วนตัว" ? "text-someGreen" : ""
              }`}
              onClick={() => {
                setAboutData("นโยบายความเป็นส่วนตัว");
              }}
            >
              นโยบายความเป็นส่วนตัว
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Aboutbutton;
