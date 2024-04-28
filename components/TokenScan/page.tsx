import Link from "next/link";
import React from "react";
import { GoCodescan } from "react-icons/go";

type Props = {
  chain:any;
  address:any;
};

const TokenScan = ({chain,address}: Props) => {
  return (
    <Link href={
      chain === 'eth' ? `https://etherscan.io/token/${address}` 
      : chain === 'bsc' ? `https://bscscan.com/token/${address}` 
      : chain === 'ton' ? `https://tonviewer.com/${address}` 
      : chain === 'solana' ? `https://solscan.io/token/${address}` 
      : chain === 'arbitrum' ? `https://arbiscan.io/token/${address}` 
      : chain === 'base' ? `https://basescan.org/token/${address}` 
      : chain === 'blast' ? `https://blastexplorer.io/token/${address}` 
      : chain === 'cro' ? `https://cronoscan.com/token/${address}` 
      : ''
      } 
      target="_blank" title="Scan"><GoCodescan size={23} className="transition-all hover:scale-75"/></Link>
);
};

export default TokenScan;
