import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CheckoutSuccess() {
    const { clearCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-5">
            <CheckCircle size={64} className="text-[var(--primary)]" />
            <h1 className="text-4xl sm:text-5xl font-black text-[var(--text-dark)] [font-family:var(--font-alt)]">
                Order Confirmed!
            </h1>
            <p className="text-base text-[var(--text-dark)] [font-family:var(--font-body)] max-w-md leading-relaxed opacity-70">
                Thank you for your purchase. You'll receive a confirmation email shortly with your order details and shipping information.
            </p>
            <button
                onClick={() => navigate("/")}
                className="mt-2 px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-2xl font-bold text-base [font-family:var(--font-alt)] transition-colors duration-150"
            >
                Back to Home
            </button>
        </section>
    );
}
