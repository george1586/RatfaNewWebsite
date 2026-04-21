import deviceImg from '../assets/images/productimage.png';

function ProductInfo() {
    return (
        <section className="w-full bg-[var(--bg-top)] px-6 overflow-hidden md:px-24 py-20 min-h-screen md:h-screen">
            <h1 className="
                text-5xl sm:text-6xl lg:text-8xl
                font-bold
                text-center
                mb-16
                lg:mb-0
                [font-family:var(--font-alt)] 
            ">
                What is Steelgate?
            </h1>

            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-full xl:pl-[20%] md:w-1/2 flex flex-col gap-10 text-lg sm:text-xl [font-family:var(--font-alt)]">

                    <div className=''>
                        <h2 className="text-2xl sm:text-4xl font-bold lg:mb-8 mb-4 [font-family:var(--font-alt)]">
                            Your cyber buddy
                        </h2>

                        <p className="leading-relaxed">
                            Steelgate is a compact and powerful network device designed
                            to give you full control over all your digital devices.
                            It interacts with your network in real time, protecting,
                            filtering, and managing traffic seamlessly.
                        </p>
                    </div>

                    <div className="md:hidden flex justify-center h-[200px]">
                        <img
                            src={deviceImg}
                            className="w-full min-w-[600px] object-cover overflow-hidden"
                        />
                    </div>

                    <div>
                        <p className="leading-relaxed">
                            The idea of Steelgate combines multiple security tools into one simple
                            solution. From blocking ads and trackers to managing access
                            and monitoring activity, it transforms your network into a
                            safe and controlled environment, without complexity.
                        </p>
                    </div>

                </div>

                <div className="hidden md:flex w-1/2 justify-center">
                    <img
                        src={deviceImg}
                        className="
                            w-full
                            min-w-[500px]
                            md:min-w-[1000px]
                            object-crop
                        "
                    />
                </div>

            </div>

        </section>
    );
}

export default ProductInfo;