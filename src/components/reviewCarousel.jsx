import avatar from "../assets/images/avatar.png"
import wAvatar from "../assets/images/woman.png"
import starBlank from "../assets/images/starBlank.png"
import starFill from "../assets/images/starFill.png"

const ReviewCarousel = () => {
    return (
        <div>
            <div>
                <h1 className="fontWriting text-4xl text-white">Few Reviews:</h1>
            </div>

            <div className="flex w-full h-600px justify-center">

                {/* Review Card */}
                <div className="flex flex-col items-center w-[300px] h-[350px] bg-blue-200 border rounded border-[3px] border-black m-4">
                    <div className="w-11/12  h-1/2 mt-3">
                        <div className="flex items-center">
                            <img src={avatar} width="64px" />
                            <h1 className="ml-3">Scott Miguel</h1>
                        </div>
                        <div className="w-full h-full border border-2 border-black overflow-y-scroll " >
                            <p className="bg-white p-2">"I recently had the pleasure of visiting Apple Pie Cafe, and it was an absolute delight. From the moment I stepped in, I was greeted with the warm and inviting aroma of freshly baked pies. The cozy atmosphere, coupled with the friendly and attentive staff, made me feel right at home. The apple pies were simply divine, with flaky crusts that melted in my mouth and fillings bursting with the perfect balance of sweetness and spice. The menu offered a wide variety of flavors and even some unique twists that were a pleasant surprise. The care and attention to detail put into each pie were evident, and it was clear that they were made with love. I left with a happy heart and a newfound appreciation for the art of pie-making. Apple Pie Cafe is a must-visit for any pie lover or anyone looking to experience a slice of Americana in the most delicious way possible."</p>
                        </div>
                    </div>
                    <div className="flex mt-16">
                        <img src={starFill} className="w-[40px]" />
                        <img src={starFill} className="w-[40px]" />
                        <img src={starFill} className="w-[40px]" />
                        <img src={starFill} className="w-[40px]" />
                        <img src={starBlank} className="w-[40px]" />
                    </div>
                </div>

                {/* Review Card */}
                <div className="flex flex-col items-center w-[300px] h-[350px] bg-pink-200 border rounded border-[3px] border-black m-4">
                    <div className="w-11/12  h-1/2 mt-3">
                        <div className="flex items-center mb-2">
                            <img src={wAvatar} width="58px" />
                            <h1 className="ml-3">Olivia Davis</h1>
                        </div>
                        <div className="w-full h-full border border-2 border-black overflow-y-scroll " >
                            <p className="bg-white p-2">"The coffee at Apple Pie Cafe is a delightful complement to their mouthwatering pies. Served piping hot and expertly brewed, it provides a rich and flavorful experience. Whether enjoyed alongside a slice of warm apple pie or on its own, the coffee at Apple Pie Cafe is the perfect way to start your day or unwind in a cozy atmosphere."</p>
                        </div>
                    </div>
                    <div className="flex mt-16">
                        <img src={starFill} className="w-[40px]" />
                        <img src={starFill} className="w-[40px]" />
                        <img src={starFill} className="w-[40px]" />
                        <img src={starFill} className="w-[40px]" />
                        <img src={starFill} className="w-[40px]" />
                    </div>
                </div>
                {/* Review Card */}
                <div className="flex flex-col items-center w-[300px] h-[350px] bg-green-200 border rounded border-[3px] border-black m-4">
                    <div className="w-11/12  h-1/2 mt-3">
                        <div className="flex items-center mb-2">
                            <img src={wAvatar} width="58px " />
                            <h1 className="ml-3">Ava Roberts</h1>
                        </div>
                        <div className="w-full h-full border border-2 border-black overflow-y-scroll " >
                            <p className="bg-white h-content p-2">"Apple Pie Cafe was just okay; the pies were decent but nothing exceptional, and the overall experience left much to be desired."</p>
                        </div>
                    </div>
                    <div className="flex mt-16">
                        <img src={starFill} className="w-[40px]" />
                        <img src={starFill} className="w-[40px]" />
                        <img src={starFill} className="w-[40px]" />
                        <img src={starBlank} className="w-[40px]" />
                        <img src={starBlank} className="w-[40px]" />
                    </div>
                </div>
                {/* Review Card */}
                <div className="flex flex-col items-center w-[300px] h-[350px] bg-purple-200 border rounded border-[3px] border-black m-4">
                    <div className="w-11/12  h-1/2 mt-3">
                        <div className="flex items-center">
                            <img src={avatar} width="60px" />
                            <h1 className="ml-3">Benji Anderson</h1>
                        </div>
                        <div className="w-full h-full border border-2 border-black overflow-y-scroll " >
                            <p className="bg-white p-2">"Unfortunately, my experience at Apple Pie Cafe was quite disappointing. The apple pie lacked flavor and had a dry crust, and the overall ambiance felt lackluster and unwelcoming."</p>
                        </div>
                    </div>
                    <div className="flex mt-16">
                        <img src={starFill} className="w-[40px]" />
                        <img src={starBlank} className="w-[40px]" />
                        <img src={starBlank} className="w-[40px]" />
                        <img src={starBlank} className="w-[40px]" />
                        <img src={starBlank} className="w-[40px]" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewCarousel;