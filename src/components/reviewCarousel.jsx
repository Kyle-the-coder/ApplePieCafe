
import blank from "../assets/images/whiteStar.png"
import fill from "../assets/images/starFill.png"
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import "../styles/scrollbar.css"
import "../styles/reviewCard.css"
import pieRight from "../assets/images/pieRight.PNG"
import pieLeft from "../assets/images/pieLeft.png"

const ReviewCarousel = () => {
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
    const [next2TransitionTracker, setNext2TransitionTracker] = useState(false)
    const [nextSetTracker, setNextSetTracker] = useState(true)
    const [prev1TransitionTracker, setPrev1TransitionTracker] = useState(false)
    const [prev2TransitionTracker, setPrev2TransitionTracker] = useState(false)

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

        if (reviewDataTracker) {
            setPrev1TransitionTracker(true)
            setPrev1Set(reviewData.slice(0, 3))
            setNext1Set(reviewData.slice(3))
        }

    }, [reviewDataTracker])

    const handleNextSet = () => {
        const newIndex = currentIndex + 3;
        const newSet = reviewData.slice(newIndex, newIndex + 3);
        const newerIndex = newIndex + 3
        const newerSet = reviewData.slice(newerIndex, newerIndex + 3)
        const oldSet = reviewData.slice(newIndex - 3, newIndex)

        //Prev Transition
        setPrev1TransitionTracker(false)
        setPrev2TransitionTracker(false)
        setPrev1Set(oldSet)

        if (nextSetTracker) {
            // Next 1 Transition
            setNext1Set(newSet)
            setNext1TransitionTracker(true)

            //Next 2 Transition
            setNext2TransitionTracker(false)
            setNext2Set(newerSet)
        }

        if (!nextSetTracker) {
            // Next 1 Reload
            setNext1TransitionTracker(false)
            setNext1Set(newerSet)

            //Next 2 Transition
            setNext2Set(newSet);
            setNext2TransitionTracker(true)
        }

        //Index
        setCurrentIndex(newIndex);

        //Handle Trackers
        setNextSetTracker(!nextSetTracker)
        setPrevSetTracker(true)

    };

    const handlePrevSet = () => {
        const newIndex = currentIndex - 3;
        const newSet = reviewData.slice(newIndex, newIndex + 3);
        const oldSet = reviewData.slice(newIndex + 3)
        const newerIndex = newIndex - 3
        const newerSet = reviewData.slice(newerIndex, newerIndex - 3)

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
            const timeoutId = setTimeout(() => {
                setPrev2TransitionTracker(true)
            }, 50);
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
    const isNextButtonDisabled = currentIndex + 3 >= reviewData.length;
    return (
        <div className="w-full">

            <div className="w-full flex justify-begin ml-5">
                <h1 className="fontWriting text-4xl">Recent Reviews:</h1>
            </div>

            <div className="flex w-full h-600px justify-center">
                <div className="h-full flex items-center">
                    <button className={`${isPrevButtonDisabled ? "opacity-50" : "opacity-100"}`} onClick={handlePrevSet} disabled={isPrevButtonDisabled}>
                        <img className="h-[45px] w-[50px]" src={pieLeft} />
                    </button>
                </div>
                {/* Review Card */}
                {prev1Set.map((data, index) => (

                    <div className={`${prev1TransitionTracker ? "translate-x-0 opacity-100" : "absolute -translate-x-80 z-[-1] "}   reviewCard`} key={index}>

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

                    <div className={`${prev2TransitionTracker ? "translate-x-0 opacity-100" : "absolute -translate-x-80 z-[-1] "}   reviewCard`} key={index}>

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

                    <div className={`${next1TransitionTracker ? 'translate-x-0 opacity-100' : "absolute z-[-1] translate-x-80 "}   reviewCard`} key={index}>

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

                    <div className={`${next2TransitionTracker ? 'translate-x-0 opacity-100' : 'absolute z-[-1] translate-x-80 ' }   reviewCard`} key={index}>

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

                <div className="h-full flex items-center">
                    <button className={`${isNextButtonDisabled ? "opacity-50" : "opacity-100"}`} onClick={handleNextSet} disabled={isNextButtonDisabled}>
                        <img className={` h-[40px] w-[50px]`} src={pieRight} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReviewCarousel;