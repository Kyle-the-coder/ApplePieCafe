

const ReviewModal = (props) => {
    const {setReviewModalTracker} = props
    const {handleReviewModal} = props


    return(
        <div className="w-full absolute">
            <div className="w-[500px] h-[500px] bg-red-200">
                <h1> Review Modal!</h1>


                <button className="px-3 py-1 bg-red-300 rounded" onClick={()=>handleReviewModal()}>Close</button>
            </div>
        </div>
    )
}

export default ReviewModal;