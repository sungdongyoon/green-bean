import React from "react";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
  return (
    <header className="w-full bg-gray-200 flex justify-center">
      <div className="w-full max-w-[90%] flex items-center justify-between py-5">
        <p>Green Bean Market!</p>
        <div className="flex shrink-0 items-center gap-3">
          <HeaderSearch />
          <p className="text-[0.6rem] whitespace-nowrap">
            last updated : 2026.06.17 23:22:23
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
