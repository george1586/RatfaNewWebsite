import signature from '../assets/images/Signature.png'
function Video() {
    return (
        <section className="w-full bg-[#f0f0f0] py-16 px-5 flex justify-center">

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
                            <p>"Screen time isn't going away on its own.</p>
                            <p className='pt-3'>Your kids already know how to get around app timers. Your own habits are just as hard to break.</p>
                            <p className='pt-3'>We built Steelgate because every solution we tried was either too easy to bypass, or too complicated to actually use.</p>
                            <p className='[font-family:var(--font-body)] pt-4'>One device in your home. Every screen under your control — on your schedule."</p>
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
                        Steelgate — household digital wellbeing device
                    </p>

                    <img src={signature} className='max-w-[125px]'></img>
                </div>

            </div>

        </section >
    );
}

export default Video;