import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export function middleware(request: NextRequest){
  //@ts-ignore
  const cookieStore = cookies()

  const data:any = JSON.parse(cookieStore?.get('wagmi.store')?.value as any)

  if(request.nextUrl.pathname === '/dashboard' && data?.state?.current === undefined){
    return NextResponse.redirect(new URL('/', request?.url))
  }

  let walletAddress = data?.state?.connections?.value[0]?.map((item:any) => item?.accounts)?.[1]
  walletAddress = walletAddress[0]

  if(request.nextUrl.pathname === '/dashboard' && walletAddress !== '0x24999A8188a103a742828a933212F03e349e18C5'){
    return NextResponse.redirect(new URL('/', request?.url))
  }

  if(request.nextUrl.pathname === '/api'){
    return NextResponse.redirect(new URL('/', request?.url))
  }


  // const response = NextResponse.next()
  // const themePreference = request.cookies.get('theme')
  // if(!themePreference){
  //   response.cookies.set('theme','dark')
  // }
  // response.headers.set('custom-header','custom-value')
  
  // return response;

  // return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/api', '/dashboard'],
}