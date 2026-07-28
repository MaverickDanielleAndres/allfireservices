import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-white text-black pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
                30 Years of Excellence.
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed mb-6">
                Based in the heart of Yorkshire, Drivelodge has been designing and manufacturing premium camper van roofs for over three decades. Our commitment to quality, safety, and innovation has made us a trusted name across the UK.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Whether you're converting a VW Transporter or a custom build, our elevating and high-top roofs provide the perfect blend of headroom, comfort, and durability.
              </p>
            </div>
            <div className="relative h-[600px] rounded-3xl overflow-hidden bg-neutral-100">
              <img
                src="https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&q=80&w=1000"
                alt="Workshop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
