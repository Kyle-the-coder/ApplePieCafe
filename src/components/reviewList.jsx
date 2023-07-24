import { useEffect, useState } from "react";
import "../styles/reviewList.css"
import blank from "../assets/images/starBlank.png"
import fill from "../assets/images/starFill.png"
import dropDownIcon from "../assets/images/chevron.png"
import avatar from "../assets/images/user.png"

const ReviewList = ({ reviewData, reviewDataTracker }) => {
    const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(false)
    const [isActive, setIsActive] = useState("")
    const [selectedSortOption, setSelectedSortOption] = useState([]);
    const [isSelectedSortDisplayed, setIsSelectedSortDisplayed] = useState(false)
    const [dropdownHighlight, setDropdownHighlight] = useState(true)
    const [dropdownHighlightName, setDropdownHighlightName] = useState("Most Recent")
    const [listDetailExpanded, setListDetailExpanded] = useState(false)
    const [listDetailExpandName, setListDetailExpandName] = useState(null)

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

    const handleDeactivateDropdown = () => {
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
            name: "Most Recent",
            function: mostRecentRatingSort,
            idx: 0
        },
        {
            name: "Rating Most->Least",
            function: infoRatingSortMostToLeast,
            idx: 1
        },
        {
            name: "Rating Least->Most",
            function: infoRatingSortLeastToMost,
            idx: 2
        },
    ]

    const handleDropdownHighlight = (optionName) => {
        if (dropdownHighlightName !== optionName) {
            setDropdownHighlightName(optionName)
            setDropdownHighlight(true)
        } else if (dropdownHighlightName === optionName) {
            setDropdownHighlightName(optionName)
            setDropdownHighlight(true)
        }
    }

    const handleExpandListDetail = (optionName) => {
        if(listDetailExpandName === optionName){
            if(listDetailExpanded){
                setListDetailExpanded(false)
            } else if(!listDetailExpanded){
                setListDetailExpanded(true)
            }
        } else if(listDetailExpandName !== optionName){
            setListDetailExpandName(optionName)
            setListDetailExpanded(true)
        }
    }

    return (
        <div className="reviewListContainer">
            <div className="reviewListBorder">
                <div className="reviewListDataContainer bg-white">
                    <div className="reviewListDataTop darkBg " >
                        <h1 className="fontWriting text-3xl text-white font-bold">All Reviews</h1>
                        <div className={`reviewListDataDropdownContainer `} onMouseLeave={() => handleDeactivateDropdown()} >
                            <img src={dropDownIcon} className="reviewListDataDropdownIcon" onClick={() => { handleDropdownActive() }} />
                            {isDropdownDisplayed &&
                                <div className={`reviewListDataDropdownMenu ${isDropdownDisplayed ? isActive : ""}`}>
                                    <div className="reviewListDataDropdownContentContainer">
                                        <h1 className="fontWriting text-xl underline">Sort List:</h1>
                                        {sortListContent.map((option, index) => (
                                            <div key={index} className="reviewListDataDropdownOptionContainer" onClick={() => handleDropdownSort(option.function)}>
                                                <h1 className={`${dropdownHighlight && dropdownHighlightName === option.name ? "reviewListDataDropdownOptionHighlight" : "reviewListDataDropdownOption"}`} onClick={() => handleDropdownHighlight(option.name)}>-{option.name}</h1>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={`${isSelectedSortDisplayed ? "reviewListDataDisplay" : "reviewListDataDisplayLoader"} ${listDetailExpanded ? "active" : ""}`}>
                        {isSelectedSortDisplayed ? selectedSortOption.map((data, index) => (
                            <div className={` reviewListDataSingleContainer ${listDetailExpanded && listDetailExpandName === data.reviewInfoName ? "expanded" : ""} `} key={index}>
                                <img src={data.reviewAvatarImg === "" ? avatar : data.reviewAvatarImg} className="reviewListDataImg" />
                                {listDetailExpanded && listDetailExpandName == data.reviewInfoName && 
                                <div className="reviewListDataDetailDescription">
                                    <p>{data.reviewInfoDescription}</p>
                                </div>}
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
                                <div className="reviewListDataSingleContainerExpandButton" onClick={()=>handleExpandListDetail(data.reviewInfoName)}>
                                        <h1>details</h1>
                                </div>
                            </div>
                        )) : <div className="loader2">
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