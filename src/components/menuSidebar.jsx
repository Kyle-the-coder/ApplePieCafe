import { useState } from "react"

const MenuSidebar = (props) => {
    const { setLunchImgTracker } = props
    const { setDessertImgTracker } = props
    // BREAKFAST 
    const { breakfastData } = props
    const { setBFastImgTracker } = props
    const { setBFastImg } = props
    const { setBreakfastMenuItemDesc } = props
    const { setBreakfastMenuItemName } = props
    // LUNCH
    const { setLunchImg } = props
    const { setLunchMenuItemName } = props
    const { setLunchMenuItemDesc } = props
    const { lunchData } = props

    const [pingTracker, setPingTracker] = useState(false)
    const [isTimeoutComplete, setIsTimeoutComplete] = useState(false);

    const options = [
        { name: "Breakfast", idx: "1" },
        { name: "Lunch", idx: "2" },
        { name: "Dessert", idx: "3" },
    ]

    const handleOptions = (idx) => {
        if (idx == "1") {
            setBFastImgTracker(true)
            setLunchImgTracker(false)
            setDessertImgTracker(false)
            setBFastImg(breakfastData[0].menuItemImg)
            setBreakfastMenuItemDesc(breakfastData[0].menuItemDescription)
            setBreakfastMenuItemName(breakfastData[0].menuItemName)
        }
        else if (idx == "2") {
            setLunchImgTracker(true)
            setBFastImgTracker(false)
            setDessertImgTracker(false)
            setLunchImg(lunchData[0].menuItemImg)
            setLunchMenuItemName(lunchData[0].menuItemName)
            setLunchMenuItemDesc(lunchData[0].menuItemDescription)
        }
        else if (idx == "3") {
            setDessertImgTracker(true)
            setBFastImgTracker(false)
            setLunchImgTracker(false)
        }
    }

    const handlePingAnimation = (idx) => {
        setPingTracker(idx)
        setIsTimeoutComplete(true);
        const delay = 500;

        const timeoutId = setTimeout(() => {
            setIsTimeoutComplete(false);
        }, delay);

        return () => clearTimeout(timeoutId);
    }

    console.log(isTimeoutComplete)
    return (
        <div className="w-content h-full bg-slate-800 flex flex-col justify-top">
            <div className="w-full h-content">
                <div>
                    <h1 className="text-white text-2xl p-2 underline py-3 fontWriting">Options:</h1>
                </div>
                {options.map((name, i) => (
                    <div key={i} className="w-full flex flex-col items-center justify-center">
                        <h1 className={`${isTimeoutComplete && pingTracker == name.idx ? "animate-ping" : "ease-in-out"}  w-full text-slate-500 text-2xl cursor-pointer transformation-all duration-400 py-5 px-4 hover:text-slate-100`} onClick={() => (handleOptions(name.idx), handlePingAnimation(name.idx))}>{name.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MenuSidebar;