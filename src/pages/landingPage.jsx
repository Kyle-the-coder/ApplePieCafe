import applePie from "../assets/images/apphoto.jpeg"

const LandingPage = () =>{
    return(
        <div>
            <div className="w-full h-[500px]">
                <img src={applePie} className="w-full h-[500px] object-cover"/>
            </div>
            <h1>landing page restuarant</h1>
        </div>
    )
}

export default LandingPage;