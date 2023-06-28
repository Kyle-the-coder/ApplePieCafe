import { useEffect, useState } from "react";
import { doc, getDocs, collection, arrayRemove } from "firebase/firestore"
import { db } from "../config/firebase"
import pieRight from "../assets/images/pieRight.PNG"
import pieLeft from "../assets/images/pieLeft.png"


const LunchCarousel = (props) => {
    const [lunchData, setLunchData] = useState({})
    const [lunchDataTracker, setLunchDataTracker] = useState(false)
    const [nextSet, setNextSet] = useState([])
    const [activeSet, setActiveSet] = useState([])
    const [prevSet, setPrevSet] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeSetTracker, setActiveSetTracker] = useState(false)
    const [nextTransitionTracker, setNextTransitionTracker] = useState(false)
    const [prevTransitionTracker, setPrevTransitionTracker] = useState(false)
    const [prevTransitionComplete, setPrevTransitionComplete] = useState(false);
    const { setLunchImg } = props
    const { setLunchMenuItemDesc } = props
    const { setLunchMenuItemName } = props
    const { lunchImg } = props
    const { lunchImgTracker } = props

    useEffect(() => {
        // GET LUNCH DATA
        const getLunchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "lunchMenuItems"));
                const documents = querySnapshot.docs.map((doc) => doc.data());
                setLunchData(documents);
                setActiveSetTracker(true)
                setLunchDataTracker(true)
            } catch (error) {
                console.log(error);
            }
        };
        getLunchData();


        if (activeSetTracker) {
            setActiveSet(lunchData.slice(0, 3))
            setNextSet(lunchData.slice(3))
        }


    }, [lunchDataTracker])

    const handleNextSet = () => {
        const newIndex = currentIndex + 3;
        const newSet = lunchData.slice(newIndex, newIndex + 3);
        const oldSet = lunchData.slice(newIndex - 3, newIndex)


        //Next Transition
        setNextTransitionTracker(true)
        setNextSet(newSet);

        //Active Set
        setActiveSetTracker(false)

        //Prev Transition
        setPrevSet(oldSet);
        setPrevTransitionTracker(false)

        //Index
        setCurrentIndex(newIndex);

        //Re-Active Set
        const reActiveSet = setTimeout(() => {
            setActiveSet(newSet)
            setActiveSetTracker(true)
            setNextTransitionTracker(false)
            const newerIndex = newIndex + 3
            const newerSet = lunchData.slice(newerIndex, newerIndex + 3)
            setNextSet(newerSet)
        }, 650);

    };

    const handlePrevSet = () => {
        const newIndex = currentIndex - 3;
        const newSet = lunchData.slice(newIndex, newIndex + 3);
        const oldSet = lunchData.slice(newIndex + 3)

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
            const newerSet = lunchData.slice(newerIndex, newerIndex - 3)
            setPrevSet(newerSet)
        }, 650);

    };

    const handlePrevSetTransition = () => {
        setPrevTransitionTracker(false)

    }

    // HANDLE BREAKFAST UI
    const handleLunchMenuItem = (menuImg, menuName, menuDesc) => {
        setLunchImg(menuImg)
        setLunchMenuItemName(menuName)
        setLunchMenuItemDesc(menuDesc)
    }

    const isPrevButtonDisabled = currentIndex === 0;
    const isNextButtonDisabled = currentIndex + 3 >= lunchData.length;
    console.log("prev set", prevSet, "prev tracker", prevTransitionTracker)
    console.log('active set', activeSet, "active tracker", activeSetTracker)
    console.log("next set", nextSet, "next Tracker", nextTransitionTracker)
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
                        onClick={() => handleLunchMenuItem(picture.menuItemImg, picture.menuItemName, picture.menuItemDescription)}
                        className={` transition-transform duration-700 ease-in-out ${prevTransitionTracker ? "translate-x-0 opacity-100" : "absolute -translate-x-80 z-[-1] "}  ${bFastImgTracker && bFastImg === picture.menuItemImg ? "opacity-100" : "opacity-40"}   w-[200px] h-full object-cover cursor-pointer transition-all duration-500 hover:opacity-100`}
                        alt={`Picture ${index}`}

                    />
                ))}
                {activeSet.map((picture, index) => (
                    <img key={index}
                        src={picture.menuItemImg}
                        onClick={() => handleLunchMenuItem(picture.menuItemImg, picture.menuItemName, picture.menuItemDescription)}
                        className={` ${activeSetTracker ? "opacity-100" : "absolute z-[-1]  opacity-0"}  ${bFastImgTracker && bFastImg === picture.menuItemImg ? "opacity-100" : "opacity-40"}   w-[200px] h-full object-cover cursor-pointer hover:opacity-100`}
                        alt={`Picture ${index}`}

                    />
                ))}
                {nextSet.map((picture, index) => (
                    <img key={index}
                        src={picture.menuItemImg}
                        onClick={() => handleLunchMenuItem(picture.menuItemImg, picture.menuItemName, picture.menuItemDescription)}
                        className={`transition-transform duration-700 ease-in-out ${nextTransitionTracker ? 'translate-x-0 opacity-100' : 'absolute z-[-1] translate-x-80 '} hover:opacity-100  ${bFastImgTracker && bFastImg === picture.menuItemImg ? "opacity-100" : "opacity-40 "}   w-[200px] h-full object-cover cursor-pointer transition-all duration-500`}
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

export default LunchCarousel;