import { ProjectData, RedirectData } from "@lib";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  openPages: RedirectData[];
  setOpenPages: (data: RedirectData[]) => void;
  projectData: ProjectData[];
}

export function Sidebar({ openPages, setOpenPages, projectData }: Props) {
  return (
    <>
      <ul className="flex flex-col justify-start w-1/4 h-screen bg-stone-900 text-sm pt-2 select-none">
        <li className="flex flex-row justify-start cursor-pointer pl-2 hover:bg-opacity-25 hover:bg-gray-400">
          <Image
            src="/icons/placeholder.png"
            alt="redirect-icon"
            width={20}
            height={20}
            className="aspect-square object-scale-down"
          />
          <div className="ml-1">test</div>
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
  const router = useRouter();

  function toggleOpen() {
    setOpen(!open);
  }

  function addOpenPage(data: ProjectData) {
    const redirectData: RedirectData = {
      redirectUrl: "/project/" + data.name,
      iconUrl: data.featuredTag.iconUrl,
      title: data.name
    };
    if (openPages.find((d) => d.redirectUrl === redirectData.redirectUrl))
      return;
    const newPages = openPages;
    newPages.push(redirectData);
    setOpenPages(newPages);
    router.push(redirectData.redirectUrl);
  }

  const folderContents: React.JSX.Element[] = projectData.map((data, i) => (
    <li key={i}>
      <a
        href={"/" + data.name}
        onClick={(e) => {
          e.preventDefault();
          addOpenPage(data);
        }}
        className="flex flex-row justify-start cursor-pointer pl-[12.5%] hover:bg-opacity-25 hover:bg-gray-400"
      >
        <Image
          src={data.featuredTag.iconUrl}
          alt={data.featuredTag.name}
          width={20}
          height={20}
          className="aspect-square object-scale-down"
        />
        <div className="ml-1">{data.name}</div>
      </a>
    </li>
  ));

  return (
    <>
      <li className="flex flex-col relative">
        <button
          onClick={toggleOpen}
          className="flex flex-row justify-start cursor-pointer pl-2 hover:bg-opacity-25 hover:bg-gray-400"
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
