export async function createCheckoutSession(items) {
    const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create checkout session");
    }

    return res.json();
}

export async function createPreorderSession() {
    const res = await fetch("/api/create-preorder-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create pre-order session");
    }

    return res.json();
}
