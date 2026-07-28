import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { roof?: string };
}) {
  const isElevated = searchParams.roof === "Elevated Roof";
  const isHighTop = searchParams.roof === "High Top Roof";
  const showAll = !isElevated && !isHighTop;

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-white text-black pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Our Products
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl">
              Explore our range of premium camper van roofs, designed and manufactured in Yorkshire to the highest standards.
            </p>
          </div>

          <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
            
              All Products
            </Link>
            
              Elevated Roofs
            </Link>
            
              High-Top Roofs
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mock Products */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-80 rounded-3xl overflow-hidden bg-neutral-100 mb-6">
                  <img
                    src={
                      i % 2 === 0
                        ? "https://cdn.prod.website-files.com/675171b75e69f27843937162/677ba002665a743fe16806ae_Elevated%20Roof.webp"
                        : "https://cdn.prod.website-files.com/675171b75e69f27843937162/678a3c3f728be60c99b89609_High-top%20Roof.webp"
                    }
                    alt="Product"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">VW Transporter T5/T6</h3>
                <p className="text-neutral-600 mb-4">
                  {i % 2 === 0 ? "Elevated Roof" : "High-Top Roof"} Conversion
                </p>
                <div className="font-semibold text-black flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                  View Details <span>&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

