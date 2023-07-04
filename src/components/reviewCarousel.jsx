
import blank from "../assets/images/starBlank.png"
import fill from "../assets/images/starFill.png"
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import "../styles/scrollbar.css"
import "../styles/reviewCard.css"


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
                    <div className="reviewCard" key={index}>
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
        </div>
    )
}

export default ReviewCarousel;