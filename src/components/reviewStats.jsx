import { useEffect, useState } from "react";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import starFill from "../assets/images/starFill.png"
import { db } from "../config/firebase";
import "../styles/reviewStatsCard.css"
import APLogo from "../assets/images/ApcBlack.PNG"
import avatar from "../assets/images/avatar.png"
const ReviewStats = (props) => {
    const { reviewData, setReviewData } = props
    const { reviewDataTracker, setReviewDataTracker } = props
    const [reviewFavData, setReviewFavData] = useState(null)
    const [reviewStarAverage, setReviewStarAverage] = useState(0)
    const [reviewAverage, setReviewAverage] = useState(0)
    const [reviewCircle, setReviewCircle] = useState("")
    const [reviewCircleTracker, setReviewCircleTracker] = useState(false)
    const [reviewNum1Percentage, setReviewNum1Percentage] = useState(0)
    const [reviewNum2Percentage, setReviewNum2Percentage] = useState(0)
    const [reviewNum3Percentage, setReviewNum3Percentage] = useState(0)
    const [reviewNum4Percentage, setReviewNum4Percentage] = useState(0)
    const [reviewNum5Percentage, setReviewNum5Percentage] = useState(0)

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

        const getFavoriteReviewData = async () => {
            const docRef = doc(db, "reviewInfo", process.env.REACT_APP_FAV_ID2)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                console.log("yes")
                setReviewFavData(docSnap.data())
            } else {
                console.log("no")
            }
        }

        getFavoriteReviewData()

        if (reviewDataTracker) {

            //ARRAY OF REVIEWS
            const reviews = reviewData.map(item => item.reviewInfoRating)

            // CALCULATE REVIEWS STARS AND AVERAGE
            const weights = {
                1: .2,
                2: .4,
                3: .6,
                4: .8,
                5: 1,
            };
            const sumWeightedRatings = reviews.reduce((sum, rating) => {
                return sum + (rating * weights[rating]);
            }, 0);
            const sumWeights = reviews.reduce((sum, rating) => {
                return sum + weights[rating];
            }, 0);
            const averageRating = sumWeightedRatings / sumWeights;
            console.log(averageRating)
            const newAvgRating = parseFloat(averageRating.toFixed(1))
            const newAvgStarRating = Math.trunc(newAvgRating);
            setReviewStarAverage(newAvgStarRating)
            setReviewAverage(newAvgRating)

            // CALCULATE SPECIFIC NUM AVERAGE
            const total = reviews.length
            const targetNum1 = 1;
            const count1 = reviews.filter((number) => number === targetNum1).length;
            const percentage1 = (count1 / total) * 100
            const newPercent1 = parseFloat(percentage1.toFixed(0))
            setReviewNum1Percentage(newPercent1)

            const targetNum2 = 2;
            const count2 = reviews.filter((number) => number === targetNum2).length;
            const percentage2 = (count2 / total) * 100
            const newPercent2 = parseFloat(percentage2.toFixed(0))
            setReviewNum2Percentage(newPercent2)

            const targetNum3 = 3;
            const count3 = reviews.filter((number) => number === targetNum3).length;
            const percentage3 = (count3 / total) * 100
            const newPercent3 = parseFloat(percentage3.toFixed(0))
            setReviewNum3Percentage(newPercent3)

            const targetNum4 = 4;
            const count4 = reviews.filter((number) => number === targetNum4).length;
            const percentage4 = (count4 / total) * 100
            const newPercent4 = parseFloat(percentage4.toFixed(0))
            setReviewNum4Percentage(newPercent4)

            const targetNum5 = 5;
            const count5 = reviews.filter((number) => number === targetNum5).length;
            const percentage5 = (count5 / total) * 100
            const newPercent5 = parseFloat(percentage5.toFixed(0))
            setReviewNum5Percentage(newPercent5)
        }
    }, [reviewDataTracker])

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
    }, [reviewStarAverage])

    const handleCircleStyleTracker = () => {
        setReviewCircleTracker(true)
        setTimeout(() => {
            setReviewCircleTracker(false)
        }, 2000);
    }

    return (
        <div className="reviewAverageCardContainer">
            <div className="reviewCardBorder">

                <div className="reviewAverageCard ">

                    {/* REVIEW STATS TOP */}
                    <div className="reviewAverageCardTop">

                        {/* REVIEW STATS NUMBER LEFT SIDE */}
                        <div className="reviewAverageCardNumberContainer darkBg cursor-pointer" onClick={handleCircleStyleTracker}>
                            <div>
                                <h1 className="mb-1 text-white">Overall:</h1>
                            </div>
                            <div className="reviewAverageCardNumberOuterCircle">
                                <div className="reviewAverageCardNumberInnerCircle ml-1">
                                    <h1 className="fontWriting ">{reviewStarAverage}</h1>
                                    <img className="w-[40px] h-[40px]" src={starFill} />
                                </div>
                            </div>

                            <svg className="circleSvg" xmlns="http://www.w3.org/2000/svg" version="1.1"
                                width="80%" height="80%">
                                <defs>
                                    <linearGradient id="gradientColor" >
                                        <stop offest="0%" stopColor="#e7d2ba" />
                                        <stop offset="100%" stopColor="#ff5101" />
                                    </linearGradient>
                                </defs>
                                <circle cx="50%" cy="50.5%" r="40%" strokeLinecap="round" style={{
                                    animation: `${reviewCircleTracker ? 'anim 1s linear forwards' : ''}`,
                                    strokeDashoffset: reviewCircle
                                }} />
                            </svg>
                        </div>

                        {/* REVIEW STATS DISPLAY RIGHT SIDE */}
                        <div className="reviewAverageCardStatsContainer ">
                            <div className="reviewStatsInfoContainer">

                                <h1>Average:</h1>
                                <div className="flex items-center">
                                    <h1 className="text-4xl">{reviewAverage}</h1>
                                </div>

                                <div className="flex flex-col w-full items-start ml-3">

                                    <div className="w-11/12 flex justify-between items-center">
                                        <h1>5:</h1>
                                        <svg className="num1Svg" xmlns="http://www.w3.org/2000/svg" width="60%" height="10">
                                            <rect width="100%" height="100%" fill="rgb(201, 201, 201)" />
                                            <rect width={`${reviewNum5Percentage}%`} height="100%" fill="rgb(19, 212, 19)" />
                                        </svg>
                                        <div className="w-[45px] flex justify-start">
                                            <h1>{reviewNum5Percentage}%</h1>
                                        </div>
                                    </div>

                                    <div className="w-11/12 flex justify-between items-center">
                                        <h1>4:</h1>
                                        <svg className="num1Svg" xmlns="http://www.w3.org/2000/svg" width="60%" height="10">
                                            <rect width="100%" height="100%" fill="rgb(201, 201, 201)" />
                                            <rect width={`${reviewNum4Percentage}%`} height="100%" fill="rgb(172, 226, 34)" />
                                        </svg>
                                        <div className="w-[45px] flex justify-start">
                                            <h1>{reviewNum4Percentage}%</h1>
                                        </div>
                                    </div>

                                    <div className="w-11/12 flex justify-between items-center">
                                        <h1>3:</h1>
                                        <svg className="num1Svg" xmlns="http://www.w3.org/2000/svg" width="60%" height="10">
                                            <rect width="100%" height="100%" fill="rgb(201, 201, 201)" />
                                            <rect width={`${reviewNum3Percentage}%`} height="100%" fill="rgb(235, 225, 40)" />
                                        </svg>
                                        <div className="w-[45px] flex justify-start">
                                            <h1>{reviewNum3Percentage}%</h1>
                                        </div>
                                    </div>

                                    <div className="w-11/12 flex justify-between items-center">
                                        <h1>2:</h1>
                                        <svg className="num1Svg" xmlns="http://www.w3.org/2000/svg" width="60%" height="10">
                                            <rect width="100%" height="100%" fill="rgb(201, 201, 201)" />
                                            <rect width={`${reviewNum2Percentage}%`} height="100%" fill="rgb(236, 170, 46)" />
                                        </svg>
                                        <div className="w-[45px] flex justify-start">
                                            <h1>{reviewNum2Percentage}%</h1>
                                        </div>
                                    </div>

                                    <div className="w-11/12 flex justify-between items-center">
                                        <h1>1:</h1>
                                        <svg className="num1Svg" xmlns="http://www.w3.org/2000/svg" width="60%" height="10">
                                            <rect width="100%" height="100%" fill="rgb(201, 201, 201)" />
                                            <rect width={`${reviewNum1Percentage}%`} height="100%" fill="rgb(236, 52, 46)" />
                                        </svg>
                                        <div className="w-[45px] flex justify-start">
                                            <h1>{reviewNum1Percentage}%</h1>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* REVIEW STATS BOTTOM */}
                    <div className="reviewFavoriteContainer">
                        {/* REVIEW STATS BOTTOM TITLE/LOGO */}
                        <div className="reviewFavoriteTitleContainer ">
                            <img src={APLogo} className="w-[90px] h-[90px]" />
                            <h1 className="fontWriting flex justify-center w-5/6">Apple Pie Cafe Favorite Review:</h1>
                        </div>
                        {/* REVIEW STATS FAV INFO W/CARD FLIP */}
                        <div className="reviewFavoriteDataFlipCard">
                            <img className="reviewFavoriteDataImg" src={reviewFavData !== null ? reviewFavData.reviewAvatarImg : avatar} />
                            <div className="reviewFavoriteDataFlipCardInner">
                                <div className="reviewFavoriteDataFlipCardFront">
                                    <div className="reviewFavoriteDataFront">
                                        <img src={starFill} className="w-[55px] h-[55px]" />
                                        <img src={starFill} className="w-[55px] h-[55px]" />
                                        <img src={starFill} className="w-[55px] h-[55px]" />
                                        <img src={starFill} className="w-[55px] h-[55px]" />
                                        <img src={starFill} className="w-[55px] h-[55px]" />
                                    </div>
                                </div>
                                <div className="reviewFavoriteDataFlipCardBack">
                                    <p>{reviewFavData !== null ? `"${reviewFavData.reviewInfoDescription}"` : "loading"}</p>
                                    <h1 className="fontWriting">-{reviewFavData !== null ? reviewFavData.reviewInfoName : "loading"}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewStats;