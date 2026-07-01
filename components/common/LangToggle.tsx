"use client";

import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const LangToggle = () => {
  const locale = useLocale();
  const router = useRouter();

  // 다국어
  const headerLang = useTranslations("Header");
  const countryLang = useTranslations("Country");

  const handleChangeLang = async (value: string) => {
    if (value !== "ko" && value !== "en") return;

    if (value === locale) return;

    await axios.post("/api/locale", { locale: value });

    router.refresh();
  };

  return (
    <Select value={locale} onValueChange={handleChangeLang}>
      <SelectTrigger className="border-0 cursor-pointer">
        <SelectValue />
      </SelectTrigger>

      <SelectContent position="popper">
        <SelectGroup className="**:data-[slot=select-item]:focus:bg-secondary">
          <SelectLabel>{headerLang("lang")}</SelectLabel>
          <SelectItem value="ko">KR</SelectItem>
          <SelectItem value="en">EN</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LangToggle;
