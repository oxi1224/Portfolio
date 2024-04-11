"use client";

import { useState } from "react";

export function Search() {
  const [showSearch, setShowSearch] = useState(false);

  function onBtnClick() {
    setShowSearch(!showSearch);
  }

  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={onBtnClick}
          className="w-1/4 border-[0.5px] border-gray-500 rounded-md text-gray-100 bg-zinc-700 text-sm"
        >
          Search
        </button>
        {showSearch ? <div>Hello</div> : null}
      </div>
    </>
  );
}
