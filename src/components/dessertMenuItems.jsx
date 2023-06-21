import { useEffect, useState } from "react";
import { db, storage } from "../config/firebase"
import { doc, addDoc, collection } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

const DessertMenuItems = () => {
    const [menuItemName, setMenuItemName] = useState("")
    const [menuItemDesc, setMenuItemDesc] = useState("")
    const [menuItemImg, setMenuItemImg] = useState(null)
    const [menuItemImgRef, setMenuItemImgRef] = useState("")

    useEffect(() => {
        const uploadMenuItemImg = () => {
            const name = new Date().getTime() + menuItemImg.name
            const itemImgRef = ref(storage, `dessertMenuItemImgs/${name}`)

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
        await addDoc(collection(db, "dessertMenuItems"), {
            menuItemName: menuItemName,
            menuItemDescription: menuItemDesc,
            menuItemImg: menuItemImgRef,
        });
    }

    return (
        <div>
            <div className="w-full flex justify-center">
                <div className="w-[400px] flex flex-col bg-red-900 text-white px-4 py-6">
                    <form className="flex-col flex" onSubmit={handleAdd}>
                        <h1 className="fontWriting">Add a Dessert Menu Item</h1>
                        <div className="w-full my-2">
                            <label className="mb-2">Menu Item Name:</label>
                            <input type="text" className="w-full text-black px-2 py-1" onChange={(e) => { setMenuItemName(e.target.value) }} />
                        </div>
                        <div className="w-full my-2">
                            <label className="mb-2">Menu Item Description:</label>
                            <textarea rows="10" col="12" type="text" className="w-full text-black px-2 py-1" onChange={(e) => { setMenuItemDesc(e.target.value) }} />
                        </div>
                        <div className="w-full my-2">
                            <label className="mb-2">Menu Item Photo:</label>
                            <input type="file" onChange={(e) => { setMenuItemImg(e.target.files[0]) }} />
                        </div>
                        <div>
                            <button type="submit" className="bg-slate-800 text-white px-3 py-1 mt-5">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DessertMenuItems;