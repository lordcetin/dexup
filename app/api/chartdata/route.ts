import { NextResponse , NextRequest} from "next/server"

export async function GET(req:NextRequest) {
  const searchParams:any = req.nextUrl.searchParams
  const chain = searchParams.get('chain')
  const pooladdress = searchParams.get('pooladdress')
  const to = searchParams.get('to')
  // const to = new Date().getTime()

  let bars:any[] = [];

  const response15  = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${chain}/pools/${pooladdress}/ohlcv/minute?aggregate=15&before_timestamp=${to}&limit=1000&currency=usd&token=base`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
  });

  const data15 = await response15.json();
  const datas15 = data15?.data?.attributes?.ohlcv_list


  const bars15 = datas15.sort((a:any, b:any) => a[0] * 1000 - b[0] * 1000).map((ohlcItem:any) => {
    return {
        time: ohlcItem[0] * 1000,
        open: parseFloat(ohlcItem[1]),
        high: parseFloat(ohlcItem[2]),
        low: parseFloat(ohlcItem[3]),
        close: parseFloat(ohlcItem[4]),
        volume: parseFloat(ohlcItem[5])
    };
  });

  const responseDay  = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${chain}/pools/${pooladdress}/ohlcv/day?aggregate=1&before_timestamp=${to}&limit=1000&currency=usd&token=base`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
  });

  const dataDay = await responseDay.json();
  const datasDay = dataDay?.data?.attributes?.ohlcv_list


  const barsDay = datasDay.sort((a:any, b:any) => a[0] * 1000 - b[0] * 1000).map((ohlcItem:any) => {
    return {
        time: ohlcItem[0] * 1000,
        open: parseFloat(ohlcItem[1]),
        high: parseFloat(ohlcItem[2]),
        low: parseFloat(ohlcItem[3]),
        close: parseFloat(ohlcItem[4]),
        volume: parseFloat(ohlcItem[5])
    };
  });

  const response1  = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${chain}/pools/${pooladdress}/ohlcv/minute?aggregate=1&before_timestamp=${to}&limit=1000&currency=usd&token=base`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
  });

  const data1 = await response1.json();
  const datas1 = data1?.data?.attributes?.ohlcv_list


  const bars1 = datas1.sort((a:any, b:any) => a[0] * 1000 - b[0] * 1000).map((ohlcItem:any) => {
    return {
        time: ohlcItem[0] * 1000,
        open: parseFloat(ohlcItem[1]),
        high: parseFloat(ohlcItem[2]),
        low: parseFloat(ohlcItem[3]),
        close: parseFloat(ohlcItem[4]),
        volume: parseFloat(ohlcItem[5])
    };
  });


  const response5  = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${chain}/pools/${pooladdress}/ohlcv/minute?aggregate=5&before_timestamp=${to}&limit=1000&currency=usd&token=base`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
  });

  const data5 = await response5.json();
  const datas5 = data5?.data?.attributes?.ohlcv_list


  const bars5 = datas5.sort((a:any, b:any) => a[0] * 1000 - b[0] * 1000).map((ohlcItem:any) => {
    return {
        time: ohlcItem[0] * 1000,
        open: parseFloat(ohlcItem[1]),
        high: parseFloat(ohlcItem[2]),
        low: parseFloat(ohlcItem[3]),
        close: parseFloat(ohlcItem[4]),
        volume: parseFloat(ohlcItem[5])
    };
  });

  const response60  = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${chain}/pools/${pooladdress}/ohlcv/hour?aggregate=1&before_timestamp=${to}&limit=1000&currency=usd&token=base`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
  });

  const data60 = await response60.json();
  const datas60 = data60?.data?.attributes?.ohlcv_list


  const bars60 = datas60.sort((a:any, b:any) => a[0] * 1000 - b[0] * 1000).map((ohlcItem:any) => {
    return {
        time: ohlcItem[0] * 1000,
        open: parseFloat(ohlcItem[1]),
        high: parseFloat(ohlcItem[2]),
        low: parseFloat(ohlcItem[3]),
        close: parseFloat(ohlcItem[4]),
        volume: parseFloat(ohlcItem[5])
    };
  });

  const response240  = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${chain}/pools/${pooladdress}/ohlcv/hour?aggregate=4&before_timestamp=${to}&limit=1000&currency=usd&token=base`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
  });

  const data240 = await response240.json();
  const datas240 = data240?.data?.attributes?.ohlcv_list


  const bars240 = datas240.sort((a:any, b:any) => a[0] * 1000 - b[0] * 1000).map((ohlcItem:any) => {
    return {
        time: ohlcItem[0] * 1000,
        open: parseFloat(ohlcItem[1]),
        high: parseFloat(ohlcItem[2]),
        low: parseFloat(ohlcItem[3]),
        close: parseFloat(ohlcItem[4]),
        volume: parseFloat(ohlcItem[5])
    };
  });

  bars.push({bars15,bars1,bars5,bars60,bars240,barsDay})

  return NextResponse.json(bars,{status:200})

}