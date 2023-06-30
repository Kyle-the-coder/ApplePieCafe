import applePie from "../assets/images/apphoto.jpeg"
import logo from "../assets/images/ApcWhite.PNG"

const ReviewModal = (props) => {
    const { setReviewModalTracker } = props
    const { handleReviewModal } = props


    return (
        <div className="w-full absolute bottom-0 left-0 h-[3200px] flex justify-center items-end ">
            <div className="w-full h-full bg-blue-200 absolute blur">
                <img src={applePie} className="w-full h-full object-cover" />
            </div>
            <div className="w-[800px] h-content bg-red-200 z-[10] mb-5 rounded flex flex-col items-center justify-between">
                <div className="w-full py-2 bg-slate-900 rounded flex justify-center" >
                    <img src={logo} width="200px" />
                </div>
                <div className="w-full py-10 flex justify-center">
                    <form className="flex flex-col items-center bg-slate-200 w-content p-5">
                        <div className="py-4 fontWriting text-2xl">
                            <h1>Leave us a Review!</h1>
                        </div>

                        <div className="flex flex-col w-full justify-center py-2">
                            <label className="font-bold">Photo(optional):</label>
                            <input className="w-[300px]" type="file" />
                        </div>

                        <div className="flex flex-col py-2 w-full">
                            <label  className="font-bold">Name:</label>
                            <input className="w-full p-1" type="text"></input>
                        </div>

                        <div className="flex flex-col py-2 w-full">
                            <label>Review:</label>
                            <textarea className="w-full p-1" type="text"></textarea>
                        </div>

                        <div className="flex flex-col py-2">
                            <label>Rating:</label>
                            <img />
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