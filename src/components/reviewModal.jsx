import applePie from "../assets/images/apphoto.jpeg"
import logo from "../assets/images/ApcWhite.PNG"
import blank from "../assets/images/whiteStar.png"
import fill from "../assets/images/starFill.png"
import { useEffect, useState, useRef } from "react"
import { db, storage, timeStamp } from "../config/firebase"
import { addDoc, collection } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { getDocs } from "firebase/firestore";
import avatarPic from "../assets/images/avatar.png"
import "../styles/bgColors.css"

const ReviewModal = (props) => {
    const { handleReviewModal } = props
    const { reviewModalTracker } = props
    const { setReviewData } = props
    const { setReviewDataTracker } = props
    const [starFillTracker, setStarFillTracker] = useState(true)
    const [starSet, setStarSet] = useState([])
    const [reviewInfoName, setReviewInfoName] = useState("")
    const [reviewInfoDesc, setReviewInfoDesc] = useState("")
    const [reviewInfoRating, setReviewInfoRating] = useState("")
    const [reviewAvatarImg, setReviewAvatarImg] = useState(null)
    const [reviewAvatarImgRef, setReviewAvatarImgRef] = useState("")

    useEffect(() => {
        const uploadReviewAvatarImg = () => {
            const name = new Date().getTime() + reviewAvatarImg.name
            const itemImgRef = ref(storage, `reviewAvatarImgs/${name}`)

            const uploadTask = uploadBytesResumable(itemImgRef, reviewAvatarImg);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
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

    const fileInputRef = useRef(null);
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
        // GET REVIEW DATA
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
        setTimeout(() => {
            setReviewInfoName("")
            setReviewInfoDesc("")
            setReviewInfoRating("")
            setReviewAvatarImg(null)
            handleReviewModal();
        }, 1000);
    }



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

    const handleStarFill = (index) => {
        setStarFillTracker(!starFillTracker);

        const newSet = Array.from({ length: 5 }, (_, i) => ({
            img: i < index ? fill : blank,
            idx: i + 1,
        }));

        setStarSet(newSet);
    }

    return (
        <div className={`${reviewModalTracker ? "opacity-100 z-[1]" : "opacity-0 z-[-1]"} transition-all duration-1000 w-full flex-col items-center absolute bottom-0 left-0 h-[3200px] flex justify-center items-end `}>
            <div className="w-full h-full bg-blue-200 absolute blur" >
                <img src={applePie} className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-[10px]" id="reviewStart">
            </div>
            <div className="w-[800px] h-content beigeBg z-[10] mb-5 rounded flex flex-col items-center justify-between mt-5">
                <div className="w-full py-2 darkBg rounded flex justify-center" >
                    <img src={logo} width="200px" />
                </div>
                <div className="w-full py-10 flex justify-center">
                    <form className="flex flex-col items-center darkBg text-white w-3/4 p-5" onSubmit={handleAdd}>
                        <div className="mb-3s fontWriting text-2xl">
                            <h1>Leave us a Review!</h1>
                        </div>

                        <div className="flex flex-col w-full items-center justify-center py-2">
                            <label className="font-bold mb-2">Photo(optional):</label>
                            <div className="flex w-full justify-evenly items-center">
                                <input className="w-[260px]" type="file" ref={fileInputRef} onChange={(e) => setReviewAvatarImg(e.target.files[0])} />
                                <img src={reviewAvatarImg == null ? avatarPic : reviewAvatarImgRef} className="w-[100px] h-[100px] rounded-full object-cover object-center" />
                            </div>
                        </div>

                        <div className="flex flex-col py-2 w-full">
                            <label className="font-bold mb-2">Name:</label>
                            <input className="w-full p-1 text-black" value={reviewInfoName} type="text" onChange={(e) => setReviewInfoName(e.target.value)} />
                        </div>

                        <div className="flex flex-col py-2 w-full">
                            <label className="font-bold mb-2">Review:</label>
                            <textarea col="10" rows="10" value={reviewInfoDesc} className="w-full p-1 text-black" type="text" onChange={(e) => setReviewInfoDesc(e.target.value)} />
                        </div>

                        <div className="flex flex-col py-2 mb-4">
                            <label className="font-bold">Rating:</label>
                            <div className="flex w-full">
                                {starSet.map((star, index) => (
                                    <div key={index} className="w-full">
                                        <img src={star.img} className="w-[50px] mx-[2px] cursor-pointer" onClick={() => { handleStarFill(star.idx); setReviewInfoRating(star.idx) }} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="px-3 py-1 beigeBg text-black w-[100px] rounded" type="submit">Submit</button>
                    </form>
                </div>


                <button className="px-3 py-1 darkRedBg text-white rounded mb-10" onClick={() => handleReviewModal()}>Close</button>
            </div>
        </div>
    )
}

export default ReviewModal;