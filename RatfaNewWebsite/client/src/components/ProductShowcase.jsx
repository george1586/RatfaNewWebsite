import { useState } from "react";

const accessories = [
    { name: "Advanced Threat Pack", price: 19 },
    { name: "Extended Analytics", price: 29 },
    { name: "Family Protection Mode", price: 14 },
    { name: "Business Monitoring Suite", price: 39 }
];

function ProductShowcase() {
    const basePrice = 229;

    const [quantity, setQuantity] = useState(1);
    const [selected, setSelected] = useState([]);

    const toggleAccessory = (index) => {
        if (selected.includes(index)) {
            setSelected(selected.filter(i => i !== index));
        } else {
            setSelected([...selected, index]);
        }
    };

    const total =
        (basePrice +
            selected.reduce((sum, i) => sum + accessories[i].price, 0)) *
        quantity;

    return (
        <section className="w-full px-6 py-16 max-w-7xl mx-auto">

            <div className="grid lg:grid-cols-2 gap-16 items-start">

                <div className="w-full flex justify-center">
                    <img
                        src="" // replace with your image
                        className="w-full max-w-[500px] object-contain"
                    />
                </div>

                <div className="lg:sticky lg:top-24 space-y-8">

                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-landing)]">
                            Steelgate Device
                        </h1>

                        <p className="mt-4 text-[var(--text-light)]">
                            A plug-and-play network security layer that protects
                            your devices in real time — blocking threats,
                            phishing attempts, and unwanted traffic across your
                            entire network.
                        </p>
                    </div>

                    <div className="flex items-center justify-between">

                        <span className="text-3xl font-semibold text-[var(--text-landing)]">
                            €{basePrice}
                        </span>

                        <div className="flex items-center border border-[var(--border-light)] rounded-lg overflow-hidden">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-4 py-2 hover:bg-white/5"
                            >
                                −
                            </button>

                            <span className="px-4">{quantity}</span>

                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-4 py-2 hover:bg-white/5"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg text-[var(--text-landing)] mb-4">
                            Add features
                        </h3>

                        <div className="space-y-3">
                            {accessories.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => toggleAccessory(index)}
                                    className={`flex justify-between items-center px-5 py-4 rounded-lg border cursor-pointer transition ${selected.includes(index)
                                            ? "border-white bg-white/5"
                                            : "border-[var(--border-light)] hover:bg-white/5"
                                        }`}
                                >
                                    <div>
                                        <p className="text-[var(--text-landing)]">
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-[var(--text-light)]">
                                            €{item.price}
                                        </p>
                                    </div>

                                    <span className="text-sm text-[var(--text-light)]">
                                        {selected.includes(index) ? "Added" : "+ Add"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-[var(--border-light)]">
                        <span className="text-[var(--text-light)]">
                            Total ({quantity} item{quantity > 1 ? "s" : ""})
                        </span>

                        <span className="text-2xl font-semibold text-[var(--text-landing)]">
                            €{total}
                        </span>
                    </div>

                    <button className="w-full py-4 bg-white text-black rounded-lg font-medium hover:opacity-90 transition">
                        Add to cart
                    </button>

                </div>
            </div>
        </section>
    );
}

export default ProductShowcase;