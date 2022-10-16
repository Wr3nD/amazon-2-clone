import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
const checkout = () => {
    const items = useSelector(selectItems);
    const { data: session } = useSession();
    const total = useSelector(selectTotal);
    return (
        <div className="bg-gray-100">
            <Header />

            <main className="lg:flex max-w-screen-2xl mx-auto ">
                {/* left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit="contain"
                    />

                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">
                            {items.length === 0
                                ? "Your amazon basket is empty "
                                : "Shopping basket"}
                        </h1>
                    </div>
                    {items.map((item, i) => {
                        const {
                            id,
                            title,
                            price,
                            description,
                            category,
                            image,
                            hasPrime,
                            rating,
                        } = item;
                        return (
                            <CheckoutProduct
                                key={i}
                                id={id}
                                title={title}
                                rating={rating}
                                price={price}
                                description={description}
                                category={category}
                                image={image}
                                hasPrime={hasPrime}
                            />
                        );
                    })}
                </div>
                {/* right */}
                <div className="flex flex-col bg-white p-10 shadow-md">
                    {items.length > 0 && (
                        <>
                            <h2 className="whitespace-nowrap">
                                Subtotal ({items.length} items):
                                <span className="font-bold">
                                    <Currency quantity={total} currency="USD" />
                                </span>
                            </h2>
                            <button
                                disabled={!session}
                                className={`button mt-2 ${
                                    !session &&
                                    "from-gray-300 to-gray-500 border-gray-200 text-gray-300"
                                }`}
                            >
                                {!session
                                    ? "Sign in to checkout"
                                    : "Proceed to checkout"}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default checkout;
