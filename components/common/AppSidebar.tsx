import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import { Input } from "../ui/input";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Checkbox } from "../ui/checkbox";

const AppSidebar = () => {
  const projects = [
    {
      name: "첫번째 메뉴",
      url: "123",
      icon: "",
    },
    {
      name: "두번째 메뉴",
      url: "123",
      icon: "",
    },
    {
      name: "세번째 메뉴",
      url: "123",
      icon: "",
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>Sidebar Header</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem className="p-2">
            <Field>
              <FieldLabel htmlFor="search-bean">원두 검색</FieldLabel>
              <Input
                id="search-bean"
                type="text"
                placeholder="원두명을 입력해주세요"
              />
            </Field>
          </SidebarMenuItem>
          <SidebarMenuItem className="p-2">
            <Field>
              <FieldLabel htmlFor="search-bean">업체</FieldLabel>
              <FieldSet>
                <FieldGroup className="grid grid-cols-2 gap-3">
                  <Field orientation="horizontal">
                    <Checkbox id="coffee-libre" name="coffee-libre" />
                    <FieldLabel htmlFor="coffee-libre">커피리브레</FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <Checkbox id="momos-coffee" name="momos-coffee" />
                    <FieldLabel htmlFor="momos-coffee">모모스커피</FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <Checkbox id="cobeans" name="cobeans" />
                    <FieldLabel htmlFor="cobeans">코빈즈</FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <Checkbox id="gsc" name="gsc" />
                    <FieldLabel htmlFor="gsc">GSC</FieldLabel>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </Field>
          </SidebarMenuItem>
          <SidebarMenuItem className="p-2">
            <Field>
              <FieldLabel htmlFor="search-bean">국가</FieldLabel>
              <FieldSet>
                <FieldGroup className="grid grid-cols-2 gap-3">
                  <Field orientation="horizontal">
                    <Checkbox id="ethiopia" name="ethiopia" />
                    <FieldLabel htmlFor="ethiophia">에티오피아</FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <Checkbox id="colombia" name="colombia" />
                    <FieldLabel htmlFor="colombia">콜롬비아</FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <Checkbox id="brazil" name="brazil" />
                    <FieldLabel htmlFor="brazil">브라질</FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <Checkbox id="kenya" name="kenya" />
                    <FieldLabel htmlFor="kenya">케냐</FieldLabel>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </Field>
          </SidebarMenuItem>
          <SidebarMenuItem className="p-2">
            <Field>
              <FieldLabel htmlFor="search-bean">가격</FieldLabel>
              <Input
                id="search-bean"
                type="text"
                placeholder="원두명을 입력해주세요"
              />
            </Field>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Username</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
