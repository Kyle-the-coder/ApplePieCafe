import applePie from "../assets/images/apphoto.jpeg"
import logo from "../assets/images/ApcWhite.PNG"
import blank from "../assets/images/starBlank.png"

const ReviewModal = (props) => {
    const { setReviewModalTracker } = props
    const { handleReviewModal } = props


    return (
        <div className="w-full absolute bottom-0 left-0 h-[3200px] flex justify-center items-end ">
            <div className="w-full h-full bg-blue-200 absolute blur">
                <img src={applePie} className="w-full h-full object-cover" />
            </div>
            <div className="w-[800px] h-content bg-red-200 z-[10] mb-5 rounded flex flex-col items-center justify-between" id="reviewStart">
                <div className="w-full py-2 bg-slate-900 rounded flex justify-center" >
                    <img src={logo} width="200px" />
                </div>
                <div className="w-full py-10 flex justify-center">
                    <form className="flex flex-col items-center bg-slate-200 w-3/4 p-5">
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
                                <img  src={blank} />
                                <img  src={blank} />
                                <img src={blank}  />
                                <img  src={blank} />
                                <img  src={blank} />
                            </div>
                        </div>

                        <button className="px-3 py-1 bg-slate-900 text-white w-[100px] rounded" type="submit">Submit</button>
                    </form>
                </div>


                <button className="px-3 py-1 bg-red-800 text-white rounded mb-10" onClick={() => handleReviewModal()}>Close</button>
            </div>
        </div>
    )
}

export default ReviewModal;