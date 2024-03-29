import { useEffect, useState, useRef } from "react"
import { db, storage, timeStamp } from "../config/firebase"
import { addDoc, collection } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { getDocs } from "firebase/firestore";
import applePie from "../assets/images/apphoto.jpeg"
import logo from "../assets/images/ApcWhite.PNG"
import blank from "../assets/images/whiteStar.png"
import fill from "../assets/images/starFill.png"
import avatarPic from "../assets/images/avatar.png"
import "../styles/bgColors.css"
import "../styles/loader.css"
import "../styles/landingPage/reviewModal.css"

const ReviewModal = ({ handleReviewModal, reviewModalTracker, setReviewData, setReviewDataTracker, }) => {
    //STATES FOR FORM INPUT
    const [reviewInfoName, setReviewInfoName] = useState("")
    const [reviewInfoDesc, setReviewInfoDesc] = useState("")
    const [reviewInfoRating, setReviewInfoRating] = useState("")
    const [reviewAvatarImg, setReviewAvatarImg] = useState(null)
    const [reviewAvatarImgRef, setReviewAvatarImgRef] = useState("")
    const [starFillTracker, setStarFillTracker] = useState(true)
    const [starSet, setStarSet] = useState([])
    //STATES FOR LOADER
    const [itsLoadTime, setItsLoadTime] = useState(false)
    const [submitLoadTime, setSubmitLoadTime] = useState(false)
    //STATES FOR FORM VALIDATION
    const [errMessageDisplayed, setErrMessageDisplayed] = useState(false)
    const [nameErrMessage, setNameErrMessage] = useState("")
    const [descErrMessage, setDescErrMessage] = useState("")
    const [ratingErrMessage, setRatingErrMessage] = useState("")

    //UPLOADING IMG TO DATABASE UPON FILE BEING CHOSEN
    useEffect(() => {
        const uploadReviewAvatarImg = () => {
            const name = new Date().getTime() + reviewAvatarImg.name
            const itemImgRef = ref(storage, `reviewAvatarImgs/${name}`)
            const uploadTask = uploadBytesResumable(itemImgRef, reviewAvatarImg);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setItsLoadTime(true)
                    if (progress === 100) {
                        setTimeout(() => {
                            setItsLoadTime(false)
                        }, 2000);
                    }
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            console.log("default")
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setReviewAvatarImgRef(downloadURL)
                    });
                }
            );
        }
        reviewAvatarImg && uploadReviewAvatarImg();
    }, [reviewAvatarImg])

    //FILE INPUT VARIABLE FOR FORM IMAGE
    const fileInputRef = useRef(null);

    //HANDLE FORM SUBMISSION FUNCTION
    const handleAdd = async (e) => {
        e.preventDefault()
        await addDoc(collection(db, "reviewInfo"), {
            reviewInfoName: reviewInfoName,
            reviewInfoDescription: reviewInfoDesc,
            reviewInfoRating: reviewInfoRating,
            reviewAvatarImg: reviewAvatarImgRef,
            timeStamp: timeStamp
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setReviewDataTracker(false)
        //UPDATE REVIEW DATA WITH NEW FORM SUBMISSION
        const getReviewData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "reviewInfo"));
                const documents = querySnapshot.docs.map((doc) => doc.data());
                documents.sort((a, b) => {
                    const dateA = a.timeStamp?.toDate?.();
                    const dateB = b.timeStamp?.toDate?.();
                    return dateB?.getTime?.() - dateA?.getTime?.();
                });
                setReviewData(documents);
                setReviewDataTracker(true)
            } catch (error) {
                console.log(error);
            }
        };
        getReviewData();
        //DISPLAY LOADER
        setSubmitLoadTime(true)
        //AFTER REVIEW DATA IS UPDATED RESET STATES AND CLOSE MODAL
        setTimeout(() => {
            handleReviewModal();
            setSubmitLoadTime(false)
            setReviewInfoName("")
            setReviewInfoDesc("")
            setReviewInfoRating("")
            setReviewAvatarImg(null)
        }, 1000);
    }

    //FORM VALIDATION FUNCTION
    const handleFormValidation = (e) => {
        e.preventDefault()
        if (reviewInfoDesc === "") {
            setDescErrMessage("Please add your review")
            setErrMessageDisplayed(true)
        }
        if (reviewInfoRating === "") {
            setRatingErrMessage("Please add your rating")
            setErrMessageDisplayed(true)
        }
        if (reviewInfoName === "") {
            setNameErrMessage("Please add a name")
            setErrMessageDisplayed(true)
        }
        if (reviewInfoDesc !== "" && reviewInfoRating !== "" && reviewInfoName !== "") {
            setErrMessageDisplayed(false)
            handleAdd(e)
        }
    }

    //CREATING THE STAR RATING STATE AND AUTO SCROLL FUNCTIONALITY
    useEffect(() => {
        setStarSet([
            { img: blank, idx: 1 },
            { img: blank, idx: 2 },
            { img: blank, idx: 3 },
            { img: blank, idx: 4 },
            { img: blank, idx: 5 },
        ])

        if (reviewModalTracker) {
            document.getElementById("reviewStart").scrollIntoView({ behavior: "smooth" })
        }
    }, [reviewModalTracker])

    //HANDLING THE ABILITY TO RATE USING STAR PNG'S
    const handleStarFill = (index) => {
        setStarFillTracker(!starFillTracker);
        const newSet = Array.from({ length: 5 }, (_, i) => ({
            img: i < index ? fill : blank,
            idx: i + 1,
        }));
        setStarSet(newSet);
    }

    //IF NO FORM IS SUBMITTED AND MODAL IS CLOSED INSTEAD
    const handleStatesAfterCloseButton = () => {
        setReviewAvatarImg(null)
        setReviewInfoDesc("")
        setReviewInfoName("")
        setReviewInfoRating("")
        fileInputRef.current.value = "";
        setErrMessageDisplayed(false)
        setNameErrMessage("")
        setDescErrMessage("")
        setRatingErrMessage("")
    }

    //SUBMIT BUTTON DISABLER
    const isSubmitButtonDisabled = itsLoadTime && reviewAvatarImg !== null;

    return (
        <div className={`${reviewModalTracker ? "opacity-100 z-[1]" : "opacity-0 z-[-1]"} transition-all duration-1000 w-full flex-col items-center absolute bottom-0 left-0 h-[3200px] flex justify-center items-end `}>
            <div className="w-full h-full bg-blue-200 absolute bg-gradient-to-r from-orange-200 to-red-400 " >
                <img src={applePie} className="w-full h-full object-cover " alt="apple pie background" />
            </div>
            <div className="w-full h-[10px]" id="reviewStart">
            </div>
            <div className="w-[800px] h-content beigeBg z-[10] mb-5  flex flex-col items-center justify-between mt-5 reviewModalOutside ">
                <div className="w-full py-2 darkBg rounded flex justify-center reviewModalTop" >
                    <img src={logo} width="200px" alt="Apple Pie Cafe logo" />
                </div>
                <div className="w-full py-10 flex justify-center">
                    <form className="flex flex-col items-center darkBg text-white w-3/4 p-5 reviewModalOutside" onSubmit={handleFormValidation}>
                        <div className="mb-3s fontWriting text-2xl">
                            <h1>Leave us a Review!</h1>
                        </div>

                        <div className="flex flex-col py-2 w-full mt-3">
                            <label className="font-bold mb-2">Name:</label>
                            <input className="w-full p-1 text-black" value={reviewInfoName} type="text" onChange={(e) => setReviewInfoName(e.target.value)} />
                            <div className=" reviewModalErrMessageContainer">
                                {errMessageDisplayed && nameErrMessage !== "" && <h1 className="reviewModalErrMessages">{nameErrMessage}</h1>}
                            </div>
                        </div>

                        <div className="flex flex-col py-2 w-full">
                            <label className="font-bold mb-2">Your Experience:</label>
                            <textarea col="10" rows="10" value={reviewInfoDesc} className="w-full p-1 text-black" type="text" onChange={(e) => setReviewInfoDesc(e.target.value)} />
                            <div className=" reviewModalErrMessageContainer">
                                {errMessageDisplayed && descErrMessage !== "" && <h1 className="reviewModalErrMessages">{descErrMessage}</h1>}
                            </div>
                        </div>

                        <div className="flex flex-col py-2 mb-4">
                            <label className="font-bold">Rating:</label>
                            <div className="flex w-full">
                                {starSet.map((star, index) => (
                                    <div key={index} className="w-full">
                                        <img src={star.img} className="w-[50px] mx-[2px] cursor-pointer" onClick={() => { handleStarFill(star.idx); setReviewInfoRating(star.idx) }} alt="rating using stars" />
                                    </div>
                                ))}
                            </div>
                            <div className=" reviewModalErrMessageContainer">
                                {errMessageDisplayed && ratingErrMessage !== "" && <h1 className="reviewModalErrMessages">{ratingErrMessage}</h1>}
                            </div>
                        </div>

                        <div className="flex flex-col w-full items-center justify-center py-2">
                            <label className="font-bold mb-2">Photo(optional):</label>
                            <div className="flex w-full justify-evenly items-center h-[110px]">
                                <input className="w-[260px]" type="file" ref={fileInputRef} onChange={(e) => setReviewAvatarImg(e.target.files[0])} />
                                {itsLoadTime && reviewAvatarImg !== null ?
                                    <div class="loader">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div> :
                                    <img src={reviewAvatarImg == null ? avatarPic : reviewAvatarImgRef} className="w-[100px] h-[100px] rounded-full object-cover object-center" alt="avatar" />
                                }
                            </div>
                        </div>

                        <button className={`${!isSubmitButtonDisabled && submitLoadTime ? "darkBg" : "beigeBg"} ${isSubmitButtonDisabled ? "darkRedBg text-white" : ""}  px-3 py-1  text-black  rounded`} type="submit" disabled={isSubmitButtonDisabled}>
                            {isSubmitButtonDisabled ? "Loading..." : submitLoadTime ?
                                <div class="loader">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div> :
                                "Submit"}
                        </button>
                    </form>
                </div>


                <button className="px-3 py-1 darkRedBg text-white rounded mb-10" onClick={() => { handleReviewModal(); handleStatesAfterCloseButton() }}>Close</button>
            </div>
        </div>
    )
}

export default ReviewModal;