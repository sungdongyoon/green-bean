import React, { Suspense } from "react";
import HeaderSearch from "./HeaderSearch";
import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full bg-gray-50 border-b border-gray-200 flex justify-center">
      <div className="w-full max-w-[90%] flex items-center justify-between py-7">
        <div>
          <Image
            src="/image/logo-full.png"
            alt="로고"
            width={200}
            height={50}
            className="h-8 w-auto"
          />
        </div>
        <div className="hidden md:flex shrink-0 gap-3">
          <Suspense fallback={null}>
            <HeaderSearch className="w-[400px] lg:w-[500px]" />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Header;
