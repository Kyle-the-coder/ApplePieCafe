import { useEffect, useState } from "react";
import { doc, getDocs, collection, arrayRemove } from "firebase/firestore"
import { db } from "../config/firebase"
import leftArrow from "../assets/images/modalArrowLeft.png"
import rightArrow from "../assets/images/modalArrowRight.png"


const BreakfastCarousel = () => {
    const [breakfastData, setBreakfastData] = useState({})
    const [activeSet, setActiveSet] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeSetTracker, setActiveSetTracker] = useState(false)

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
        const newIndex = currentIndex + 1;
        const newSet = breakfastData.slice(newIndex, newIndex + 3);
        setActiveSet(newSet);
        setCurrentIndex(newIndex);
    };

    const prevSet = () => {
        const newIndex = currentIndex - 1;
        const newSet = breakfastData.slice(newIndex, newIndex + 3);
        if(currentIndex < 0){
            setCurrentIndex(0)
        } else {
            setActiveSet(newSet);
            setCurrentIndex(newIndex);
            
        }
    };

    
    console.log(currentIndex)
    return (
        <div className="flex w-full h-full justify-evenly items-center">
            <img className="h-[50px] w-[50px]" src={leftArrow} onClick={prevSet} disabled={currentIndex === 0} />
            {activeSet.map((picture, index) => (
                <img key={index} src={picture.menuItemImg} className={`   w-[200px] h-full object-cover opacity-70 hover:opacity-100 cursor-pointer`} alt={`Picture ${index}`} />
            ))}
            <img className="h-[50px] w-[50px]" src={rightArrow} onClick={nextSet} disabled={currentIndex + 3 >= breakfastData.length} />
        </div>
    )
}

export default BreakfastCarousel;