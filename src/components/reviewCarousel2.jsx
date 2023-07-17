
import { useEffect, useState } from "react";
import "../styles/scrollbar.css"
import "../styles/reviewCard.css"
import blank from "../assets/images/whiteStar.png"
import fill from "../assets/images/starFill.png"
import pieRight from "../assets/images/modalArrowRight.png"
import pieLeft from "../assets/images/modalArrowLeft.png"

const ReviewCarousel2 = ({ reviewModalTracker, reviewData, reviewDataTracker}) => {
    //INDEX
    const [currentIndex, setCurrentIndex] = useState(0);

    //CAROUSEL INDEXES
    const [activeSet, setActiveSet] = useState(null)
    const [isActiveSetDisplayed, setIsActiveSetDisplayed] = useState(true)
    const [activeSetDisplayDirection, setActiveSetDisplayDirection] = useState(false)

    //GET FIRST 4 IN DATA
    useEffect(() => {
        if (reviewDataTracker && reviewModalTracker === false) {
            setActiveSet(reviewData.slice(0, 4))
        }
    }, [reviewDataTracker, reviewModalTracker])

    //HANDLE NEXT SLIDE IN CAROUSEL
    const handleNextSet = () => {
        //MOVE INDEX FORWARD
        const newIndex = currentIndex + 4;
        const newSet = reviewData.slice(newIndex, newIndex + 4);
        //HANDLE TRANSITION
        setTimeout(() => {
            setIsActiveSetDisplayed(true)
        }, 200);
        // ACTIVE SET
        setActiveSet(newSet)
        setIsActiveSetDisplayed(false);
        setActiveSetDisplayDirection(false)
        //INDEX
        setCurrentIndex(newIndex);
    };

    //HANDLE PREV SLIDE IN CAROUSEL 
    const handlePrevSet = () => {
        //MOVE INDEX BACKWARDS
        const newIndex = currentIndex - 4;
        const newSet = reviewData.slice(newIndex, newIndex + 4);
        //HANDLE TRANSITION
        setTimeout(() => {
            setIsActiveSetDisplayed(true)
        }, 200);
        //ACTIVE SET
        setActiveSet(newSet)
        setIsActiveSetDisplayed(false)
        setActiveSetDisplayDirection(true)
        //INDEX
        setCurrentIndex(newIndex);
    };

    //HANDLE BUTTON DISABLE
    const isPrevButtonDisabled = currentIndex === 0;
    const isNextButtonDisabled = currentIndex + 4 >= reviewData.length;

    return (
        <div className="w-full flex justify-center flex-col ">

            <div className="w-full flex justify-center ml-5">
                <h1 className="fontWriting text-4xl darkBg text-white px-3 py-2 shadow-lg rounded">Recent Reviews:</h1>
            </div>

            <div className="flex w-full h-600px px-[5px] justify-between items-center">

                {/* PREV SLIDE BUTTON */}
                <div className="h-full  flex items-center ">
                    <button className={`h-[45px] w-[50px] ${isPrevButtonDisabled ? "opacity-50" : "opacity-100"} `} onClick={handlePrevSet} disabled={isPrevButtonDisabled}>
                        <img className="h-[55px] w-[80px]" src={pieLeft} alt="Previous" />
                    </button>
                </div>

                {/* ACTIVELY DISPLAYED SLIDE */}
                <div className="w-full flex h-[620px] justify-evenly overflow-hidden">
                    <ActiveReviewCard activeSet={activeSet} isActiveSetDisplayed={isActiveSetDisplayed} activeSetDisplayDirection={activeSetDisplayDirection} />
                </div>

                {/* NEXT SLIDE BUTTON */}
                <div className="h-full flex items-center">
                    <button className={`${isNextButtonDisabled ? "opacity-50" : "opacity-100"} `} onClick={handleNextSet} disabled={isNextButtonDisabled}>
                        <img className={` h-[45px] w-[50px]`} src={pieRight} alt="Next" />
                    </button>
                </div>
            </div>
        </div>
    )
}

const ActiveReviewCard = ({ activeSet, isActiveSetDisplayed, activeSetDisplayDirection }) => {
    return (
        <div className="w-full flex h-full justify-evenly overflow-hidden">

            {/* REVIEW CARD */}
            {activeSet == null ? "" : activeSet.map((data, index) => (

                <div className={` ${isActiveSetDisplayed ? "transform-all duration-1000 translate-x-0 " : activeSetDisplayDirection ? "absolute opacity-0 -translate-x-[1000px] z-[-1] " : "absolute opacity-0 translate-x-[1000px] z-[-1] "}   reviewCard`} key={index}>

                    <div className="reviewCardInner">
                        <div className="reviewCardTitle">
                            {/* USER IMAGE */}
                            <div className="reviewCardAvatarImgContainer">
                                <img src={data.reviewAvatarImg} className="reviewCardAvatarImg" />
                            </div>
                            {/* USER NAME */}
                            <div className="reviewCardTitleNameContainer">
                                <h1 className="font-bold">{data.reviewInfoName}</h1>
                            </div>
                        </div>  
                        {/* REVIEW DESCRIPTION */}
                        <div className="reviewCardDescriptionContainer" >
                            <p className="reviewCardDescription">{data.reviewInfoDescription}</p>
                        </div>
                        {/* REVIEW RATING */}
                        <div className="flex mt-3 ">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <img
                                    src={rating <= data.reviewInfoRating ? fill : blank}
                                    className="w-[35px] h-[35px]"
                                    key={rating}
                                    alt={`Rating ${rating}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}


export default ReviewCarousel2;