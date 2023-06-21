import { useEffect, useState } from "react";
import { db, storage } from "../config/firebase"
import { doc, addDoc, collection } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import BreakfastMenuItem from "../components/breakfastMenuItem";

const AdminLandingView = () => {
    const [menuItemName, setMenuItemName] = useState("")
    const [menuItemDesc, setMenuItemDesc] = useState("")
    const [menuItemImg, setMenuItemImg] = useState(null)
    const [menuItemImgRef, setMenuItemImgRef] = useState("")

    useEffect(() => {
        const uploadMenuItemImg = () => {
            const name = new Date().getTime() + menuItemImg.name
            const itemImgRef = ref(storage, `menuItemImgs/${name}` )

            const uploadTask = uploadBytesResumable(itemImgRef, menuItemImg);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setMenuItemImgRef(downloadURL)
                    });
                }
            );
        }
        menuItemImg && uploadMenuItemImg();
        
    }, [menuItemImg])

    const handleAdd = async (e) => {
        e.preventDefault()
        // Add a new document in collection "cities"
        await addDoc(collection(db, "breakfastMenuItems"), {
            menuItemName: menuItemName,
            menuItemDescription: menuItemDesc,
            menuItemImg: menuItemImgRef,
        });
    }
    

    return (
        <div>
            <h1>welcome to admin page</h1>

            <h1 className="underline text-sky-600">logout</h1>


            <div>
                <BreakfastMenuItem/>
            </div>
        </div>
    )
}
export default AdminLandingView;