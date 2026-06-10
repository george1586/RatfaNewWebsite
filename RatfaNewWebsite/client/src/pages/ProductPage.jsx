import ProductShowcase from "../components/ProductShowcase";
import Footer from "../components/Footer";
import { useSeo } from "../lib/useSeo";

function ProductPage() {
    useSeo({
        title: 'Comandă Steelgate — Preț de Fondator €70',
        description: 'Comandă Steelgate pentru €70 și blochează rețelele sociale pe toate dispozitivele din casă. O singură plată, fără abonament. Livrare Q4 2026.',
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