import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { set } from "mongoose";
import "../styles/reviewAverageCard.css"

const ReviewStats = () => {
    const [reviewData, setReviewData] = useState({})
    const [reviewDataTracker, setReviewDataTracker] = useState(false)
    const [reviewAverage, setReviewAverage] = useState(0)

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


    console.log(reviewAverage)

    return (
        <div className="reviewAverageCardContainer">
            <div className="reviewAverageCard">

                {/* REVIEW STATS TOP */}
                <div className="reviewAverageCardTop">

                    {/* REVIEW STATS NUMBER */}
                    <div className="reviewAverageCardNumberContainer">
                        <div className="reviewAverageCardNumberOuterCircle">
                            <div className="reviewAverageCardNumberInnerCircle">
                                <h1 className="fontWriting">{reviewAverage}</h1>
                            </div>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                            width="100%" height="100%">
                            <defs>
                                <linearGradient id="gradientColor" >
                                    <stop offest="0%" stopColor="#e91e63" />
                                    <stop offset="100%" stopColor="#673ab7" />
                                </linearGradient>
                            </defs>
                            <circle cx="130" cy="120"  r="95" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* REVIEW STATS DISPLAY */}
                    <div className="reviewAverageCardStatsContainer">
                        <div class="average-card">
                            <div class="circle"></div>
                            <div class="average-number">75%</div>
                        </div>
                        <h1>goodbye</h1>
                    </div>

                </div>



            </div>

        </div>
    )
}

export default ReviewStats;