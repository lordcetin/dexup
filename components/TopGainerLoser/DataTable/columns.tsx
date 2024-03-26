/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown,MoreHorizontal } from "lucide-react"
import { useRouter } from 'next/navigation';
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
import { useSwitchChain,useAccount } from 'wagmi'
import { isEmpty } from 'lodash';
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

function extractERC20Addresses(poolAddress: string): string[] {
  const erc20Addresses: string[] = [];
  const addressRegex = /0x[a-fA-F0-9]{40}/g; // ERC-20 adresi için regex deseni

  // poolAddress içindeki tüm ERC-20 adreslerini bul
  const matches = poolAddress.match(addressRegex);
  if (matches) {
    erc20Addresses.push(...matches);
  }

  return erc20Addresses;
}
export const columns: ColumnDef<Token>[] = [
  {
    accessorKey:'paircoin',
    header:() => <div className='pl-3'>Pairs</div>,
    cell:({row}:any) => {
      let data = row.getValue('paircoin')

      let baseimage = data?.baseImg.includes('missing') ? '/assets/missing.png' : data?.baseImg;
      let quoteimage = data?.quoteImg.includes('missing') ? '/assets/missing.png' : data?.quoteImg;

      const { switchChain } = useSwitchChain()
      const { chainId } = useAccount()

      const platform:any = data?.platform

      const router = useRouter()

      const name = data?.name
      const symbol = data?.symbol
      const pooladdress = data?.pooladdress

      const goToSwap = async () => {
        const id:any = data?.platformId
        const native_coin_id:any = data?.native_coin_id
        const shortname:any = data?.shortname
        const chain_identifier:any = data?.chain_identifier


      if(shortname !== null){
        router.push(`/swap?chain=${isEmpty(id) ? shortname : isEmpty(shortname) ? native_coin_id : id}&pair=${pooladdress}`)
      }else{
        switchChain({chainId:chain_identifier},{
          onSuccess:(data)=>{
            router.push(`/swap?chain=${isEmpty(id) ? shortname : isEmpty(shortname) ? native_coin_id : id}&pair=${pooladdress}`)
          }
        })
      }

      }

      return (
        <div onClick={() => goToSwap()} className='flex items-center gap-x-1 w-full pl-3 cursor-pointer'>
          <div className='relative flex items-center mr-5'>
            <img src={baseimage} width={800} height={800} className='size-8 object-cover rounded-full' alt=" "/>
            <img src={quoteimage} width={800} height={800} className='size-6 object-cover rounded-full absolute -top-2 -right-3' alt=" "/>
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
      <div className="flex-col grid justify-center items-center -space-y-5 text-xs">
        <span className='self-start text-green-500 block'>Buys: {buy}</span><br />
        <span className='self-start text-red-500 block'>Sells: {sells}</span>
      </div>)
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
]