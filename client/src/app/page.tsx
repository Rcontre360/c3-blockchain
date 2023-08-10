"use client";
import BuiltForCreators from "@/components/home/creators";
import Main from "@/components/home/main";
import WhatWeOffer from "@/components/home/whatWeOffer";

export default function Home() {
  return (
    <>
      <Main />
      <div className="flex flex-col">
        <BuiltForCreators />
        <WhatWeOffer />
      </div>
    </>
  );
}
