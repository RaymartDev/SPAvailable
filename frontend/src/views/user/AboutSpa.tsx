import SpaDetails from "../../components/SpaDetails";
import Services from "../../components/Services";
import Products from "../../components/Prducts";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import Logo from "../../img/logo.png";
import DefaulPp from "../../img/defaultPp.png";
import Image11 from "../../img/image11.png";

const AboutSpa = () => {
    return ( 
        <>
            <div className="max-w-screen-2xl mx-auto px-4">
                <div className="flex sticky top-0 justify-between items-center py-2 md:py-4 z-20 bg-white px-5 shadow-lg ">
                    <div className="flex items-center">
                        <div className="mr-2">
                            <img src={Logo} className="size-16 md:size-14" alt="Logo"/>
                        </div>
                        <h1 className="flex text-2xl md:text-3xl font-bold text-[#05bc64]">SPA<h1 className="text-neutral-950">vailable</h1> </h1>
                    </div>
                    <div className="flex items-center">
                        <div>
                            <img src={DefaulPp} className="size-12" />
                        </div>
                    </div>
                </div>

                <div className="flex relative h-[450px] md:h-[748px] z-10">
                    <img src={Image11} className="object-cover h-full w-full"/>
                    <div className="absolute flex flex-col top-0 left-0 justify-center items-center h-full w-full">
                        <h1 className="font-bold text-slate-50 text-5xl text-center md:text-8xl italic">"You Oasis Of Relaxation"</h1>
                    </div>
                </div>

               <SpaDetails />

               <div>
                    <div>
                        <h1>Our Services</h1>
                    </div>
                    <Services />
               </div>
               
               <div>
                    <div>
                        <h1>Products</h1>
                    </div>
                    <Products />
               </div>

                <Menu />
                <Footer />
            </div>
        </>
    );
}
 
export default AboutSpa;