import { useEffect, useRef } from "react";
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

function SectionView({ name, children }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    track('section_viewed', { section: name });
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
    return (
        <>
            <SectionView name="hero"><Hero /></SectionView>
            <SectionView name="video"><Video /></SectionView>
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
