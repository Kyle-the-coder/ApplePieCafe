import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import ReviewCarousel from "../components/reviewCarousel"
import ReviewModal from "../components/reviewModal"
import ReviewStats from "../components/reviewStats"
import "../styles/font.css"
import "../styles/bgColors.css"
import applePie from "../assets/images/apphoto.jpeg"
import restInside from "../assets/images/restInside.jpeg"

const LandingPage = () => {
    const [reviewModalTracker, setReviewModalTracker] = useState(false)
    const [reviewAverageTracker, setReviewAverageTracker] = useState(false)
    const [reviewDataTracker, setReviewDataTracker] = useState(false)
    const navigate = useNavigate()
    const reviewButton = useRef(null)

    const handleReviewModal = () => {
        setReviewModalTracker(!reviewModalTracker);
        reviewButton.current.scrollIntoView({ behavior: "smooth" });
    }

    console.log("lp review tracker", reviewAverageTracker)

    return (
        <div className="relative">

            {/* OPENING IMAGE SECTION */}
            <section>
                <div className="w-full h-[600px]">
                    <img src={applePie} className="w-full h-full object-cover" />
                </div>
            </section>

            {/* QUOTE SECTION */}
            <section>
                <div className="w-full h-[250px] darkBg flex flex-col justify-center items-center text-white">
                    <h1 className="handWriting text-7xl mb-3"> "Where Every Slice Feels Like Home"</h1>
                    <h1 className="text-bold text-xl">-Grace Johnson(Owner)</h1>
                </div>
            </section>

            {/* ABOUT SECTION */}
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

            {/* REVIEW CAROUSEL SECTION */}
            <section className=" flex items-center  beigeBg flex-col" ref={reviewButton}>
                <div className="w-full flex mb-5">
                    <ReviewCarousel reviewModalTracker={reviewModalTracker} />
                </div>
                <div className="w-full darkBg py-5">
                    <ReviewStats
                    reviewDataTracker={reviewDataTracker} 
                    setReviewDataTracker={setReviewDataTracker}
                    reviewAverageTracker={reviewAverageTracker} 
                    setReviewAverageTracker={setReviewAverageTracker} />
                </div>
            </section>

            {/* REVIEW MODAL FORM */}
            <section>
                <div className="py-5" >
                    <h1 className="fontWriting text-3xl mb-3">Recently visited?</h1>
                    <button className="px-3 py-1 darkRedBg text-white rounded " onClick={() => handleReviewModal()}>Leave a review!</button>
                </div>
                <>
                    <ReviewModal 
                    reviewAverageTracker={reviewAverageTracker} 
                    setReviewAverageTracker={setReviewAverageTracker} 
                    setReviewModalTracker={setReviewModalTracker} 
                    handleReviewModal={handleReviewModal} 
                    reviewModalTracker={reviewModalTracker} />
                </>
            </section>

        </div>
    )
}

export default LandingPage;