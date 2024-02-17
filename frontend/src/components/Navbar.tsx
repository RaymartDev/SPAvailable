import Logo from "../img/logo.png"

const Navbar = () => {
    return ( 
        <div className="max-w-screen-2xl mx-auto flex sticky top-0 justify-between items-center py-2 md:py-4 z-30 bg-white shadow-lg ">
            <div className="flex items-center pl-5">
                <div className="mr-2">
                    <img src={Logo} className="size-16 md:size-14"/>
                </div>
                <h1 className="flex text-2xl md:text-3xl font-bold text-[#05bc64]">SPA<h1 className="text-neutral-950">vailable</h1> </h1>
            </div>
        </div>
    );
}
 
export default Navbar; 