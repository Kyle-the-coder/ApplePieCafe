import applePie from "../assets/images/apphoto.jpeg"
import restInside from "../assets/images/restInside.jpeg"
import restOutside from "../assets/images/restOutside.jpeg"

const LandingPage = () => {
    return (
        <div>

            <section>
                <div className="w-full h-[500px]">
                    <img src={applePie} className="w-full h-[500px] object-cover" />
                </div>
            </section>

            <section>
                <div>
                    <h1>"Where Every Slice Feels Like Home" -Grace Johnson(owner)</h1>
                </div>
            </section>

            <section>
                <div>
                    <div>
                        <img src={restInside} className="w-[500px]" />
                    </div>
                    <div>
                        <h1>About Apple Pie Cafe:</h1>
                        <p>
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





        </div>
    )
}

export default LandingPage;