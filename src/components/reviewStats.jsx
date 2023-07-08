import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import starFill from "../assets/images/starFill.png"
import { db } from "../config/firebase";
import "../styles/reviewAverageCard.css"

const ReviewStats = (props) => {
    const [reviewData, setReviewData] = useState({})
    const [reviewDataTracker, setReviewDataTracker] = useState(false)
    const [reviewStarAverage, setReviewStarAverage] = useState(0)
    const [reviewAverage, setReviewAverage] = useState(0)
    const [reviewCircle, setReviewCircle] = useState("")
    const [reviewCircleTracker, setReviewCircleTracker] = useState(false)
    const {reviewAverageTracker, setReviewAverageTracker} = props
    

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
            const reviews = reviewData.map(item => item.reviewInfoRating)
            const sum = reviews.reduce((acc, curr) => acc + curr, 0);
            const average = Math.floor(sum / reviewData.length);
            const tempAvg = sum / reviewData.length
            const newAvg = parseFloat(tempAvg.toFixed(1))
            setReviewStarAverage(average)
            setReviewAverage(newAvg)
            console.log(tempAvg)
        }

        setReviewAverageTracker(false)
        
    }, [reviewDataTracker, reviewAverageTracker])


    useEffect(() => {
        const circleOffsetHandler = [
            { 1: "400" },
            { 2: "300" },
            { 3: "200" },
            { 4: "100" },
            { 5: "0" }
        ]

        for (let i = 0; i < circleOffsetHandler.length; i++) {
            const keys = Object.keys(circleOffsetHandler[i]);
            if (reviewStarAverage == keys[0]) {
                setReviewCircle(circleOffsetHandler[i][keys[0]]);
                break;
            }
        }
    }, [reviewStarAverage, reviewAverageTracker])

    const handleCircleStyleTracker = () => {
        setReviewCircleTracker(true)
        setTimeout(() => {
            setReviewCircleTracker(false)
        }, 2000);
    }

    return (
        <div className="reviewAverageCardContainer">
            <div className="reviewCardBorder">

                <div className="reviewAverageCard beigeBg">

                    {/* REVIEW STATS TOP */}
                    <div className="reviewAverageCardTop">

                        {/* REVIEW STATS NUMBER */}
                        <div className="reviewAverageCardNumberContainer darkBg cursor-pointer" onClick={handleCircleStyleTracker}>
                            <div>
                                <h1 className="text-white mb-1">Overall:</h1>
                            </div>
                            <div className="reviewAverageCardNumberOuterCircle">
                                <div className="reviewAverageCardNumberInnerCircle ml-1">
                                    <h1 className="fontWriting ">{reviewStarAverage}</h1>
                                    <img className="w-[40px] h-[40px]" src={starFill} />
                                </div>
                            </div>

                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                width="80%" height="80%">
                                <defs>
                                    <linearGradient id="gradientColor" >
                                        <stop offest="0%" stopColor="#e1c7a8" />
                                        <stop offset="100%" stopColor="#ff5101" />
                                    </linearGradient>
                                </defs>
                                <circle cx="50%" cy="50.5%" r="40%" strokeLinecap="round" style={{
                                    animation: `${reviewCircleTracker ? 'anim 1s linear forwards' : ''}`,
                                    strokeDashoffset: reviewCircle
                                }} />
                            </svg>
                        </div>

                        {/* REVIEW STATS DISPLAY */}
                        <div className="reviewAverageCardStatsContainer">
                            <div className="reviewStatsInfoContainer">
                                <h1>Average:</h1>
                                <div className="flex items-center">
                                    <h1 className="text-4xl">{reviewAverage}</h1>
                                </div>
                                <div className="flex flex-col w-full items-start ml-3">
                                    <h1>1</h1>
                                    <h1>2</h1>
                                    <h1>3</h1>
                                    <h1>4</h1>
                                    <h1>5</h1>
                                </div>
                            </div>
                        </div>

                        {/* REVIEW STATS BOTTOM */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewStats;