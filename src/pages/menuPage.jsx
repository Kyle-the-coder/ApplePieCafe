import fruits from "../assets/images/fruits1.jpeg";
import MenuSidebar from "../components/menuSidebar";
import rightArrow from '../assets/images/right-arrow.png'
import leftArrow from "../assets/images/left-arrow.png"
import { useEffect, useState } from "react";
import { doc, getDocs, collection } from "firebase/firestore"
import { db } from "../config/firebase"

const MenuPage = () => {
    // BREAKFAST ITEMS
    const [bFastImg, setBFastImg] = useState(null)
    const [breakfastMenuItemName, setBreakfastMenuItemName] = useState("")
    const [breakfastMenuItemDesc, setBreakfastMenuItemDesc] = useState("")
    const [bFastImgTracker, setBFastImgTracker] = useState(false)
    const [breakfastData, setBreakfastData] = useState({})
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


    useEffect(() => {
        // GET BREAKFAST DATA
        const getBreakfastData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "breakfastMenuItems"));
                const documents = querySnapshot.docs.map((doc) => doc.data());
                setBreakfastData(documents);
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
            } catch (error) {
                console.log(error);
            }
        };

        getDessertData();

    }, [])

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



    return (
        <div>
            {/* Title Section */}
            <section>
                <div className="bg-gradient-to-r from-orange-200 to-red-400 relative flex w-full justify-center items-center h-[200px]">
                    <h1 className="fontWriting text-7xl font-bold ">Menu</h1>
                    <img className="w-full h-full object-cover absolute  mix-blend-overlay" src={fruits} />
                </div>
            </section>

            {/* Menu Section */}
            <section>
                <div className="w-full bg-slate-900 h-[750px] flex relative py-6">
                    <div>
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
                    <div className="w-[800px]">
                        {bFastImgTracker && <img src={bFastImg} className="w-full transition-all duration-200 h-full object-cover" />}
                        {lunchImgTracker && <img src={lunchImg} className="w-full h-full object-cover" />}
                        {dessertImgTracker && <img src={dessertImg} className="w-full h-full object-cover" />}
                    </div>

                    <div className="w-[500px] px-3 py-2 text-white">
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

                    <div className="w-[800px] h-[200px] justify-evenly flex items-center py-2  absolute right-[0px] bottom-[10px]">
                        {bFastImgTracker &&
                            <>
                                <img src={leftArrow} className="w-[40px] h-[40px] cursor-pointer" />
                                <img src={breakfastData[0].menuItemImg} onClick={() => handleBFastMenuItem(breakfastData[0].menuItemImg, breakfastData[0].menuItemName, breakfastData[0].menuItemDescription)} className="w-[200px] h-full object-cover opacity-70 hover:opacity-100 cursor-pointer" />
                                <img src={breakfastData[1].menuItemImg} onClick={() => handleBFastMenuItem(breakfastData[1].menuItemImg, breakfastData[1].menuItemName, breakfastData[1].menuItemDescription)} className="w-[200px] h-full object-cover opacity-70 hover:opacity-100 cursor-pointer" />
                                <img src={breakfastData[2].menuItemImg} onClick={() => handleBFastMenuItem(breakfastData[2].menuItemImg, breakfastData[2].menuItemName, breakfastData[2].menuItemDescription)} className="w-[200px] h-full object-cover opacity-70 hover:opacity-100 cursor-pointer" />
                                <img src={rightArrow} className="w-[40px] h-[40px] cursor-pointer" />
                            </>
                        }
                        {lunchImgTracker &&
                            <>
                                <img src={leftArrow} className="w-[40px] h-[40px] cursor-pointer" />
                                <img src={lunchData[0].menuItemImg} onClick={() => handleLunchMenuItem(lunchData[0].menuItemImg, lunchData[0].menuItemName, lunchData[0].menuItemDescription)} className={` ${lunchImgTracker && lunchImg === lunchData[0].menuItemImg ? "opacity-100" : "opacity-20 "} w-[200px] h-full object-cover hover:opacity-100 cursor-pointer`} />
                                <img src={lunchData[1].menuItemImg} onClick={() => handleLunchMenuItem(lunchData[1].menuItemImg, lunchData[1].menuItemName, lunchData[1].menuItemDescription)} className={` ${lunchImgTracker && lunchImg === lunchData[1].menuItemImg ? "opacity-100" : "opacity-20 "} w-[200px] h-full object-cover  hover:opacity-100 cursor-pointer`} />
                                <img src={lunchData[2].menuItemImg} onClick={() => handleLunchMenuItem(lunchData[2].menuItemImg, lunchData[2].menuItemName, lunchData[2].menuItemDescription)} className={` ${lunchImgTracker && lunchImg === lunchData[2].menuItemImg ? "opacity-100" : "opacity-20 "} w-[200px] h-full object-cover  hover:opacity-100 cursor-pointer`} />
                                <img src={rightArrow} className="w-[40px] h-[40px] cursor-pointer" />
                            </>
                        }
                        {dessertImgTracker &&
                            <>
                                <img src={leftArrow} className="w-[40px] h-[40px] cursor-pointer" />
                                <img src={dessertData[0].menuItemImg} onClick={() => handleDessertMenuItem(dessertData[0].menuItemImg, dessertData[0].menuItemName, dessertData[0].menuItemDescription)} className={`${dessertImgTracker && dessertImg === dessertData[0].menuItemImg ? "opacity-100" : "opacity-20 "} transition-all duration-600 w-[200px] hover:opacity-100 h-full object-cover  cursor-pointer`} />
                                <img src={dessertData[1].menuItemImg} onClick={() => handleDessertMenuItem(dessertData[1].menuItemImg, dessertData[1].menuItemName, dessertData[1].menuItemDescription)}  className={` ${dessertImgTracker && dessertImg === dessertData[1].menuItemImg ? "opacity-100" : "opacity-20 "} transition-all duration-600 w-[200px] h-full object-cover opacity-70 hover:opacity-100 cursor-pointer`} />
                                <img src={dessertData[2].menuItemImg} onClick={() => handleDessertMenuItem(dessertData[2].menuItemImg, dessertData[2].menuItemName, dessertData[2].menuItemDescription)}  className={` ${dessertImgTracker && dessertImg === dessertData[2].menuItemImg ? "opacity-100" : "opacity-20 "} transition-all duration-600 w-[200px] h-full object-cover opacity-70 hover:opacity-100 cursor-pointer`} />
                                <img src={rightArrow} className="w-[40px] h-[40px] cursor-pointer" />
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