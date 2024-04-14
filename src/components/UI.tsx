"use client";

import { createContext, useContext } from "react";
import { Openfiles } from "./Openfiles";
import { Search } from "./Search";
import { Sidebar } from "./Sidebar";
import { ProjectData, RedirectData, useLocalStorageState } from "@lib";

interface Props {
  projectData: ProjectData[];
  children: React.ReactNode;
}

const OpenPageContext = createContext<{
  openPages: RedirectData[];
  setOpenPages: (data: RedirectData[]) => void;
  // eslint-disable-next-line indent
}>({ openPages: [], setOpenPages: () => null });

export function UI({ projectData, children }: Props) {
  const [openPages, setOpenPages] = useLocalStorageState<RedirectData[]>(
    "open-pages",
    []
  );

  return (
    <>
      <Search />
      <div className="flex h-full">
        <Sidebar
          projectData={projectData}
          openPages={openPages}
          setOpenPages={setOpenPages}
        />
        <div className="w-full h-full">
          <Openfiles openPages={openPages} setOpenPages={setOpenPages} />
          <OpenPageContext.Provider value={{ openPages, setOpenPages }}>
            {children}
          </OpenPageContext.Provider>
        </div>
      </div>
    </>
  );
}

export const useOpenPageContext = () => {
  return useContext(OpenPageContext);
};
