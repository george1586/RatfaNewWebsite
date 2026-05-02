import { X, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { createCheckoutSession } from "../lib/api";
import { useState } from "react";

export default function CartDrawer() {
    const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCheckout = async () => {
        if (!items.length) return;
        setLoading(true);
        setError(null);
        try {
            const { url } = await createCheckoutSession(items);
            window.location.href = url;
        } catch (err) {
            setError("Could not start checkout. Please try again.");
            setLoading(false);
        }
    };

    return (
        <>
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[150] transition-opacity duration-300 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[200] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-light)]">
                    <h2 className="text-xl font-bold text-[var(--text-dark)] [font-family:var(--font-alt)]">
                        Cart{totalItems > 0 && (
                            <span className="text-[var(--primary)] ml-1">({totalItems})</span>
                        )}
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-[var(--text-dark)] hover:opacity-50 transition-opacity"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                            <ShoppingCart size={44} className="text-gray-200" />
                            <p className="text-[var(--text-dark)] opacity-40 [font-family:var(--font-body)]">
                                Your cart is empty
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {items.map(item => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 py-4 border-b border-[var(--border-light)] last:border-0"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-[var(--text-dark)] [font-family:var(--font-body)] truncate">
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-[var(--text-dark)] opacity-50 [font-family:var(--font-body)] mt-0.5">
                                            €{item.price} each
                                        </p>
                                        <div className="flex items-center gap-3 mt-3">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-7 h-7 rounded-full border border-[var(--border-light)] flex items-center justify-center hover:border-[var(--text-dark)] transition-colors"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="font-medium text-[var(--text-dark)] [font-family:var(--font-body)] w-4 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-7 h-7 rounded-full border border-[var(--border-light)] flex items-center justify-center hover:border-[var(--text-dark)] transition-colors"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end justify-between shrink-0">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-gray-300 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                        <p className="font-bold text-[var(--text-dark)] [font-family:var(--font-alt)]">
                                            €{item.price * item.quantity}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="px-6 py-5 border-t border-[var(--border-light)] space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-[var(--text-dark)] opacity-60 [font-family:var(--font-body)]">
                                Total
                            </span>
                            <span className="text-2xl font-bold text-[var(--text-dark)] [font-family:var(--font-alt)]">
                                €{totalPrice}
                            </span>
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 [font-family:var(--font-body)]">{error}</p>
                        )}

                        <button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="w-full py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-2xl font-bold text-base [font-family:var(--font-alt)] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Redirecting to payment…" : "Checkout"}
                        </button>

                        <button
                            onClick={clearCart}
                            className="w-full text-sm text-[var(--text-dark)] opacity-30 hover:opacity-60 transition-opacity [font-family:var(--font-body)]"
                        >
                            Clear cart
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
