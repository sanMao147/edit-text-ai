import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

interface RequestWithGeo extends NextRequest {
  geo?: {
    country?: string;
    city?: string;
    region?: string;
    latitude?: string;
    longitude?: string;
  };
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 跳过 API 路由和静态资源
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return;
  }

  // 1. 优先检查 cookie 中的手动选择
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const isValidLocale = routing.locales.includes(
    cookieLocale as (typeof routing.locales)[number],
  );

  if (isValidLocale && cookieLocale) {
    // 如果 URL 中已经有 locale 前缀，不需要重定向
    if (pathname.startsWith(`/${cookieLocale}`)) {
      const handleI18nRouting = createMiddleware(routing);
      return handleI18nRouting(request);
    }
  }

  // 2. 无手动选择时，通过 IP 地理位置检测
  if (!isValidLocale) {
    const reqWithGeo = request as RequestWithGeo;
    const country = reqWithGeo.geo?.country;
    const detectedLocale = country === 'CN' ? 'zh' : 'en';

    if (!pathname.startsWith(`/${detectedLocale}`)) {
      const newUrl = new URL(
        `/${detectedLocale}${pathname === '/' ? '' : pathname}`,
        request.url,
      );
      const response = NextResponse.redirect(newUrl);
      response.cookies.set('NEXT_LOCALE', detectedLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
      });
      return response;
    }
  }

  // 3. 使用 next-intl 的 middleware 处理路由
  const handleI18nRouting = createMiddleware(routing);
  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
