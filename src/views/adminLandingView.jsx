import { useEffect, useState } from "react";
import { db, storage } from "../config/firebase"
import { doc, addDoc, collection } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

const AdminLandingView = () => {
    const [menuItemName, setMenuItemName] = useState("")
    const [menuItemDesc, setMenuItemDesc] = useState("")
    const [menuItemImg, setMenuItemImg] = useState(null)

    useEffect(() => {
        const uploadMenuItemImg = () => {
            const name = new Date().getTime() + menuItemImg.name
            const itemImgRef = ref(storage, $`menuItemImgs/{name}`)

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
                        console.log('File available at', downloadURL);
                    });
                }
            );
        }
        menuItemImg && uploadMenuItemImg();
    }, [menuItemImg])

    const handleAdd = async (e) => {
        e.preventDefault()
        // Add a new document in collection "cities"
        await addDoc(collection(db, "menuItems"), {
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
                            <input type="file" onChange={(e) => { setMenuItemImg(e.target.files[0]) }} />
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