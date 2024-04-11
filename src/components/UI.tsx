"use client";

import { Openfiles } from "./Openfiles";
import { Search } from "./Search";
import { Sidebar } from "./Sidebar";
import { RedirectData, useLocalStorageState } from "@lib";

interface Props {
  children: React.ReactNode;
}

export function UI({ children }: Props) {
  const [openPages, setOpenPages] = useLocalStorageState<RedirectData[]>("open-pages", []);

  return (
    <>
      <Search />
      <div className="flex">
        <Sidebar openPages={openPages} setOpenPages={setOpenPages} />
        <div className="w-full">
          <Openfiles openPages={openPages} setOpenPages={setOpenPages} />
          {children}
        </div>
      </div>
    </>
  );
}
