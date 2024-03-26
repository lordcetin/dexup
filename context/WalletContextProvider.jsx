'use client'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import * as walletAdapterWallets from '@solana/wallet-adapter-wallets'
import * as web3 from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletContextProvider = ({ children }) => {

    const endpoint = web3.clusterApiUrl('mainnet-beta');
    const wallets = [
        new walletAdapterWallets.PhantomWalletAdapter(),
        new walletAdapterWallets.SolflareWalletAdapter(),
        new walletAdapterWallets.TorusWalletAdapter(),
        new walletAdapterWallets.SolongWalletAdapter(),
        new walletAdapterWallets.CloverWalletAdapter(),
        new walletAdapterWallets.LedgerWalletAdapter(),
        new walletAdapterWallets.TrustWalletAdapter(),
        new walletAdapterWallets.CoinbaseWalletAdapter(),
    ];

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;