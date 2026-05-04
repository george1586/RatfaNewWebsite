import { useEffect } from 'react';

export function useSeo({ title, description, canonical }) {
    useEffect(() => {
        if (title) document.title = title;

        const setMeta = (selector, attr, value) => {
            if (!value) return;
            let el = document.querySelector(selector);
            if (!el) {
                el = document.createElement('meta');
                const [key, val] = attr.split('=').map(s => s.replace(/"/g, ''));
                el.setAttribute(key, val);
                document.head.appendChild(el);
            }
            el.setAttribute('content', value);
        };

        setMeta('meta[name="description"]', 'name="description"', description);
        setMeta('meta[property="og:title"]', 'property="og:title"', title);
        setMeta('meta[property="og:description"]', 'property="og:description"', description);
        setMeta('meta[name="twitter:title"]', 'name="twitter:title"', title);
        setMeta('meta[name="twitter:description"]', 'name="twitter:description"', description);

        if (canonical) {
            let link = document.querySelector('link[rel="canonical"]');
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', 'canonical');
                document.head.appendChild(link);
            }
            link.setAttribute('href', canonical);
        }

        return () => {
            document.title = 'Steelgate — Take Your Household\'s Attention Back';
        };
    }, [title, description, canonical]);
}
