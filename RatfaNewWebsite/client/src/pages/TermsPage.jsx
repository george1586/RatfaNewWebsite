import Footer from "../components/Footer";
import { useSeo } from "../lib/useSeo";

function Section({ title, children }) {
    return (
        <div className="mb-10">
            <h2 className="text-[1.25rem] font-bold text-[var(--ink)] tracking-tight mb-4">{title}</h2>
            <div className="space-y-4 text-[16px] text-[var(--ink)] leading-[1.75]">
                {children}
            </div>
        </div>
    );
}

export default function TermsPage() {
    useSeo({
        title: 'Terms & Conditions — Steelgate',
        description: 'Terms and conditions for the Steelgate pre-order, subscription, and use of steelgate.io.',
        canonical: 'https://steelgate.io/terms',
    });

    return (
        <div className="bg-[var(--bg)] min-h-screen">

            <section className="pt-[calc(var(--header-h)+80px)] pb-12 px-6">
                <div className="max-w-[var(--prose-w)] mx-auto">
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-6">Legal</p>
                    <h1
                        className="text-[clamp(2rem,5vw,3.5rem)] font-display leading-[1.05] tracking-tight text-[var(--ink)] mb-4"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Terms & Conditions
                    </h1>
                    <p className="text-[15px] text-[var(--ink-muted)]">Last updated: 1 May 2025</p>
                </div>
            </section>

            <section className="px-6 pb-24">
                <div className="max-w-[var(--prose-w)] mx-auto">

                    <p className="text-[16px] text-[var(--ink)] leading-[1.75] mb-10">
                        These Terms and Conditions govern your use of steelgate.io and any purchase or pre-order you make through it. By accessing the site or placing a pre-order you agree to these terms. If you do not agree, please do not use the site or place an order.
                    </p>

                    <Section title="1. About Steelgate">
                        <p>Steelgate is operated by Steelgate SRL, a company incorporated under the laws of Romania. References to "we", "us", or "our" mean Steelgate SRL. You can reach us at <a href="mailto:hello@steelgate.io" className="underline underline-offset-2 hover:opacity-60 transition-opacity">hello@steelgate.io</a>.</p>
                    </Section>

                    <Section title="2. Pre-Order Terms">
                        <p>Steelgate is currently available to pre-order for a non-binding deposit of €10. Placing a pre-order does not constitute a final purchase contract. It reserves your place in the production queue and locks in your founding price.</p>
                        <p><strong>Founding price lock.</strong> Customers who pre-order before general availability lock in a subscription rate of €49/year for life. This rate is guaranteed as long as your subscription remains active and is not transferable. After general availability, the standard rate will be €89/year.</p>
                        <p><strong>Target shipping.</strong> We are targeting Q1 2027 for first shipments. This date is an estimate, not a guarantee. We will notify all pre-order customers of any material changes to the timeline.</p>
                        <p><strong>Minimum pre-orders.</strong> If we do not reach the minimum number of pre-orders required to proceed to production, all deposits will be refunded in full. We will notify you by email if this occurs.</p>
                    </Section>

                    <Section title="3. Refunds and Cancellations">
                        <p>Your €10 pre-order deposit is fully refundable at any point before we ship your unit. To request a refund, email <a href="mailto:hello@steelgate.io" className="underline underline-offset-2 hover:opacity-60 transition-opacity">hello@steelgate.io</a> from the email address you used to pre-order. Refunds are processed within 5–10 business days.</p>
                        <p>Once a unit has been shipped, our standard return policy applies: you have 30 days from delivery to return the device in its original condition for a full refund of the product price. Deposits applied to the purchase are refunded proportionally.</p>
                    </Section>

                    <Section title="4. Subscription">
                        <p>Full use of Steelgate requires an active annual subscription. Pre-order customers pay €49/year (founding rate). New customers after general availability pay €89/year.</p>
                        <p>Subscriptions renew automatically each year. You may cancel at any time from your account. If you cancel, your subscription remains active until the end of the paid period; no partial refunds are issued for unused subscription time.</p>
                        <p>We reserve the right to change subscription pricing with 60 days' written notice. Founding rate customers are exempt from price increases for as long as their subscription remains uninterrupted.</p>
                    </Section>

                    <Section title="5. Acceptable Use">
                        <p>You may use Steelgate only for lawful purposes and in accordance with these Terms. You agree not to use Steelgate to:</p>
                        <ul className="space-y-2 pl-1">
                            {[
                                'Violate any applicable law or regulation.',
                                'Interfere with or disrupt networks or services you do not own or have permission to administer.',
                                'Circumvent technical measures on networks or services in a manner that violates those services\' terms.',
                                'Resell or redistribute Steelgate hardware or software without our written consent.',
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--ink)] shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section title="6. Product Disclaimer">
                        <p>Steelgate is a pre-production product. While we have taken significant steps to validate its design and function, we cannot guarantee that the final product will be identical in all respects to pre-production descriptions. We will communicate any material changes before shipment.</p>
                        <p>Network filtering effectiveness depends on your network configuration and the behaviour of the apps and services being filtered. We do not guarantee that all bypass attempts will be blocked, and we do not warrant that Steelgate is suitable for every network environment.</p>
                    </Section>

                    <Section title="7. Intellectual Property">
                        <p>All content on steelgate.io — including text, design, graphics, software, and trademarks — is owned by or licensed to Steelgate SRL. You may not reproduce, distribute, or create derivative works from any content without our prior written consent.</p>
                    </Section>

                    <Section title="8. Limitation of Liability">
                        <p>To the maximum extent permitted by applicable law, Steelgate SRL is not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the site or product, including but not limited to loss of data, revenue, or goodwill.</p>
                        <p>Our total liability for any claim arising from these terms or your use of the product will not exceed the amount you paid to us in the 12 months preceding the claim.</p>
                        <p>Nothing in these terms excludes liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded or limited under applicable law.</p>
                    </Section>

                    <Section title="9. Governing Law">
                        <p>These terms are governed by the laws of Romania. Any disputes shall be subject to the exclusive jurisdiction of the courts of Romania, without prejudice to your rights as a consumer under the laws of your country of residence within the European Union.</p>
                        <p>If you are a consumer in the EU, you also have the right to use the European Commission's Online Dispute Resolution platform at <span className="font-medium">ec.europa.eu/consumers/odr</span>.</p>
                    </Section>

                    <Section title="10. Changes to These Terms">
                        <p>We may update these terms from time to time. We will notify you of material changes by email at least 30 days before they take effect. Continued use of the site or product after that date constitutes acceptance of the updated terms.</p>
                    </Section>

                    <Section title="11. Contact">
                        <p>Questions about these terms? Email us at <a href="mailto:hello@steelgate.io" className="underline underline-offset-2 hover:opacity-60 transition-opacity">hello@steelgate.io</a>. We aim to respond within 2 business days.</p>
                    </Section>

                </div>
            </section>

            <Footer />
        </div>
    );
}
