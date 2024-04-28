import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const chain = searchParams.get('chain');
  const pooladdress = searchParams.get('pooladdress');

    // const netResponse = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks`, {
    //   method: 'GET',
    //   headers: { 'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ' },
    // });
    // const netData = await netResponse.json();
    
    // const network = netData.data.filter((item:any) => item.attributes.coingecko_asset_platform_id === chain)
    // const chaId = network[0]?.id
    // const coingecko_asset_platform_id = network[0]?.attributes?.coingecko_asset_platform_id

    const poolResponse = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${chain === 'arbitrum' ? 'arbitrum' : chain === 'cronos' ? 'cro' : chain === 'the-open-network' ? 'ton' : chain  === 'ethereum' ? 'eth' : chain === 'binance-smart-chain' ? 'bsc' : chain === 'solana' ? 'solana' : chain}/pools/${pooladdress}?include=base_token%2C%20quote_token%2C%20dex`, {
      method: 'GET',
      headers: { 'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ' },
    });
    const poolData = await poolResponse.json();

    // Assume base and quote data are available
    const baseToken = poolData.included.find((i:any) => i.id === poolData.data.relationships.base_token.data.id);
    const quoteToken = poolData.included.find((i:any) => i.id === poolData.data.relationships.quote_token.data.id);

    const data = {
      id: poolData.data.id,
      name: poolData.data.attributes.name,
      baseImg: baseToken.attributes.image_url,
      quoteImg: quoteToken.attributes.image_url,
      pooladdress: poolData.data.attributes.address,
      basename: baseToken.attributes.name,
      quotename: quoteToken.attributes.name,
      baseTokenSymbol: baseToken.attributes.symbol,
      quoteTokenSymbol: quoteToken.attributes.symbol,
      baseaddress: baseToken.attributes.address,
      quoteaddress: quoteToken.attributes.address,
      basecoinId: baseToken.attributes.coingecko_coin_id,
      quotecoinId: quoteToken.attributes.coingecko_coin_id,
      created: poolData.data.attributes.pool_created_at,
      baseprice: poolData.data.attributes.base_token_price_usd,
      quoteprice: poolData.data.attributes.quote_token_price_usd,
      fdv: poolData.data.attributes.fdv_usd,
      cap: poolData.data.attributes.market_cap_usd,
      price_change_percentage: poolData.data.attributes.price_change_percentage,
      transactions: poolData.data.attributes.transactions,
      volume_usd: poolData.data.attributes.volume_usd,
      reserve: poolData.data.attributes.reserve_in_usd,
      dex: poolData.data.relationships.dex.data.id,
    };

    return NextResponse.json(data, { status: 200 });

}
