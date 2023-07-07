import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { set } from "mongoose";
import "../styles/reviewAverageCard.css"

const ReviewStats = () => {
    const [reviewData, setReviewData] = useState({})
    const [reviewDataTracker, setReviewDataTracker] = useState(false)
    const [reviewAverage, setReviewAverage] = useState(0)
    const [reviewCircle, setReviewCircle] = useState("")
    const [reviewCircleTracker, setReviewCircleTracker] = useState(false)

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
            setReviewAverage(average)
        }

    }, [reviewDataTracker])

    useEffect(() => {
        const circleOffsetHandler = [
            { 1: "480" },
            { 2: "360" },
            { 3: "180" },
            { 4: "120" },
            { 5: "0" }
        ]

        for (let i = 0; i < circleOffsetHandler.length; i++) {
            const keys = Object.keys(circleOffsetHandler[i]);
            if (reviewAverage == keys[0]) {
                setReviewCircle(circleOffsetHandler[i][keys[0]]);
                break;
            }
        }
    }, [reviewAverage])


    const circleStyleStart = {
        strokeDashoffset: "600"
    }

    const circleStyleEnd = {
        strokeDashoffset: `${reviewCircle}`,
    }

    const handleCircleStyleTracker = () => {
        setReviewCircleTracker(true)
        setTimeout(() => {
            setReviewCircleTracker(false)
        }, 2000);

    }

    console.log(reviewCircleTracker)

    return (
        <div className="reviewAverageCardContainer">
            <div className="reviewCardBorder">

                <div className="reviewAverageCard beigeBg">

                    {/* REVIEW STATS TOP */}
                    <div className="reviewAverageCardTop">

                        {/* REVIEW STATS NUMBER */}
                        <div className="reviewAverageCardNumberContainer darkBg cursor-pointer" onClick={handleCircleStyleTracker}>
                            <div className="reviewAverageCardNumberOuterCircle">
                                <div className="reviewAverageCardNumberInnerCircle">
                                    <h1 className="fontWriting">{reviewAverage}</h1>
                                </div>
                            </div>

                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                width="100%" height="100%">
                                <defs>
                                    <linearGradient id="gradientColor" >
                                        <stop offest="0%" stopColor="#e1c7a8" />
                                        <stop offset="100%" stopColor="#ff5101" />
                                    </linearGradient>
                                </defs>
                                <circle cx="132" cy="120" r="85" strokeLinecap="round" style={{
                                    animation: `${reviewCircleTracker ? 'anim 1s linear forwards' : ''}`,
                                    strokeDashoffset: reviewCircle
                                }} />
                            </svg>
                        </div>

                        {/* REVIEW STATS DISPLAY */}
                        <div className="reviewAverageCardStatsContainer">
                            <h1>goodbye</h1>
                        </div>

                        {/* REVIEW STATS BOTTOM */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewStats;