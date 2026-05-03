import deviceImg from '../assets/images/newProductImage.png';

export default function ProductInfo() {
    return (
        <section className="w-full bg-[var(--bg)] px-6 py-[var(--section-y)]">
            <div className="max-w-[var(--content-w)] mx-auto">

                <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">

                    {/* Text */}
                    <div className="w-full md:w-1/2 flex flex-col gap-8">
                        <div>
                            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">
                                What is Steelgate?
                            </p>
                            <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-bold text-[var(--ink)] leading-[1.1] tracking-[-0.03em] max-w-[12ch]">
                                Your household's attention layer.
                            </h2>
                        </div>

                        {/* Mobile image */}
                        <div className="md:hidden w-full overflow-hidden rounded-xl bg-[var(--bg-alt)] flex items-center justify-center p-6">
                            <img src={deviceImg} alt="Steelgate device" className="w-full max-w-[300px] object-contain" />
                        </div>

                        <div className="space-y-5 max-w-prose">
                            <p className="text-[17px] text-[var(--ink)] leading-[1.7]">
                                Steelgate is a compact network device that sits between your router and your devices.
                                It controls what every screen in your home can reach — and when.
                            </p>
                            <p className="text-[17px] text-[var(--ink-muted)] leading-[1.7]">
                                It's not a parental control app your kids can uninstall. It's not a browser extension
                                that only works on one device. It works at the network level — every phone, tablet,
                                laptop, and smart TV in the house goes through it automatically.
                            </p>
                        </div>
                    </div>

                    {/* Desktop image */}
                    <div className="hidden md:flex w-1/2 items-center justify-center">
                        <img src={deviceImg} alt="Steelgate device" className="w-full max-w-[500px] object-contain" />
                    </div>

                </div>
            </div>
        </section>
    );
}
