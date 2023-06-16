import fruits from "../assets/images/fruits1.jpeg"
import MenuSidebar from "../components/menuSidebar";

const MenuPage = () => {
    return (
        <div>
            {/* Title Section */}
            <section>
                <div className="bg-gradient-to-r from-orange-200 to-red-400 relative flex w-full justify-center items-center h-[200px] mb-5 mt-5">
                    <h1 className="fontWriting text-7xl font-bold ">Menu</h1>
                    <img className="w-full h-full object-cover absolute  mix-blend-overlay" src={fruits} />
                </div>
            </section>

            {/* Menu Section */}
            <section>
                <div className="w-full bg-slate-200 h-[600px] flex">
                    <div>
                        <MenuSidebar/>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MenuPage;