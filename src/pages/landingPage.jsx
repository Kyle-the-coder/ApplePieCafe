import applePie from "../assets/images/apphoto.jpeg"
import restInside from "../assets/images/restInside.jpeg"
import restOutside from "../assets/images/restOutside.jpeg"
import "../styles/font.css"
import ReviewCarousel from "../components/reviewCarousel"
import leftArrow from "../assets/images/left-arrow.png"
import rightArrow from "../assets/images/right-arrow.png"

const LandingPage = () => {
    return (
        <div>

            {/* Opening Image Section */}
            <section>
                <div className="w-full h-[600px]">
                    <img src={applePie} className="w-full h-full object-cover" />
                </div>
            </section>

            {/* Quote Section */}
            <section>
                <div className="w-full h-[250px] bg-slate-800 flex flex-col justify-center items-center text-white">
                    <h1 className="handWriting text-7xl mb-3"> "Where Every Slice Feels Like Home"</h1>
                    <h1 className="text-bold text-xl">-Grace Johnson(Owner)</h1>
                </div>
            </section>

            {/* About Section */}
            <section>
                <div className="flex ">
                    <div className="w-1/2 h-[500px]">
                        <img src={restInside} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-1/2 flex flex-col justify-center bg-slate-100">
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


            {/* Review Modal Section */}
            <section className=" flex items-center p-[5px] py-4 bg-slate-800">
                <div>
                    <img src={leftArrow} className="" width="100px" />
                </div>
                <div>
                    <ReviewCarousel />
                </div>
                <div>
                    <img src={rightArrow} width="100px" />
                </div>
            </section>





        </div>
    )
}

export default LandingPage;