import { NextAuthOptions } from 'next-auth';

// Providers
import SpotifyProvider from 'next-auth/providers/spotify';

const handler: NextAuthOptions = {
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
