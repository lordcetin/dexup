/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown,MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';
import { TbBrandTelegram } from 'react-icons/tb';
import { BsTwitterX } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import ethscan from '@/public/assets/etherscan-logo-circle.png'
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSwitchChain , useAccount} from 'wagmi';
import { useAppContext } from '@/context/AppContext';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Token = {
  block_number:string
  block_timestamp:string
  from_token_address:string
  from_token_amount:string
  price:number
  kind:string
  price_from_in_currency_token:string
  price_from_in_usd:string
  price_to_in_currency_token:string
  price_to_in_usd:string
  to_token_address:string
  to_token_amount:string
  tx_from_address:string
  tx_hash:string
  volume_in_usd:string
}


const getNetworkId = async (chain:any) => {
  const res = await axios.get(`/api/network?chainname=${chain}`)
  const data = res.data
  return data
}
const getCoinData = async (network:any,tokenaddress:any) => {
  const res = await axios.get(`/api/coin?network=${network}&tokenaddress=${tokenaddress}`)
  const data = res.data
  return data
}

function formatCreatedAt(createdAt:any) {
  const tokenDate:any = new Date(createdAt);
  const currentDate:any = new Date();
  const diffMilliseconds = currentDate - tokenDate;
  const diffSeconds = Math.floor(diffMilliseconds / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears >= 1) {
      return `${diffYears} year${diffYears > 1 ? 's' : ''}`;
  } else if (diffDays >= 1) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
  } else if (diffHours >= 1) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
  } else if (diffMinutes >= 1) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
  } else {
      return `${diffSeconds} second${diffSeconds > 1 ? 's' : ''}`;
  }
}



export const columns: ColumnDef<Token>[] = [
  
  {
    accessorKey: "block_timestamp",
    header: ({column}) => {
      return (
        <Button variant="ghost" className='flex justify-center items-center w-full' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className='ml-2 h-4 w-4'/>
        </Button>
      )
    },
    cell: ({row}:any) => {
      const date =  row.getValue("block_timestamp")
      const format = formatCreatedAt(date)
      return <div className="flex justify-center items-center">{format}</div>
    },
  },
  {
    accessorKey: "kind",
    header: ({column}) => {
      return (
        <Button variant="ghost" className='flex justify-center items-center w-full' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Action
          <ArrowUpDown className='ml-2 h-4 w-4'/>
        </Button>
      )
    },
    cell: ({row}:any) => {
      const kind =  row.getValue("kind")
      return <div className={`flex justify-center items-center ${kind === 'buy' ? 'text-green-500' : 'text-red-600'}`}>{kind}</div>
    },
  },
  {
    accessorKey: "price_from_in_usd",
    cell: ({row}:any) => {
      const price = row.getValue("price_from_in_usd");
      const amount = parseFloat(price)
      const formatted = new Intl.NumberFormat("en-US",{
        style:"currency",
        currency: "USD",
        notation: 'compact',
        compactDisplay: 'short'
      }).format(amount)

      return <div className="flex justify-center items-center">{formatted}</div>
    },
    header: ({column}) => {
      return (
        <Button variant="ghost" className='flex justify-center items-center w-full' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className='ml-2 h-4 w-4'/>
        </Button>
      )
    }
  },
  {
    accessorKey: "to_token_amount",
    cell: ({row}:any) => {
      const price = row.getValue("to_token_amount");
      const amount = parseFloat(price)
      const formatted = new Intl.NumberFormat("en-US",{
        style:"currency",
        currency: "USD",
        notation: 'compact',
        compactDisplay: 'short'
      }).format(amount)

      return <div className="flex justify-center items-center">{formatted}</div>
    },
    header: ({column}) => {
      return (
        <Button variant="ghost" className='flex justify-center items-center w-full' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Token Amount
          <ArrowUpDown className='ml-2 h-4 w-4'/>
        </Button>
      )
    }
  },
  {
    accessorKey: "volume_in_usd",
    header: ({column}) => {
      return (
        <Button variant="ghost" className='flex justify-center items-center w-full' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Total Value
          <ArrowUpDown className='ml-2 h-4 w-4'/>
        </Button>
      )
    },
    cell: ({row}:any) => {
      const market =  row.getValue("volume_in_usd")
      const amount = parseFloat(market)
      const formatted = new Intl.NumberFormat("en-US",{
        style:"currency",
        currency: "USD",
        notation: 'compact',
        compactDisplay: 'short'
      }).format(amount)

      return <div className={formatted.startsWith('-') ? "text-red-500 flex justify-center items-center" : "text-green-500 flex justify-center items-center"}>{formatted}</div>
    },
  },
]