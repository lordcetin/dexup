import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  chain:any
  txhash:any
};

const NetExplorer = ({chain,txhash}: Props) => {
  return (
  <>
    <Link className='flex gap-x-1 text-xs items-center text-white/50' href={
      chain === 'ethereum' ? `https://etherscan.io/tx/${txhash}`
      : chain === 'binance-smart-chain' ? `https://bscscan.com/tx/${txhash}`
      : chain === 'solana' ? `https://solscan.io/tx/${txhash}`
      : chain === 'arbitrum' ? `https://arbiscan.io/tx/${txhash}`
      : chain === 'the-open-network' ? `https://tonviewer.com/transaction/${txhash}`
      : chain === 'base' ? `https://basescan.org/tx/${txhash}`
      : chain === 'blast' ? `https://blastexplorer.io/tx/${txhash}`
      : chain === 'cronos' ? `https://cronoscan.com/tx/${txhash}`
      : ''
      } target='_blank'>
    <Image src={
      chain === 'ethereum' ? 'https://etherscan.io/images/brandassets/etherscan-logo-circle.svg' 
      : chain === 'binance-smart-chain' ? 'https://bscscan.com/assets/bsc/images/svg/brandassets/logo-symbol-light.svg?v=24.4.1.0'
      : chain === 'solana' ? 'https://avatars.githubusercontent.com/u/92743431?s=200&v=4'
      : chain === 'arbitrum' ? 'https://arbiscan.io/images/svg/brands/arbitrum.svg?v=1.5'
      : chain === 'the-open-network' ? 'https://ton.app/media/da93ee55-5e8a-4b52-adbc-17280542cf2e.jpg?w=384&q=50'
      : chain === 'base' ? 'https://basescan.org/images/logo-symbol.svg'
      : chain === 'blast' ? 'https://cdn.routescan.io/_next/image?url=https%3A%2F%2Fcms-cdn.avascan.com%2Fcms2%2Fblast.dead36673539.png&w=32&q=100'
      : chain === 'cronos' ? 'https://cronoscan.com/images/svg/brands/main.svg?v=24.4.2.0'
      : ''
      }
      alt='Transaction hash' width={20} height={20} unoptimized className='rounded-full object-cover' />
      <span>{
      chain === 'ethereum' ? 'Ethscan' 
      : chain === 'binance-smart-chain' ? 'Bscscan'
      : chain === 'solana' ? 'Solscan'
      : chain === 'arbitrum' ? 'Arbiscan'
      : chain === 'the-open-network' ? 'Tonviewer'
      : chain === 'base' ? 'Basescan'
      : chain === 'blast' ? 'Blastscan'
      : chain === 'cronos' ? 'Cronoscan'
      : ''
      }</span>
    </Link>
  </>
  );
};

export default NetExplorer;
