import React from "react";
import TopGainerLoser from "@/components/TopGainerLoser/page";
import Landing from "@/components/Landing/page";
import Pool from "@/components/Pool/page";

export default function Home() {
  return (
    <main>
    <div
      style={{
        display: 'flex',
        position:'absolute',
        top:0,
        right:0,
        justifyContent: 'flex-end',
        padding: 12,
        zIndex:99999
      }}
    >
    </div>
    <Landing/>
    <TopGainerLoser/>
    <Pool/>
    </main>
  );
}
