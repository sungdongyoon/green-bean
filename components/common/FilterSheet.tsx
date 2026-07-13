"use client";

import * as React from "react";
import { toast } from "sonner";

import { useIsMobile } from "@/hooks/use-mobile";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import BeanFilter from "../home/BeanFilter";
import { useTranslations } from "next-intl";

export function FilterSheet({ table }: { table: any }) {
  const [open, setOpen] = React.useState(false);

  // 모바일 구분
  const isMobile = useIsMobile();

  // 다국어
  const filterSheetLang = useTranslations("FilterSheet");

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerTrigger asChild>
        <Button
          variant="default"
          className="fixed bottom-5 left-4 right-4 z-10 text-white opacity-70"
        >
          {filterSheetLang("trigger")}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-none">
        <DrawerHeader>
          <DrawerTitle>{filterSheetLang("title")}</DrawerTitle>
        </DrawerHeader>
        <div className="p-3 overflow-scroll border-y border-gray-2">
          <BeanFilter table={table} />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="default" className="border-gray-3">
              {filterSheetLang("close")}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
