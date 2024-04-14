import { ProjectData, RedirectData } from "@lib";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  openPages: RedirectData[];
  setOpenPages: (data: RedirectData[]) => void;
  projectData: ProjectData[];
}

export function Sidebar({ openPages, setOpenPages, projectData }: Props) {
  function open(redirectData: RedirectData) {
    if (openPages.find((d) => d.redirectUrl === redirectData.redirectUrl)) {
      return;
    }
    const newPages = openPages;
    newPages.push(redirectData);
    setOpenPages(newPages);
  }

  return (
    <>
      <ul className="flex flex-col justify-start w-1/6 h-full bg-stone-900 text-sm pt-2 select-none">
        <li className="hover:bg-opacity-25 hover:bg-gray-400 py-0.5">
          <Link className="pl-2  flex flex-row justify-start" href="/">
            <Image
              src="/icons/document.svg"
              alt="redirect-icon"
              width={20}
              height={20}
              className="aspect-square object-scale-down"
            />
            <div className="ml-1">Main page</div>
          </Link>
        </li>
        <li className="hover:bg-opacity-25 hover:bg-gray-400 py-0.5">
          <Link
            className="pl-2  flex flex-row justify-start"
            href="/projects"
            onClick={() =>
              open({
                title: "Projects",
                redirectUrl: "/projects",
                iconUrl: "/icons/contributing.svg"
              })
            }
          >
            <Image
              src="/icons/contributing.svg"
              alt="redirect-icon"
              width={20}
              height={20}
              className="aspect-square object-scale-down"
            />
            <div className="ml-1">Projects</div>
          </Link>
        </li>
        <Folder
          projectData={projectData}
          openPages={openPages}
          setOpenPages={setOpenPages}
        />
      </ul>
    </>
  );
}

function Folder({ openPages, setOpenPages, projectData }: Props) {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(!open);
  }

  function addOpenPage(data: ProjectData) {
    const redirectData: RedirectData = {
      redirectUrl: "/project/" + data.name,
      iconUrl: data.featuredTag.iconUrl,
      title: data.title
    };
    if (openPages.find((d) => d.redirectUrl === redirectData.redirectUrl)) {
      return;
    }
    const newPages = openPages;
    newPages.push(redirectData);
    setOpenPages(newPages);
  }

  const folderContents: React.JSX.Element[] = projectData.map((data, i) => (
    <li
      key={i}
      className="py-0.5 hover:bg-opacity-25 hover:bg-gray-400 focus:bg-opacity-25 focus:bg-gray-400"
    >
      <Link
        href={"/project/" + data.name}
        onClick={(e) => {
          e.preventDefault();
          addOpenPage(data);
        }}
        className="clear-focus flex flex-row justify-start cursor-pointer pl-[12.5%]"
      >
        <Image
          src={data.featuredTag.iconUrl}
          alt={data.featuredTag.name}
          width={20}
          height={20}
          className="aspect-square object-scale-down"
        />
        <div className="ml-1">{data.title}</div>
      </Link>
    </li>
  ));

  return (
    <>
      <li className="flex flex-col line-clamp-1 whitespace-nowrap text-ellipsis py-0.5">
        <button
          onClick={toggleOpen}
          className="clear-focus flex flex-row justify-start cursor-pointer pl-2 hover:bg-opacity-25 hover:bg-gray-400 focus:bg-opacity-25 focus:bg-gray-400"
        >
          <Image
            src="/icons/caret-down.svg"
            alt="folder-icon"
            width={20}
            height={20}
            className={`aspect-square object-scale-down ${open ? "" : "-rotate-90"}`}
          />
          <Image
            src="/icons/folder-project.svg"
            alt="folder-icon"
            width={20}
            height={20}
            className="aspect-square object-scale-down"
          />
          <div className="ml-1">Projects</div>
        </button>
        <ul className={`relative ${open ? "" : "hidden"}`}>
          {folderContents}
          <div className="absolute left-4 top-0 w-[0.5px] h-full bg-stone-700 bg-opacity-65"></div>
        </ul>
      </li>
    </>
  );
}
