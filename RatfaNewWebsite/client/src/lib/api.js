export async function createPreorderSession() {
    const res = await fetch("/api/create-preorder-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create Ordersession");
    }

    return res.json();
}
