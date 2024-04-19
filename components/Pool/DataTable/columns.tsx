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
import ProgressBar from '@/components/ProgressBar/page';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Token = {
  id: string,
  paircoin: string[],
  name:string
  basename:string
  quotename:string
  baseSymbol:string
  quoteSymbol:string
  baseImg:string
  quoteImg:string
  baseaddress:string
  quoteaddress:string
  basecoinId:string
  quotecoinId:string
  created:string
  pooladdress:string
  baseprice:string
  quoteprice:string
  fdv:string
  cap:string
  price_change_percentage:string
  transactions:string[]
  volume_usd:string[]
  reserve:string
  dex:string
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
    accessorKey:'paircoin',
    header:() => <div className='pl-3'>Pairs</div>,
    cell:({row}:any) => {
      const data = row.getValue('paircoin')
      let baseimage = data?.baseImg.includes('missing') ? '/assets/missing.png' : data?.baseImg;
      let quoteimage = data?.quoteImg.includes('missing') ? '/assets/missing.png' : data?.quoteImg;
      const { switchChain,isSuccess,isPending,isError } = useSwitchChain()
      const { chainId } = useAccount()
      const name = data?.name
      const symbol = data?.symbol
      const pooladdress = data?.pooladdress
      const chain = data?.networkname
      const chain_identifier = data?.chain_identifier
      const shortname = data?.shortname
      const router = useRouter()

      const goToSwap = async () => {
        if(chain !== null){
          router.push(`/swap?chain=${chain}&pair=${pooladdress}`)
        }else{
        switchChain({chainId:chain_identifier},{
          onSuccess:(data:any)=>{
            router.push(`/swap?chain=${chain}&pair=${pooladdress}`)
          }
        })
        }
      }

      return (
        <div onClick={() => goToSwap()} className='flex items-center gap-x-1 w-full pl-3 cursor-pointer'>
          <div className='relative flex items-center mr-5'>
            <img src={baseimage} width={800} height={800} className='size-8 object-cover rounded-full bg-white' alt=" "/>
            <img src={quoteimage} width={800} height={800} className='size-6 object-cover rounded-full absolute -top-2 -right-3 bg-white' alt=" "/>
          </div>
        <div className='flex items-center gap-x-1'><h1 className='uppercase'>{name}</h1><h3 className='uppercase opacity-35'>{symbol}</h3></div>
        </div>
      )
    }
  },
  {
    accessorKey: "baseprice",
    cell: ({row}:any) => {
      const market = row.getValue("baseprice");
      const price = market
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
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className='ml-2 h-4 w-4'/>
        </Button>
      )
    }
  },
  {
    accessorKey: "price_change_percentage",
    cell: ({row}:any) => {
      const market = row.getValue("price_change_percentage");
      const price = market?.h24
      const amount = parseFloat(price).toFixed(2)

      return <div className={Number(amount) < 1 ? "text-red-500 flex justify-center items-center": "text-green-400 flex justify-center items-center"}>{amount}%</div>
    },
    header: ({column}) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          24h
          <ArrowUpDown className='ml-2 h-4 w-4'/>
        </Button>
      )
    }
  },
  {
    accessorKey: "created",
    header: ({column}) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Created
          <ArrowUpDown className='ml-2 h-4 w-4'/>
        </Button>
      )
    },
    cell: ({row}:any) => {
      const created =  row.getValue("created")
      const format = formatCreatedAt(created)
      return <div className="flex justify-center items-center">{format}</div>
    },
  },
  {
    accessorKey: "volume_usd",
    header: ({column}) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Volume
          <ArrowUpDown className='ml-2 h-4 w-4'/>
        </Button>
      )
    },
    cell: ({row}:any) => {
      const market =  row.getValue("volume_usd")
      const volume = market?.h24
      const amount = parseFloat(volume)
      const formatted = new Intl.NumberFormat("en-US",{
        style:"currency",
        currency: "USD",
        notation: 'compact',
        compactDisplay: 'short'
      }).format(amount)

      return <div className={formatted.startsWith('-') ? "text-red-500 flex justify-center items-center" : "text-green-500 flex justify-center items-center"}>{formatted}</div>
    },
  },
  {
    accessorKey: "transactions",
    header: ({column}) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Swaps
          <ArrowUpDown className='ml-2 h-4 w-4'/>
        </Button>
      )
    },
    cell: ({row}:any) => {
      const market =  row.getValue("transactions")
      const buy = market?.h24.buys
      const sells = market?.h24.sells

      return (
        <ProgressBar buys={buy} sells={sells} title1='Buys' title2='Sells'/>
      )
    },
  },
  {
    accessorKey: "reserve",
    header: ({column}) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Liquidity
          <ArrowUpDown className='ml-2 h-4 w-4'/>
        </Button>
      )
    },
    cell: ({row}:any) => {
      const market =  row.getValue("reserve")
      const reserve = market
      const amount = parseFloat(reserve)
      const formatted = new Intl.NumberFormat("en-US",{
        style:"currency",
        currency: "USD",
        notation: 'compact',
        compactDisplay: 'short'
      }).format(amount)

      return <div className="flex justify-center items-center">{formatted}</div>
    },
  },
  {
    accessorKey: "cap",
    header: ({column}) => {
      return (
        <Button className='flex justify-center items-center' variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Cap
          <ArrowUpDown className='ml-2 h-4 w-4'/>
        </Button>
      )
    },
    cell: ({row}:any) => {
      const market =  row.getValue("cap")
      const market_cap = market === null ? 0 : market
      const amount = parseFloat(market_cap)
      const formatted = new Intl.NumberFormat("en-US",{
        style:"currency",
        currency: "USD",
        notation: 'compact',
        compactDisplay: 'short'
      }).format(amount)

      return <div className="flex items-center justify-center">{formatted}</div>
    },
  },
  {
    accessorKey: "dex",
    header: ({column}) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Dex
          <ArrowUpDown className='ml-2 h-4 w-4'/>
        </Button>
      )
    },
    cell: ({row}:any) => {
      const market =  row.getValue("dex")
      const dex = market

      return <div className="flex justify-center items-center text-xs">{dex}</div>
    },
  },
  {
    accessorKey: "pooladdress",
    header: () => <div>Detail</div>,
    cell: ({row}:any) => {

      const market =  row.getValue("pooladdress")

      return (
        <div className='flex items-center gap-x-2 pr-3'>
        {<Link target='_blank' href={''}><GoHomeFill size={16} /></Link>}
        {<Link target='_blank' href={''}><Image src={''} alt='Etherscan' width={200} height={200} className='size-4 object-cover'/></Link>}
        {/* @ts-ignore */}
        {<Link target='_blank' href={`https://t.me/${''}`}><TbBrandTelegram size={16} /></Link>}
        {<Link target='_blank' href={`https://twitter.com/${''}`}><BsTwitterX size={16} /></Link>}
        {<Link target='_blank' href={''}><BsFileEarmarkPdfFill size={16} /></Link>}
      </div>
      )
    },
  },
]