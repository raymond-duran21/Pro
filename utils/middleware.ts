import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        if (
            request.nextUrl.pathname.startsWith("/dashboard") &&
            !request.nextauth.token?.roles.some((role) =>
              [
                "App_Tic_Admin",
                "App_Tic_Usuario",
              ].includes(role)
            )
          ) {
            return NextResponse.rewrite(new URL("/acceso-denegado", request.url));
          }
    },
    {
      callbacks: {
        authorized: ({ token }) => !!token,
      },
    }
  );

export const config = { 
    matcher: [
        "/dashboard",
        "/dashboard/:path*",
        "acceso-denegado"] }