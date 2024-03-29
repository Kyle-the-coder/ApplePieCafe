import APLogo from "../assets/images/ApcWhite.PNG"
import { Link } from "react-router-dom"
import "../styles/bgColors.css"

const APNavbar = () => {
    return (
        <div className="w-full darkBg h-[270px] flex items-center justify-between">
            <div>
                <img src={APLogo} className="w-[200px] ml-[60px]" />
            </div>

            <div className="flex justify-evenly w-[500px] fontWriting text-2xl text-white">
                <Link to="/">Home</Link>
                <Link to="/admin">Admin</Link>
            </div>

        </div>
    )
}

export default APNavbar;