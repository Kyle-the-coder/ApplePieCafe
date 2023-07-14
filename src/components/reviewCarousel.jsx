
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import "../styles/scrollbar.css"
import "../styles/reviewCard.css"
import blank from "../assets/images/whiteStar.png"
import fill from "../assets/images/starFill.png"
import pieRight from "../assets/images/modalArrowRight.png"
import pieLeft from "../assets/images/modalArrowLeft.png"
import { set } from "mongoose";

const ReviewCarousel = (props) => {
    const [reviewData, setReviewData] = useState({})
    const [reviewDataTracker, setReviewDataTracker] = useState(false)

    //CAROUSEL STATES
    const [next1Set, setNext1Set] = useState([])
    const [next2Set, setNext2Set] = useState([])
    const [prev1Set, setPrev1Set] = useState([])
    const [prev2Set, setPrev2Set] = useState([])
    const [prevSetTracker, setPrevSetTracker] = useState(true)

    //INDEX
    const [currentIndex, setCurrentIndex] = useState(0);

    //CAROUSEL TRANSITIONS
    const [next1TransitionTracker, setNext1TransitionTracker] = useState(false)
    const [next1TransitionDirectionTracker, setNext1TransitionDirectionTracker] = useState(false)
    const [next2TransitionTracker, setNext2TransitionTracker] = useState(false)
    const [next2TransitionDirectionTracker, setNext2TransitionDirectionTracker] = useState(false)
    const [nextSetTracker, setNextSetTracker] = useState(true)
    const [nextSetDirectionTracker, setNextSetDirectionTracker] = useState(false)
    const [prev1TransitionTracker, setPrev1TransitionTracker] = useState(false)
    const [prev2TransitionTracker, setPrev2TransitionTracker] = useState(false)

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
            setPrev1TransitionTracker(true)
            setPrev1Set(reviewData.slice(0, 4))
            setNext1Set(reviewData.slice(4))
            setNext1TransitionTracker(false)
            setNext2TransitionTracker(false)
            setPrev2TransitionTracker(false)
            setCurrentIndex(0)
            setNextSetTracker(true)
        }

    }, [reviewDataTracker, reviewModalTracker])

    const handleNextSet = () => {
        const newIndex = currentIndex + 4;
        const currentSet = reviewData.slice(currentIndex, currentIndex + 4)
        const newSet = reviewData.slice(newIndex, newIndex + 4);
        const newerIndex = newIndex + 4
        const newerSet = reviewData.slice(newerIndex, newerIndex + 4)
        const oldSet = reviewData.slice(newIndex - 4, newIndex)

        //Prev Transition
        setPrev1TransitionTracker(false)
        setPrev2TransitionTracker(false)
        setPrev1Set(oldSet)
        setPrev2Set([])

        if (nextSetTracker) {

            // Next 1 Transition
            setNext1Set(newSet)
            setNext1TransitionTracker(true)


            //Next 2 Transition
            setNext2TransitionTracker(false)
            setNext2Set(newerSet)
    

        }

        if (!nextSetTracker) {
            //Pre set
            setPrev1Set(currentSet)
            setPrev1TransitionTracker(true)

            // Next 1 Reload
            setNext1TransitionTracker(false)
            setNext1Set(newerSet)


            //Next 2 Transition
            setNext2Set(newSet);
            setNext2TransitionTracker(true)
            setPrev1TransitionTracker(false)

        }

        //Index
        setCurrentIndex(newIndex);

        //Handle Trackers
        setNextSetTracker(!nextSetTracker)
        setPrevSetTracker(true)

    };

    const handlePrevSet = () => {
        const newIndex = currentIndex - 4;
        
        const newSet = reviewData.slice(newIndex, newIndex + 4);
        const oldSet = reviewData.slice(newIndex + 4)
        const newerIndex = newIndex - 4
        const newerSet = reviewData.slice(newerIndex, newIndex)

        setNext1TransitionTracker(false)
        setNext2TransitionTracker(false)
        setNext1Set(oldSet)

        if (prevSetTracker) {
            // Next 1 Transition
            setPrev1Set(newSet)
            setPrev1TransitionTracker(true)

            //Next 2 Transition
            setPrev2TransitionTracker(false)
            setPrev2Set(newerSet)
        }

        if (!prevSetTracker) {
            // Next 1 Transition
            setPrev1TransitionTracker(false)
            setPrev1Set(newerSet)

            //Next 2 Transition
            setPrev2Set(newSet);
            setPrev2TransitionTracker(true)
        }

        //Next Set
        setNext1TransitionTracker(false)
        setNext2TransitionTracker(false)

        //Index
        setCurrentIndex(newIndex);

        setPrevSetTracker(!prevSetTracker)
        setNextSetTracker(true)
    };

    const isPrevButtonDisabled = currentIndex === 0;
    const isNextButtonDisabled = currentIndex + 4 >= reviewData.length;

    // console.log(reviewModalTracker)
    // console.log("prev 1", prev1TransitionTracker)
    // console.log("prev 2", prev2TransitionTracker)
    // console.log("next 1 set", next1Set)
    // console.log("currentIndex", currentIndex)
    console.log("next 1 tracker", next1TransitionTracker)
    console.log("next 1 direction", next1TransitionDirectionTracker)
    console.log("next 2 tracker", next2TransitionTracker)
    console.log("next 2 direction", next2TransitionDirectionTracker)
    console.log("next set direction", nextSetDirectionTracker)
    // console.log( "next 2 set", next2Set)

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

                <div className="w-full flex h-full justify-evenly transition-all duration-1000 overflow-hidden">
                    {/* Review Card */}
                    {prev1Set.map((data, index) => (

                        <div className={`transition-transform duration-[2200ms]  ${prev1TransitionTracker ? "translate-x-0 opacity-100" : "absolute -translate-x-[1000px] z-[-1] "}   reviewCard`} key={index}>

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
                    {prev2Set.map((data, index) => (

                        <div className={`transition-transform duration-[2200ms]  ${prev2TransitionTracker ? "translate-x-0 opacity-100" : "absolute  -translate-x-[1000px] z-[-1] "}   reviewCard`} key={index}>

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
                    {next1Set.map((data, index) => (

                        <div className={`  ${next1TransitionTracker ? "transition-transform duration-[2200ms] translate-x-0 opacity-100" : " transition-none absolute translate-x-[1000px] z-[-1] "}   reviewCard`} key={index}>

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
                    {next2Set.map((data, index) => (

                        <div className={`transition-transform duration-[2200ms] ${next2TransitionTracker ? " translate-x-0 opacity-100" : "absolute translate-x-[1000px] opacity-0"}  reviewCard`} key={index}>

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
                <div className="h-full flex items-center">
                    <button className={`${isNextButtonDisabled ? "opacity-50" : "opacity-100"} `} onClick={handleNextSet} disabled={isNextButtonDisabled}>
                        <img className={` h-[45px] w-[50px]`} src={pieRight} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReviewCarousel;