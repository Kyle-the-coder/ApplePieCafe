import applePie from "../assets/images/apphoto.jpeg"

const ReviewModal = (props) => {
    const {setReviewModalTracker} = props
    const {handleReviewModal} = props


    return(
        <div className="w-full absolute bottom-0 left-0 h-[3200px] flex justify-center items-end ">
            <div className="w-full h-full bg-blue-200 absolute blur">
                <img src={applePie} className="w-full h-full object-cover" />
            </div>
            <div className="w-[800px] h-[700px] bg-red-200 z-[10] mb-5 rounded">
                <div className="w-full py-8 fontWriting text-2xl bg-slate-900 text-white rounded" >
                    <h1>Leave Us a Review!</h1>
                </div>
                <div>
                    <form>
                        <label>Name:</label>
                        <input></input>
                        <label>Name:</label>
                        <input></input>
                    </form>
                </div>


                <button className="px-3 py-1 bg-red-300 rounded" onClick={()=>handleReviewModal()}>Close</button>
            </div>
        </div>
    )
}

export default ReviewModal;