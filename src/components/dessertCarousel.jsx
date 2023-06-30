import { useEffect, useState } from "react";
import { doc, getDocs, collection, arrayRemove } from "firebase/firestore"
import { db } from "../config/firebase"
import pieRight from "../assets/images/pieRight.PNG"
import pieLeft from "../assets/images/pieLeft.png"


const DessertCarousel = (props) => {

    //CAROUSEL STATES
    const [next1Set, setNext1Set] = useState([])
    const [next2Set, setNext2Set] = useState([])
    const [prev1Set, setPrev1Set] = useState([])
    const [prev2Set, setPrev2Set] = useState([])
    const [prevSetTracker, setPrevSetTracker] = useState(true)

    //INDEX
    const [currentIndex, setCurrentIndex] = useState(0);

    //CAROUSEL TRANSITIONS
    const [next1TransitionTracker, setNext1TransitionTracker] = useState(false)
    const [next2TransitionTracker, setNext2TransitionTracker] = useState(false)
    const [nextSetTracker, setNextSetTracker] = useState(true)
    const [prev1TransitionTracker, setPrev1TransitionTracker] = useState(false)
    const [prev2TransitionTracker, setPrev2TransitionTracker] = useState(false)

    const { dessertData, setDessertData } = props
    const { dessertDataTracker } = props
    const { setDessertImg } = props
    const { setDessertMenuItemDesc } = props
    const { setDessertMenuItemName } = props
    const { dessertImg } = props
    const { dessertImgTracker } = props

    useEffect(() => {
        if (dessertDataTracker) {
            setPrev1TransitionTracker(true)
        }
        setPrev1Set(dessertData.slice(0, 3))
        setNext1Set(dessertData.slice(3))
    }, [])

    const handleNextSet = () => {
        const newIndex = currentIndex + 3;
        const newSet = breakfastData.slice(newIndex, newIndex + 3);
        const newerIndex = newIndex + 3
        const newerSet = breakfastData.slice(newerIndex, newerIndex + 3)
        const oldSet = breakfastData.slice(newIndex - 3, newIndex)

        //Prev Transition
        setPrev1TransitionTracker(false)
        setPrev2TransitionTracker(false)
        setPrev1Set(oldSet)

        if (nextSetTracker) {
            // Next 1 Transition
            setNext1Set(newSet)
            setNext1TransitionTracker(true)

            //Next 2 Transition
            setNext2TransitionTracker(false)
            setNext2Set(newerSet)
        }

        if (!nextSetTracker) {
            // Next 1 Reload
            setNext1TransitionTracker(false)
            setNext1Set(newerSet)

            //Next 2 Transition
            setNext2Set(newSet);
            setNext2TransitionTracker(true)
        }

        //Index
        setCurrentIndex(newIndex);

        //Handle Trackers
        setNextSetTracker(!nextSetTracker)
        setPrevSetTracker(true)
    };

    const handlePrevSet = () => {
        const newIndex = currentIndex - 3;
        const newSet = dessertData.slice(newIndex, newIndex + 3);
        const oldSet = dessertData.slice(newIndex + 3)

        //Next Set
        setNextTransitionTracker(false)
        setNextSet(oldSet)


        //Active Set
        setActiveSetTracker(false)

        //Prev Set
        setPrevSet(newSet)
        setPrevTransitionTracker(true)

        //Index
        setCurrentIndex(newIndex);

        //Re-ActiveSet
        const reActiveSet = setTimeout(() => {
            setActiveSet(newSet)
            setActiveSetTracker(true)
            setPrevTransitionTracker(false)
            const newerIndex = newIndex - 3
            const newerSet = dessertData.slice(newerIndex, newerIndex - 3)
            setPrevSet(newerSet)
        }, 650);

    };

    const handlePrevSetTransition = () => {
        setPrevTransitionTracker(false)

    }

    // HANDLE BREAKFAST UI
    const handleDessertMenuItem = (menuImg, menuName, menuDesc) => {
        setDessertImg(menuImg)
        setDessertMenuItemName(menuName)
        setDessertMenuItemDesc(menuDesc)
    }

    const isPrevButtonDisabled = currentIndex === 0;
    const isNextButtonDisabled = currentIndex + 3 >= dessertData.length;
    console.log("prev set", prevSet, "prev tracker", prevTransitionTracker)
    console.log('active set', activeSet, "active tracker", activeSetTracker)
    console.log("next set", nextSet, "next Tracker", nextTransitionTracker)
    console.log(dessertData)
    return (
        <div className="flex w-full h-full justify-evenly items-center overflow-hidden">
            <div className="h-full flex items-center">
                <button className={`${isPrevButtonDisabled ? "opacity-50" : "opacity-100"}`} onClick={handlePrevSet} disabled={isPrevButtonDisabled}>
                    <img className="h-[45px] w-[50px]" src={pieLeft} />
                </button>
            </div>

            <div className="flex h-full justify-evenly w-5/6 overflow-hidden ">
                {prevSet.map((picture, index) => (
                    <img key={index}
                        src={picture.menuItemImg}
                        onClick={() => handleDessertMenuItem(picture.menuItemImg, picture.menuItemName, picture.menuItemDescription)}
                        className={` transition-transform duration-700 ease-in-out ${prevTransitionTracker ? "translate-x-0 opacity-100" : "absolute -translate-x-80 z-[-1] "}  ${dessertImgTracker && dessertImg === picture.menuItemImg ? "opacity-100" : "opacity-40"}   w-[200px] h-full object-cover cursor-pointer transition-all duration-500 hover:opacity-100`}
                        alt={`Picture ${index}`}

                    />
                ))}
                {activeSet.map((picture, index) => (
                    <img key={index}
                        src={picture.menuItemImg}
                        onClick={() => handleDessertMenuItem(picture.menuItemImg, picture.menuItemName, picture.menuItemDescription)}
                        className={` ${activeSetTracker ? "opacity-100" : "absolute z-[-1]  opacity-0"}  ${dessertImgTracker && dessertImg === picture.menuItemImg ? "opacity-100" : "opacity-40"}   w-[200px] h-full object-cover cursor-pointer hover:opacity-100`}
                        alt={`Picture ${index}`}

                    />
                ))}
                {nextSet.map((picture, index) => (
                    <img key={index}
                        src={picture.menuItemImg}
                        onClick={() => handleDessertMenuItem(picture.menuItemImg, picture.menuItemName, picture.menuItemDescription)}
                        className={`transition-transform duration-700 ease-in-out ${nextTransitionTracker ? 'translate-x-0 opacity-100' : 'absolute z-[-1] translate-x-80 '} hover:opacity-100  ${dessertImgTracker && dessertImg === picture.menuItemImg ? "opacity-100" : "opacity-40 "}   w-[200px] h-full object-cover cursor-pointer transition-all duration-500`}
                        alt={`Picture ${index}`}

                    />
                ))}
            </div>

            <div className="h-full flex items-center">
                <button className={`${isNextButtonDisabled ? "opacity-50" : "opacity-100"}`} onClick={handleNextSet} disabled={isNextButtonDisabled}>
                    <img className={` h-[40px] w-[50px]`} src={pieRight} />
                </button>
            </div>
        </div>
    )
}

export default DessertCarousel;