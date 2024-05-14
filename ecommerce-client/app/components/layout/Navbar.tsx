"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
import MainCategories from "./MainCategories";
import { Categories } from "./interfaces";
import SubCategories from "./SubCategories";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import MenuItems from "./MenuItems";
import getCategories from "@/app/api/util/navbar/route";
import Language from "./Language";
import Cart from "./Cart";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [categoryState, setCategoryState] = useState<Categories[]>([]);

  const initCategory = async () => {
    try {
      const result = await getCategories();
      setCategoryState(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    initCategory();
  }, []);

  const [activeContent, setActiveContent] = useState(0);

  const setActiveContentOnHover = (id: number) => {
    setActiveContent(id);
  };

  const { data: session, status } = useSession();

  return (
    <Popover className="isolate z-50 shadow sticky top-0">
      {({ open }) => (
        <>
          <div className="bg-gradient-to-r from-whereGreen to-someGreen py-1 border-0 border-b border-whereGreen">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row">
                  <PhoneIcon
                    className="h-4 w-4 text-white mt-1"
                    aria-hidden="true"
                  />
                  <p className="ml-1 mt-1 text-xs text-white">
                    ติดต่อเรา : manager@ccns-th.com
                  </p>
                </div>
                {/* <div className="flex flex-row">
                  <div className="mr-1 mt-1 ">
                    <Image
                      className="w-auto rounded-full"
                      src="/flag-TH.jpg"
                      alt="Your Company"
                      width={5}
                      height={55}
                    />
                  </div>
                  <Language />
                </div> */}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 py-5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row">
                  <div>
                    <Popover.Button className="inline-flex items-center py-4 gap-x-1 text-sm font-semibold leading-6 hover:text-gray-500 text-gray-900 outline-none">
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                      )}
                    </Popover.Button>
                  </div>
                  <div className="ml-4 cursor-pointer">
                    <a href="/">
                      <Image
                        className="w-auto"
                        src="/coconutsoft.png"
                        alt="Your Company"
                        width={50}
                        height={50}
                      />
                    </a>
                  </div>
                </div>
                {/* Search */}
                {/* <div className="hidden sm:block">
                  <div className="w-full max-w-lg lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coolGreen sm:text-sm sm:leading-6 focus:outline-none"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
                </div> */}
                <div className="flex flex-row">
                  <div className="mr-2 flex flex-nowrap">
                    {session?.user && status == "authenticated" && (
                      <>
                        <MenuItems />
                      </>
                    )}
                    {session === null && (
                      <>
                        <div className="mr-1">
                          <UserIcon
                            className="h-6 w-6 text-gray-900 "
                            aria-hidden="true"
                          />
                        </div>
                        <Link
                          href="#"
                          onClick={() => signIn()}
                          className="text-sm font-semibold leading-6 text-gray-900 mr-2"
                        >
                          เข้าสู่ระบบ
                        </Link>
                      </>
                    )}
                  </div>
                  <Cart />
                </div>
              </div>
            </div>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            <Popover.Panel className="absolute inset-x-0 top-0 -z-10 bg-gray-50 pt-16 shadow-lg ring-1 ring-gray-900/5">
              <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 py-10 lg:grid-cols-2 lg:px-8 mt-10">
                <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8">
                  <div>
                    {/* <h3 className="text-sm font-medium leading-6 text-gray-500">
                      Engagement
                    </h3> */}
                    <div className="mt-6 flow-root">
                      <div className="-my-2">
                        {/* <CategoryList categories={categoryState}/> */}
                        <MainCategories
                          categories={categoryState}
                          setActiveContentOnHover={setActiveContentOnHover}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* <h3 className="text-sm font-medium leading-6 text-gray-500">
                      Resources
                    </h3> */}
                    <div className="mt-6 flow-root">
                      <div className="-my-2">
                        <SubCategories
                          categories={categoryState}
                          activeContent={activeContent}
                        />
                        {/* {categoryState.map((item) =>
                          
                          item.children_category &&
                          item.children_category.length > 0
                            ? item.children_category.map((child: any) => (
                                <a
                                  key={child.id}
                                  href={child.name}
                                  className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-neutral-50 rounded-md"
                                >
                                  <ChevronRightIcon
                                    className="h-6 w-6 flex-none text-gray-400"
                                    aria-hidden="true"
                                  />
                                  {child.name}
                                </a>
                              ))
                            : null
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-2">
                  <h3 className="sr-only">Recent posts</h3>
                  {/* {recentPosts.map((post) => (
                <article
                  key={post.id}
                  className="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
                >
                  <div className="relative flex-none">
                    <img
                      className="aspect-[2/1] w-full rounded-lg bg-gray-100 object-cover sm:aspect-[16/9] sm:h-32 lg:h-auto"
                      src={post.imageUrl}
                      alt=""
                    />
                    <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-x-4">
                      <time dateTime={post.datetime} className="text-sm leading-6 text-gray-600">
                        {post.date}
                      </time>
                      <a
                        href={post.category.href}
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {post.category.title}
                      </a>
                    </div>
                    <h4 className="mt-2 text-sm font-semibold leading-6 text-gray-900">
                      <a href={post.href}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{post.description}</p>
                  </div>
                </article>
              ))} */}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Navbar;
