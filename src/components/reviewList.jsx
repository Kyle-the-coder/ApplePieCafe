import { useState, useEffect } from "react"
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import "../styles/reviewList.css"

const ReviewList = ({ reviewData }) => {
    return (
        <div className="reviewListContainer">
            <div className="reviewListBorder">
                <div className="reviewListDataContainer darkBg">
                    <div className="reviewListDataTop beigeBg">
                        <h1 className="fontWriting text-3xl font-bold">All Reviews</h1>
                    </div>
                    <div className="reviewListDataDisplay darkRedBg">
                        {reviewData.map((data, index) => (
                            <div className="reviewDataSingleContainer darkBg" key={index}>
                                <img src={data.reviewAvatarImg} className="w-[100px] h-[100px]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewList;