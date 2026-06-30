"use client";

import { type FormEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

const HeaderSearch = ({ className }: { className: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 다국어
  const headerLang = useTranslations("Header");

  const [keyword, setKeyword] = useState(
    () => searchParams.get("keyword") ?? "",
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    const value = keyword.trim();

    if (value) {
      params.set("keyword", value);
    } else {
      params.delete("keyword");
    }

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <form onSubmit={handleSubmit} className={`${className} flex gap-1`}>
      <Input
        id="search"
        type="search"
        placeholder={headerLang("input")}
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        className="w-full min-w-0 bg-white"
      />
      <Button
        type="submit"
        variant="outline"
        className="bg-accent text-white border-0 hover:bg-accent/80 hover:text-muted"
      >
        {headerLang("search")}
      </Button>
    </form>
  );
};

export default HeaderSearch;
