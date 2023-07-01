import applePie from "../assets/images/apphoto.jpeg"
import logo from "../assets/images/ApcWhite.PNG"
import blank from "../assets/images/starBlank.png"
import fill from "../assets/images/starFill.png"
import { useEffect, useState } from "react"
import React, { useRef } from "react"

const ReviewModal = (props) => {
    const { setReviewModalTracker } = props
    const { handleReviewModal } = props
    const {reviewModalTracker} = props
    const [starFillTracker, setStarFillTracker] = useState(true)
    const [starSet, setStarSet] = useState([])



    useEffect(() => {
        setStarSet([
            { img: blank, idx: 1 },
            { img: blank, idx: 2 },
            { img: blank, idx: 3 },
            { img: blank, idx: 4 },
            { img: blank, idx: 5 },
        ])

        if(reviewModalTracker){
            document.getElementById("reviewStart").scrollIntoView({behavior: "smooth"})

        }
    }, [reviewModalTracker])

    const handleStarFill = (index) => {
        console.log(index, "index")
        if (index == 1) {
            setStarFillTracker(!starFillTracker)

            if (starFillTracker == true) {
                const newSet = [
                    { img: fill, idx: 1 },
                    { img: blank, idx: 2 },
                    { img: blank, idx: 3 },
                    { img: blank, idx: 4 },
                    { img: blank, idx: 5 },
                ]
                setStarSet(newSet)
            }

            if (starFillTracker == false) {
                const newSet = [
                    { img: blank, idx: 1 },
                    { img: blank, idx: 2 },
                    { img: blank, idx: 3 },
                    { img: blank, idx: 4 },
                    { img: blank, idx: 5 },
                ]
                setStarSet(newSet)
            }
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

    return (
        <div className={`${reviewModalTracker ? "opacity-100 z-[1]" : "opacity-0 z-[-1]"} transition-all duration-1000 w-full flex-col items-center absolute bottom-0 left-0 h-[3200px] flex justify-center items-end `}>
            <div className="w-full h-full bg-blue-200 absolute blur" >
                <img src={applePie} className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-[10px]" id="reviewStart">
            </div>
            <div className="w-[800px] h-content bg-orange-100 z-[10] mb-5 rounded flex flex-col items-center justify-between mt-5">
                <div className="w-full py-2 bg-slate-900 rounded flex justify-center" >
                    <img src={logo} width="200px" />
                </div>
                <div className="w-full py-10 flex justify-center">
                    <form className="flex flex-col items-center bg-slate-300 w-3/4 p-5">
                        <div className="mb-3s fontWriting text-2xl">
                            <h1>Leave us a Review!</h1>
                        </div>

                        <div className="flex flex-col w-full items-center justify-center py-2">
                            <label className="font-bold mb-2">Photo(optional):</label>
                            <input className="w-[300px]" type="file" />
                        </div>

                        <div className="flex flex-col py-2 w-full">
                            <label className="font-bold mb-2">Name:</label>
                            <input className="w-full p-1" type="text"></input>
                        </div>

                        <div className="flex flex-col py-2 w-full">
                            <label className="font-bold mb-2">Review:</label>
                            <textarea col="10" rows="10" className="w-full p-1" type="text"></textarea>
                        </div>

                        <div className="flex flex-col py-2 mb-4">
                            <label className="font-bold">Rating:</label>
                            <div className="flex w-full">
                                {starSet.map((star, index) => (
                                    <img src={star.img} className="w-[50px] mx-[2px] cursor-pointer" onClick={() => handleStarFill(star.idx)} key={index} />
                                ))}
                            </div>
                        </div>

                        <button className="px-3 py-1 bg-slate-900 text-white w-[100px] rounded" type="submit">Submit</button>
                    </form>
                </div>


                <button className="px-3 py-1 bg-orange-700 text-white rounded mb-10" onClick={() => handleReviewModal()}>Close</button>
            </div>
        </div>
    )
}

export default ReviewModal;