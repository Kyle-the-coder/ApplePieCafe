import fruits from "../assets/images/fruits1.jpeg";
import MenuSidebar from "../components/menuSidebar";
import bfast1 from "../assets/images/bfast1.jpeg";
import bfast2 from "../assets/images/bfast2.jpeg";
import lunch1 from "../assets/images/lunch1.webp";
import bdessert from "../assets/images/bdessert1.webp";
import RandPage from "./randPage";
import avaToast from "../assets/images/avaToast.jpeg"
import chileQuilles from "../assets/images/chileQuilles.jpeg"
import yogurt from "../assets/images/yogurt.webp"
import turkeyWrap from "../assets/images/turkeyWrap.jpeg"
import beef from "../assets/images/beef.webp"
import burger from "../assets/images/burger.jpeg"
import apPhoto from "../assets/images/apphoto.jpeg"
import chocoCake from "../assets/images/chocoCake.jpeg"
import tart from "../assets/images/tart.jpeg"
import rightArrow from '../assets/images/right-arrow.png'
import leftArrow from "../assets/images/left-arrow.png"
import { useEffect, useState } from "react";
import { doc, getDocs, collection } from "firebase/firestore"
import { db } from "../config/firebase"

const MenuPage = () => {
    const [bFastImgTracker, setBFastImgTracker] = useState(false)
    const [bFastImg, setBFastImg] = useState(null)
    const [lunchImgTracker, setLunchImgTracker] = useState(false)
    const [dessertImgTracker, setDessertImgTracker] = useState(false)
    const [breakfastData, setBreakfastData] = useState({})
    const [breakfastMenuItemName, setBreakfastMenuItemName] = useState("")
    const [breakfastMenuItemDesc, setBreakfastMenuItemDesc] = useState("")


    useEffect(() => {
        const getData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "breakfastMenuItems"));
                const documents = querySnapshot.docs.map((doc) => doc.data());
                setBreakfastData(documents);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
        
    }, [])

    const handleBFastMenuItem = (menuItem, menuName, menuDesc) => {
        setBFastImg(menuItem)
        setBreakfastMenuItemName(menuName)
        setBreakfastMenuItemDesc(menuDesc)
        console.log("menu item -", menuItem)
    }

    console.log(breakfastData)

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
                <div className="w-full bg-slate-800 h-[750px] flex relative py-6">
                    <div>
                        <MenuSidebar
                            setBFastImgTracker={setBFastImgTracker}
                            setLunchImgTracker={setLunchImgTracker}
                            setDessertImgTracker={setDessertImgTracker}
                            setBFastImg={setBFastImg}
                            breakfastData={breakfastData}
                        />
                    </div>
                    <div className="w-[800px]">
                        {bFastImgTracker && <img src={bFastImg} className="w-full transition-all duration-200 h-full object-cover" />}
                        {lunchImgTracker && <img src={lunch1} className="w-full h-full object-cover" />}
                        {dessertImgTracker && <img src={bdessert} className="w-full h-full object-cover" />}
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
                                    <h1 className="text-xl underline mb-2">Chicken and Ham Sammi</h1>
                                    <p>
                                        Indulge in a mouthwatering chicken and ham sandwich, nestled between toasted bread, with layers of savory flavors and satisfying textures.
                                        Accompanied by a generous side of golden fries, this classic combination delivers a satisfying meal
                                        that will leave you fully satisfied.
                                    </p>
                                </>
                            }
                            {dessertImgTracker &&
                                <>
                                    <h1 className="underline text-xl mb-2">Never Forget</h1>
                                    <p>
                                        Treat yourself to a heavenly dessert waffle topped with a colorful medley of fresh, juicy berries, and crowned with a generous scoop of velvety ice cream.
                                        The warm, fluffy waffle pairs perfectly with the sweet-tart berries and the cool, creamy ice cream,
                                        creating a delightful symphony of flavors and textures in every delightful bite.
                                    </p>
                                </>
                            }
                        </div>
                    </div>

                    <div className="w-[800px] h-[200px] justify-evenly flex items-center py-2  absolute right-[0px] bottom-[10px]">
                        {bFastImgTracker &&
                            <>
                                <img src={leftArrow} className="w-[40px] h-[40px] cursor-pointer" />
                                <img src={breakfastData[0].menuItemImg} onClick={() => handleBFastMenuItem(breakfastData[0].menuItemImg, breakfastData[0].menuItemName, breakfastData[0].menuItemDescription )} className="w-[200px] h-full object-cover opacity-70 hover:opacity-100 cursor-pointer" />
                                <img src={breakfastData[1].menuItemImg} onClick={() => handleBFastMenuItem(breakfastData[1].menuItemImg, breakfastData[1].menuItemName, breakfastData[1].menuItemDescription)} className="w-[200px] h-full object-cover opacity-70 hover:opacity-100 cursor-pointer" />
                                <img src={breakfastData[2].menuItemImg} onClick={() => handleBFastMenuItem(breakfastData[2].menuItemImg, breakfastData[2].menuItemName, breakfastData[2].menuItemDescription)} className="w-[200px] h-full object-cover opacity-70 hover:opacity-100 cursor-pointer" />
                                <img src={rightArrow} className="w-[40px] h-[40px] cursor-pointer" />
                            </>
                        }
                        {lunchImgTracker &&
                            <>
                                <img src={leftArrow} className="w-[40px] h-[40px] cursor-pointer" />
                                <img src={turkeyWrap} className="w-[200px] h-full object-cover opacity-70 hover:opacity-100 cursor-pointer" />
                                <img src={beef} className="w-[200px] h-full object-cover opacity-70 hover:opacity-100 cursor-pointer" />
                                <img src={burger} className="w-[200px] h-full object-cover opacity-70 hover:opacity-100 cursor-pointer" />
                                <img src={rightArrow} className="w-[40px] h-[40px] cursor-pointer" />
                            </>
                        }
                        {dessertImgTracker &&
                            <>
                                <img src={leftArrow} className="w-[40px] h-[40px] cursor-pointer" />
                                <img src={apPhoto} className="w-[200px] h-full object-cover opacity-70 hover:opacity-100 cursor-pointer" />
                                <img src={chocoCake} className="w-[200px] h-full object-cover opacity-70 hover:opacity-100 cursor-pointer" />
                                <img src={tart} className="w-[200px] h-full object-cover opacity-70 hover:opacity-100 cursor-pointer" />
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