// "use client";

// import React from "react";
// import { Field, FieldGroup, FieldLabel, FieldLegend } from "../ui/field";
// import { Button } from "../ui/button";
// import { FaSearch } from "react-icons/fa";
// import { useTranslations } from "next-intl";
// import HeaderSearch from "../common/HeaderSearch";
// import { FaMapLocation, FaShop } from "react-icons/fa6";
// import { Checkbox } from "../ui/checkbox";

// const BeanFilter = () => {
//   // 다국어
//   const vendorLang = useTranslations("Vendor");
//   const originLang = useTranslations("Origin");
//   const homeLang = useTranslations("Home");

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
//       <FieldGroup className="flex md:hidden border border-gray-2 p-3 rounded-md pb-5 md:pb-3">
//         <FieldLegend className="text-[0.8rem] text-gray-8 font-semibold mb-0 flex items-center gap-2">
//           <Button
//             size="icon-xs"
//             variant="outline"
//             className="border-gray-2 bg-accent-foreground"
//           >
//             <FaSearch className="text-primary" />
//           </Button>
//           {homeLang("search")}
//         </FieldLegend>
//         <HeaderSearch className="w-full flex md:hidden" />
//       </FieldGroup>
//       <FieldGroup className="border border-gray-2 p-3 rounded-md">
//         <FieldLegend className="text-[0.8rem] text-gray-8 font-semibold mb-0 flex items-center gap-2">
//           <Button
//             size="icon-xs"
//             variant="outline"
//             className="border-gray-2 bg-accent-foreground"
//           >
//             <FaShop className="text-primary" />
//           </Button>
//           {vendorLang("title")}
//         </FieldLegend>
//         <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-3">
//           {vendors.map((vendor) => (
//             <Field orientation="horizontal" key={vendor}>
//               <Checkbox
//                 id={vendor}
//                 checked={(
//                   (table
//                     .getColumn("vendorName")
//                     ?.getFilterValue() as string[]) ?? []
//                 ).includes(vendor)}
//                 onCheckedChange={(checked) => {
//                   const next = checked
//                     ? [...selectedVendors, vendor]
//                     : selectedVendors.filter((v) => v !== vendor);

//                   table
//                     .getColumn("vendorName")
//                     ?.setFilterValue(next.length ? next : undefined);
//                 }}
//                 className="data-checked:bg-black data-checked:text-white data-checked:border-0"
//               />
//               <FieldLabel
//                 htmlFor={vendor}
//                 className="text-[0.7rem] md:text-[0.8rem] truncate"
//               >
//                 {vendorLang(vendor)}
//               </FieldLabel>
//             </Field>
//           ))}
//         </div>
//       </FieldGroup>
//       <FieldGroup className="lg:col-span-3 border border-gray-2 p-3 rounded-md">
//         <FieldLegend className="text-[0.8rem] text-gray-8 font-semibold mb-0 flex items-center gap-2">
//           <Button
//             size="icon-xs"
//             variant="outline"
//             className="border-gray-2 bg-accent-foreground"
//           >
//             <FaMapLocation className="text-primary" />
//           </Button>
//           {originLang("title")}
//         </FieldLegend>
//         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
//           {sortedOriginList.map((origin) => (
//             <Field orientation="horizontal" key={origin.originKey}>
//               <Checkbox
//                 id={origin.originKey}
//                 checked={
//                   (
//                     (table.getColumn("origin")?.getFilterValue() as string[]) ??
//                     []
//                   ).includes(origin.originName)
//                   // table.getColumn("origin")?.getFilterValue() ===
//                   // origin.originName
//                 }
//                 onCheckedChange={(checked) => {
//                   const next = checked
//                     ? [...selectedOrigin, origin.originName]
//                     : selectedOrigin.filter((v) => v !== origin.originName);

//                   table
//                     .getColumn("origin")
//                     ?.setFilterValue(next.length ? next : undefined);
//                 }}
//                 className="data-checked:bg-black data-checked:text-white data-checked:border-0"
//               />

//               <FieldLabel
//                 htmlFor={origin.originKey}
//                 className="text-[0.7rem] md:text-[0.8rem] truncate"
//               >
//                 {originLang(origin.originKey)}
//               </FieldLabel>
//             </Field>
//           ))}
//         </div>
//       </FieldGroup>
//     </div>
//   );
// };

// export default BeanFilter;
