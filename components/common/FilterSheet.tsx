"use client";

import * as React from "react";
import { toast } from "sonner";

import { useIsMobile } from "@/hooks/use-mobile";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import BeanFilter from "../home/BeanFilter";

const deliveryTimes = [
  {
    value: "asap",
    id: "delivery-asap",
    label: "Standard delivery",
    description: "25–35 min · Driver assigned now",
    badge: "Fastest",
  },
  {
    value: "5-00",
    id: "delivery-5-00",
    label: "5:00 PM – 5:15 PM",
    description: "Prep starts at 4:45 PM",
  },
  {
    value: "5-30",
    id: "delivery-5-30",
    label: "5:30 PM – 5:45 PM",
    description: "Good if you're heading home",
  },
  {
    value: "6-00",
    id: "delivery-6-00",
    label: "6:00 PM – 6:15 PM",
    description: "Most popular · High demand",
  },
  {
    value: "6-30",
    id: "delivery-6-30",
    label: "6:30 PM – 6:45 PM",
    description: "Last slot before kitchen closes",
  },
];

export function FilterSheet({ table }: { table: any }) {
  const [open, setOpen] = React.useState(false);
  const [deliveryTime, setDeliveryTime] = React.useState("asap");
  const isMobile = useIsMobile();

  function handleConfirm() {
    const selected = deliveryTimes.find((time) => time.value === deliveryTime);

    if (!selected) {
      return;
    }

    setOpen(false);
    toast("필터 적용 완료!");
  }

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
          상세 검색 열기
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-none">
        <DrawerHeader>
          <DrawerTitle>생두 상세검색</DrawerTitle>
        </DrawerHeader>
        <div className="p-3 overflow-scroll border-y border-gray-2">
          <BeanFilter table={table} />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="default" className="border-gray-3">
              닫기
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
