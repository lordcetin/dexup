export async function makeApiRequest(network,pool) {
  try {
      const response = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${network}/pools/${pool}/ohlcv/day?currency=usd`);
      return response.json();
  } catch(error) {
      throw new Error(`CryptoCompare request error: ${error.status}`);
  }
}

export function generateSymbol(exchange, fromSymbol, toSymbol) {
  const short = `${fromSymbol}/${toSymbol}`;
  return {
      short,
      full: `${exchange}:${short}`,
  };
}