import Features from "../components/Features"
import FeaturesShowcase from "../components/FeatureShowcase"
import Header from "../components/Header"
import Hero from "../components/Hero"
import ProductInfo from "../components/ProductInfo"
import Video from "../components/Video"

function LandingPage() {
    return (
        <>
            <Hero></Hero>
            <Video></Video>
            <ProductInfo></ProductInfo>
            <FeaturesShowcase></FeaturesShowcase>
            <Features></Features>
        </>
    )
}

export default LandingPage