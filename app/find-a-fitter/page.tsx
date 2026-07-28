import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FindFitterPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-white text-black pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Find an Approved Fitter
          </h1>
          <p className="text-xl text-neutral-600 mb-12">
            We have a nationwide network of approved fitters trained to install Drivelodge roofs to the highest standards.
          </p>

          <div className="bg-neutral-50 rounded-3xl p-8 md:p-12 text-left shadow-sm border border-neutral-100">
            <h2 className="text-2xl font-bold mb-6">Search Fitters</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter your postcode or city"
                className="flex-1 px-6 py-4 rounded-full border border-neutral-300 focus:outline-none focus:border-black transition-colors"
              />
              <button className="px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-neutral-800 transition-colors">
                Search
              </button>
            </div>
            
            <div className="mt-12">
              <p className="text-neutral-500 italic text-center">Interactive map and fitter results would appear here.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

