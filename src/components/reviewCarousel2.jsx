
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import "../styles/scrollbar.css"
import "../styles/reviewCard.css"
import blank from "../assets/images/whiteStar.png"
import fill from "../assets/images/starFill.png"
import pieRight from "../assets/images/modalArrowRight.png"
import pieLeft from "../assets/images/modalArrowLeft.png"

const ReviewCarousel2 = (props) => {
    const [reviewData, setReviewData] = useState({})
    const [reviewDataTracker, setReviewDataTracker] = useState(false)

    //INDEX
    const [currentIndex, setCurrentIndex] = useState(0);

    //CAROUSEL INDEXES
    const [activeSet, setActiveSet] = useState(null)
    const [isActiveSetDisplayed, setIsActiveSetDisplayed] = useState(false)
    const [activeSetDisplayDirection, setActiveSetDisplayDirection] = useState(false)

    //PROPS
    const { reviewModalTracker } = props

    useEffect(() => {
        // GET REVIEW DATA
        const getReviewData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "reviewInfo"));
                const documents = querySnapshot.docs.map((doc) => doc.data());
                setReviewData(documents);
                setReviewDataTracker(true)
            } catch (error) {
                console.log(error);
            }
        };
        getReviewData();

        if (reviewDataTracker && reviewModalTracker == false) {
            setActiveSet(reviewData.slice(currentIndex, 4))  
            setIsActiveSetDisplayed(true)
        }

    }, [reviewDataTracker, reviewModalTracker])

    const handleNextSet = () => {
        const currentSet = reviewData.slice(currentIndex, currentIndex + 4)
        const newIndex = currentIndex + 4;
        const newSet = reviewData.slice(newIndex, newIndex + 4);
        setTimeout(() => {
            setIsActiveSetDisplayed(true)
        }, 50);
        // Active Set
        setIsActiveSetDisplayed(false);
        setActiveSet(newSet)
        setActiveSetDisplayDirection(false)
        //Index
        setCurrentIndex(newIndex);
    };

    const handlePrevSet = () => {
        const newIndex = currentIndex - 4;
        const newSet = reviewData.slice(newIndex, newIndex + 4);
        setTimeout(() => {
            setIsActiveSetDisplayed(true)
        }, 50);
        setIsActiveSetDisplayed(false)
        setActiveSetDisplayDirection(true)
        setActiveSet(newSet)
        //Index
        setCurrentIndex(newIndex);
    };

    const isPrevButtonDisabled = currentIndex === 0;
    const isNextButtonDisabled = currentIndex + 4 >= reviewData.length;

    return (
        <div className="w-full flex justify-center flex-col ">

            <div className="w-full flex justify-center ml-5">
                <h1 className="fontWriting text-4xl darkBg text-white px-3 py-2 shadow-lg rounded">Recent Reviews:</h1>
            </div>

            <div className="flex w-full h-600px px-[5px] justify-between items-center">
                <div className="h-full  flex items-center ">
                    <button className={`h-[45px] w-[50px] ${isPrevButtonDisabled ? "opacity-50" : "opacity-100"} `} onClick={handlePrevSet} disabled={isPrevButtonDisabled}>
                        <img className="h-[55px] w-[80px]" src={pieLeft} />
                    </button>
                </div>

                <div className="w-full flex h-[610px] justify-evenly overflow-hidden">
                    <ActiveReviewCard activeSet={activeSet} isActiveSetDisplayed={isActiveSetDisplayed} activeSetDisplayDirection={activeSetDisplayDirection}/>
                </div>
                <div className="h-full flex items-center">
                    <button className={`${isNextButtonDisabled ? "opacity-50" : "opacity-100"} `} onClick={handleNextSet} disabled={isNextButtonDisabled}>
                        <img className={` h-[45px] w-[50px]`} src={pieRight} />
                    </button>
                </div>
            </div>
        </div>
    )
}

const ActiveReviewCard = (props) => {
    const { activeSet, isActiveSetDisplayed, activeSetDisplayDirection } = props


    return (
        <div className="w-full flex h-[610px] justify-evenly overflow-hidden">
            {/* Review Card */}
            {activeSet == null ? "" : activeSet.map((data, index) => (

                <div className={` ${isActiveSetDisplayed ? "transform-all duration-1000 translate-x-0 " : activeSetDisplayDirection ? "absolute opacity-0 -translate-x-[1000px] z-[-1] " : "absolute opacity-0 translate-x-[1000px] z-[-1] "}   reviewCard`} key={index}>

                    <div className="reviewCardInner">
                        <div className="reviewCardTitle">
                            <div className="reviewCardAvatarImgContainer">
                                <img src={data.reviewAvatarImg} className="reviewCardAvatarImg" />
                            </div>
                            <div className="reviewCardTitleNameContainer">
                                <h1 className="font-bold">{data.reviewInfoName}</h1>
                            </div>
                        </div>

                        <div className="reviewCardDescriptionContainer" >
                            <p className="reviewCardDescription">{data.reviewInfoDescription}</p>
                        </div>

                        <div className="flex mt-3 ">
                            {data.reviewInfoRating === 1 ?
                                <div className="w-full flex justify-evenly">
                                    <img src={fill} className="w-[35px] h-[35px]" />
                                    <img src={blank} className="w-[35px] h-[35px]" />
                                    <img src={blank} className="w-[35px] h-[35px]" />
                                    <img src={blank} className="w-[35px] h-[35px]" />
                                    <img src={blank} className="w-[35px] h-[35px]" />
                                </div>
                                :
                                data.reviewInfoRating === 2 ?
                                    <div className="w-full flex justify-evenly">
                                        <img src={fill} className="w-[35px] h-[35px]" />
                                        <img src={fill} className="w-[35px] h-[35px]" />
                                        <img src={blank} className="w-[35px] h-[35px]" />
                                        <img src={blank} className="w-[35px] h-[35px]" />
                                        <img src={blank} className="w-[35px] h-[35px]" />
                                    </div>
                                    :
                                    data.reviewInfoRating === 3 ?
                                        <div className="w-full flex justify-evenly">
                                            <img src={fill} className="w-[35px] h-[35px]" />
                                            <img src={fill} className="w-[35px] h-[35px]" />
                                            <img src={fill} className="w-[35px] h-[35px]" />
                                            <img src={blank} className="w-[35px] h-[35px]" />
                                            <img src={blank} className="w-[35px] h-[35px]" />
                                        </div>
                                        :
                                        data.reviewInfoRating === 4 ?
                                            <div className="w-full flex justify-evenly">
                                                <img src={fill} className="w-[35px] h-[35px]" />
                                                <img src={fill} className="w-[35px] h-[35px]" />
                                                <img src={fill} className="w-[35px] h-[35px]" />
                                                <img src={fill} className="w-[35px] h-[35px]" />
                                                <img src={blank} className="w-[35px] h-[35px]" />
                                            </div>
                                            :
                                            data.reviewInfoRating === 5 ?
                                                <div className="w-full flex justify-evenly">
                                                    <img src={fill} className="w-[35px] h-[35px]" />
                                                    <img src={fill} className="w-[35px] h-[35px]" />
                                                    <img src={fill} className="w-[35px] h-[35px]" />
                                                    <img src={fill} className="w-[35px] h-[35px]" />
                                                    <img src={fill} className="w-[35px] h-[35px]" />
                                                </div>
                                                : ""}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}


export default ReviewCarousel2;