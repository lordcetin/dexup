import React, { Suspense } from "react";
import TopGainerLoser from "@/components/TopGainerLoser/page";
import Landing from "@/components/Landing/page";
import Pool from "@/components/Pool/page";
import { client } from "@/lib/db";
// const getBooks = async () => {
//   const result = await client.zRangeWithScores('books',0,-1)

//   const books = await Promise.all(result.map((b:any) => {
//     return client.hGetAll(`books:${b.score}`)
//   }))

//   return books
// }
export default async function Home() {

// const books = await getBooks()

  return (
    <main>
    {/* <div
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
    </div> */}
    <Suspense fallback={
      <div className="flex max-md:flex-col justify-center items-center w-full gap-x-6">
      <div className="w-[800px] h-[430px] max-md:w-96 max-md:h-[800px] bg-brandblack animate-pulse overflow-hidden rounded-xl relative max-md:px-3">
  
      </div>
  
      <div className="relative w-[435px] max-md:w-96 h-96 rounded-lg bg-brandblack animate-pulse"></div>
  
      </div>
    }>
    <Landing/>
    </Suspense>
    <Suspense fallback={<div>Loading...</div>}>
    <TopGainerLoser/>
    </Suspense>
    <Suspense fallback={<div>Loading...</div>}>
    <Pool/>
    </Suspense>
    {/* <h1>GET BOOKS</h1>
    {books.map((book:any) => (
      <div key={book.title}>
        <h2>{book.title}</h2>
        <p>By {book.author}</p>
        <p>{book.blurb}</p>
        <p>Rating: {book.rating}</p>
      </div>
    ))} */}
    </main>
  );
}
