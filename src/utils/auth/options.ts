import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

// Providers
import SpotifyProvider from 'next-auth/providers/spotify';
import { prisma } from '@/utils/db/prisma';
import { Adapter } from 'next-auth/adapters';

const handler: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,

    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
        }),
    ],

    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.id = account.id;
                token.access_token = account.access_token;
            }

            return token;
        },

        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
};

export default handler;
