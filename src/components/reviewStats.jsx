import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const ReviewStats = () => {
    const [reviewData, setReviewData] = useState({})
    const [reviewDataTracker, setReviewDataTracker] = useState(false)

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

        

    }, [reviewDataTracker])
    
    return(
        <div className="w-1/2 darkRedBg h-[200px] mt-10">
            <h1></h1>

        </div>
    )
}

export default ReviewStats;