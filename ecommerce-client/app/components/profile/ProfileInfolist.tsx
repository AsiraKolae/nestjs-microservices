"use client"
import React, { useState, useEffect } from "react";
import {
  IdentificationIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useManageAccountStore, useProfileInfoStore } from "@/app/store/ProfileStore";

const ProfileInfolist = (props: any) => {
  const { setProfileInfo, profileInfo, getProfileInfo } = useProfileInfoStore();
  const { setSelectedManageAccount } = useManageAccountStore();
  const initCategory = async () => {
    try {
      const result: any = await getProfileInfo();
      setProfileInfo(result.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    initCategory();
  }, []);

  return (
    <>
      <div>
        <div className="inline-flex items-center space-x-2">
          <IdentificationIcon className="h-6 w-6" />
          <h2 className="text-xl font-semibold leading-7 text-gray-900 py-4">
            ข้อมูลส่วนตัว
          </h2>
        </div>
        <div className="space-y-4 text-sm leading-6 bg-gray-50 py-5 px-10 rounded-lg">
          <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                จัดการข้อมูลส่วนตัว
              </h2>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <button
                onClick={() =>setSelectedManageAccount('จัดการข้อมูลส่วนตัว')}
                type="button"
                className="flex w-full items-end justify-end rounded-md text-sm font-normal text-gray-900 hover:text-coolGreen focus:outline-none sm:w-full sm:flex-grow-0"
              >
                <PencilSquareIcon className="h-6 w-6 mr-1" />
                แก้ไข
              </button>
            </div>
          </div>
          {/* ส่วน info */}
          <dl>
            <div className="sm:grid grid-flow-row-dense grid-cols-5 sm:gap-4 sm:px-0">
              <dt className="text-sm font-normal leading-6 text-gray-500">
                ชื่อ :
              </dt>
              <dd className="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-0 col-span-3">
              {profileInfo?.name}
              </dd>
            </div>
            <div className="sm:grid grid-flow-row-dense grid-cols-5 sm:gap-4 sm:px-0">
              <dt className="text-sm font-normal leading-6 text-gray-500">
                อีเมล :
              </dt>
              <dd className="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-0 col-span-3">
              {profileInfo?.email}
              </dd>
            </div>
            <div className="sm:grid grid-flow-row-dense grid-cols-5 sm:gap-4 sm:px-0">
              <dt className="text-sm font-normal leading-6 text-gray-500">
              เบอร์โทรศัพท์ :
              </dt>
              <dd className="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-0 col-span-3">
              {profileInfo?.user_info?.phone}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default ProfileInfolist;
