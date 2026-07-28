"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <Navbar />
      
      <main className="flex-1 w-full bg-white text-black">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        >
          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 z-0"
          >
            <div
              className="absolute inset-0 bg-black/40 z-10"
              aria-hidden="true"
            />
            <img
              src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=2000"
              alt="Campervan in nature"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            style={{ y: textY }}
            className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
              UK High-Top &<br /> Elevating Camper Van Roofs
            </h1>
            <p className="text-lg md:text-xl text-neutral-200 max-w-2xl">
              Drivelodge designs, manufactures, and installs high-top and elevating roofs for camper van conversions. Proudly built in Yorkshire, with 30+ years of expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/products"
                className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors"
              >
                View Products
              </Link>
              <Link
                href="/process"
                className="px-8 py-4 bg-transparent border border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Our Process
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Feature Section: Products */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Premium Roof Conversions
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
              Engineered for durability and designed for comfort. Explore our range of elevated and high-top roofs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/products?roof=Elevated+Roof" className="group block relative overflow-hidden rounded-3xl h-[500px]">
              <img
                src="https://cdn.prod.website-files.com/675171b75e69f27843937162/677ba002665a743fe16806ae_Elevated%20Roof.webp"
                alt="Elevated Roof"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">Elevated Roofs</h3>
                <p className="text-neutral-200 mb-6">Browse our front and rear elevating roofs by make and model.</p>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-black group-hover:scale-110 transition-transform">
                  &rarr;
                </div>
              </div>
            </Link>

            <Link href="/products?roof=High+Top+Roof" className="group block relative overflow-hidden rounded-3xl h-[500px]">
              <img
                src="https://cdn.prod.website-files.com/675171b75e69f27843937162/678a3c3f728be60c99b89609_High-top%20Roof.webp"
                alt="High-Top Roof"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">High-Top Roofs</h3>
                <p className="text-neutral-200 mb-6">Browse high top roof conversions by make and model.</p>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-black group-hover:scale-110 transition-transform">
                  &rarr;
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Quality Section */}
        <section className="bg-neutral-50 py-24 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Built in Yorkshire, Trusted Nationwide.
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                For over 30 years, Drivelodge has been at the forefront of camper van roof manufacturing. We use only the highest quality materials and state-of-the-art engineering to ensure your roof stands the test of time.
              </p>
              <ul className="space-y-4">
                {[
                  "Over 30 years of manufacturing excellence",
                  "M1 pull tested beds and safety standards",
                  "5-year comprehensive warranty",
                  "Network of approved fitters nationwide"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg font-medium">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-block mt-4 px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-neutral-800 transition-colors"
              >
                More About Us
              </Link>
            </div>
            <div className="relative h-[600px] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1513311068348-19c8fbdc0bb6?auto=format&fit=crop&q=80&w=1000"
                alt="Manufacturing Quality"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
