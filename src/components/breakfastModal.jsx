import { useEffect, useState } from "react";
import { doc, getDocs, collection } from "firebase/firestore"
import { db } from "../config/firebase"


const BreakfastCarousel = () => {
    const [breakfastData, setBreakfastData] = useState({})

    useEffect(() => {
        // GET BREAKFAST DATA
        const getBreakfastData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "breakfastMenuItems"));
                const documents = querySnapshot.docs.map((doc) => doc.data());
                setBreakfastData(documents);
            } catch (error) {
                console.log(error);
            }
        };
        getBreakfastData();

    }, [])

    const items = [
        {item: "bfast1", idx: "0"},
        {item: "bfast2", idx: "1"},
        {item: "bfast3", idx: "2"}
    ]
    return (
        <div>

        </div>
    )
}

export default BreakfastCarousel;