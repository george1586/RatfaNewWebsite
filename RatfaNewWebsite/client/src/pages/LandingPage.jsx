import Features from "../components/Features"
import FeaturesShowcase from "../components/FeatureShowcase"
import Hero from "../components/Hero"
import ProductInfo from "../components/ProductInfo"
import Footer from "../components/Footer"
import Video from "../components/Video"
import FAQ from "../components/Faq"

function LandingPage() {
    return (
        <>
            <Hero></Hero>
            <Video></Video>
            <ProductInfo></ProductInfo>
            <FeaturesShowcase></FeaturesShowcase>
            <Features></Features>
            <FAQ></FAQ>
            <Footer></Footer>
        </>
    )
}

export default LandingPage