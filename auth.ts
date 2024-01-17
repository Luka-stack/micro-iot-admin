import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { revalidateTag } from 'next/cache';
import { getServerSession } from 'next-auth';
import type { NextAuthOptions, User } from 'next-auth';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';

import { postRequestOld } from './lib/fetch-client';
import { AuthEndpoints } from './lib/apis';

export const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),

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
          const response = await postRequestOld<User>(
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
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const googleUser = {
          idToken: account.id_token,
          email: user.email,
          name: user.name,
        };

        try {
          const response = await postRequestOld<User>(
            AuthEndpoints.providerLogin('google'),
            googleUser,
            200
          );
          user.accessToken = response.accessToken;
          user.user = response.user;

          if (response.newUser) {
            revalidateTag('users');
          }
        } catch (error) {
          console.log(error);
          throw new Error("Couldn't authenticate with Google");
        }
      }

      return true;
    },

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
  pages: {
    error: '/auth/signin',
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
