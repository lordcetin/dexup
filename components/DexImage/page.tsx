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
    : dex === 'terraswap' ?
    <img src="https://assets.coingecko.com/markets/images/835/large/Terraswap.png?1706864857" alt="Pancakeswap Logo" className={`size-${size}`}/>
    : dex === 'fraxswap_ethereum' ?
    <img src="https://assets.coingecko.com/coins/images/13422/standard/FRAX_icon.png?1696513182" alt="Fraxswap Logo" className={`size-${size}`}/>
    : dex === 'vvs' ?
    <img src="https://pbs.twimg.com/profile_images/1436269338290364423/8glAYOTM_400x400.jpg" alt="VVS Logo" className={`size-${size} rounded-full`}/>
    : dex === 'mm_finance' ?
    <img src="https://s1.coincarp.com/logo/1/mm-finance.png?style=72" alt="VVS Logo" className={`size-${size} rounded-full`}/>
    : dex === 'fluxbeam' ?
    <img src="https://docs.fluxbot.xyz/~gitbook/image?url=https%3A%2F%2F3344056715-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FEbCVS53ugYXBSvboYJSn%252Ficon%252F9W2qWJHbbqhQ2CtySnbM%252Flogo%2520%281%29.png%3Falt%3Dmedia%26token%3De437081e-5079-4922-8e24-d34b64689661&width=32&dpr=1&quality=100&sign=00e9665be681aaee4c70ee733efab570daea3925412a6acbc30463924ff6b059" alt="Pancakeswap Logo" className={`size-${size}`}/>
    : dex === 'sushiswap_arbitrum' ?
    <img src="https://seekvectors.com/storage/images/SushiSwap-01.svg" alt="Pancakeswap Logo" className={`size-${size}`}/>
    : dex === 'sushiswap' ?
    <img src="https://seekvectors.com/storage/images/SushiSwap-01.svg" alt="Pancakeswap Logo" className={`size-${size}`}/>
    : dex === 'balancer_ethereum' ?
    <img src="https://cryptologos.cc/logos/balancer-bal-logo.png?v=031" alt="Pancakeswap Logo" className={`size-${size}`}/>
    : dex === 'balancer' ?
    <img src="https://cryptologos.cc/logos/balancer-bal-logo.png?v=031" alt="Pancakeswap Logo" className={`size-${size}`}/>
    : dex === 'pancakeswap' ?
    <img src="https://cryptologos.cc/logos/pancakeswap-cake-logo.svg?v=029" alt="Pancakeswap Logo" className={`size-${size}`}/>
    : dex === 'pancakeswap-v1-bsc' ?
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
