import fruits from "../assets/images/fruits1.jpeg";
import MenuSidebar from "../components/menuSidebar";
import rightArrow from '../assets/images/right-arrow.png';
import leftArrow from "../assets/images/left-arrow.png";
import { useEffect, useState } from "react";
import { doc, getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import BreakfastCarousel from "../components/breakfastCarousel";
import LunchCarousel from "../components/lunchCarousel";
import DessertCarousel from "../components/dessertCarousel";

const MenuPage = () => {
    // BREAKFAST ITEMS
    const [bFastImg, setBFastImg] = useState(null)
    const [breakfastMenuItemName, setBreakfastMenuItemName] = useState("")
    const [breakfastMenuItemDesc, setBreakfastMenuItemDesc] = useState("")
    const [bFastImgTracker, setBFastImgTracker] = useState(false)
    const [breakfastData, setBreakfastData] = useState({})
    const [breakfastDataTracker, setBreakfastDataTracker] = useState(false)
    // LUNCH ITEMS
    const [lunchImg, setLunchImg] = useState(null)
    const [lunchMenuItemName, setLunchMenuItemName] = useState("")
    const [lunchMenuItemDesc, setLunchMenuItemDesc] = useState("")
    const [lunchImgTracker, setLunchImgTracker] = useState(false)
    const [lunchData, setLunchData] = useState({})
    //DESSERT ITEMS
    const [dessertImg, setDessertImg] = useState(null)
    const [dessertMenuItemName, setDessertMenuItemName] = useState("")
    const [dessertMenuItemDesc, setDessertMenuItemDesc] = useState("")
    const [dessertImgTracker, setDessertImgTracker] = useState(false)
    const [dessertData, setDessertData] = useState("")
    const [dessertDataTracker, setDessertDataTracker] = useState(false)


    useEffect(() => {
        // GET BREAKFAST DATA
        const getBreakfastData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "breakfastMenuItems"));
                const documents = querySnapshot.docs.map((doc) => doc.data());
                setBreakfastData(documents);
                setBreakfastDataTracker(true)
            } catch (error) {
                console.log(error);
            }
        };
        getBreakfastData();

        // GET LUNCH DATA
        const getLunchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "lunchMenuItems"));
                const documents = querySnapshot.docs.map((doc) => doc.data());
                setLunchData(documents);
            } catch (error) {
                console.log(error);
            }
        };
        getLunchData();

        // GET DESSERT DATA
        const getDessertData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "dessertMenuItems"));
                const documents = querySnapshot.docs.map((doc) => doc.data());
                setDessertData(documents);
                setDessertDataTracker(true)
            } catch (error) {
                console.log(error);
            }
        };
        getDessertData();

    }, [breakfastDataTracker])

    // HANDLE BREAKFAST UI
    const handleBFastMenuItem = (menuImg, menuName, menuDesc) => {
        setBFastImg(menuImg)
        setBreakfastMenuItemName(menuName)
        setBreakfastMenuItemDesc(menuDesc)
    }

    // HANDLE LUNCH UI
    const handleLunchMenuItem = (menuImg, menuName, menuDesc) => {
        setLunchImg(menuImg)
        setLunchMenuItemName(menuName)
        setLunchMenuItemDesc(menuDesc)
    }

    // HANDLE DESSERT UI
    const handleDessertMenuItem = (menuImg, menuName, menuDesc) => {
        setDessertImg(menuImg)
        setDessertMenuItemName(menuName)
        setDessertMenuItemDesc(menuDesc)
    }
    console.log(breakfastDataTracker)
    return (
        <div className="w-full">
            {/* Title Section */}
            <section>
                <div className="bg-gradient-to-r from-orange-200 to-red-400 relative flex w-full justify-center items-center h-[200px]">
                    <h1 className="fontWriting text-7xl font-bold ">Menu</h1>
                    <img className="w-full h-full object-cover absolute  mix-blend-overlay" src={fruits} />
                </div>
            </section>

            {/* Menu Section */}
            <section className="h-[900px] w-full bg-slate-900 flex">

                <div className="h-full">
                    <MenuSidebar
                        // BREAKFAST PROPS
                        breakfastData={breakfastData}
                        setBFastImg={setBFastImg}
                        setBFastImgTracker={setBFastImgTracker}
                        setBreakfastMenuItemDesc={setBreakfastMenuItemDesc}
                        setBreakfastMenuItemName={setBreakfastMenuItemName}
                        // LUNCH PROPS
                        setLunchImg={setLunchImg}
                        setLunchImgTracker={setLunchImgTracker}
                        setLunchMenuItemName={setLunchMenuItemName}
                        setLunchMenuItemDesc={setLunchMenuItemDesc}
                        lunchData={lunchData}
                        // DESSERT PROPS
                        setDessertImg={setDessertImg}
                        setDessertImgTracker={setDessertImgTracker}
                        setDessertMenuItemName={setDessertMenuItemName}
                        setDessertMenuItemDesc={setDessertMenuItemDesc}
                        dessertData={dessertData}
                    />
                </div>
                <div className="w-full h-[750px] flex py-6 relative">
                    <div className="w-full">
                        {bFastImgTracker && <img src={bFastImg} className="w-[800px] transition-all duration-200 h-full object-cover" />}
                        {lunchImgTracker && <img src={lunchImg} className="w-[800px] h-full object-cover" />}
                        {dessertImgTracker && <img src={dessertImg} className="w-[800px] h-full object-cover" />}
                    </div>

                    <div className="w-2/3 px-3 py-2 text-white">
                        <div >
                            {bFastImgTracker && <h1 className="fontWriting text-4xl mb-5 underline">Breakfast</h1>}
                            {lunchImgTracker && <h1 className="fontWriting text-4xl mb-5 underline">Lunch</h1>}
                            {dessertImgTracker && <h1 className="fontWriting text-4xl mb-5 underline">Dessert</h1>}
                        </div>
                        <div>
                            {bFastImgTracker &&
                                <>
                                    <h1 className="text-xl underline mb-2">{breakfastMenuItemName}</h1>
                                    <p>
                                        {breakfastMenuItemDesc}
                                    </p>
                                </>
                            }
                            {lunchImgTracker &&
                                <>
                                    <h1 className="text-xl underline mb-2">{lunchMenuItemName}</h1>
                                    <p>
                                        {lunchMenuItemDesc}
                                    </p>
                                </>
                            }
                            {dessertImgTracker &&
                                <>
                                    <h1 className="underline text-xl mb-2">{dessertMenuItemName}</h1>
                                    <p>
                                        {dessertMenuItemDesc}
                                    </p>
                                </>
                            }
                        </div>
                    </div>

                    <div className="w-[800px] h-[200px] justify-evenly flex items-center py-2  absolute right-[0px] bottom-[-100px] overflow-hidden">
                        {bFastImgTracker &&
                            <>
                                <BreakfastCarousel
                                    bFastImgTracker={bFastImgTracker}
                                    bFastImg={bFastImg}
                                    setBFastImg={setBFastImg} setBreakfastMenuItemDesc={setBreakfastMenuItemDesc}
                                    setBreakfastMenuItemName={setBreakfastMenuItemName}
                                    breakfastData={breakfastData}
                                    breakfastDataTracker={breakfastDataTracker}
                                />
                            </>
                        }
                        {lunchImgTracker &&
                            <>
                                <LunchCarousel
                                    lunchImgTracker={lunchImgTracker}
                                    lunchImg={lunchImg}
                                    setLunchImg={setLunchImg}
                                    setLunchMenuItemDesc={setLunchMenuItemDesc}
                                    setLunchMenuItemName={setLunchMenuItemName}
                                />
                            </>
                        }
                        {dessertImgTracker &&
                            <>
                                <DessertCarousel
                                    dessertImgTracker={dessertImgTracker}
                                    dessertImg={dessertImg}
                                    setDessertImg={setDessertImg}
                                    setDessertMenuItemDesc={setDessertMenuItemDesc}
                                    setDessertMenuItemName={setDessertMenuItemName}
                                    dessertData={dessertData}
                                    dessertDataTracker={dessertDataTracker}
                                />

                            </>
                        }
                    </div>

                </div>
            </section>

            <section>
                <div>

                </div>
            </section>
        </div>
    )
}

export default MenuPage;