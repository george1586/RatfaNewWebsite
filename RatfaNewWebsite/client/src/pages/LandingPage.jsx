import Features from "../components/Features"
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
            <Features></Features>
            <Hero />

        </>
    )
}

export default LandingPage