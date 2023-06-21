import { useEffect, useState } from "react";
import { db, storage } from "../config/firebase"
import { doc, addDoc, collection } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"


const BreakfastMenuItem = () => {
    const [menuItemName, setMenuItemName] = useState("")
    const [menuItemDesc, setMenuItemDesc] = useState("")
    const [menuItemImg, setMenuItemImg] = useState(null)
    const [menuItemImgRef, setMenuItemImgRef] = useState("")


    
    return(
        <div>

        </div>
    )
}

export default BreakfastMenuItem;