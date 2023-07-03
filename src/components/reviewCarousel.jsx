
import blank from "../assets/images/starBlank.png"
import fill from "../assets/images/starFill.png"
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import "../styles/scrollbar.css"

const ReviewCarousel = () => {
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


    return (
        <div className="w-full">

            <div className="w-full flex justify-begin ml-5">
                <h1 className="fontWriting text-4xl text-white">Recent Reviews:</h1>
            </div>

            <div className="flex w-full h-600px justify-center">
                {/* Review Card */}
                {reviewDataTracker && reviewData.map((data, index) => (
                    <div className="flex flex-col items-center w-[300px] h-content bg-orange-600 border rounded border-[3px] border-black m-4 px-1 py-2" key={index}>
                        <div className="w-11/12  h-content  mt-3">
                            <div className="flex items-center mb-2 bg-red-200 p-1 w-full h-content relative">
                                <div className="w-1/3 z-[10] absolute">
                                    <img src={data.reviewAvatarImg} className="w-[75px] h-[75px] rounded-full object-cover object-center" />
                                </div>
                                <div className="overflow-hidden hover:overflow-x-auto bg-red-300 px-2  w-content flex items-center justify-center">
                                    <h1 className="font-bold">{data.reviewInfoName}</h1>
                                </div>
                            </div>
                            <div className="w-full h-[200px] bg-white border border-2 border-black overflow-y-auto " >
                                <p className="bg-white p-2">{data.reviewInfoDescription}</p>
                            </div>
                        </div>
                        <div className="flex mt-3">
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
                ))}
            </div>
        </div>
    )
}

export default ReviewCarousel;