import { NextResponse , NextRequest} from "next/server"
import axios from 'axios';
import cryptoJS from 'crypto-js'; // Şifreleme hesaplamaları için şifreleme modüllerini içe aktarın
import {MAX_ALLOWANCE} from '@/lib/constants'
import qs from 'qs';
export async function GET(req:NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const requestPath = '/api/v5/dex/aggregator/all-tokens'
  const chainId = searchParams.get('chainId')
  const query = qs.stringify({ chainId });
  
  const apiBaseUrl = 'https://www.okx.com';
  const secretKey = '4F937558EA8FBB7A92A7EE5F1A19AD1F';
  const apiKey = 'aba65d68-3537-4b65-ad22-bfa1d6d01330';
  const passphrase = '3d4D5d6s.com';
  const timestamp = new Date().toISOString();
  const projectId = '4027c5e608bd7c0c07675eb43d881299';
  const signature = cryptoJS.enc.Base64.stringify(cryptoJS.HmacSHA256(timestamp + 'GET' + requestPath + '?' + query, secretKey));


  const response = await axios.get(`${apiBaseUrl}${requestPath}?${query}`,{
    headers:{
    'Content-Type': 'application/json',
    'OK-ACCESS-KEY': apiKey,
    'OK-ACCESS-SIGN': signature,
    'OK-ACCESS-TIMESTAMP': timestamp,
    'OK-ACCESS-PASSPHRASE': passphrase,
    'OK-ACCESS-PROJECT': projectId,
    }
  });
  const data = response.data
  return NextResponse.json(data,{status:200})

}