import posthog from 'posthog-js';

// Prevent the PostHog debug toolbar from ever auto-launching for visitors.
// The toolbar loads when the URL hash contains `__posthog` or when a stale
// toolbar token is persisted in storage from a previous authorized session.
// We strip both before init so it can never re-attach over the page.
if (typeof window !== 'undefined') {
    try {
        if (window.location.hash.includes('__posthog')) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }
        [localStorage, sessionStorage].forEach((store) => {
            for (let i = store.length - 1; i >= 0; i--) {
                const key = store.key(i);
                if (key && (key.includes('__posthog') || key.toLowerCase().includes('toolbar'))) {
                    store.removeItem(key);
                }
            }
        });
    } catch {
        /* storage may be unavailable (private mode / SSR) — safe to ignore */
    }
}

posthog.init('phc_qXLkPzb68QAAvD9UCtWPsuUdeLFB9krx8uLTqAD5dZvn', {
    api_host: 'https://eu.i.posthog.com',
    capture_pageview: false,
    capture_pageleave: true,
    persistence: 'localStorage',
    // No PostHog-rendered UI: the survey/feedback widget would otherwise
    // float over the page (past the footer) on the deployed site.
    disable_surveys: true,
});

const pageContext = () => {
    if (typeof window === 'undefined') return {};
    return {
        page_path: window.location.pathname,
        page_search: window.location.search || undefined,
        page_title: document.title || undefined,
        referrer: document.referrer || undefined,
        viewport_w: window.innerWidth,
        viewport_h: window.innerHeight,
    };
};

export const track = (event, props = {}) =>
    posthog.capture(event, { ...pageContext(), ...props });

export default posthog;
