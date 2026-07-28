import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-white text-black pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-neutral-600 mb-12">
              Have a question about our roofs or want to discuss a custom build? We're here to help.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-lg mb-2">Address</h3>
                <p className="text-neutral-600">
                  Drivelodge Motorhomes Ltd<br />
                  Yorkshire, UK
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Contact Info</h3>
                <p className="text-neutral-600">
                  Email: info@drivelodge.co.uk<br />
                  Phone: +44 1234 567890
                </p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 p-8 md:p-12 rounded-3xl border border-neutral-100">
            <form className="space-y-6 flex flex-col">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:border-black"></textarea>
              </div>
              <button type="button" className="px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-neutral-800 transition-colors self-start">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
