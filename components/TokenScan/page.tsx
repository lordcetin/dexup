import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoCodescan } from "react-icons/go";

type Props = {
  chain:any;
  address:any;
};

const TokenScan = ({chain,address}: Props) => {
  return (
    <>
    <Link className='flex gap-x-1 items-center text-white/50 mr-6' href={
      chain === 'eth' ? `https://etherscan.io/tx/${address}`
      : chain === 'bsc' ? `https://bscscan.com/tx/${address}`
      : chain === 'solana' ? `https://solscan.io/tx/${address}`
      : chain === 'arbitrum' ? `https://arbiscan.io/tx/${address}`
      : chain === 'ton' ? `https://tonviewer.com/transaction/${address}`
      : chain === 'base' ? `https://basescan.org/tx/${address}`
      : chain === 'blast' ? `https://blastexplorer.io/tx/${address}`
      : chain === 'cro' ? `https://cronoscan.com/tx/${address}`
      : ''
      } target='_blank'>
    <Image src={
      chain === 'eth' ? 'https://etherscan.io/images/brandassets/etherscan-logo-circle.svg' 
      : chain === 'bsc' ? 'https://bscscan.com/assets/bsc/images/svg/brandassets/logo-symbol-light.svg?v=24.4.1.0'
      : chain === 'solana' ? 'https://avatars.githubusercontent.com/u/92743431?s=200&v=4'
      : chain === 'arbitrum' ? 'https://arbiscan.io/images/svg/brands/arbitrum.svg?v=1.5'
      : chain === 'ton' ? 'https://ton.app/media/da93ee55-5e8a-4b52-adbc-17280542cf2e.jpg?w=384&q=50'
      : chain === 'base' ? 'https://basescan.org/images/logo-symbol.svg'
      : chain === 'blast' ? 'https://cdn.routescan.io/_next/image?url=https%3A%2F%2Fcms-cdn.avascan.com%2Fcms2%2Fblast.dead36673539.png&w=32&q=100'
      : chain === 'cro' ? 'https://cronoscan.com/images/svg/brands/main.svg?v=24.4.2.0'
      : ''
      }
      alt='Token Scan' width={20} height={20} unoptimized className='rounded-full object-cover' />
      <span>{
      chain === 'eth' ? 'Ethscan' 
      : chain === 'bsc' ? 'Bscscan'
      : chain === 'solana' ? 'Solscan'
      : chain === 'arbitrum' ? 'Arbiscan'
      : chain === 'ton' ? 'Tonviewer'
      : chain === 'base' ? 'Basescan'
      : chain === 'blast' ? 'Blastscan'
      : chain === 'cro' ? 'Cronoscan'
      : ''
      }</span>
    </Link>
  </>
);
};

export default TokenScan;
