import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions, User } from 'next-auth';

import { postRequest } from '@/lib/fetch-client';
import { AuthEndpoints } from '@/common/apis';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'local-login',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Wrong credentials');
        }

        try {
          const response = await postRequest<User>(
            AuthEndpoints.login,
            {
              email: credentials.email,
              password: credentials.password,
            },
            200
          );

          return response;
        } catch (error) {
          throw new Error('Wrong credentials');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          user: user.user,
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
