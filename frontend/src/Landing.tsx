import React, { useState } from "react";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignUpModal";
import Logo from "../src/img/logo.png";
import Suite from "../src/img/suite.png";
import Image1 from "../src/img/image1.png";
import Image2 from "../src/img/image2.png";
import Image3 from "../src/img/image3.png";
import Image4 from "../src/img/image4.png";
import Image5 from "../src/img/image5.png";
import Image6 from "../src/img/image6.png";
import Image7 from "../src/img/image7.png";
import Image8 from "../src/img/image8.png";
import Image9 from "../src/img/image9.png";
import Menu from "../src/components/Menu";
import Footer from "./components/Footer";

const Landing: React.FC = () => {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openSignUpModal, setOpenSignUpModal] = useState(false);

    const switchToSignUp = () => {
        setOpenLoginModal(false);
        setOpenSignUpModal(true);
    };

    const switchToLogIn = () => {
        setOpenLoginModal(true);
        setOpenSignUpModal(false);
    };

    return (
        <>
            <div className="max-w-screen-2xl mx-auto px-4 ">
                <div className="flex sticky top-0 justify-between items-center py-2 md:py-4 z-20 bg-white px-5 shadow-lg ">
                    <div className="flex items-center">
                        <div className="mr-2">
                            <img src={Logo} className="size-16 md:size-14" alt="Logo"/>
                        </div>
                        <h1 className="flex text-2xl md:text-3xl font-bold text-[#05bc64]">SPA<h1 className="text-neutral-950">vailable</h1> </h1>
                    </div>
                    <div className="flex items-center">
                        <button onClick={() => setOpenLoginModal(true)} className="mr-5 font-bold hover:rounded p-3 hover:bg-[#41924B] hover:text-slate-50 duration-200">Login</button>
                        <LoginModal open={openLoginModal} onClose={() => setOpenLoginModal(false)} onSwitchToSignUp={switchToSignUp} />
                        <button onClick={() => setOpenSignUpModal(true)} className="font-bold hover:rounded p-3 hover:bg-[#41924B] hover:text-slate-50 duration-200">Sign Up</button>
                        <SignUpModal open={openSignUpModal} onClose={() => setOpenSignUpModal(false)} onSwitchToLogin={switchToLogIn} />
                    </div>
                </div>

                <div className="flex relative md:h-[602px]">
                    <img src={Suite} alt="Suite" className="object-cover h-full w-full" />
                    <div className="absolute flex items-center justify-center top-0 left-0 w-full h-full z-10">
                        <h1 className="font-bold text-slate-50 text-4xl md:text-6xl text-center">FIND SPA NEAR YOU</h1>
                    </div>
                </div>
                
                <div className="py-8 md:py-12 bg-white">
                    <div className="flex flex-col ">
                        <div className="flex justify-center items-center mb-6">
                            <h1 className="text-xl md:text-2xl">MASSAGE, AESTHETICS, WELLNESS & VITALITY</h1>
                        </div>
                        <div className="flex mb-10 text-center  justify-center items-center">
                            <p className="w-3/5 md:w-3/5">Spavailable featured establishments provide a comprehensive range of services
                                and classes aimed at promoting your well-being, mindfulness, and beauty. 
                                Whether it's yoga or barre workouts, indulgent facials, or advanced 
                                treatments like laser hair removal, our diverse network of spas has it all. 
                            </p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center bg-[#41924B] p-5">
                                <h1 className="text-xl md:text-3xl text-slate-50 font-bold">FIND A MASSAGE</h1>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
                                <div className="card hover:shadow-lg">
                                    <div className="flex flex-col w-full h-full justify-center items-center cursor-pointer p-5">
                                        <img src={Image1} className="object-cover w-full h-full rounded-3xl"/>                      
                                        <p className="md:text-xl text-lg my-2">Massage</p>
                                    </div>
                                </div>

                                <div className="card hover:shadow-lg">
                                    <div className="flex flex-col w-full h-full justify-center items-center cursor-pointer p-5">
                                        <img src={Image2} className="object-cover w-full h-full rounded-3xl"/>
                                        <p className="md:text-xl text-lg my-2">Couple Massage</p>
                                    </div>
                                </div>


                                <div className="card hover:shadow-lg">
                                    <div className="flex flex-col w-full h-full justify-center items-center cursor-pointer p-5">
                                        <img src={Image3} className="object-cover w-full h-full rounded-3xl"/>
                                        <p className="md:text-xl text-lg my-2">Ayurveda</p>
                                    </div>
                                </div>

                                <div className="card hover:shadow-lg">
                                    <div className="flex flex-col w-full h-full justify-center items-center cursor-pointer p-5">
                                        <img src={Image4} className="object-cover w-full h-full rounded-3xl"/>
                                        <p className="md:text-xl text-lg my-2">Hot Stone Massage</p>
                                    </div>
                                </div>

                                <div className="card hover:shadow-lg">
                                    <div className="flex flex-col w-full h-full justify-center items-center cursor-pointer p-5">
                                        <img src={Image5} className="object-cover w-full h-full rounded-3xl"/>
                                        <p className="md:text-xl text-lg my-2">Aromatherapy</p>
                                    </div>
                                </div>

                                <div className="card hover:shadow-lg">
                                    <div className="flex flex-col w-full h-full justify-center items-center cursor-pointer p-5">
                                        <img src={Image6} className="object-cover w-full h-full rounded-3xl"/>
                                        <p className="md:text-xl text-lg my-2">Deep Tissue Massage</p>
                                    </div>
                                </div>

                                <div className="card hover:shadow-lg">
                                    <div className="flex flex-col w-full h-full justify-center items-center cursor-pointer p-5">
                                        <img src={Image7} className="object-cover w-full h-full rounded-3xl"/>
                                        <p className="md:text-xl text-lg my-2">Facial</p>
                                    </div>
                                </div>

                                <div className="card hover:shadow-lg">
                                    <div className="flex flex-col w-full h-full justify-center items-center cursor-pointer p-5">
                                        <img src={Image8} className="object-cover w-full h-full rounded-3xl"/>
                                        <p className="md:text-xl text-lg my-2">Acne Facial</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col">
                        <div className="w-full md:h-[602px]">
                            <img src={Image9} alt="Image9" className=" object-cover w-full h-full" />
                        </div>
                        
                        <div className="flex bg-[#41924B] h-52 justify-center items-center">
                            <p className="font-bold text-center w-3/5 text-4xl md:text-6xl text-slate-50">
                                YOUR RELAXATION AWAITS.
                            </p> 
                        </div>
                    </div>
                </div>

                <Menu />
                <Footer />
            </div>
        </>
    );
}

export default Landing;
