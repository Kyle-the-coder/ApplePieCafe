import { useEffect, useState } from "react";
import { doc, getDocs, collection, arrayRemove } from "firebase/firestore"
import { db } from "../config/firebase"
import leftArrow from "../assets/images/modalArrowLeft.png"
import rightArrow from "../assets/images/modalArrowRight.png"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


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
        const newIndex = currentIndex + 3;
        const newSet = breakfastData.slice(newIndex, newIndex + 3);
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

        }
    };

    const isPrevButtonDisabled = currentIndex === 0;
    const isNextButtonDisabled = currentIndex + 3 >= breakfastData.length;

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };


    console.log(currentIndex)
    return (
        <div className="flex w-full h-full justify-evenly items-center">
            <Carousel responsive={responsive}>
                {/* <button src={leftArrow} className={`${isPrevButtonDisabled ? "opacity-50" : "opacity-100"}`} onClick={prevSet} disabled={isPrevButtonDisabled}>
                <img className="h-[50px] w-[50px]" src={leftArrow} />
            </button> */}
                {activeSet.map((picture, index) => (
                    <img key={index} src={picture.menuItemImg} className={`   w-[200px] h-full object-cover opacity-70 hover:opacity-100 cursor-pointer transition-all duration-500`} alt={`Picture ${index}`} />
                ))}
                {/* <button className={`${isNextButtonDisabled ? "opacity-50" : "opacity-100"}`} src={rightArrow} onClick={nextSet} disabled={isNextButtonDisabled}>
                <img className={` h-[50px] w-[50px]`} src={rightArrow} />
            </button> */}
            </Carousel>
        </div>
    )
}

export default BreakfastCarousel;