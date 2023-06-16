import fruits from "../assets/images/fruits1.jpeg"

const MenuPage = () => {
    return (
        <div>
            <div className="relative flex w-full justify-center items-center h-[200px] mb-10 mt-5">
                <h1 className="fontWriting text-7xl font-bold ">Menu</h1>
                <img className="w-full h-full object-cover absolute z-[-1]" src={fruits} />
            </div>

            <div className="w-full bg-slate-200 h-[600px]">

            </div>
        </div>
    )
}

export default MenuPage;