"use client";

import { Openfiles } from "./Openfiles";
import { Search } from "./Search";
import { Sidebar } from "./Sidebar";
import { ProjectData, RedirectData, useLocalStorageState } from "@lib";

interface Props {
  projectData: ProjectData[];
  children: React.ReactNode;
}

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
          {children}
        </div>
      </div>
    </>
  );
}
