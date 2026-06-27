"use client";

import React, { Suspense } from "react";
import HeaderSearch from "./HeaderSearch";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
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
            <HeaderSearch className="w-[400px] lg:w-[500px]" />
          </Suspense>
          <div
            className="cursor-pointer"
            onClick={() => router.push("/favorites")}
          >
            <FaRegHeart className="text-[1.4rem]" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
