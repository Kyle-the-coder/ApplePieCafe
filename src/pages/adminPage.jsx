import "../styles/font.css"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../config/firebase"
import { useNavigate } from "react-router-dom";


const AdminPage = () => {
    const [error, setError] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigate("/adminLp")
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message
                setError(true)
                // ..
            });
    }

    const handleError = () => {
        setError(false)
    }

    return (
        <div>
            <div className="w-full h-[500px] flex justify-center items-center">
                <div className="w-[600px] h-[380px] py-4 bg-slate-200 border border-[2px] border-slate-900">
                    <div className="w-full ">
                        <h1 className="fontWriting text-4xl">Admin Login</h1>
                    </div>
                    <div className="flex justify-center mt-6">
                        <form onSubmit={handleLogin} className="flex flex-col items-center">
                            <input type="text" onClick={handleError} onChange={(e) => setUserEmail(e.target.value)} placeholder="email..." className="w-[450px] p-2 border border-1 border-slate-900" />
                            <input type="password" onClick={handleError} onChange={(e) => setUserPassword(e.target.value)} placeholder="password..." className="w-[450px] p-2 mt-4 border border-1 border-slate-900" />
                            <button type="submit" className="py-2 px-3 w-[200px] mt-5 bg-slate-900 text-white">Login</button>
                            {error && <h1 className="mt-4 text-red-600 font-bold">Wrong Email or Password</h1>}
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminPage;