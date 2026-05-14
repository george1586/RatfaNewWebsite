import posthog from 'posthog-js';

posthog.init('phc_qXLkPzb68QAAvD9UCtWPsuUdeLFB9krx8uLTqAD5dZvn', {
    api_host: 'https://eu.i.posthog.com',
    capture_pageview: false,
    capture_pageleave: true,
    persistence: 'localStorage',
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
