"use client";
import { useEffect, useState } from "react";
import { CircleStackIcon, TruckIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import MenuProfile from "../components/profile/MenuProfile";
import PersonalDetail from "../components/profile/PersonalDetail";
import {
  IdentificationIcon,
  KeyIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import ChangePassword from "../components/profile/ChangePassword";
import AccountOverview from "../components/profile/AccountOverview";
import { useManageAccountStore } from "../store/ProfileStore";
import OrderHistory from "../components/profile/OrderHistory";
import ManageAddress from "../components/profile/ManageAddress";
import CashbackHistory from "../components/profile/CashbackHistory";
import LoadingIndicator from "../components/LoadingIndicator";
import dynamic from "next/dynamic";


function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const menus = [
  // จัดการบัญชีผู้ใช้
  {
    name: "ข้อมูลส่วนตัว",
    group: "จัดการบัญชีผู้ใช้",
    href: "#",
    icon: IdentificationIcon,
    component: <AccountOverview />,
  },
  {
    name: "จัดการข้อมูลส่วนตัว",
    group: "จัดการบัญชีผู้ใช้",
    href: "#",
    icon: UserCircleIcon,
    component: <PersonalDetail/>,
  },
  {
    name: "จัดการที่อยู่จัดส่ง",
    group: "จัดการบัญชีผู้ใช้",
    href: "#",
    icon: MapPinIcon,
    component: <ManageAddress/>,
  },
  {
    name: "เปลี่ยนรหัสผ่าน",
    group: "จัดการบัญชีผู้ใช้",
    href: "#",
    icon: KeyIcon,
    component: <ChangePassword/>,
  },

  // รายการคำสั่งซื้อ
  {
    name: "รายการคำสั่งซื้อ",
    group: "รายการคำสั่งซื้อ",
    href: "#",
    icon: TruckIcon,
    component: <OrderHistory/>,
  },

  {
    name: "เครดิตเงินคืน",
    group: "เครดิตเงินคืน",
    href: "#",
    icon: CircleStackIcon,
    component: <CashbackHistory/>,
  },
];

const LoadingComponent = dynamic(
  () => import('../components/LoadingPage'),
  {
    loading: () => <LoadingIndicator />,
  }
);
export default function Profile() {
  const { selectedManageAccount, setSelectedManageAccount } = useManageAccountStore();

  return (
    <>
      <div className="mx-auto max-w-5xl lg:flex lg:gap-x-16 lg:px-8">
        <h1 className="sr-only">General Settings</h1>
        {/* ส่วนเมนูจัดการโปรไฟล์ */}
        <MenuProfile
          menus={menus}
          selectedManageAccount={selectedManageAccount}
          setSelectedManageAccount={setSelectedManageAccount}
        />

        {/* ส่วนจัดการโปรไฟล์ */}
        <main className="px-4 py-6 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
          <div className="mx-auto max-w-2xl space-y-4 sm:space-y-4 lg:mx-0 lg:max-w-none">
            {menus.find((menu) => menu.name === selectedManageAccount)?.component }
          </div>
        </main>
      </div>
      <LoadingComponent />
    </>
  );
}
