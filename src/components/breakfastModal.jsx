import { useEffect, useState } from "react";
import { doc, getDocs, collection, arrayRemove } from "firebase/firestore"
import { db } from "../config/firebase"


const BreakfastCarousel = () => {
    const [breakfastData, setBreakfastData] = useState({})
    const [activeSet, setActiveSet] = useState([])

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
        
        const createActiveSet = ( ) => {
            if(Object.keys(breakfastData).length == 0){
                
            } else {
                console.log("yes")
            }
        }
        createActiveSet()

        
    }, [])

    const pizzaSlice = () =>{
        setActiveSet(breakfastData.slice(0,3))
    }
    console.log(breakfastData)
    console.log(activeSet)
    return (
        <div>
            <button onClick={pizzaSlice}>Slice</button>
        </div>
    )
}

export default BreakfastCarousel;