import { useEffect, useState } from "react";
import pieRight from "../assets/images/pieRight.PNG"
import pieLeft from "../assets/images/pieLeft.png"


const BreakfastCarousel = (props) => {
    const { breakfastData, setBreakfastData } = props
    const { breakfastDataTracker } = props
    const [next1Set, setNext1Set] = useState([])
    const [next2Set, setNext2Set] = useState([])
    // const [activeSet, setActiveSet] = useState([])
    const [prev1Set, setPrev1Set] = useState([])
    const [prev2Set, setPrev2Set] = useState([])
    const [prevSetTracker, setPrevSetTracker] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0);
    // const [activeSetTracker, setActiveSetTracker] = useState(false)
    const [next1TransitionTracker, setNext1TransitionTracker] = useState(false)
    const [next2TransitionTracker, setNext2TransitionTracker] = useState(false)
    const [nextSetTracker, setNextSetTracker] = useState(true)
    const [prev1TransitionTracker, setPrev1TransitionTracker] = useState(false)
    const [prev2TransitionTracker, setPrev2TransitionTracker] = useState(false)
    const { setBFastImg } = props
    const { setBreakfastMenuItemDesc } = props
    const { setBreakfastMenuItemName } = props
    const { bFastImg } = props
    const { bFastImgTracker } = props

    useEffect(() => {
        if (breakfastDataTracker) {
            setPrev1TransitionTracker(true)
        }
        setPrev1Set(breakfastData.slice(0, 3))
        setNext1Set(breakfastData.slice(3))
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
        const newSet = breakfastData.slice(newIndex, newIndex + 3);
        const oldSet = breakfastData.slice(newIndex + 3)
        const newerIndex = newIndex - 3
        const newerSet = breakfastData.slice(newerIndex, newerIndex - 3)

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
            const timeoutId = setTimeout(() => {
                setPrev2TransitionTracker(true)
            }, 50);
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
    const handleBFastMenuItem = (menuImg, menuName, menuDesc) => {
        setBFastImg(menuImg)
        setBreakfastMenuItemName(menuName)
        setBreakfastMenuItemDesc(menuDesc)
    }

    const isPrevButtonDisabled = currentIndex === 0;
    const isNextButtonDisabled = currentIndex + 3 >= breakfastData.length;
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
                        onClick={() => handleBFastMenuItem(picture.menuItemImg, picture.menuItemName, picture.menuItemDescription)}
                        className={` transition-transform duration-700 ease-in-out ${prev1TransitionTracker ? "translate-x-0 opacity-100" : "absolute -translate-x-80 z-[-1] "}  ${bFastImgTracker && bFastImg === picture.menuItemImg ? "opacity-100" : "opacity-40"}   w-[200px] h-full object-cover cursor-pointer transition-all duration-500 hover:opacity-100`}
                        alt={`Picture ${index}`}

                    />
                ))}
                {prev2Set.map((picture, index) => (
                    <img key={index}
                        src={picture.menuItemImg}
                        onClick={() => handleBFastMenuItem(picture.menuItemImg, picture.menuItemName, picture.menuItemDescription)}
                        className={` transition-transform duration-700 ease-in-out ${prev2TransitionTracker ? "translate-x-0 opacity-100" : "absolute -translate-x-80 z-[-1] "}  ${bFastImgTracker && bFastImg === picture.menuItemImg ? "opacity-100" : "opacity-40"}   w-[200px] h-full object-cover cursor-pointer transition-all duration-500 hover:opacity-100`}
                        alt={`Picture ${index}`}

                    />
                ))}

                {next1Set.map((picture, index) => (
                    <img key={index}
                        src={picture.menuItemImg}
                        onClick={() => handleBFastMenuItem(picture.menuItemImg, picture.menuItemName, picture.menuItemDescription)}
                        className={`transition-transform duration-700 ease-in-out ${next1TransitionTracker ? 'translate-x-0 opacity-100' : 'absolute z-[-1] translate-x-80 '} hover:opacity-100  ${bFastImgTracker && bFastImg === picture.menuItemImg ? "opacity-100" : "opacity-40 "}   w-[200px] h-full object-cover cursor-pointer transition-all duration-500`}
                        alt={`Picture ${index}`}

                    />
                ))}
                {next2Set.map((picture, index) => (
                    <img key={index}
                        src={picture.menuItemImg}
                        onClick={() => handleBFastMenuItem(picture.menuItemImg, picture.menuItemName, picture.menuItemDescription)}
                        className={`transition-transform duration-700 ease-in-out ${next2TransitionTracker ? 'translate-x-0 opacity-100' : 'absolute z-[-1] translate-x-80 '} hover:opacity-100  ${bFastImgTracker && bFastImg === picture.menuItemImg ? "opacity-100" : "opacity-40 "}   w-[200px] h-full object-cover cursor-pointer transition-all duration-500`}
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

export default BreakfastCarousel;