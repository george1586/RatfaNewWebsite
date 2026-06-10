import { useEffect, useRef } from "react";
import { useSeo } from "../lib/useSeo";
import Features from "../components/Features";
import FeaturesShowcase from "../components/FeatureShowcase";
import Hero from "../components/Hero";
import ProductInfo from "../components/ProductInfo";
import Footer from "../components/Footer";
import Video from "../components/Video";
import FAQ from "../components/Faq";
import Scenarios from "../components/Scenarios";
import CTA from "../components/CTA";
import { track } from "../lib/analytics";

const LANDING_SECTIONS = ['hero', 'product_info', 'feature_showcase', 'features', 'scenarios', 'faq', 'cta'];

function SectionView({ name, children }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const pageLoadedAt = performance.now();
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    track('landing_section_viewed', {
                        page: 'landing',
                        section_name: name,
                        section_index: LANDING_SECTIONS.indexOf(name),
                        section_total: LANDING_SECTIONS.length,
                        time_to_view_ms: Math.round(performance.now() - pageLoadedAt),
                        scroll_y: Math.round(window.scrollY),
                        intersection_ratio: Math.round(entry.intersectionRatio * 100) / 100,
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [name]);
    return <div ref={ref}>{children}</div>;
}

function LandingPage() {
    useSeo({
        title: 'Steelgate — Redă-ți Atenția Înapoi',
        description: 'Steelgate este un dispozitiv hardware care blochează progresiv rețelele sociale, reclamele și notificările pe toate dispozitivele din casă. €70, o singură plată.',
        canonical: 'https://steelgate.io/',
    });

    return (
        <>
            <SectionView name="hero"><Hero /></SectionView>
            {/* <SectionView name="video"><Video /></SectionView> */}
            <SectionView name="product_info"><ProductInfo /></SectionView>
            <SectionView name="feature_showcase"><FeaturesShowcase /></SectionView>
            <SectionView name="features"><Features /></SectionView>
            <SectionView name="scenarios"><Scenarios /></SectionView>
            <SectionView name="faq"><FAQ /></SectionView>
            <SectionView name="cta"><CTA /></SectionView>
            <Footer />
        </>
    );
}

export default LandingPage;
