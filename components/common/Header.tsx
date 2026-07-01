"use client";

import React, { Suspense } from "react";
import HeaderSearch from "./HeaderSearch";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaRegHeart, FaRegMoon } from "react-icons/fa";
import LangToggle from "./LangToggle";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { LucideHeart } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <header className="w-full bg-third flex justify-center">
      <div className="w-full max-w-7xl flex items-center justify-between py-5 px-3">
        <Link href="/" aria-label="홈으로 이동">
          <Image
            src="/image/logo-full.png"
            alt="로고"
            width={200}
            height={50}
            className="h-8 w-auto"
          />
        </Link>
        <div className="hidden md:flex items-center shrink-0 gap-10">
          <Suspense fallback={null}>
            {pathName === "/" && (
              <HeaderSearch className="w-[300px] lg:w-[400px]" />
            )}
          </Suspense>
          <div className="flex items-center">
            <div
              className="cursor-pointer mr-3"
              onClick={() => router.push("/favorites")}
            >
              <LucideHeart className="size-5" />
            </div>
            <ModeToggle />
            <LangToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
