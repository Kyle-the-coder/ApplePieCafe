import { useEffect, useState } from "react";
import { doc, getDocs, collection, arrayRemove } from "firebase/firestore"
import { db } from "../config/firebase"
import pieRight from "../assets/images/appliePieRight.png"
import pieLeft from "../assets/images/applePieLeft.png"


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
        const newSet = dessertData.slice(newIndex, newIndex + 3);
        const newerIndex = newIndex + 3
        const newerSet = dessertData.slice(newerIndex, newerIndex + 3)
        const oldSet = dessertData.slice(newIndex - 3, newIndex)

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
        const newerIndex = newIndex - 3
        const newerSet = dessertData.slice(newerIndex, newIndex)

        setNext1TransitionTracker(false)
        setNext2TransitionTracker(false)
        setNext1Set(oldSet)

        if (prevSetTracker) {
            // Next 1 Transition
            setPrev1Set(newSet)
            setPrev1TransitionTracker(true)

            //Next 2 Transition
            setPrev2TransitionTracker(false)
            setPrev2Set(newerSet)
        }

        if (!prevSetTracker) {
            // Next 1 Transition
            setPrev1TransitionTracker(false)
            setPrev1Set(newerSet)

            //Next 2 Transition
            setPrev2Set(newSet);
            setPrev2TransitionTracker(true)
        }


        //Next Set
        setNext1TransitionTracker(false)
        setNext2TransitionTracker(false)

        //Index
        setCurrentIndex(newIndex);

        setPrevSetTracker(!prevSetTracker)
        setNextSetTracker(true)

    };

    // HANDLE BREAKFAST UI
    const handleDessertMenuItem = (menuImg, menuName, menuDesc) => {
        setDessertImg(menuImg)
        setDessertMenuItemName(menuName)
        setDessertMenuItemDesc(menuDesc)
    }

    const isPrevButtonDisabled = currentIndex === 0;
    const isNextButtonDisabled = currentIndex + 3 >= dessertData.length;
    console.log("prev1 set", prev1Set, "prev1 tracker", prev1TransitionTracker)
    console.log('prev2 set', prev2Set, "prev2 tracker", prev2TransitionTracker)
    console.log("next1 set", next1Set, "next1 Tracker", next1TransitionTracker)
    console.log("next2 set", next2Set, "next2 Tracker", next2TransitionTracker)
    console.log(currentIndex)
    return (
        <div className="flex w-full h-full justify-evenly items-center overflow-hidden">
            <div className="h-full flex items-center">
                <button className={`${isPrevButtonDisabled ? "opacity-50" : "opacity-100"}`} onClick={handlePrevSet} disabled={isPrevButtonDisabled}>
                    <img className="h-[45px] w-[50px]" src={pieLeft} />
                </button>
            </div>

            <div className="flex h-full justify-evenly w-5/6 overflow-hidden ">
                {prev1Set.map((picture, index) => (
                    <img key={index}
                        src={picture.menuItemImg}
                        onClick={() => handleDessertMenuItem(picture.menuItemImg, picture.menuItemName, picture.menuItemDescription)}
                        className={` transition-transform duration-1000  ${prev1TransitionTracker ? "translate-x-0 opacity-100" : "absolute -translate-x-80 z-[-1] "}  ${dessertImgTracker && dessertImg === picture.menuItemImg ? "opacity-100" : "opacity-40"}   w-[200px] h-full object-cover cursor-pointer transition-all duration-500 hover:opacity-100`}
                        alt={`Picture ${index}`}

                    />
                ))}
                {prev2Set.map((picture, index) => (
                    <img key={index}
                        src={picture.menuItemImg}
                        onClick={() => handleDessertMenuItem(picture.menuItemImg, picture.menuItemName, picture.menuItemDescription)}
                        className={` transition-transform duration-1000  ${prev2TransitionTracker ? "translate-x-0 opacity-100" : "absolute -translate-x-80 z-[-1] "}  ${dessertImgTracker && dessertImg === picture.menuItemImg ? "opacity-100" : "opacity-40"}   w-[200px] h-full object-cover cursor-pointer transition-all duration-500 hover:opacity-100`}
                        alt={`Picture ${index}`}

                    />
                ))}

                {next1Set.map((picture, index) => (
                    <img key={index}
                        src={picture.menuItemImg}
                        onClick={() => handleDessertMenuItem(picture.menuItemImg, picture.menuItemName, picture.menuItemDescription)}
                        className={`transition-transform duration-1000 ease-in-out ${next1TransitionTracker ? 'translate-x-0 opacity-100' : 'absolute z-[-1] translate-x-80 '} hover:opacity-100  ${dessertImgTracker && dessertImg === picture.menuItemImg ? "opacity-100" : "opacity-40 "}   w-[200px] h-full object-cover cursor-pointer transition-all duration-500`}
                        alt={`Picture ${index}`}

                    />
                ))}
                {next2Set.map((picture, index) => (
                    <img key={index}
                        src={picture.menuItemImg}
                        onClick={() => handleDessertMenuItem(picture.menuItemImg, picture.menuItemName, picture.menuItemDescription)}
                        className={`transition-transform duration-1000 ease-in-out ${next2TransitionTracker ? 'translate-x-0 opacity-100' : 'absolute z-[-1] translate-x-80 '} hover:opacity-100  ${dessertImgTracker && dessertImg === picture.menuItemImg ? "opacity-100" : "opacity-40 "}   w-[200px] h-full object-cover cursor-pointer transition-all duration-500`}
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