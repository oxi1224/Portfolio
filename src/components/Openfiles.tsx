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
      <div className="bg-stone-900 w-full h-fit">
        <ul className="flex flex-row whitespace-nowrap overflow-x-scroll">
          <li
            className={`py-1 px-2 ${pathname === "/" ? "bg-stone-800" : "bg-stone-700"} bg-opacity-65 border-r border-stone-700 border-opacity-90`}
          >
            <Link
              href="/"
              className="flex flex-row object-contain items-center"
            >
              <Image
                src="/icons/document.svg"
                alt="icon"
                width={20}
                height={20}
                className="aspect-square self-center"
              />
              <div className="px-1.5 text-xs lg:text-base">Main page</div>
            </Link>
          </li>
          {openPages.map((data, i) => (
            <li
              key={i}
              className={`group py-1 px-2 ${pathname === data.redirectUrl ? "bg-stone-800" : "bg-stone-700"} bg-opacity-65 border-r w-max border-stone-700 border-opacity-90`}
            >
              <Link
                href={data.redirectUrl}
                className="group flex flex-row object-contain items-center"
              >
                <Image
                  src={data.iconUrl}
                  alt="icon"
                  width={20}
                  height={20}
                  className="aspect-square self-center"
                />
                <div className="px-1.5 text-xs lg:text-base">{data.title}</div>
                <button
                  className={`${pathname === data.redirectUrl ? "" : "opacity-0 group-hover:opacity-100 group-focus:opacity-100 focus:opacity-100"}`}
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
                    className="aspect-square self-center cursor-pointer rounded-md p-1 hover:bg-stone-600 min-w-5 min-h-5"
                  />
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
