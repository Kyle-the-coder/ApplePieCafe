import "../styles/reviewList.css"
import blank from "../assets/images/whiteStar.png"
import fill from "../assets/images/starFill.png"
import dropDownIcon from "../assets/images/down.png"

const ReviewList = ({ reviewData, reviewDataTracker }) => {
    return (
        <div className="reviewListContainer">
            <div className="reviewListBorder">
                <div className="reviewListDataContainer darkBg">
                    <div className="reviewListDataTop beigeBg">
                        <h1 className="fontWriting text-3xl font-bold">All Reviews</h1>
                        <img src={dropDownIcon} className="w-[30px] h-[30px]" />
                    </div>
                    <div className="reviewListDataDisplay darkRedBg">
                        {reviewDataTracker && reviewData.map((data, index) => (
                            <div className="reviewDataSingleContainer darkBg" key={index}>
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