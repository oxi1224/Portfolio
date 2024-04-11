"use client";

import { RedirectData } from "@lib";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  openPages: RedirectData[];
  setOpenPages: (data: RedirectData[]) => void;
}

export function Openfiles({ openPages, setOpenPages }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function closePage(data: RedirectData) {
    const idx = openPages.findIndex((d) => d.redirectUrl === data.redirectUrl);
    const newPages = openPages.toSpliced(idx, 1);
    setOpenPages(newPages);
    if (data.redirectUrl === pathname) router.replace("/");
  }

  return (
    <>
      <div className="bg-stone-900 w-full h-fit flex flex-row">
        <Link
          href="/"
          className={`flex flex-row py-1 px-2 ${pathname === "/" ? "bg-stone-800" : "bg-stone-700"} bg-opacity-65 w-fit cursor-pointer  border-r border-stone-700 border-opacity-90`}
        >
          <Image
            src="/icons/document.svg"
            alt="icon"
            width={20}
            height={20}
            className="aspect-square object-scale-down self-center"
          />
          <div className="px-1.5">Main page</div>
        </Link>
        {openPages.map((data, i) => (
          <Link
            key={i}
            href={data.redirectUrl}
            className={`flex flex-row py-1 px-2 ${pathname === data.redirectUrl ? "bg-stone-800" : "bg-stone-700"} bg-opacity-65 w-fit cursor-pointer  border-r border-stone-700 border-opacity-90`}
          >
            <Image
              src={data.iconUrl}
              alt="icon"
              width={20}
              height={20}
              className="aspect-square object-scale-down self-center"
            />
            <div className="px-1.5">{data.title}</div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                closePage(data);
              }}
            >
              <Image
                src="/icons/close.svg"
                alt="close"
                width={20}
                height={20}
                className="aspect-square object-contain self-center cursor-pointer rounded-md p-1 hover:bg-stone-600"
              />
            </button>
          </Link>
        ))}
      </div>
    </>
  );
}
