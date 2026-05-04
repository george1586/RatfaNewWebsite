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

function Table({ rows }) {
    return (
        <div className="overflow-x-auto rounded-xl border border-[var(--border)] my-2">
            <table className="w-full text-[14px]">
                <thead>
                    <tr style={{ background: 'var(--bg-alt)' }}>
                        {rows[0].map((cell, i) => (
                            <th key={i} className="text-left px-4 py-3 font-semibold text-[var(--ink)] border-b border-[var(--border)]">{cell}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.slice(1).map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? '' : ''} style={{ background: i % 2 === 1 ? 'var(--bg-alt)' : 'transparent' }}>
                            {row.map((cell, j) => (
                                <td key={j} className="px-4 py-3 text-[var(--ink-muted)] align-top">{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function PrivacyPage() {
    useSeo({
        title: 'Privacy Policy — Steelgate',
        description: 'How Steelgate collects, uses, and protects your personal data. GDPR-compliant privacy policy.',
        canonical: 'https://steelgate.io/privacy',
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
                        Privacy Policy
                    </h1>
                    <p className="text-[15px] text-[var(--ink-muted)]">Last updated: 1 May 2025</p>
                </div>
            </section>

            <section className="px-6 pb-24">
                <div className="max-w-[var(--prose-w)] mx-auto">

                    <p className="text-[16px] text-[var(--ink)] leading-[1.75] mb-10">
                        This Privacy Policy explains how Steelgate SRL ("Steelgate", "we", "us", "our") collects, uses, and protects your personal data when you visit steelgate.io or purchase our products. We are committed to protecting your privacy and complying with the General Data Protection Regulation (GDPR) and applicable Romanian data protection law.
                    </p>

                    <Section title="1. Who We Are">
                        <p>Data controller: Steelgate SRL, Romania.</p>
                        <p>Contact for data matters: <a href="mailto:hello@steelgate.io" className="underline underline-offset-2 hover:opacity-60 transition-opacity">hello@steelgate.io</a></p>
                    </Section>

                    <Section title="2. What Data We Collect and Why">
                        <Table rows={[
                            ['Category', 'Data collected', 'Purpose', 'Legal basis'],
                            ['Pre-order', 'Email address, payment details (processed by Stripe — we never store card numbers)', 'Process your pre-order, send order confirmation and shipping updates', 'Contract performance (Art. 6(1)(b) GDPR)'],
                            ['Analytics', 'Pages visited, clicks, session duration, approximate location (country), device type — all anonymised and aggregated via PostHog', 'Understand how people use the site so we can improve it', 'Legitimate interests (Art. 6(1)(f) GDPR)'],
                            ['Communications', 'Email address if you contact us directly', 'Respond to your enquiry', 'Legitimate interests (Art. 6(1)(f) GDPR)'],
                            ['Waitlist / newsletter', 'Email address if you sign up', 'Send product updates and launch news', 'Consent (Art. 6(1)(a) GDPR)'],
                        ]} />
                        <p>We do not sell your personal data to any third party.</p>
                    </Section>

                    <Section title="3. Cookies and Tracking">
                        <p>We use a small number of cookies and similar technologies:</p>
                        <Table rows={[
                            ['Cookie / technology', 'Provider', 'Purpose', 'Duration'],
                            ['Analytics session', 'PostHog (EU server)', 'Anonymised usage analytics', 'Session / up to 1 year'],
                            ['Payment session', 'Stripe', 'Secure payment processing', 'Session'],
                        ]} />
                        <p>We do not use advertising cookies, third-party tracking pixels, or cross-site tracking. You can disable all non-essential cookies in your browser settings without affecting your ability to use the site.</p>
                    </Section>

                    <Section title="4. Third-Party Services">
                        <p>We use the following third parties to operate the site and process orders:</p>
                        <ul className="space-y-2 pl-1">
                            {[
                                'Stripe — payment processing. Stripe is PCI DSS compliant. Your payment details go directly to Stripe and are never stored on our servers.',
                                'PostHog (EU region) — product analytics. All data is stored on PostHog\'s EU infrastructure. We have configured PostHog to anonymise IP addresses.',
                                'Supabase — secure database for pre-order records. Data stored in EU data centres.',
                                'Vercel — website hosting. EU Edge Network used where possible.',
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--ink)] shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p>Each of these providers acts as a data processor under a data processing agreement with us, or as an independent data controller under their own privacy policy.</p>
                    </Section>

                    <Section title="5. Data Retention">
                        <p>We retain your data only as long as necessary:</p>
                        <ul className="space-y-2 pl-1">
                            {[
                                'Pre-order data: retained for the duration of your pre-order and for 5 years thereafter for legal and accounting purposes.',
                                'Analytics data: aggregated and anonymised data retained indefinitely; raw session data deleted after 12 months.',
                                'Email communications: retained for 2 years after the last correspondence.',
                                'Newsletter subscribers: retained until you unsubscribe, plus 30 days.',
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--ink)] shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section title="6. Your Rights Under GDPR">
                        <p>If you are in the European Economic Area, you have the following rights regarding your personal data:</p>
                        <Table rows={[
                            ['Right', 'What it means'],
                            ['Access', 'Request a copy of the personal data we hold about you.'],
                            ['Rectification', 'Ask us to correct inaccurate or incomplete data.'],
                            ['Erasure', 'Ask us to delete your data where we have no legitimate reason to continue holding it.'],
                            ['Restriction', 'Ask us to restrict processing of your data in certain circumstances.'],
                            ['Portability', 'Receive your data in a structured, machine-readable format.'],
                            ['Objection', 'Object to processing based on legitimate interests.'],
                            ['Withdraw consent', 'Where processing is based on consent, withdraw it at any time without affecting prior processing.'],
                        ]} />
                        <p>To exercise any of these rights, email <a href="mailto:hello@steelgate.io" className="underline underline-offset-2 hover:opacity-60 transition-opacity">hello@steelgate.io</a>. We will respond within 30 days. You also have the right to lodge a complaint with the Romanian National Supervisory Authority for Personal Data Processing (ANSPDCP) at <span className="font-medium">dataprotection.ro</span>.</p>
                    </Section>

                    <Section title="7. Data Security">
                        <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, disclosure, alteration, or destruction. These include encrypted data transmission (TLS), access controls, and regular security reviews.</p>
                        <p>No method of transmission over the internet is 100% secure. If we become aware of a data breach that affects your rights, we will notify you and the relevant supervisory authority as required by law.</p>
                    </Section>

                    <Section title="8. International Transfers">
                        <p>We store and process data primarily within the European Economic Area. Where any of our service providers transfer data outside the EEA, we ensure adequate safeguards are in place (such as EU Standard Contractual Clauses).</p>
                    </Section>

                    <Section title="9. Children's Privacy">
                        <p>Steelgate's website and services are not directed at children under 16. We do not knowingly collect personal data from children under 16 without verifiable parental consent. If you believe we have inadvertently collected such data, please contact us and we will delete it promptly.</p>
                    </Section>

                    <Section title="10. Changes to This Policy">
                        <p>We may update this policy from time to time. Material changes will be communicated by email at least 30 days before taking effect. The current version is always available at steelgate.io/privacy.</p>
                    </Section>

                    <Section title="11. Contact">
                        <p>For any privacy-related questions, to exercise your rights, or to make a complaint, contact us at <a href="mailto:hello@steelgate.io" className="underline underline-offset-2 hover:opacity-60 transition-opacity">hello@steelgate.io</a>. We aim to respond within 5 business days.</p>
                    </Section>

                </div>
            </section>

            <Footer />
        </div>
    );
}
