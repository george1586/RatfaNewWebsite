import heroImg from '../assets/images/steelgate.png';
import Button from '../elements/Button';

function Hero() {
    return (
        <section>

            <div
                style={{ backgroundImage: `url(${heroImg})` }}
                className="
                    w-full h-screen
                    bg-[size:250%_100%] bg-no-repeat
                    sm:bg-cover sm:h-[130vh]
                    bg-[center_-5vh] sm:bg-[center_-30vh]
                    flex flex-col items-center
                    px-5
                "
            >
                <div className="text-white text-center mt-[160px] sm:mt-[140px]">
                    <h1 className="text-5xl sm:text-6xl font-bold [font-family:var(--font-alt)] text-[var(--text-landing)]">
                        STEELGATE
                    </h1>

                    <h2 className="text-2xl sm:text-5xl mt-4 font-medium [font-family:var(--font-body)] text-[var(--text-landing)]">
                        Easily control your network.
                    </h2>
                </div>

                <div className="h-[100px]" />
            </div>

            <div className="flex justify-center lg:mx-[30vw] px-5">

                <div className="
                    text-center leading-none sm:text-xl text-base
                    relative
                    sm:-top-[25vh]  
                ">
                    <p>
                        Steelgate is a portable easy to use tool for families and small to medium business owners. It loves shielding from cyber threats, blocking ads, protecting your personal data from companies such as google, facebook or even your ISP and managing what you, your family or even your employees want to see on the network, allowing you to monitor their activity and block content such as pornography, social media, etc..
                    </p>
                </div>

            </div>

            <div className="flex justify-center items-center mt-6 sm:-mt-[15vh]">
                <Button />
            </div>

        </section>
    );
}

export default Hero;