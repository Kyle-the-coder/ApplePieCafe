import BreakfastMenuItem from "../components/breakfastMenuItem";
import LunchMenuItems from "../components/lunchMenuItems";
const AdminLandingView = () => {


    return (
        <div>
            <h1>welcome to admin page</h1>

            <h1 className="underline text-sky-600">logout</h1>


            <div className="w-full flex justify-center justify-evenly">
                <BreakfastMenuItem />
                <LunchMenuItems />
            </div>
        </div>
    )
}
export default AdminLandingView;