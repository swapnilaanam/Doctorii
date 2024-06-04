import Footer from "@/components/Footer/Footer"
import Navbar from "@/components/Navbar/Navbar"
import React from "react";

export const metadata = {
    title: 'Doctorii | Home'
};

const WithNavbarLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div>{children}</div>
            <Footer />
        </>
    )
}

export default WithNavbarLayout;