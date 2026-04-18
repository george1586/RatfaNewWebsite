import heroImg from '../assets/images/ratfa.png';

function Hero() {
    return (
        <section className=''>
            <div
                style={{ backgroundImage: `url(${heroImg})` }}
                className="w-full h-screen bg-[size:250%_100%] bg-no-repeat sm:bg-cover bg-center flex items-center justify-center"
            >
                <div className="text-white text-center pb-44 sm:pb-36">
                    <h1 className="text-5xl sm:text-6xl  font-bold tracking-normal">STEELGATE</h1>
                    <h2 className="text-xl sm:text-2xl mt-4 tracking-normal">
                        Easily control your home/office network.
                    </h2>
                </div>
            </div>
        </section>
    );
}

export default Hero;