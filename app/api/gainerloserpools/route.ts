import axios from "axios"
import { NextResponse , NextRequest} from "next/server"

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = 3600
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

export async function GET(req:NextRequest) {

    let gainer:any = []
    let loser:any = []
    let data:[] = []

    const responseData = await fetch('https://pro-api.coingecko.com/api/v3/coins/top_gainers_losers?vs_currency=usd',{
      method:'GET',
      headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
      cache:'no-store',
    })

    const response = await responseData.json();

    const gainers = response.top_gainers.map((token:any) => {
      

      fetch(`https://pro-api.coingecko.com/api/v3/coins/${token.id}`,{
        method:'GET',
        headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
        cache:'no-store',

      }).then(response => response.json()).then((response:any) => {

          fetch(`https://pro-api.coingecko.com/api/v3/asset_platforms/`,{
            method:'GET',
            headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
            cache:'no-store',

          }).then((data:any) => data.json()).then((data:any) => {

            let platform:any = data.filter((item:any) => item.id == response.asset_platform_id)
            let py = platform[0]

          fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${response.asset_platform_id === "binance-smart-chain" ? 'bsc' : response.asset_platform_id === 'ethereum' ? 'eth' : response.asset_platform_id}/tokens/${response.contract_address}/pools?include=base_token%2C%20quote_token%2C%20dex`,{
            method:'GET',
            headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
            cache:'no-store',

          }).then(response => response.json()).then((response:any) => {

            if(response.data && response.included){

              const newPair = response.data.map((item:any) => {
                const baseId = item.relationships.base_token.data.id
                const quoteId = item.relationships.quote_token.data.id
                let baseImg = response.included.find((i:any)=> i.id  == baseId).attributes.image_url;
                let quoteImg = response.included.find((i:any)=> i.id  == quoteId).attributes.image_url;
                const baseSymbol = response.included.find((i:any)=> i.id  == baseId).attributes.symbol;
                const quoteSymbol = response.included.find((i:any)=> i.id  == quoteId).attributes.symbol;
                const basecoinId = response.included.find((i:any)=> i.id  == baseId).attributes.coingecko_coin_id;
                const quotecoinId = response.included.find((i:any)=> i.id  == quoteId).attributes.coingecko_coin_id;
                const basename = response.included.find((i:any)=> i.id  == baseId).attributes.name;
                const quotename = response.included.find((i:any)=> i.id  == quoteId).attributes.name;
                const baseaddress = response.included.find((i:any)=> i.id  == baseId).attributes.address;
                const quoteaddress = response.included.find((i:any)=> i.id  == quoteId).attributes.address;

                const paircoin = {
                  name:item.attributes.name,
                  platform:py,
                  baseImg,
                  quoteImg,
                  pooladdress:item.attributes.address,
                  basename,
                  quotename,
                  baseSymbol,
                  quoteSymbol,
                  baseaddress,
                  quoteaddress,
                  basecoinId,
                  quotecoinId,
                }
                
                return {
                  id: item.id,
                  paircoin,
                  name:item.attributes.name,
                  basename,
                  quotename,
                  baseSymbol,
                  quoteSymbol,
                  baseImg,
                  quoteImg,
                  baseaddress,
                  quoteaddress,
                  basecoinId,
                  quotecoinId,
                  created:item.attributes.pool_created_at,
                  pooladdress:item.attributes.address,
                  baseprice:item.attributes.base_token_price_usd,
                  quoteprice:item.attributes.quote_token_price_usd,
                  fdv:item.attributes.fdv_usd,
                  cap:item.attributes.market_cap_usd,
                  price_change_percentage:item.attributes.price_change_percentage,
                  transactions:item.attributes.transactions,
                  volume_usd:item.attributes.volume_usd,
                  reserve:item.attributes.reserve_in_usd,
                  dex:item.relationships.dex.data.id,
                }

              });

              // gainer.push(newPair[0])
              
              data.push(newPair[0])
            }
          })
          })
        }).catch(err => console.error(err));

      })


    const losers = response.top_losers.map((token:any) => {
      fetch(`https://pro-api.coingecko.com/api/v3/coins/${token.id}`,{
        method:'GET',
        headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
        cache:'force-cache',
      })
        .then(response => response.json())
        .then(response => {

          fetch(`https://pro-api.coingecko.com/api/v3/asset_platforms/`,{
            method:'GET',
            headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
            cache:'force-cache',
          }).then((data:any) => data.json()).then((data:any) => {

            let platform:any = data.filter((item:any) => item.id == response.asset_platform_id)
            let py = platform[0]

          fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${response.asset_platform_id === "binance-smart-chain" ? 'bsc' : response.asset_platform_id === 'ethereum' ? 'eth' : response.asset_platform_id}/tokens/${response.contract_address}/pools?include=base_token%2C%20quote_token%2C%20dex`,{
            method:'GET',
            headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
            cache:'force-cache',
          }).then(response => response.json()).then((response:any) => {

            if(response.data && response.included){

              const newPair = response.data.map((item:any) => {
                const baseId = item.relationships.base_token.data.id
                const quoteId = item.relationships.quote_token.data.id
                let baseImg = response.included.find((i:any)=> i.id  == baseId).attributes.image_url;
                let quoteImg = response.included.find((i:any)=> i.id  == quoteId).attributes.image_url;
                const baseSymbol = response.included.find((i:any)=> i.id  == baseId).attributes.symbol;
                const quoteSymbol = response.included.find((i:any)=> i.id  == quoteId).attributes.symbol;
                const basecoinId = response.included.find((i:any)=> i.id  == baseId).attributes.coingecko_coin_id;
                const quotecoinId = response.included.find((i:any)=> i.id  == quoteId).attributes.coingecko_coin_id;
                const basename = response.included.find((i:any)=> i.id  == baseId).attributes.name;
                const quotename = response.included.find((i:any)=> i.id  == quoteId).attributes.name;
                const baseaddress = response.included.find((i:any)=> i.id  == baseId).attributes.address;
                const quoteaddress = response.included.find((i:any)=> i.id  == quoteId).attributes.address;
      
                const paircoin = {
                  name:item.attributes.name,
                  baseImg,
                  quoteImg,
                  platform:py,
                  pooladdress:item.attributes.address,
                  basename,
                  quotename,
                  baseSymbol,
                  quoteSymbol,
                  baseaddress,
                  quoteaddress,
                  basecoinId,
                  quotecoinId,
                }
                
                return {
                  id: item.id,
                  paircoin,
                  name:item.attributes.name,
                  basename,
                  quotename,
                  baseSymbol,
                  quoteSymbol,
                  baseImg,
                  quoteImg,
                  baseaddress,
                  quoteaddress,
                  basecoinId,
                  quotecoinId,
                  created:item.attributes.pool_created_at,
                  pooladdress:item.attributes.address,
                  baseprice:item.attributes.base_token_price_usd,
                  quoteprice:item.attributes.quote_token_price_usd,
                  fdv:item.attributes.fdv_usd,
                  cap:item.attributes.market_cap_usd,
                  price_change_percentage:item.attributes.price_change_percentage,
                  transactions:item.attributes.transactions,
                  volume_usd:item.attributes.volume_usd,
                  reserve:item.attributes.reserve_in_usd,
                  dex:item.relationships.dex.data.id,
                }
              });
              // loser.push(newPair[0])
              data.push({loser:newPair[0]})
            }

          })
        })
        }).catch(err => console.error(err));
      })


  return NextResponse.json(data,{status:200})

}