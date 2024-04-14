"use client";

import { useOpenPageContext } from "@components/UI";

export default function Home() {
  const ctx = useOpenPageContext();
  if (ctx.openPages.length > 0) return <div>{ctx.openPages[0].iconUrl}</div>;
  return <div>This is the main page</div>;
}
