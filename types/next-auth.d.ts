import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      displayName: string;
      email: string;
      role: string;
    };
    accessToken?: string;
  }

  interface User {
    user?: {
      displayName: string;
      email: string;
      role: string;
    };
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user?: {
      displayName: string;
      email: string;
      role: string;
    };
    accessToken?: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}
