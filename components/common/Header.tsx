"use client";

import React, { Suspense } from "react";
import HeaderSearch from "./HeaderSearch";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaRegHeart, FaRegMoon } from "react-icons/fa";

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <header className="w-full bg-gray-50 border-b border-gray-200 flex justify-center">
      <div className="w-full max-w-7xl flex items-center justify-between py-5 px-3">
        <div>
          <Image
            src="/image/logo-full.png"
            alt="로고"
            width={200}
            height={50}
            className="h-8 w-auto"
          />
        </div>
        <div className="hidden md:flex items-center shrink-0 gap-3">
          <Suspense fallback={null}>
            {pathName === "/" && (
              <HeaderSearch className="w-[300px] lg:w-[400px]" />
            )}
          </Suspense>
          <div
            className="cursor-pointer"
            onClick={() => router.push("/favorites")}
          >
            <FaRegHeart className="text-[1.2rem]" />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => router.push("/favorites")}
          >
            <FaRegMoon className="text-[1.2rem]" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
