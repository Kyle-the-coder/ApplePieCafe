import { useState } from "react";
import {db} from "../config/firebase"
import {doc, setDoc} from "firebase/firestore"

const AdminLandingView = () => {
    const [menuItemName, setMenuItemName] = useState()
    const [menuItemDesc, setMenuItemDesc] = useState()
    const [menuItemImg, setMenuItemImg] = useState()

    const handleAdd = async(e) => {
        e.preventDefault()
        // Add a new document in collection "cities"
        await setDoc(doc(db, "menuItems", process.env.REACT_APP_DOC_ID), {
            menuItemName: menuItemName,
            menuItemDescription: menuItemDesc,
            menuItemImg: menuItemImg,
        });
    }
    return (
        <div>
            <h1>welcome to admin page</h1>

            <h1 className="underline text-sky-600">logout</h1>

            <div className="w-full flex justify-center">
                <div className="w-[400px] flex flex-col bg-slate-800 text-white px-4 py-6">
                    <form className="flex-col flex" onSubmit={handleAdd}>
                        <h1 className="fontWriting">Add a Menu Item</h1>
                        <div className="w-full my-2">
                            <label className="mb-2">Menu Item Name:</label>
                            <input type="text" className="w-full text-black" onChange={(e) => { setMenuItemName(e.target.value) }} />
                        </div>
                        <div className="w-full my-2">
                            <label className="mb-2">Menu Item Description:</label>
                            <textarea rows="10" col="12" type="text" className="w-full text-black" onChange={(e) => { setMenuItemDesc(e.target.value) }} />
                        </div>
                        <div className="w-full my-2">
                            <label className="mb-2">Menu Item Photo:</label>
                            <input type="file" onChange={(e) => { setMenuItemImg(e.target.value) }} />
                        </div>
                        <div>
                            <button type="submit" className="bg-orange-200 text-black px-3 py-1 mt-5">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AdminLandingView;