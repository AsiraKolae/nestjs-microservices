import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
      const token = await getToken({ req })
      const isAuthenticated = !!token

      const authRoutes = ["/login", "/register"]
      const protectRoutes = ["/profile", "/cart", "/invoice"]

      if (authRoutes.includes(req.nextUrl.pathname) && isAuthenticated) {
          return NextResponse.redirect(new URL('/', req.url))
      }

      if (protectRoutes.includes(req.nextUrl.pathname) && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', req.url))
      }
  },
  {
      callbacks: {
          authorized: () => true,
      },
  }
)

//route ที่ต้องการให้ผ่าน middleware
export const config = {
  matcher: ['/login', "/profile", "/register", "/cart", "/invoice"],
}