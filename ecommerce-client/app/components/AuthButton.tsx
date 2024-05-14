"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";

const AuthButton = () => {
  const { data: session, status } = useSession();

  return (
    <div className="ml-auto flex gap-2">
      {session?.user && (status == "authenticated") && (
        <>
          <Link href="#" onClick={() => signOut({ redirect: false }).then(() => {
              toast.success('ออกจากระบบสำเร็จ', {
              position: "top-center",
              autoClose: 1500,
              onClose: async () => {
                  window.location.href = '/'
              },
          });
          })} className="text-sm font-semibold leading-6 text-gray-900">
            Log out <span aria-hidden="true">&rarr;</span>
          </Link>
        </>
      )}
      {session === null && (
        <>
          <Link href="#" onClick={() => signIn()} className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButton;