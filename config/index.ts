import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia, polygon,bsc,fantom,zkSync,goerli } from 'wagmi/chains'

// Get projectId at https://cloud.walletconnect.com
export const projectId = '2a176328f8320011ee72ffdca9a062f4' as string

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'Dexup',
  description: 'Web3Modal Example',
  url: 'https://dexup.vercel.app', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: [mainnet, sepolia,polygon,bsc,fantom,zkSync,goerli], // required
  projectId, // required
  metadata, // required
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
  // ...wagmiOptions // Optional - Override createConfig parameters
})