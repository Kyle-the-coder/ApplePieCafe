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
import rightArrow from '../assets/images/right-arrow.png'
import leftArrow from "../assets/images/left-arrow.png"
import { useState } from "react";

const MenuPage = () => {
    const [bFastImg, setBFastImg] = useState(false)
    const [lunchImg, setLunchImg] = useState(false)
    const [dessertImg, setDessertImg] = useState(false)

    return (
        <div>
            {/* Title Section */}
            <section>
                <div className="bg-gradient-to-r from-orange-200 to-red-400 relative flex w-full justify-center items-center h-[200px] mb-5">
                    <h1 className="fontWriting text-7xl font-bold ">Menu</h1>
                    <img className="w-full h-full object-cover absolute  mix-blend-overlay" src={fruits} />
                </div>
            </section>

            {/* Menu Section */}
            <section>
                <div className="w-full bg-slate-200 h-[600px] flex relative">
                    <div>
                        <MenuSidebar
                            bFastImg={bFastImg} setBFastImg={setBFastImg}
                            lunchImg={lunchImg} setLunchImg={setLunchImg}
                            dessertImg={dessertImg} setDessertImg={setDessertImg}
                        />
                    </div>
                    <div className="w-[800px]">
                        {bFastImg && <img src={bfast2} className="w-full transition-all duration-200 h-full object-cover" />}
                        {lunchImg && <img src={lunch1} className="w-full h-full object-cover" />}
                        {dessertImg && <img src={bdessert} className="w-full h-full object-cover" />}
                    </div>

                    <div className="w-[400px]">
                        <div >
                            {bFastImg && <h1>Breakfast</h1>}
                            {lunchImg && <h1>Lunch</h1>}
                            {dessertImg && <h1>Dessert</h1>}
                        </div>
                        <div>
                            {bFastImg &&
                                <p>
                                    Start your day off right with a delicious breakfast featuring perfectly cooked eggs, accompanied by crispy bacon and
                                    golden toast. Add a refreshing salad on the side, filled with crisp greens, vibrant vegetables, and a light
                                    dressing, creating a well-rounded and nutritious meal to kickstart your morning.
                                </p>}
                            {lunchImg &&
                                <p>
                                    Indulge in a mouthwatering chicken and ham sandwich, nestled between toasted bread, with layers of savory flavors and satisfying textures.
                                    Accompanied by a generous side of golden fries, this classic combination delivers a satisfying meal
                                    that will leave you fully satisfied.
                                </p>}
                            {dessertImg &&
                                <p>
                                    Treat yourself to a heavenly dessert waffle topped with a colorful medley of fresh, juicy berries, and crowned with a generous scoop of velvety ice cream.
                                    The warm, fluffy waffle pairs perfectly with the sweet-tart berries and the cool, creamy ice cream,
                                    creating a delightful symphony of flavors and textures in every delightful bite.
                                </p>}
                        </div>
                    </div>

                    <div className="w-[700px] h-[200px] justify-evenly flex items-center py-2 bg-slate-800 absolute right-[30px] bottom-[10px]">
                        {bFastImg &&
                            <>
                                <img src={leftArrow} className="w-[20px] h-[20px]" />
                                <img src={avaToast} className="w-[200px] h-full object-cover" />
                                <img src={chileQuilles} className="w-[200px] h-full object-cover" />
                                <img src={yogurt} className="w-[200px] h-full object-cover" />
                                <img src={rightArrow} className="w-[20px] h-[20px]" />
                            </>
                        }
                        {lunchImg &&
                            <>
                                <img src={leftArrow} className="w-[20px] h-[20px]" />
                                <img src={turkeyWrap} className="w-[200px] h-full object-cover" />
                                <img src={beef} className="w-[200px] h-full object-cover" />
                                <img src={burger} className="w-[200px] h-full object-cover" />
                                <img src={rightArrow} className="w-[20px] h-[20px]" />
                            </>
                        }
                    </div>

                </div>
            </section>

            <section>
                <div>
                    <RandPage />
                </div>
            </section>
        </div>
    )
}

export default MenuPage;