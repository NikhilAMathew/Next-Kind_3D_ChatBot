import { Header } from "@/components/Header";
import React from "react";
import Image from "next/image"; 
import { text } from "stream/consumers";

const Docs = () => {
    return (
        <>
            <Header />
            <main className="docs-main">
                <div className="content-wrapper">
                    {/* <h1 className="docs-title">Documentation</h1> */}
                    <div className="docs-content">
                        <div className="docs-image">
                            <Image 
                                src="/avatar.png" 
                                alt="Avatar" 
                                width={370} 
                                height={260} 
                                className="avatar-image" 
                            />
                        </div>
                        <p className="docs-description">
                            Welcome to our <b>Next-Kind 3D-AI chatbot</b>, powered by Next.js and the GROQ API, designed to provide you with seamless and interactive communication. Our chatbot is more than just a simple tool – it’s a smart, responsive, and user-friendly assistant built with cutting-edge technologies to enhance your digital experience.
                            <br /><br />
                            For more information, Visit: 
                            <br />
                            <a href="#" className="docs-link">https://3d-chatbot.vercel.app/docs/</a>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Docs;
