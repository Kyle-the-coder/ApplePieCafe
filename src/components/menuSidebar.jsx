

const MenuSidebar = () => {

    const options = [
        { name: "Breakfast" },
        { name: "Lunch" },
        { name: "Dessert" },
    ]

    return (
        <div className="w-content h-full bg-slate-800 flex flex-col justify-top">
            <div className="w-full h-content">
                <div>
                    <h1 className="text-white text-2xl p-2 underline py-3 fontWriting">Options:</h1>
                </div> 
                {options.map((name, i) => (
                    <div key={i} className="w-full flex flex-col items-center justify-center">
                        <h1 className="w-full text-slate-500 text-2xl cursor-pointer transformation-all duration-200 py-5 px-4 hover:text-slate-100">{name.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MenuSidebar;