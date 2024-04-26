import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
  if(request.nextUrl.pathname === '/api'){
    return NextResponse.redirect(new URL('/', request.url))
    // return NextResponse.rewrite(new URL('/', request.url)) //rewrite yönlendirilen sayfaya gider fakat arama çubuğunda gidilmek istenen yolu da gösterir
  }
  const response = NextResponse.next()
  const themePreference = request.cookies.get('theme')
  if(!themePreference){
    response.cookies.set('theme','dark')
  }
  response.headers.set('custom-header','custom-value')
  
  return response;

  // return NextResponse.redirect(new URL('/', request.url))
}

// export const config = {
//   matcher: '/api',
// }