"use client";
import React from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { useManageAccountStore } from "@/app/store/ProfileStore";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAmountItemsStore } from '@/app/store/CartStore';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface GroupedItem<T> {
  name: string;
  items: T[]; //typeof items[0]
}

// group by return array with key is group name
function groupBy<T>(
  arr: T[],
  keyGetter: (item: T) => string
): GroupedItem<T>[] {
  const map = new Map<string, T[]>();
  arr.forEach((item) => {
    const key = keyGetter(item);
    const group = map.get(key);
    if (!group) {
      map.set(key, [item]);
    } else {
      group.push(item);
    }
  });

  const result: GroupedItem<T>[] = [];
  map.forEach((value, key) => {
    result.push({ name: key, items: value });
  });

  return result;
}

const MenuProfile = (props: any) => {
  const { menus } = props;
  const { setSelectedManageAccount, selectedManageAccount } =
    useManageAccountStore();
  // Grouping by 'group'
  const groupedMenus = groupBy(menus, (menu: any) => menu.group);
  const { data: session, status } = useSession();
  return (
    <>
      {/* Mobile */}
      <Popover className="lg:hidden relative p-4 bg-gray-200">
        <Popover.Button className="inline-flex w-full justify-center items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus:outline-none">
          <span>จัดการบัญชี</span>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
            {({close}) => (
            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
              <div className="p-5">
                {groupedMenus.map((group: any, key: any) => (
                  <div key={key}>
                    <p>{group.name}</p>
                    {group.items.map((item: any, key: any) => (
                      <div
                        key={key}
                        className="group items-center relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon
                            className="h-6 w-6 text-gray-600 group-hover:text-coolGreen"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              setSelectedManageAccount(item.name)
                              close()
                            }}
                            className="font-semibold text-gray-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
      {/* Desktop */}
      <aside className="hidden overflow-x-auto py-4 lg:block lg:w-64 lg:flex-none lg:py-20">
        <nav className="flex-none px-4 sm:px-6 lg:px-0 divide-y">
          {groupedMenus.map((group: any, key: any) => (
            <div key={key} className="py-4">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                {group.name}
              </h2>
              <ul
                role="list"
                className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
              >
                {group.items.map((item: any) => (
                  <li key={item.name}>
                    <button
                      onClick={() => setSelectedManageAccount(item.name)}
                      className={classNames(
                        selectedManageAccount === item.name
                          ? "text-coolGreen"
                          : "text-gray-700 hover:text-coolGreen",
                        "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          selectedManageAccount === item.name
                            ? "text-coolGreen"
                            : "text-gray-400 group-hover:text-coolGreen",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col mb-3">
            <button type="submit" className="mt-3 cursor-pointer group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold text-gray-700 hover:text-coolGreen">
              <LockOpenIcon
                className="text-gray-400 group-hover:text-coolGreen h-6 w-6 shrink-0"
                aria-hidden="true"
              />
              <Link
                href="#"
                onClick={() =>
                  signOut({ redirect: false }).then(() => {
                    useAmountItemsStore.setState(() => ({ amountItems: 0 }));
                    toast.success("ออกจากระบบสำเร็จ", {
                      position: "top-center",
                      autoClose: 1500,
                      onClose: async () => {
                        window.location.href = "/";
                      },
                    });
                  })
                }
                className="text-sm font-semibold leading-6 text-gray-900 mr-2"
              >
                ออกจากระบบ
              </Link>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default MenuProfile;
