import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const providers = [];

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    providers.push(
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
    );
}

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    );
}

// One week, in seconds. Used for both the session cookie lifetime and the JWT
// expiry below.
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;


export const authOptions: AuthOptions = {
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: SESSION_MAX_AGE,
        updateAge: 60 * 60 * 24, // refresh the rolling window at most once per day
    },
    jwt: {
        maxAge: SESSION_MAX_AGE,
    },
    callbacks: {
        async jwt({ token }) {
            if (token.sub) {
                token.userId = token.sub;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.userId) {
                (session.user as { userId?: string }).userId = token.userId as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/',
    },
};