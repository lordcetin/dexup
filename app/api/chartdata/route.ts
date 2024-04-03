import { NextResponse , NextRequest} from "next/server"
import axios from 'axios';
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = 3600
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5
export async function GET(req:NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const baseCoinId = searchParams.get('baseCoinId')
  const from = searchParams.get('from')
  const to = searchParams.get('to')


  const responseOHLC  = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${baseCoinId}/ohlc?vs_currency=usd&days=1`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
    cache:'no-store',
  });
  const dataOHLC = await responseOHLC.json();
  console.log("dataOHLC",dataOHLC)
  const responseVolume  = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${baseCoinId}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
    cache:'no-store',
  });
  const dataVolume = await responseVolume.json();

  const bars = {
    time: dataOHLC.map((price: any) => Math.floor(price[0] * 1000)),
    open: dataOHLC.map((price: any) => price[1]), // Açılış fiyatı, Coingecko'dan gelen fiyatla aynı
    high: dataOHLC.map((price: any) => price[2]), // En yüksek fiyat, Coingecko'dan gelen fiyatla aynı
    low: dataOHLC.map((price: any) => price[3]), // En düşük fiyat, Coingecko'dan gelen fiyatla aynı
    close: dataOHLC.map((price: any) => price[4]),
    volume: dataVolume.prices.map((volumeData: any) => volumeData[1]).slice(0,48) // Hacim sıfır olarak belirtildi, çünkü Coingecko'dan gelen verilerde hacim bilgisi yok
  }

  const data = bars
  return NextResponse.json(data,{status:200})

}