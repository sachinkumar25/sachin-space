
import { NextRequest } from 'next/server';

export function verifyOrigin(request: NextRequest): boolean {
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    const host = request.headers.get('host'); // e.g., 'localhost:3000' or 'my-site.vercel.app'

    // If no origin or referer, strictly block (browsers always send these for fetch/XHR)
    if (!origin && !referer) {
        return false;
    }

    // Check Origin
    if (origin) {
        const originUrl = new URL(origin);
        if (originUrl.host !== host) {
            return false;
        }
    }

    // Check Referer
    if (referer) {
        const refererUrl = new URL(referer);
        if (refererUrl.host !== host) {
            return false;
        }
    }

    return true;
}
