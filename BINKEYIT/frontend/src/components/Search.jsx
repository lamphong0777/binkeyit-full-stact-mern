// import React from 'react'
import {useEffect, useState} from "react";
import {IoSearchSharp} from "react-icons/io5";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {TypeAnimation} from "react-type-animation";
import {FaArrowLeft} from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);
    const [isMobile] = useMobile();

    const params = useLocation();
    const searchText = params.search.slice(3);

    useEffect(() => {
        const isSearch = location.pathname === "/search";
        setIsSearchPage(isSearch);
    }, [location]);

    const redirectToSearchPage = () => {
        navigate("/search");
    };

    const handleOnChange = (e) => {
        const value = e.target.value;
        const url = `/search?q=${value}`;
        navigate(url);
    };

    return (
        <div
            className="w-full border min-w-[300px] lg:min-w-[420px] rounded-lg overflow-hidden flex items-center h-11 lg:h-12 text-neutral-500 bg-slate-50 group focus-within:border-primary-200 ">
            <div>
                {isMobile && isSearchPage ? (
                    <Link
                        to="/"
                        className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md"
                    >
                        <FaArrowLeft size={20}/>
                    </Link>
                ) : (
                    <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
                        <IoSearchSharp size={22}/>
                    </button>
                )}
            </div>
            <div className="w-full h-full">
                {!isSearchPage ? (
                    <div
                        onClick={redirectToSearchPage}
                        className="cursor-pointer h-full flex items-center"
                    >
                        <TypeAnimation
                            sequence={[
                                'Search "milk"',
                                1000,
                                'Search "bread"',
                                1000,
                                'Search "sugar"',
                                1000,
                                'Search "panner"',
                                1000,
                                'Search "chocolate"',
                                1000,
                                'Search "curd"',
                                1000,
                                'Search "rice"',
                                1000,
                                'Search "egg"',
                                1000,
                                'Search "chips"',
                            ]}
                            style={{fontSize: "1em"}}
                            speed={50}
                            wrapper="span"
                            repeat={Infinity}
                        />
                    </div>
                ) : (
                    <div className="w-full h-full">
                        <input
                            type="text"
                            className="bg:transparent w-full h-full outline-none"
                            placeholder="Search for products"
                            autoFocus={true}
                            defaultValue={searchText}
                            onChange={handleOnChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
