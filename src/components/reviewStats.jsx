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

        if(reviewDataTracker){
            const reviews = reviewData.map(item => item.reviewInfoRating)
            const sum = reviews.reduce((acc, curr) => acc + curr, 0);
            const average = Math.floor(sum / reviewData.length);
            setReviewAverage(average)
        }

    }, [reviewDataTracker])


    console.log(reviewAverage)

    return(
        <div className="w-1/2 darkRedBg ">
            <div className="reviewAverageCard">

            </div>

        </div>
    )
}

export default ReviewStats;