'use client';

import { useSearchParams } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

// NextAuth redirects back to `pages.signIn` (our homepage) with `?error=<code>`
// whenever a sign-in attempt fails — including when a provider isn't configured
// on the server (e.g. missing GOOGLE_CLIENT_ID/SECRET). Without this banner that
// redirect is invisible: the page just reloads with no visible change, which
// looks like "clicking the button did nothing".
const ERROR_MESSAGES: Record<string, string> = {
    Configuration:
        'This sign-in method is not configured on the server yet (missing client ID/secret). Try the other sign-in option.',
    OAuthSignin: 'Could not start the sign-in flow with this provider. Please try again.',
    OAuthCallback: 'Something went wrong completing sign-in with this provider. Please try again.',
    OAuthCreateAccount: 'Could not create an account from this provider. Please try again.',
    EmailCreateAccount: 'Could not create an account with this email.',
    Callback: 'Something went wrong during sign-in. Please try again.',
    OAuthAccountNotLinked:
        'This email is already associated with a different sign-in method. Please use the method you originally signed up with.',
    AccessDenied: 'Access was denied for this sign-in attempt.',
    Verification: 'The sign-in link is no longer valid.',
    Default: 'Something went wrong signing in. Please try again.',
};

export default function AuthErrorBanner() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    if (!error) return null;

    const message = ERROR_MESSAGES[error] ?? ERROR_MESSAGES.Default;

    return (
        <div
            className="glass-card"
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                padding: '14px 16px',
                marginBottom: 24,
                border: '1px solid rgba(248,113,113,0.3)',
                background: 'rgba(248,113,113,0.08)',
                color: '#fca5a5',
                fontSize: '0.86rem',
                lineHeight: 1.6,
                textAlign: 'left',
                maxWidth: 620,
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
        >
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>{message}</span>
        </div>
    );
}