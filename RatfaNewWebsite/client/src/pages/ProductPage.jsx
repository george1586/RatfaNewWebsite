import ProductShowcase from "../components/ProductShowcase";
import Footer from "../components/Footer";
import { useSeo } from "../lib/useSeo";

function ProductPage() {
    useSeo({
        title: 'OrderSteelgate — €45 Founding Price',
        description: 'OrderSteelgate for €45 and lock in founding pricing for life. A plug-in device that blocks distracting apps and sites across every device in your home. Ships Q4 2026.',
        canonical: 'https://steelgate.io/products',
    });

    return (
        <>
            <ProductShowcase></ProductShowcase>
            <Footer></Footer>
        </>
    )
}

export default ProductPage;