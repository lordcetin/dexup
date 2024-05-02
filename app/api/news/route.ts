import {NextRequest, NextResponse} from 'next/server'

export async function GET(req:NextRequest){
  // const searchParams = req.nextUrl.searchParams;
  // const value = searchParams.get('value');

  //Şunu kullanarak herhangi bir kullanıcı arayüzü filtresini kullanabilirsiniz filter=(rising|hot|bullish|bearish|important|saved|lol)
  //Kullanarak para birimlerine göre filtreleyin currencies=CURRENCY_CODE1,CURRENCY_CODE2(maks. 50):
  /*Filter by region using regions=REGION_CODE1,REGION_CODE2. Default: en.
    Available regions: en (English), de (Deutsch), nl (Dutch), es (Español), fr (Français), it (Italiano), pt (Português), ru (Русский), tr (Türkçe), ar (عربي), cn (中國人), jp (日本), ko (한국인):*/
  //Filter by kind using kind=news. Default: all. Available values: news or media

  const res = await fetch(`https://cryptopanic.com/api/v1/posts/?auth_token=f2e868c37796a538dabbe9c3815bd267c55faf6d&filter=rising`,{
    next:{revalidate:3000}
  })
  const data = await res.json()

  return NextResponse.json(data,{status:200})
}