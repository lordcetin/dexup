/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental:{
    serverActions:true,
  },
  images:{
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's1.coincarp.com'
      },
      {
        protocol: 'https',
        hostname: 'cryptologos.cc'
      },
      {
        protocol: 'https',
        hostname: 'wembleypark.com'
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com'
      },
      {
        protocol: 'https',
        hostname: 'assets.geckoterminal.com'
      },
      {
        protocol: 'https',
        hostname: 'ton.app'
      },
      {
        protocol: 'https',
        hostname: 'aerodrome.finance'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'cryptoeccetera.com'
      },
      {
        protocol: 'https',
        hostname: 'bscscan.com'
      },
      {
        protocol: 'https',
        hostname: 'arbiscan.io'
      },
    ]
  },
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

export default nextConfig;
