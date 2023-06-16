

const MenuSidebar = () => {

    const options = [
        { name: "Breakfast" },
        { name: "Lunch" },
        { name: "Dessert" }
    ]

    return (
        <div className="w-[170px] h-full bg-slate-800 flex flex-col p-2 justify-center">
            <div className="w-full h-content bg-red-200">
                {options.map((name, i) => (
                    <div key={i}>
                        <h1 className="text-white text-2xl p-4">{name.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MenuSidebar;