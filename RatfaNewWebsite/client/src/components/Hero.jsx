import heroImg from '../assets/images/steelgate.png';
import Button from '../elements/Button';

// function Hero() {
//     return (
//         <section>

//             <div
//                 style={{ backgroundImage: `url(${heroImg})` }}
//                 className="
//                     w-full h-screen
//                     bg-[size:250%_100%] bg-no-repeat
//                     sm:bg-cover sm:h-[130vh]
//                     bg-[center_-10vh] sm:bg-[center_-30vh]
//                     flex flex-col items-center
//                     px-5
//                 "
//             >
//                 <div className="text-white text-center mt-[160px] sm:mt-[140px]">
//                     {/* mt-160 */}
//                     <h1 className="text-5xl sm:text-6xl font-bold [font-family:var(--font-alt)] text-[var(--text-landing)]">
//                         STEELGATE
//                     </h1>

//                     <h2 className="text-2xl sm:text-5xl mt-4 font-medium [font-family:var(--font-body)] text-[var(--text-landing)]">
//                         Easily control your network.
//                     </h2>
//                 </div>

//                 <div className="h-[100px]" />
//             </div>

//             <div className="flex justify-center lg:mx-[30vw] px-5">

//                 <div className="
//                     text-center leading-none sm:text-xl text-base
//                     relative
//                     sm:-top-[25vh]  
//                 ">
//                     <p>
//                         Steelgate is a portable easy to use tool for families and small to medium business owners. It loves shielding from cyber threats, blocking ads, protecting your personal data from companies such as google, facebook or even your ISP and managing what you, your family or even your employees want to see on the network, allowing you to monitor their activity and block content such as pornography, social media, etc..
//                     </p>
//                 </div>

//             </div>

//             <div className="flex justify-center items-center mt-12 sm:-mt-[20vh]">
//                 <Button />
//             </div>

//         </section>
//     );
// }
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
            object-[center_-5vh]
            scale-[2.7]
            sm:max-w-[750px]
            sm:scale-[2]
            sm:object-[center_-10vh]
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