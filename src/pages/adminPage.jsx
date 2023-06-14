import "../styles/font.css"

const AdminPage = () => {
    return(
        <div>
            <div className="w-full h-[500px] flex justify-center items-center">
                <div className="w-[600px] h-content py-4 bg-slate-200 border border-[2px] border-slate-900">
                    <div className="w-full ">
                        <h1 className="fontWriting text-4xl">Admin Login</h1>
                    </div>
                    <div className="flex justify-center mt-6">
                        <form className="flex flex-col items-center">
                            <input type="text" placeholder="email..." className="w-[450px] p-2 border border-1 border-slate-900" />
                            <input type="password" placeholder="password..." className="w-[450px] p-2 mt-4 border border-1 border-slate-900"/>
                            <button type="submit" className="py-2 px-3 w-[200px] mt-5 bg-slate-900 text-white">Login</button>
                        </form> 
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminPage;