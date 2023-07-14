import React, { useEffect, useState, useRef } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import "../styles/scrollbar.css";
import "../styles/reviewCard.css";
import blank from "../assets/images/whiteStar.png";
import fill from "../assets/images/starFill.png";
import pieRight from "../assets/images/modalArrowRight.png";
import pieLeft from "../assets/images/modalArrowLeft.png";

const Review2Carousel = (props) => {
    const [reviewData, setReviewData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardRef = useRef(null);

    const { reviewModalTracker } = props;

    useEffect(() => {
        const getReviewData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "reviewInfo"));
                const documents = querySnapshot.docs.map((doc) => doc.data());
                setReviewData(documents);
            } catch (error) {
                console.log(error);
            }
        };
        getReviewData();
    }, []);

    useEffect(() => {
        if (reviewData.length > 0 && !reviewModalTracker) {
            setCurrentIndex(0);
        }
    }, [reviewData, reviewModalTracker]);

    const handleNextSet = () => {
        const newIndex = currentIndex + 1;
        if (newIndex < reviewData.length) {
            setCurrentIndex(newIndex);
        }
    };

    const handlePrevSet = () => {
        const newIndex = currentIndex - 1;
        if (newIndex >= 0) {
            setCurrentIndex(newIndex);
        }
    };

    const isPrevButtonDisabled = currentIndex === 0;
    const isNextButtonDisabled = currentIndex + 1 >= reviewData.length;

    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.style.transform = `translateX(-${currentIndex * cardRef.current.offsetWidth}px)`;
        }
    }, [currentIndex]);

    return (
        <div className="w-full flex justify-center flex-col">
            <div className="w-full flex justify-center ml-5">
                <h1 className="fontWriting text-4xl darkBg text-white px-3 py-2 shadow-lg rounded">
                    Recent Reviews:
                </h1>
            </div>

            <div className="flex w-full h-600px px-[5px] justify-between items-center">
                <div className="h-full flex items-center">
                    <button
                        className={`h-[45px] w-[50px] ${isPrevButtonDisabled ? "opacity-50" : "opacity-100"
                            }`}
                        onClick={handlePrevSet}
                        disabled={isPrevButtonDisabled}
                    >
                        <img className="h-[55px] w-[80px]" src={pieLeft} alt="Previous" />
                    </button>
                </div>

                <div className="w-full flex h-full overflow-hidden">
                    <div className="carousel-container">
                        {reviewData.map((data, index) => (
                            <div
                                className="reviewCard"
                                key={index}
                                ref={cardRef}
                                style={{ minWidth: "100%", transform: "translateX(0)" }}
                            >
                                <div className="reviewCardInner">
                                    <div className="reviewCardTitle">
                                        <div className="reviewCardAvatarImgContainer">
                                            <img
                                                src={data.reviewAvatarImg}
                                                className="reviewCardAvatarImg"
                                                alt="Avatar"
                                            />
                                        </div>
                                        <div className="reviewCardTitleNameContainer">
                                            <h1 className="font-bold">{data.reviewInfoName}</h1>
                                        </div>
                                    </div>

                                    <div className="reviewCardDescriptionContainer">
                                        <p className="reviewCardDescription">
                                            {data.reviewInfoDescription}
                                        </p>
                                    </div>

                                    <div className="flex mt-3">
                                        {[...Array(data.reviewInfoRating)].map((_, index) => (
                                            <img
                                                key={index}
                                                src={fill}
                                                className="w-[35px] h-[35px]"
                                                alt="Star"
                                            />
                                        ))}
                                        {[...Array(5 - data.reviewInfoRating)].map((_, index) => (
                                            <img
                                                key={index}
                                                src={blank}
                                                className="w-[35px] h-[35px]"
                                                alt="Star"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="h-full flex items-center">
                    <button
                        className={`${isNextButtonDisabled ? "opacity-50" : "opacity-100"
                            }`}
                        onClick={handleNextSet}
                        disabled={isNextButtonDisabled}
                    >
                        <img className="h-[45px] w-[50px]" src={pieRight} alt="Next" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Review2Carousel;
