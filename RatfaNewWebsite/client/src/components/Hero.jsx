import heroImg from '../assets/images/newImgHero.png';
import Button from '../elements/Button';

function Hero() {
    return (
        <section className="min-h-screen  flex flex-col items-center px-5">

            <div className="text-center mt-[120px] sm:mt-[140px]">
                <h1 className="text-5xl sm:text-7xl font-bold [font-family:var(--font-alt)] text-[var(--text-landing)]">
                    STEELGATE
                </h1>

                <h2 className="text-2xl sm:text-5xl mt-4 font-medium [font-family:var(--font-body)] text-[var(--text-landing)]">
                    Easily control your network.
                </h2>
            </div>

            <div className="flex-1 flex items-center justify-center overflow-hidden">
                <img
                    src={heroImg}
                    className="
            w-full
            max-w-[750px]
            object-contain
            object-[center_vh]
            scale-[1.5]
            sm:max-w-[750px]
            sm:scale-[1.2]
            sm:object-[center_1vh]
        "
                />
            </div>

            <div className="text-center max-w-[800px] mb-10">
                <p className="sm:text-xl mt-0 text-sm [font-family:var(--font-body)]">
                    Steelgate is a portable easy to use tool for families and SME owners. It loves shielding from cyber threats, blocking ads, protecting your personal data and managing what your family or even your employees see on the network, allowing you to monitor their activity and block content such as pornography, social media, etc..
                </p>

                <div className="mt-8 flex justify-center">
                    <Button />
                </div>
            </div>

        </section>
    );
}
export default Hero;