import applePie from "../assets/images/apphoto.jpeg"
import restInside from "../assets/images/restInside.jpeg"
import restOutside from "../assets/images/restOutside.jpeg"
import avatar from "../assets/images/avatar.png"
import wAvatar from "../assets/images/woman.png"
import starBlank from "../assets/images/starBlank.png"
import starFill from "../assets/images/starFill.png"
import "../styles/font.css"

const LandingPage = () => {
    return (
        <div>

            <section>
                <div className="w-full h-[600px]">
                    <img src={applePie} className="w-full h-full object-cover" />
                </div>
            </section>

            <section>
                <div className="w-full h-[250px] bg-slate-200 flex flex-col justify-center items-center">
                    <h1 className="handWriting text-7xl mb-3"> "Where Every Slice Feels Like Home"</h1>
                    <h1 className="text-bold text-xl">-Grace Johnson(Owner)</h1>
                </div>
            </section>

            <section>
                <div className="flex mb-5">
                    <div className="w-1/2 h-[500px]">
                        <img src={restInside} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-1/2 flex flex-col justify-center">
                        <h1 className="handWriting text-4xl mt-3 fontWriting">About Apple Pie Cafe:</h1>
                        <p className="p-[20px]">
                            Welcome to Apple Pie Cafe, where the inviting aroma of freshly baked pies fills the air and the essence of classic American comfort food comes to life.
                            Nestled in the heart of town, our cozy café is a haven for pie enthusiasts and those seeking a taste of nostalgia.
                            Step into our warm and charming space, adorned with rustic decor and a touch of vintage flair. Indulge in a delightful array of homemade apple pies,
                            lovingly crafted with buttery, flaky crusts and luscious,
                            cinnamon-kissed fillings that burst with the flavors of sun-ripened apples.
                            From traditional favorites to innovative twists,
                            our menu offers a tantalizing selection of pie variations, accompanied by artisanal ice creams and rich, velvety caramel sauces.
                            Whether you're savoring a slice with a steaming cup of freshly brewed coffee or celebrating a special occasion with friends and family,
                            Apple Pie Cafe promises an unforgettable experience that embodies the essence of America's beloved dessert.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <div>
                    <h1 className="fontWriting text-4xl">Few Reviews:</h1>
                </div>


                <div className="flex w-full h-600px bg-red-200 justify-center">


                    {/* Review Card */}
                    <div className="flex flex-col items-center w-[300px] h-[350px] bg-slate-200 border rounded border-[3px] border-black m-4">
                        <div className="w-11/12  h-1/2 mt-3">
                            <div className="flex items-center">
                                <img src={avatar} classname="w-[20px]" />
                                <h1 className="ml-3">Scott Miguel</h1>
                            </div>
                            <div className="w-full h-full border border-2 border-black overflow-y-scroll " >
                                <p className="bg-white ">"I recently had the pleasure of visiting Apple Pie Cafe, and it was an absolute delight. From the moment I stepped in, I was greeted with the warm and inviting aroma of freshly baked pies. The cozy atmosphere, coupled with the friendly and attentive staff, made me feel right at home. The apple pies were simply divine, with flaky crusts that melted in my mouth and fillings bursting with the perfect balance of sweetness and spice. The menu offered a wide variety of flavors and even some unique twists that were a pleasant surprise. The care and attention to detail put into each pie were evident, and it was clear that they were made with love. I left with a happy heart and a newfound appreciation for the art of pie-making. Apple Pie Cafe is a must-visit for any pie lover or anyone looking to experience a slice of Americana in the most delicious way possible."</p>
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
                    <div className="flex flex-col items-center w-[300px] h-[350px] bg-slate-200 border rounded border-[3px] border-black m-4">
                        <div className="w-11/12  h-1/2 mt-3">
                            <div className="flex items-center">
                                <img src={wAvatar} classname="w-[15px]" />
                                <h1 className="ml-3">Olivia Davis</h1>
                            </div>
                            <div className="w-full h-full border border-2 border-black overflow-y-scroll " >
                                <p className="bg-white ">"The coffee at Apple Pie Cafe is a delightful complement to their mouthwatering pies. Served piping hot and expertly brewed, it provides a rich and flavorful experience. Whether enjoyed alongside a slice of warm apple pie or on its own, the coffee at Apple Pie Cafe is the perfect way to start your day or unwind in a cozy atmosphere."</p>
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
                    <div className="flex flex-col items-center w-[300px] h-[350px] bg-slate-200 border rounded border-[3px] border-black m-4">
                        <div className="w-11/12  h-1/2 mt-3">
                            <div className="flex items-center">
                                <img src={avatar} classname="w-[20px]" />
                                <h1 className="ml-3">Scott Miguel</h1>
                            </div>
                            <div className="w-full h-full border border-2 border-black overflow-y-scroll " >
                                <p className="bg-white ">"I recently had the pleasure of visiting Apple Pie Cafe, and it was an absolute delight. From the moment I stepped in, I was greeted with the warm and inviting aroma of freshly baked pies. The cozy atmosphere, coupled with the friendly and attentive staff, made me feel right at home. The apple pies were simply divine, with flaky crusts that melted in my mouth and fillings bursting with the perfect balance of sweetness and spice. The menu offered a wide variety of flavors and even some unique twists that were a pleasant surprise. The care and attention to detail put into each pie were evident, and it was clear that they were made with love. I left with a happy heart and a newfound appreciation for the art of pie-making. Apple Pie Cafe is a must-visit for any pie lover or anyone looking to experience a slice of Americana in the most delicious way possible."</p>
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
                    <div className="flex flex-col items-center w-[300px] h-[350px] bg-slate-200 border rounded border-[3px] border-black m-4">
                        <div className="w-11/12  h-1/2 mt-3">
                            <div className="flex items-center">
                                <img src={avatar} classname="w-[20px]" />
                                <h1 className="ml-3">Scott Miguel</h1>
                            </div>
                            <div className="w-full h-full border border-2 border-black overflow-y-scroll " >
                                <p className="bg-white ">"I recently had the pleasure of visiting Apple Pie Cafe, and it was an absolute delight. From the moment I stepped in, I was greeted with the warm and inviting aroma of freshly baked pies. The cozy atmosphere, coupled with the friendly and attentive staff, made me feel right at home. The apple pies were simply divine, with flaky crusts that melted in my mouth and fillings bursting with the perfect balance of sweetness and spice. The menu offered a wide variety of flavors and even some unique twists that were a pleasant surprise. The care and attention to detail put into each pie were evident, and it was clear that they were made with love. I left with a happy heart and a newfound appreciation for the art of pie-making. Apple Pie Cafe is a must-visit for any pie lover or anyone looking to experience a slice of Americana in the most delicious way possible."</p>
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

                </div>
            </section>





        </div>
    )
}

export default LandingPage;