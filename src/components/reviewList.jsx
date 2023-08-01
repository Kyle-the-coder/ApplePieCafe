import { useEffect, useState, useRef } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import blank from "../assets/images/starWhite.PNG"
import fill from "../assets/images/starFill.png"
import dropDownIcon from "../assets/images/chevron.png"
import avatar from "../assets/images/user.png"
import "../styles/landingPage/reviewList.css"

const ReviewList = ({ reviewData, reviewDataTracker }) => {
    //DROPDOWN OPTION HIGHTLIGHT STATES
    const [selectedSortOption, setSelectedSortOption] = useState([]);
    const [isSelectedSortDisplayed, setIsSelectedSortDisplayed] = useState(false)
    //STATES FOR REVIEW LIST AND SINGLE REVIEW
    const [listDetailExpanded, setListDetailExpanded] = useState(false)
    const [singleReviewData, setSingleReviewData] = useState([])

    //SETTING LIST AS MOST RECENT SORT
    useEffect(() => {
        setSelectedSortOption(reviewData)
        //COMPONENT DID MOUNT SO RENDER TO DOM
        selectedSortOption.length !== 0 && setIsSelectedSortDisplayed(true)
    }, [reviewDataTracker])

    //GET INFO FOR ONE REVIEW AND HANDLE DISPLAY
    const handleExpandListDetail = async (optionId) => {
        try {
            const docRef = doc(db, "reviewInfo", optionId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setSingleReviewData(docSnap.data())
                setListDetailExpanded(true)
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="reviewListContainer">
            <div className="reviewListBorder">
                <div className="reviewListDataContainer bg-white">
                    {/* TOP OF LIST CONTAINER */}
                    <div className="reviewListDataTop darkBg " >
                        <h1 className="fontWriting text-3xl text-white font-bold">All Reviews</h1>
                        {/* DROPDOWN MENU */}
                        <DropdownDisplay
                            reviewData={reviewData} reviewDataTracker={reviewDataTracker}
                            selectedSortOption={selectedSortOption} setSelectedSortOption={setSelectedSortOption}
                            isSelectedSortDisplayed={isSelectedSortDisplayed} setIsSelectedSortDisplayed={setIsSelectedSortDisplayed}
                        />
                    </div>
                    {/* DISPLAY SINGLE REVIEW OR REVIEW LIST */}
                    {listDetailExpanded ?
                        <div className="reviewSingleDataContainerMain">
                            <DisplayOneReview singleReviewData={singleReviewData} setListDetailExpanded={setListDetailExpanded} />
                        </div>
                        :
                        <div className={`${isSelectedSortDisplayed ? "reviewListDataDisplay" : "reviewListDataDisplayLoader"}`}>
                            {isSelectedSortDisplayed ? selectedSortOption.map((data, index) => (
                                <div className="reviewListDataSingleContainer" key={index}>
                                    <div className="reviewListDataImgAndNameContainer">
                                        <img src={data.reviewAvatarImg === "" ? avatar : data.reviewAvatarImg} className="reviewListDataImg" />
                                        <div className="reviewListDataNameContainer">
                                            <h1 className="fontWriting ">{data.reviewInfoName}</h1>
                                        </div>
                                    </div>
                                    <div className="reviewListStarContainer">
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <img
                                                src={rating <= data.reviewInfoRating ? fill : blank}
                                                className="w-[55px] h-[55px]"
                                                key={rating}
                                                alt={`Rating ${rating}`}
                                            />
                                        ))}
                                    </div>
                                    <div className="reviewListDataSingleContainerExpandButton" onClick={() => handleExpandListDetail(data.id)}>
                                        <h1>details</h1>
                                    </div>
                                </div>
                            ))
                                :
                                <div className="loader2">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

//SINGLE REVIEW DISPLAY
const DisplayOneReview = ({ singleReviewData, setListDetailExpanded }) => {
    //HANDLE CLOSE BUTTON
    const handleBackToListButton = () => {
        setListDetailExpanded(false)
    }
    return (
        <div className="reviewSingleDataContainer">
            <img src={singleReviewData.reviewAvatarImg === "" ? avatar : singleReviewData.reviewAvatarImg} className="reviewSingleDataContainerImg" />
            <div className="reviewSingleDataNameContainer">
                <h1 className="fontWriting">{singleReviewData.reviewInfoName}</h1>
            </div>
            <div className="reviewSingleDataDescriptionContainer">
                <p>{singleReviewData.reviewInfoDescription}</p>
            </div>
            <div className="reviewSingleDataStarContainer">
                {[1, 2, 3, 4, 5].map((rating) => (
                    <img
                        src={rating <= singleReviewData.reviewInfoRating ? fill : blank}
                        className="w-[40px] h-[40px]"
                        key={rating}
                        alt={`Rating ${rating}`}
                    />
                ))}
            </div>
            {/* CLOSE BUTTON */}
            <div className="reviewSingleDataCloseButton darkRedBg">
                <p onClick={() => handleBackToListButton()}>close</p>
            </div>
        </div>
    )
}

//DROPDOWN DISPLAY
const DropdownDisplay = ({ reviewData, reviewDataTracker,  setSelectedSortOption, setIsSelectedSortDisplayed, selectedSortOption }) => {
    //DROPDOWN MENU STATES AND REF
    const componentRef = useRef(null);
    const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(false)
    const [dropdownHighlight, setDropdownHighlight] = useState(true)
    const [dropdownHighlightName, setDropdownHighlightName] = useState("Most Recent")
    //DROPDOWN OPTION HIGHTLIGHT STATES
    const [isActive, setIsActive] = useState("")

    //HANDLING DROPDOWN MENU CLOSE
    useEffect(() => {
        const handleOutsideClick = (event) => {
            console.log(componentRef.current)
            // Check if the click is outside the component
            if (componentRef.current && !componentRef.current.contains(event.target)) {
                setIsActive("")
                setTimeout(() => {
                    setIsDropdownDisplayed(false)
                }, 360);
            }
        };
        // Attach the event listener to the document
        document.addEventListener('click', handleOutsideClick);
        return () => {
            // Cleanup: remove the event listener when the component unmounts
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    //HANDLE DROPDOWN TOGGLE
    const handleDropdownActive = () => {
        if (isDropdownDisplayed) {
            //TRANSITION
            setIsActive("")
            //REMOVE FROM DOM
            setTimeout(() => {
                setIsDropdownDisplayed(false)
            }, 360);
        }
        //TOGGLE FUNCTIONALITY
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

    //SORT BY RATING LOW TO HIGH
    const infoRatingSortLeastToMost = () => reviewDataTracker && selectedSortOption.sort((a, b) => {
        const dateA = a.reviewInfoRating;
        const dateB = b.reviewInfoRating;
        return dateA - dateB;
    });
    //SORT BY RATING HIGH TO LOW
    const infoRatingSortMostToLeast = () => reviewDataTracker && selectedSortOption.sort((a, b) => {
        const dateA = a.reviewInfoRating;
        const dateB = b.reviewInfoRating;
        return dateB - dateA;
    });
    //SORT BY MOST RECENT
    const mostRecentRatingSort = () => reviewDataTracker && selectedSortOption.sort((a, b) => {
        const dateA = a.timeStamp?.toDate?.();
        const dateB = b.timeStamp?.toDate?.();
        return dateB?.getTime?.() - dateA?.getTime?.();
    });
    //SORT BY LEAST RECENT
    const leastRecentRatingSort = () => reviewDataTracker && selectedSortOption.sort((a, b) => {
        const dateA = a.timeStamp?.toDate?.();
        const dateB = b.timeStamp?.toDate?.();
        return dateA?.getTime?.() - dateB?.getTime?.();
    });

    //OPTIONS FOR DROPDOWN MENU
    const sortListContent = [
        {
            name: "Most Recent",
            function: mostRecentRatingSort,
            idx: 0
        },
        {
            name: "Least Recent",
            function: leastRecentRatingSort,
            idx: 1
        },
        {
            name: "Rating High->Low",
            function: infoRatingSortMostToLeast,
            idx: 2
        },
        {
            name: "Rating Low->High",
            function: infoRatingSortLeastToMost,
            idx: 3
        },
    ]

    //HANDLE SORTING LIST
    const handleDropdownSort = (optionName) => {
        //DISPLAY LOADER
        setIsSelectedSortDisplayed(false)
        //MOUNT COMPONENT
        setSelectedSortOption(optionName)
        //RENDER TO UI
        setTimeout(() => {
            setIsSelectedSortDisplayed(true)
        }, 2000);
    }

    //HANDLE DROPDOWN NAME HIGHLIGHT
    const handleDropdownHighlight = (optionName) => {
        if (dropdownHighlightName !== optionName) {
            setDropdownHighlightName(optionName)
            setDropdownHighlight(true)
        } else if (dropdownHighlightName === optionName) {
            setDropdownHighlightName(optionName)
            setDropdownHighlight(true)
        }
    }
    return (
        <div className={`reviewListDataDropdownContainer `} ref={componentRef} >
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
    )
}

export default ReviewList;