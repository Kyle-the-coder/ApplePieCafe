import { useEffect, useState } from "react";
import "../styles/reviewList.css"
import blank from "../assets/images/starBlank.png"
import fill from "../assets/images/starFill.png"
import dropDownIcon from "../assets/images/chevron.png"

const ReviewList = ({ reviewData, reviewDataTracker }) => {
    const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(false)
    const [isActive, setIsActive] = useState("")
    const [selectedSortOption, setSelectedSortOption] = useState([]);
    const [isSelectedSortDisplayed, setIsSelectedSortDisplayed] = useState(false)

    useEffect(() => {
        setSelectedSortOption(reviewData)
        selectedSortOption.length !== 0 && setIsSelectedSortDisplayed(true)
    }, [reviewDataTracker])

    const handleDropdownActive = () => {
        if (isDropdownDisplayed) {
            setIsActive("")
            setTimeout(() => {
                setIsDropdownDisplayed(false)
            }, 360);
        }
        if (!isDropdownDisplayed) {
            setIsActive("")
            setIsDropdownDisplayed(true)
        }
        if (isActive === "") {
            setTimeout(() => {
                setIsActive("active")
            }, 100);
        }
        if (isActive === "active") {
            setIsActive("")
        }
    }

    const handleDeactivateDropdown = () =>{
        setIsActive("")
        setTimeout(() => {
            setIsDropdownDisplayed(false)
        }, 360);
    }

    const handleDropdownSort = (optionName) => {
        setIsSelectedSortDisplayed(false)
        setSelectedSortOption(optionName)
        setTimeout(() => {
            setIsSelectedSortDisplayed(true)
        }, 2000);
    }

    const infoRatingSortLeastToMost = () => reviewDataTracker && reviewData.sort((a, b) => {
        const dateA = a.reviewInfoRating;
        const dateB = b.reviewInfoRating;
        return dateA - dateB;
    });
    const infoRatingSortMostToLeast = () => reviewDataTracker && reviewData.sort((a, b) => {
        const dateA = a.reviewInfoRating;
        const dateB = b.reviewInfoRating;
        return dateB - dateA;
    });
    const mostRecentRatingSort = () => reviewDataTracker && reviewData.sort((a, b) => {
        const dateA = a.timeStamp?.toDate?.();
        const dateB = b.timeStamp?.toDate?.();
        return dateB?.getTime?.() - dateA?.getTime?.();
    });

    const sortListContent = [
        {
            name: "Rating Most->Least",
            function: infoRatingSortMostToLeast
        },
        {
            name: "Rating Least->Most",
            function: infoRatingSortLeastToMost
        },
        {
            name: "Most Recent",
            function: mostRecentRatingSort
        }
    ]

    return (
        <div className="reviewListContainer">
            <div className="reviewListBorder">
                <div className="reviewListDataContainer bg-white">
                    <div className="reviewListDataTop darkBg">
                        <h1 className="fontWriting text-3xl text-white font-bold">All Reviews</h1>
                        <div className={`reviewListDataDropdownContainer`} >
                            <img src={dropDownIcon} className="w-[25px] h-[25px]" onClick={() => { handleDropdownActive() }} />
                            {isDropdownDisplayed &&
                                <div className={`reviewListDataDropdownMenu ${isDropdownDisplayed ? isActive : ""}`}>
                                    <div className="reviewListDataDropdownContentContainer">
                                        <h1 className="fontWriting text-xl underline">Sort List:</h1>
                                        {sortListContent.map((option, index) => (
                                            <div key={index} onClick={() => handleDropdownSort(option.function)}>
                                                <h1>{option.name}</h1>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={`${isSelectedSortDisplayed ? "reviewListDataDisplay1" : "reviewListDataDisplay2"}`} onClick={() => handleDeactivateDropdown()}>
                        {isSelectedSortDisplayed ? selectedSortOption.map((data, index) => (
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
                        )) : <div class="loader2">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewList;