"use client";

import { ProjectData, RedirectData } from "@lib";
import Image from "next/image";
import Link from "next/link";
import { useOpenPageContext } from "./UI";

interface Props {
  data: ProjectData;
  i: number;
}

export default function ProjectDisplay({ data, i }: Props) {
  const openPageCtx = useOpenPageContext();

  function open() {
    const redirectData: RedirectData = {
      redirectUrl: "/project/" + data.name,
      iconUrl: data.featuredTag.iconUrl,
      title: data.title
    };
    const openPages = openPageCtx.openPages;
    if (openPages.find((d) => d.redirectUrl === redirectData.redirectUrl)) {
      return;
    }
    openPages.push(redirectData);
    openPageCtx.setOpenPages(openPages);
  }

  return (
    <>
      <div
        key={i}
        className={`w-1/2 flex justify-evenly bg-stone-800 bg-opacity-65 p-2 m-2 rounded-sm mx-auto ${i % 2 === 0 ? "mr-[20%]" : "ml-[20%]"}`}
      >
        {i % 2 !== 0 ? (
          <div className="w-1/2 flex items-center">
            <p className="line-clamp-3 text-xs">{data.description}</p>
          </div>
        ) : null}
        <div className="flex flex-col items-center w-1/2">
          <h3 className="whitespace-nowrap mb-3 text-center">
            <Link
              className="text-blue-300 hover:text-blue-500 focus:text-blue-500 visited:text-purple-500"
              href={"/project/" + data.name}
              onClick={open}
            >
              {data.title}
            </Link>
          </h3>
          <div className="flex flex-row justify-center flex-wrap gap-1">
            {data.languageTags.map((tag, j) => (
              <div
                key={j}
                className="bg-stone-500 bg-opacity-65 w-fit h-fit object rounded-sm"
              >
                <Image
                  className="aspect-square max-h-9 max-w-9"
                  src={tag.iconUrl}
                  alt={tag.name}
                  title={tag.name}
                  width={50}
                  height={50}
                />
              </div>
            ))}
          </div>
        </div>
        {i % 2 === 0 ? (
          <div className="w-1/2 flex items-center">
            <p className="line-clamp-3 text-xs">{data.description}</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
