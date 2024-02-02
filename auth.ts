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

import { postRequest } from './lib/fetch-client';
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

        const response = await postRequest<User>(AuthEndpoints.login, {
          email: credentials.email,
          password: credentials.password,
        });

        if (response.hasError) {
          throw new Error(response.messages.join(',\n'));
        }

        return response.fetchedData!;
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

        const { fetchedData, ...error } = await postRequest<User>(
          AuthEndpoints.providerLogin('google'),
          googleUser
        );

        if (error.hasError) {
          throw new Error(error.messages.join(',\n'));
        }

        user.accessToken = fetchedData!.accessToken;
        user.user = fetchedData!.user;

        if (fetchedData!.newUser) {
          revalidateTag('users');
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
