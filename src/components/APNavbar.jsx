import APLogo from "../assets/images/ApcBlack.PNG"
import { Link } from "react-router-dom"

const APNavbar = () => {
    return (
        <div className="w-full bg-slate-200 h-[270px] flex items-center justify-between">
            <div>
                <img src={APLogo} className="w-[200px] ml-[60px]" />
            </div>

            <div className="flex justify-evenly w-[500px] fontWriting text-2xl">
                <Link to="/">Home</Link>
                <Link to="/menu">Menu</Link>
                <h1>About</h1>
            </div>

        </div>
    )
}

export default APNavbar;