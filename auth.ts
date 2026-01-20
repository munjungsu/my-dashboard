import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';
import { z } from 'zod';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/login',
  },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      
      // 로그인 페이지는 누구나 접근 가능
      if (isOnLogin) {
        // 이미 로그인된 사용자는 메인 페이지로 리다이렉트
        if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
      }
      
      // 그 외 모든 페이지는 로그인 필요
      if (!isLoggedIn) {
        return false; // 로그인 페이지로 리다이렉트
      }
      
      return true;
    },
    // 필요하다면 jwt, session 콜백도 여기에 추가 가능
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = (user as User).role
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.email = token.email as string
      session.user.role = token.role as string
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
});