import "../styles/reviewList.css"
import blank from "../assets/images/starBlank.png"
import fill from "../assets/images/starFill.png"
import dropDownIcon from "../assets/images/chevron.png"

const ReviewList = ({ reviewData, reviewDataTracker }) => {
    return (
        <div className="reviewListContainer">
            <div className="reviewListBorder">
                <div className="reviewListDataContainer bg-white">
                    <div className="reviewListDataTop darkBg">
                        <h1 className="fontWriting text-3xl text-white font-bold">All Reviews</h1>
                        <img src={dropDownIcon} className="w-[35px] h-[35px]" />
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