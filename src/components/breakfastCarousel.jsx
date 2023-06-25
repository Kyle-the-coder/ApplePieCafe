import { useEffect, useState } from "react";
import { doc, getDocs, collection, arrayRemove } from "firebase/firestore"
import { db } from "../config/firebase"
import leftArrow from "../assets/images/modalArrowLeft.png"
import rightArrow from "../assets/images/modalArrowRight.png"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const CarouselNavigation = ({ prevButton, nextButton }) => {
    return (
        <div className="flex justify-between items-center">
            <div>{prevButton}</div>
            <div>{nextButton}</div>
        </div>
    );
};


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

    const handleSlideChange = (event) => {
        console.log('Slide changed:', event.item);
    };


    console.log(currentIndex)
    return (
        <div className="flex w-full h-full justify-evenly items-center bg-slate-200">
            <div className="w-full h-full bg-red-200 ">

                <AliceCarousel
                    items={activeSet.map((picture, index) => (
                        <img
                            key={index}
                            src={picture.menuItemImg}
                            className="w-[200px] h-auto object-cover opacity-70 hover:opacity-100 cursor-pointer transition-all duration-500"
                        />
                    ))}
                    onSlideChanged={handleSlideChange}
                    disableDotsControls
                    
                />
            </div>



        </div>
    )
}

export default BreakfastCarousel;