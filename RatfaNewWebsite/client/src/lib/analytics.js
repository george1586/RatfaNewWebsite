import posthog from 'posthog-js';

posthog.init('phc_qXLkPzb68QAAvD9UCtWPsuUdeLFB9krx8uLTqAD5dZvn', {
    api_host: 'https://eu.i.posthog.com',
    capture_pageview: false,
    capture_pageleave: true,
    persistence: 'localStorage',
});

export const track = (event, props = {}) => posthog.capture(event, props);
export default posthog;
