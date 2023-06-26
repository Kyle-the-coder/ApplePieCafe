import { useEffect, useState } from "react";
import { doc, getDocs, collection, arrayRemove } from "firebase/firestore"
import { db } from "../config/firebase"
import pieRight from "../assets/images/pieRight.PNG"
import pieLeft from "../assets/images/pieLeft.png"
import { Transition } from '@headlessui/react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const BreakfastCarousel = (props) => {
    const [breakfastData, setBreakfastData] = useState({})
    const [activeSet, setActiveSet] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeSetTracker, setActiveSetTracker] = useState(false)
    const [nextTransitionTracker, setNextTransitionTracker] = useState(false)
    const [prevTransitionTracker, setPrevTransitionTracker] = useState(false)
    const {setBFastImg}=props
    const {setBreakfastMenuItemDesc}=props
    const {setBreakfastMenuItemName}=props
    const {bFastImg} = props
    const {bFastImgTracker} = props

    useEffect(() => {
        // GET BREAKFAST DATA
        const getBreakfastData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "breakfastMenuItems"));
                const documents = querySnapshot.docs.map((doc) => doc.data());
                setBreakfastData(documents);
                setActiveSetTracker(true)
            } catch (error) {
                console.log(error);
            }
        };
        getBreakfastData();

        activeSetTracker && setActiveSet(breakfastData.slice(0, 3))


    }, [activeSetTracker])

    const nextSet = () => {
        const newIndex = currentIndex + 3;
        const newSet = breakfastData.slice(newIndex, newIndex + 3);
        setNextTransitionTracker(true)
        setActiveSet(newSet);
        setCurrentIndex(newIndex);
        
    };

    const prevSet = () => {
        const newIndex = currentIndex - 3;
        const newSet = breakfastData.slice(newIndex, newIndex + 3);
        if (currentIndex < 0) {
            setCurrentIndex(0)
        } else {
            setActiveSet(newSet);
            setCurrentIndex(newIndex);
            setNextTransitionTracker(false)

        }
    };

    // HANDLE BREAKFAST UI
    const handleBFastMenuItem = (menuImg, menuName, menuDesc) => {
        setBFastImg(menuImg)
        setBreakfastMenuItemName(menuName)
        setBreakfastMenuItemDesc(menuDesc)
    }

    const isPrevButtonDisabled = currentIndex === 0;
    const isNextButtonDisabled = currentIndex + 3 >= breakfastData.length;
    console.log(bFastImgTracker)
    return (
        <div className="flex w-full h-full justify-evenly items-center">
            <button className={`${isPrevButtonDisabled ? "opacity-50" : "opacity-100"}`} onClick={prevSet} disabled={isPrevButtonDisabled}>
                <img className="h-[50px] w-[50px]" src={pieLeft} />
            </button>
                {activeSet.map((picture, index) => (
                    <img key={index} src={picture.menuItemImg} onClick={()=>handleBFastMenuItem(picture.menuItemImg, picture.menuItemName, picture.menuItemDescription)} className={`transition-transform duration-500 ease-in-out ${nextTransitionTracker ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} ${bFastImgTracker && bFastImg === picture.menuItemImg ? "opacity-100" : "opacity-40 "}   w-[200px] h-full object-cover cursor-pointer transition-all duration-500`} alt={`Picture ${index}`} />
                ))}
            <button className={`${isNextButtonDisabled ? "opacity-50" : "opacity-100"}`} onClick={nextSet} disabled={isNextButtonDisabled}>
                <img className={` h-[50px] w-[50px]`} src={pieRight} />
            </button>
        </div>
    )
}

export default BreakfastCarousel;