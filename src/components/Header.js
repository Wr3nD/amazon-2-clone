import React from "react";
import Image from "next/image";
import {
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    Bars3Icon,
} from "@heroicons/react/24/outline";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
const Header = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const items = useSelector(selectItems);
    return (
        <header>
            {/* top nav */}
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
                <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                    <Image
                        onClick={() => router.push("/")}
                        src="https://links.papareact.com/f90"
                        width={150}
                        height={40}
                        objectFit="contain"
                        className="cursor-pointer"
                    />
                </div>
                {/* search element */}
                <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
                    <input
                        type="text"
                        className="flex-grow p-2 h-full w-6 rounded-l-md flex-shrink focus:outline-none px-4"
                    />
                    <MagnifyingGlassIcon className=" h-12 p-4" />
                </div>
                {/* right */}
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                    <div
                        className=" link "
                        onClick={!session ? signIn : signOut}
                    >
                        <p>
                            {" "}
                            {session
                                ? `Hello, ${session?.user.name}`
                                : "Sign in"}
                        </p>
                        <p className="font-extrabold md:text-sm">
                            Accounts and Lists
                        </p>
                    </div>
                    <div className=" link">
                        <p>Returns</p>
                        <p className="font-extrabold md:text-sm">& Orders</p>
                    </div>
                    <div
                        className="relative flex items-center link"
                        onClick={() => router.push("/checkout")}
                    >
                        <span className="absolute bg-yellow-400 top-0 right-0 md:right-10 h-4 w-4 text-center rounded-full text-black font-bold ">
                            {items.length}
                        </span>
                        <ShoppingCartIcon className="h-10" />
                        <p className="hidden md:inline font-extrabold md:text-sm mt-2">
                            Basket
                        </p>
                    </div>
                </div>
            </div>

            {/* bottom nav */}
            <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
                <p className="link flex items-center">
                    <Bars3Icon className="h-6 mr-1" />
                    All
                </p>
                <p className="link">Prime video</p>
                <p className="link">Amazon Business</p>
                <p className="link">Todays Deals</p>
                <p className="hidden lg:inline-flex link">Buy again</p>
                <p className="hidden lg:inline-flex link">Shoppers Deals</p>
                <p className="hidden lg:inline-flex link">Health & Personal </p>
            </div>
        </header>
    );
};

export default Header;
