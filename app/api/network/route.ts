import { NextResponse , NextRequest} from "next/server"
import axios from 'axios';

export async function GET(req:NextRequest) {
  const searchParams = req.nextUrl.searchParams
  let chainname = searchParams.get('chainname')

  // const response = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks?page=1`,{
  //   method:'GET',
  //   headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
  // });

  // const data = await response.json()


    // Coingecko API'den alınacak sayfa numaraları
  const pages = [1, 2];
  
    // Her sayfa için paralel istekler yap
    const responses = await Promise.all(
      pages.map(page =>
        fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks?page=${page}`, {
          method: 'GET',
          headers: {'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'}
        }).then(res => res.json()) // Burada doğrudan JSON'a çeviriyoruz
      )
    );

    // Her bir yanıttan gelen veriyi birleştir
    const allData = responses.flatMap(data => data.data); // flatMap kullanarak tüm sayfa verilerini tek bir diziye düzleştirebiliriz.

  return NextResponse.json(allData,{status:200})

}