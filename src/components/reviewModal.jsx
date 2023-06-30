

const ReviewModal = (props) => {
    const {setReviewModalTracker} = props
    const {handleReviewModal} = props


    return(
        <div className="w-full absolute bottom-0 left-0 h-[1200px] flex justify-center items-center ">
            <div className="w-full h-full bg-blue-200 absolute blur">

            </div>
            <div className="w-[500px] h-[500px] bg-red-200 mt-[600px] z-[10]">
                <h1> Review Modal!</h1>


                <button className="px-3 py-1 bg-red-300 rounded" onClick={()=>handleReviewModal()}>Close</button>
            </div>
        </div>
    )
}

export default ReviewModal;