import avatar from "../assets/images/avatar.png"
import wAvatar from "../assets/images/woman.png"
import starBlank from "../assets/images/starBlank.png"
import starFill from "../assets/images/starFill.png"
import blank from "../assets/images/starBlank.png"
import fill from "../assets/images/starFill.png"
import { useEffect, useState } from "react";
import { doc, getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import "../styles/scrollbar.css"

const ReviewCarousel = () => {
    const [reviewData, setReviewData] = useState({})
    const [reviewDataTracker, setReviewDataTracker] = useState(false)
    const [starSet, setStarSet] = useState([])
    const [starFillTracker, setStarFillTracker] = useState(false)

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

        const handleStarFill = (index) => {
            console.log(index, "index")
            if (index == 1) {
                const newSet = [
                    { img: fill, idx: 1 },
                    { img: blank, idx: 2 },
                    { img: blank, idx: 3 },
                    { img: blank, idx: 4 },
                    { img: blank, idx: 5 },
                ]
                setStarSet(newSet)
            }

            if (index == 2) {
                const newSet = [
                    { img: fill, idx: 1 },
                    { img: fill, idx: 2 },
                    { img: blank, idx: 3 },
                    { img: blank, idx: 4 },
                    { img: blank, idx: 5 },
                ]
                setStarSet(newSet)
            }

            if (index == 3) {
                const newSet = [
                    { img: fill, idx: 1 },
                    { img: fill, idx: 2 },
                    { img: fill, idx: 3 },
                    { img: blank, idx: 4 },
                    { img: blank, idx: 5 },
                ]
                setStarSet(newSet)
            }

            if (index == 4) {
                const newSet = [
                    { img: fill, idx: 1 },
                    { img: fill, idx: 2 },
                    { img: fill, idx: 3 },
                    { img: fill, idx: 4 },
                    { img: blank, idx: 5 },
                ]
                setStarSet(newSet)
            }

            if (index == 5) {
                const newSet = [
                    { img: fill, idx: 1 },
                    { img: fill, idx: 2 },
                    { img: fill, idx: 3 },
                    { img: fill, idx: 4 },
                    { img: fill, idx: 5 },
                ]
                setStarSet(newSet)
            }
        }



    }, [reviewDataTracker])

    console.log(reviewData)
    return (
        <div className="w-full overflow-x-auto">
            <div>
                <h1 className="fontWriting text-4xl text-white">Recent Reviews:</h1>
            </div>

            <div className="flex w-full h-600px justify-center">

                {/* Review Card */}
                {reviewDataTracker && reviewData.map((data, index) => (
                    <div className="flex flex-col items-center w-[300px] h-content bg-orange-600 border rounded border-[3px] border-black m-4 px-1 py-2" key={index}>
                        <div className="w-11/12  h-content  mt-3">
                            <div className="flex items-center mb-2">
                                <div className="w-1/3 ">
                                    <img src={data.reviewAvatarImg} className="w-[75px] h-[75px] rounded-full object-cover object-center" />
                                </div>
                                <div className="overflow-hidden hover:overflow-x-auto px-2 w-2/3">
                                    <h1 className="font-bold">{data.reviewInfoName}</h1>
                                </div>
                            </div>
                            <div className="w-full h-[200px] bg-white border border-2 border-black overflow-y-scroll " >
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