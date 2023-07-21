import { useEffect, useState } from "react";
import "../styles/reviewList.css"
import blank from "../assets/images/starBlank.png"
import fill from "../assets/images/starFill.png"
import dropDownIcon from "../assets/images/chevron.png"

const ReviewList = ({ reviewData, reviewDataTracker }) => {
    const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const displayDropdownToggle = ()=>{
        setIsDropdownDisplayed(!isDropdownDisplayed)

        
    }

    const infoRatingSort = reviewDataTracker && reviewData.sort((a, b) => {
        const dateA = a.reviewInfoRating;
        const dateB = b.reviewInfoRating;
        return dateB - dateA;
    });

    console.log(isDropdownDisplayed)
    return (
        <div className="reviewListContainer">
            <div className="reviewListBorder">
                <div className="reviewListDataContainer bg-white">
                    <div className="reviewListDataTop darkBg">
                        <h1 className="fontWriting text-3xl text-white font-bold">All Reviews</h1>
                        <div className={`reviewListDataDropdownContainer`} onClick={displayDropdownToggle}>
                            <img src={dropDownIcon} className="w-[25px] h-[25px]" />
                            { isDropdownDisplayed && 
                            <div className={`reviewListDataDropdownMenu ${isDropdownDisplayed ? "active" : ""}`}>

                            </div>
                            }
                        </div>
                    </div>
                    <div className="reviewListDataDisplay">
                        {reviewDataTracker && reviewData.map((data, index) => (
                            <div className="reviewDataSingleContainer" key={index}>
                                <img src={data.reviewAvatarImg} className="reviewListDataImg" />
                                <div className="reviewListStarContainer">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <img
                                            src={rating <= data.reviewInfoRating ? fill : blank}
                                            className="w-[50px] h-[50px]"
                                            key={rating}
                                            alt={`Rating ${rating}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewList;