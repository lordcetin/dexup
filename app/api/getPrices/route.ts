import { NextResponse , NextRequest} from "next/server"
import axios from 'axios';
type Prices = {
  Date:string,
  Price:number
};
export async function GET(req:NextRequest) {

    const searchParams = req.nextUrl.searchParams

    const coinId = searchParams.get('coinId')
    const currency = searchParams.get('currency') || 'usd'
    const days = searchParams.get('days') || '1'

    let data:Prices[]= [];
    await fetch(`https://pro-api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
    cache:'no-store',
    }).then((res:any) => res.json()).then((res:any) => {
    
    for(const token of res.prices){
     const [timestamp,p] = token;
     const date = new Date(timestamp).toLocaleDateString('en-us');
     data.push({Date:date,Price:Number(p?.toFixed(2))})
    }
  }).catch(err => console.error(err));

  return NextResponse.json(data,{status:200})

}