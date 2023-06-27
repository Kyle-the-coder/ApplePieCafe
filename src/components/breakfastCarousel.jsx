import { useEffect, useState } from "react";
import { doc, getDocs, collection, arrayRemove } from "firebase/firestore"
import { db } from "../config/firebase"
import pieRight from "../assets/images/pieRight.PNG"
import pieLeft from "../assets/images/pieLeft.png"
import { Transition } from '@headlessui/react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const BreakfastCarousel = (props) => {
    const [breakfastData, setBreakfastData] = useState({})
    const [nextSet, setNextSet] = useState([])
    const [prevSet, setPrevSet] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeSetTracker, setActiveSetTracker] = useState(false)
    const [nextTransitionTracker, setNextTransitionTracker] = useState(true)
    const [prevTransitionTracker, setPrevTransitionTracker] = useState(false)
    const [prevTransitionComplete, setPrevTransitionComplete] = useState(false);
    const { setBFastImg } = props
    const { setBreakfastMenuItemDesc } = props
    const { setBreakfastMenuItemName } = props
    const { bFastImg } = props
    const { bFastImgTracker } = props

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

        if (activeSetTracker) {
            setNextSet(breakfastData.slice(0, 3))
            setPrevSet(breakfastData.slice(3))
        }


    }, [activeSetTracker])

    const handleNextSet = () => {
        const newIndex = currentIndex + 3;
        const newSet = breakfastData.slice(newIndex, newIndex + 3);
        const oldSet = breakfastData.slice(0, newIndex)
        setNextTransitionTracker(false)
        setNextSet(oldSet);
        setPrevSet(newSet)
        setCurrentIndex(newIndex);
        setPrevTransitionComplete(!pr);
        if(prevTransitionComplete){

        }
        setPrevTransitionTracker(!prevTransitionTracker)
    };

    const handlePrevSet = () => {
        const newIndex = currentIndex - 3;
        const newSet = breakfastData.slice(newIndex, newIndex + 3);
        const oldSet = breakfastData.slice(newIndex + 3)
        if (currentIndex < 0) {
            setCurrentIndex(0)
        } else {
            setNextSet(newSet);
            setCurrentIndex(newIndex);
            setNextTransitionTracker(true)
            setPrevTransitionTracker(false)
            setPrevSet(oldSet)

        }
    };

    const handlePrevSetTransition = () => {
        setPrevTransitionTracker(false)
        
    }

    // HANDLE BREAKFAST UI
    const handleBFastMenuItem = (menuImg, menuName, menuDesc) => {
        setBFastImg(menuImg)
        setBreakfastMenuItemName(menuName)
        setBreakfastMenuItemDesc(menuDesc)
    }

    const isPrevButtonDisabled = currentIndex === 0;
    const isNextButtonDisabled = currentIndex + 3 >= breakfastData.length;
    console.log("prev set tracker", prevTransitionTracker)
    console.log("prev set complete", prevTransitionComplete)
    return (
        <div className="flex w-full h-full justify-evenly items-center">
            <div className="h-full flex items-center">
                <button className={`${isPrevButtonDisabled ? "opacity-50" : "opacity-100"}`} onClick={handlePrevSet} disabled={isPrevButtonDisabled}>
                    <img className="h-[45px] w-[50px]" src={pieLeft} />
                </button>
            </div>

            <div className="flex h-full justify-evenly w-5/6 overflow-hidden ">
                {prevSet.map((picture, index) => (
                    <img key={index}
                        src={picture.menuItemImg}
                        onClick={() => handleBFastMenuItem(picture.menuItemImg, picture.menuItemName, picture.menuItemDescription)}
                        className={` transition-transform duration-700 ease-in-out ${prevTransitionTracker ? "translate-x-0 opacity-100" : prevTransitionComplete ? "translate-x-0 opacity-100" : "absolute translate-x-80 z-[-1] opacity-0"}  ${bFastImgTracker && bFastImg === picture.menuItemImg ? "opacity-100" : "opacity-40"}   w-[200px] h-full object-cover cursor-pointer transition-all duration-500 hover:opacity-100`}
                        alt={`Picture ${index}`}
                    
                    />
                ))}
                {nextSet.map((picture, index) => (
                    <img key={index}
                        src={picture.menuItemImg}
                        onClick={() => handleBFastMenuItem(picture.menuItemImg, picture.menuItemName, picture.menuItemDescription)}
                        className={`transition-transform duration-700 ease-in-out ${nextTransitionTracker ? 'translate-x-0 opacity-100' : 'absolute z-[-1] -translate-x-80 opacity-0'} hover:opacity-100  ${bFastImgTracker && bFastImg === picture.menuItemImg ? "opacity-100" : "opacity-40 "}   w-[200px] h-full object-cover cursor-pointer transition-all duration-500`}
                        alt={`Picture ${index}`}

                    />
                ))}
            </div>=

            <div className="h-full flex items-center">
                <button className={`${isNextButtonDisabled ? "opacity-50" : "opacity-100"}`} onClick={handleNextSet} disabled={isNextButtonDisabled}>
                    <img className={` h-[40px] w-[50px]`} src={pieRight} />
                </button>
            </div>
        </div>
    )
}

export default BreakfastCarousel;