import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useAmountItemsStore } from "@/app/store/CartStore";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const MenuItems = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="mr-2">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button>
            <div className="flex flex-nowrap -mr-5">
              <UserIcon
                className="h-6 w-6 text-gray-900 mr-1"
                aria-hidden="true"
              />
              <p className="mr-1 hidden sm:block">{session?.user.name}</p>
            </div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  <div className="items-center px-4 py-2 block sm:hidden">
                    <span className="text-sm font-semibold">
                      {session?.user.name}
                    </span>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/profile"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      บัญชีของฉัน
                    </a>
                  )}
                </Menu.Item>
                <form method="POST" action="#">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="submit"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block w-full px-4 py-2 text-left text-sm"
                        )}
                      >
                        <Link
                          href="#"
                          onClick={() =>
                            signOut({ redirect: false }).then(() => {
                              useAmountItemsStore.setState(() => ({
                                amountItems: 0,
                              }));
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
                    )}
                  </Menu.Item>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default MenuItems;
