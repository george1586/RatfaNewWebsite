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
                    The hardware your household plugs in to take its attention back.
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
                    Block distracting apps and sites across every device in your home — TikTok, Instagram, Reddit, news, adult content — on schedules you set. One device, every screen in the house.
                </p>

                <div className="mt-8 flex justify-center">
                    <Button />
                </div>
            </div>

        </section>
    );
}
export default Hero;