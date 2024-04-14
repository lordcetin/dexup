/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React from "react";
import { createBook } from "@/app/actions/create";

type Props = {};

const Test = ({}: Props) => {

  const [error,setError] = React.useState<any>('')

  const handleSubmit = async (formData:any) => {
    const result = await createBook(formData)

    if(result?.error){
      setError(result.error)
    }
  }

  return (
  <main className="flex-col flex gap-6">
    <form className="flex-col flex w-full gap-6" action={handleSubmit}>
    <h1>Add a new book</h1>
    <input type="text" name="title" placeholder="title" className="text-white bg-transparent outline-none border border-white px-3 py-1"/>
    <input type="text" name="author" placeholder="author" className="text-white bg-transparent outline-none border border-white px-3 py-1"/>
    <input type="number" name="rating" max={10} min={1} placeholder="rating" className="text-white bg-transparent outline-none border border-white px-3 py-1"/>
    <textarea name="blurb" placeholder="blurb..." className="text-white bg-transparent outline-none border border-white px-3 py-1"></textarea>
    <button type="submit" className="border border-white p-2">Add Book</button>
    {error && <div className="text-red-500">{error}</div>}
    </form>


    
  </main>
);
};

export default Test;
