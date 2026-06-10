import Button from "../elements/Button";

export default function CTA() {
    return (
        <section className="w-full px-6 py-[var(--section-y)] bg-[var(--bg)] text-center">
            <div className="max-w-[var(--prose-w)] mx-auto flex flex-col items-center gap-6">
                <h2 className="text-[clamp(2rem,6vw,4rem)] font-bold text-[var(--ink)] tracking-[-0.03em] leading-[1.1]">
                    Rezervă-ți locul. Lansare în România.
                </h2>
                <p className="text-[16px] sm:text-[18px] text-[var(--ink-muted)] leading-[1.65] max-w-[480px]">
                    Acces anticipat la prețul de fondator — €70, o singură plată, fără abonament. Prețul crește la lansare.
                </p>
                <div className="mt-2">
                    <Button />
                </div>
            </div>
        </section>
    );
}
