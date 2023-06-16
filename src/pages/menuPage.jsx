import fruits from "../assets/images/fruits1.jpeg"
import MenuSidebar from "../components/menuSidebar";
import bfast1 from "../assets/images/bfast1.jpeg"
import bfast2 from "../assets/images/bfast2.jpeg"
import lunch1 from "../assets/images/lunch1.webp"
import bdessert from "../assets/images/bdessert1.webp"
import { useState } from "react";

const MenuPage = () => {
    const [bFastImg, setBFastImg]= useState(false)
    const [lunchImg, setLunchImg]= useState(false)
    const [dessertImg, setDessertImg]=useState(false)

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
                <div className="w-full bg-slate-200 h-[600px] flex ">
                    <div>
                        <MenuSidebar 
                        bFastImg={bFastImg} setBFastImg={setBFastImg}
                        lunchImg={lunchImg} setLunchImg={setLunchImg}
                        dessertImg={dessertImg} setDessertImg={setDessertImg}
                        />
                    </div>
                    <div>
                        {bFastImg &&  <img src={bfast2} className="w-[800px] transition-all duration-200 h-full object-cover" />}
                        {lunchImg && <img src={lunch1} className="w-[800px] h-full object-cover"  />}
                        {dessertImg && <img src={bdessert} className="w-[800px] h-full object-cover" />}
                    </div>

                </div>
            </section>
        </div>
    )
}

export default MenuPage;