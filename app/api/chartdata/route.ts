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


  const responseOHLC  = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${baseCoinId}/ohlc?vs_currency=usd&days=max&precision=4`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
    cache:'no-store',
  });
  const dataOHLC:any = await responseOHLC.json();

  const responseVolume  = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${baseCoinId}/market_chart/range?vs_currency=usd&from=${from}&to=${to}&precision=4`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
    cache:'no-store',
  });
  const dataVolume:any = await responseVolume.json();

  // Hacim verileri mevcut değilse veya boşsa, boş bir dizi döndür
  if (!dataVolume.prices || dataVolume.prices.length === 0) {
    // OHLC verilerini dön
    return NextResponse.json(dataOHLC, { status: 200 });
  }

  // OHLC ve hacim verilerini birleştirerek OHLCV formatında bir veri seti oluştur
  const bars = dataOHLC.map((ohlcItem: any, index: number) => {
    // Hacim verileri mevcutsa ve index'e göre bir elemanı varsa hacim değerini al, yoksa 0 olarak ayarla
    const volume = dataVolume.prices[index] ? dataVolume.prices[index][1] : 0;
    return {
      time: ohlcItem[0],
      open: ohlcItem[1],
      high: ohlcItem[2],
      low: ohlcItem[3],
      close: ohlcItem[4],
      volume: volume
    };
  });

  const data = bars
  return NextResponse.json(data,{status:200})

}