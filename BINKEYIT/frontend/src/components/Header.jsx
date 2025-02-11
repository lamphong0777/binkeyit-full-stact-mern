// import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";
import Search from "./Search";
import {FaRegUserCircle} from "react-icons/fa";
import {BsCart4} from "react-icons/bs";
import {useSelector} from "react-redux";
import {GoTriangleUp, GoTriangleDown} from "react-icons/go";
import UserMenu from "./UserMenu.jsx";
import {useState} from "react";
import {DisplayPriceInRupees} from "../utils/DisplayPriceInRupees.js";
import {useGlobalContext} from "../provider/GlobalProvider.jsx";
import DisplayCartItem from "./DisplayCartItem.jsx";

const Header = () => {
    const navigate = useNavigate();
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const cartItem = useSelector((state) => state.cartItem.cart);
    const { totalPrice, totalQty } = useGlobalContext();
    const [openCartSection,setOpenCartSection] = useState(false);

    const handleCloseUserMenu = () => {
        setOpenUserMenu(false)
    }

    const user = useSelector((state) => state?.user);

    const redirectToLoginPage = () => {
        navigate("/login");
    }

    const handleMobileUser = () => {
        if(!user?._id) {
            navigate("/login");
            return ;
        }
        navigate("/user-menu");
    }

    return (
        <header
            className="z-20 h-24 lg:h-20 shadow-md sticky top-0 flex flex-col items-center justify-center gap-2 p-3 bg-white">
            <div className="container mx-auto flex items-center px-2 justify-between">
                {/* Logo */}
                <div className="h-full">
                    <Link to={"/"} className="h-full flex justify-center items-center">
                        <img
                            className="hidden lg:block"
                            src={logo}
                            width={170}
                            height={60}
                            alt="Logo"
                        />
                        <img
                            className="lg:hidden"
                            src={logo}
                            width={120}
                            height={60}
                            alt="Logo"
                        />
                    </Link>
                </div>
                {/* Search */}
                <div className="hidden lg:block">
                    <Search/>
                </div>
                {/* Login and my cart */}
                <div>
                    {/* mobile login and cart */}
                    <button className="lg:hidden text-neutral-500" onClick={handleMobileUser}>
                        <FaRegUserCircle size={26} className=""/>
                    </button>
                    {/* Desktop login and cart*/}
                    <div className="hidden lg:flex items-center gap-4">
                        {
                            user?._id ? (
                                <div className={'relative'}>
                                    <div onClick={() => setOpenUserMenu(preve => !preve)}
                                         className='flex select-none items-center gap-1 cursor-pointer'>
                                        <p>Account</p>
                                        {
                                            openUserMenu ? (
                                                <GoTriangleUp size={25}/>
                                            ) : (
                                                <GoTriangleDown size={25}/>
                                            )
                                        }

                                    </div>
                                    {
                                        openUserMenu && (
                                            <div className='absolute right-0 top-12'>
                                                <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                                    <UserMenu close={handleCloseUserMenu}/>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            ) : (
                                <button onClick={redirectToLoginPage} className={''}>Login</button>
                            )
                        }
                        {/* Cart */}
                        <button
                            onClick={() => setOpenCartSection(true)}
                            className={'flex items-center justify-center gap-2 bg-green-700 px-3 py-3 rounded text-white hover:bg-green-800'}>
                            <div className={'animate-bounce'}>
                                <BsCart4 size={26}/>
                            </div>
                            <div className={'font-semibold text-sm'}>
                                {
                                    cartItem[0] ? (
                                        <div>
                                            <p>{totalQty} Items</p>
                                            <p>{DisplayPriceInRupees(totalPrice)}</p>
                                        </div>
                                    ) : (
                                        <p>My cart</p>
                                    )
                                }
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="lg:hidden container mx-auto px-2">
                <Search/>
            </div>
            {
                openCartSection && (
                    <DisplayCartItem close={()=>setOpenCartSection(false)}/>
                )
            }
        </header>
    );
};

export default Header;
