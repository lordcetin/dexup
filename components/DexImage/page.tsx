/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {
  dex:any
  size:any
};

const DexImage = ({dex,size}: Props) => {
  return (
  <>
    {
    dex === 'uniswap_v3' ? 
    <img src="./assets/uniswap_v3.svg" alt="Uniswap V3 Logo" className={`size-${size}`}/>
    : dex === 'uniswap_v2' ?
    <img src="https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=029" alt="Uniswap V2 Logo" className={`size-${size}`}/>
    : dex === 'uniswap_v3_arbitrum' ?
    <img src="./assets/uniswap_v3.svg" alt="Uniswap V3 Logo" className={`size-${size}`}/>
    : dex === 'uniswap-v3-base' ?
    <img src="./assets/uniswap_v3.svg" alt="Uniswap V3 Logo" className={`size-${size}`}/>
    : dex === 'sushiswap' ?
    <img src="https://seekvectors.com/storage/images/SushiSwap-01.svg" alt="Pancakeswap Logo" className={`size-${size}`}/>
    : dex === 'balancer_ethereum' ?
    <img src="https://cryptologos.cc/logos/balancer-bal-logo.png?v=031" alt="Pancakeswap Logo" className={`size-${size}`}/>
    : dex === 'balancer' ?
    <img src="https://cryptologos.cc/logos/balancer-bal-logo.png?v=031" alt="Pancakeswap Logo" className={`size-${size}`}/>
    : dex === 'pancakeswap' ?
    <img src="https://cryptologos.cc/logos/pancakeswap-cake-logo.svg?v=029" alt="Pancakeswap Logo" className={`size-${size}`}/>
    : dex === 'pancakeswap_v2' ?
    <img src="https://cryptologos.cc/logos/pancakeswap-cake-logo.svg?v=029" alt="Pancakeswap Logo" className={`size-${size}`}/>
    : dex === 'pancakeswap-v3-bsc' ?
    <img src="https://cryptologos.cc/logos/pancakeswap-cake-logo.svg?v=029" alt="Pancakeswap Logo" className={`size-${size}`}/>
    : dex === 'pancakeswap-v3-arbitrum' ?
    <img src="https://cryptologos.cc/logos/pancakeswap-cake-logo.svg?v=029" alt="Pancakeswap Logo" className={`size-${size}`}/>
    : dex === 'uniswap-bsc' ?
    <img src="https://cryptologos.cc/logos/pancakeswap-cake-logo.svg?v=029" alt="Pancakeswap Logo" className={`size-${size}`}/>
    : dex === 'raydium' ?
    <img src="https://s1.coincarp.com/logo/1/raydium.png?style=200&v=1631063519" alt="Ethereum Logo" className={`size-${size}`}/>
    : dex === 'raydium-clmm' ?
    <img src="https://s1.coincarp.com/logo/1/raydium.png?style=200&v=1631063519" alt="Ethereum Logo" className={`size-${size}`}/>
    : dex === 'dedust' ?
    <img src="https://tonstarter-cdn.ams3.digitaloceanspaces.com/openrating/dedust/dedust.png" alt="Ethereum Logo" className={`size-${size}`}/>
    : dex === 'orca' ?
    <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/11165.png" alt="Ethereum Logo" className={`size-${size}`}/>
    : dex === 'meteora' ?
    <img src="https://img.cryptorank.io/coins/meteora1679488925724.png" alt="Ethereum Logo" className={`size-${size}`}/>
    : dex === 'camelot' ?
    <img src="https://assets-global.website-files.com/614c99cf4f23700c8aa3752a/63b7320c768e1e30bf7c79dc_public.png" alt="Ethereum Logo" className={`size-${size}`}/>
    : dex === 'camelot-v3' ?
    <img src="https://assets-global.website-files.com/614c99cf4f23700c8aa3752a/63b7320c768e1e30bf7c79dc_public.png" alt="Ethereum Logo" className={`size-${size}`}/>
    : dex === 'stonfi' ?
    <img src="https://ton.app/media/0f34939b-44b1-4be6-9ac1-2f97d61655d4.png?w=640&q=50" alt="Ethereum Logo" className={`size-${size}`}/>
    : dex === 'aerodrome' ?
    <img src="https://aerodrome.finance/brand-kit/symbol.png" alt="Ethereum Logo" className={`size-${size}`}/>
    : dex === 'thena' ?
    <img src="https://dex-bin.bnbstatic.com/static/dapp-uploads/oadwdH7lGdGOP9NMT1jQR" alt="Ethereum Logo" className={`size-${size}`}/>
    : dex === 'aerodrome-base' ?
    <img src="https://aerodrome.finance/brand-kit/symbol.png" alt="Ethereum Logo" className={`size-${size}`}/>
    : <span>{dex}</span>
    }
  </>
);
};

export default DexImage;
