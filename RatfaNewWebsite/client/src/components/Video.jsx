import signature from '../assets/images/Signature.png'
function Video() {
    return (
        <section className="w-full bg-gray-100 py-16 px-5 flex justify-center">

            <div className="
                w-full max-w-[1100px]
                bg-white
                border border-gray-300
                rounded-xl
                p-6 sm:p-10
                flex flex-col gap-4
            ">
                <div className='flex gap-4 flex-col lg:flex-row'>
                    <div className="
                            w-full lg:w-[500px]
                            aspect-video
                            bg-gray-200
                            rounded-md
                            overflow-hidden
                            shrink-0
                        ">
                        <iframe
                            src="https://player.vimeo.com/video/1184751749?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" loading='lazy' allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin"
                            className="w-full h-full rounded-md"
                            allowFullScreen
                        />
                    </div>
                    
                    <div className='bg-gray-100 w-[100%] max-w-[100%] sm:px-4 px-2 pt-2 text-base sm:text-lg '>
                        <div>
                            <p>"Are you sick of your family/employees spending too much time on certain platforms?</p>
                            <p>Are you sick of ads on every website, on every device?</p>
                            <p>Are you worried about your security and privacy?</p>
                            <p className='[font-family:var(--font-body)] pt-4'>Steelgate is our solution for digital self-defense of your privacy. We believe everyone should have control, security and privacy over their own network." </p>
                            <p className='[font-family:var(--font-body)] pt-4'>Ichim-Andronache George, Steelgate Co-Founder</p>
                        </div>
                    </div>
                </div>

                <div className="
                    flex flex-col lg:flex-row
                    justify-between
                    items-start
                    gap-8
                ">

                    <div className="flex-1">
                    </div>

                </div>

                <div className="
                    flex flex-col sm:flex-row
                    justify-between
                    items-center sm:items-center
                ">

                    <p className="text-sm hidden sm:block text-gray-600">
                        Intro for the commercial SteelGate device
                    </p>

                    <img src={signature} className='max-w-[125px]'></img>
                </div>

            </div>

        </section >
    );
}

export default Video;