"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const clients = [
  { name: "Household Properties", src: "/client-logos/household-properties.png", width: 250, height: 88 },
  { name: "Civium", src: "/client-logos/civium.svg", width: 158, height: 29 },
  { name: "LUNA Management", src: "/client-logos/luna.png", width: 130, height: 48 },
  { name: "Vital Strata Management", src: "/client-logos/vital-strata.png", width: 400, height: 400, className: "is-square" },
  { name: "Netstrata", src: "/client-logos/netstrata.svg", width: 240, height: 68, className: "is-inverted" },
  { name: "Get Strata", src: "/client-logos/get-strata.png", width: 135, height: 72, className: "is-inverted" },
  { name: "Cambridge Lodge", src: "/client-logos/cambridge-lodge.jpg", width: 296, height: 90 },
  { name: "Strathfield Partners", src: "/client-logos/strathfield-partners.png", width: 500, height: 221 },
  { name: "Arriva", src: "/client-logos/arriva.svg", width: 131, height: 39 },
  // Adding 3 duplicated clients to balance out the grid
  { name: "Household Properties", src: "/client-logos/household-properties.png", width: 250, height: 88 },
  { name: "Civium", src: "/client-logos/civium.svg", width: 158, height: 29 },
  { name: "LUNA Management", src: "/client-logos/luna.png", width: 130, height: 48 },
];

export default function Testimonials() {
  return (
    <section id="clients" className="py-12 bg-[#F8F9FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="heading-style text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Clients
          </h2>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-items-center mb-12">
          {clients.map((client, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="w-full flex justify-center items-center h-20 md:h-24 p-4"
            >
              <Image
                src={client.src}
                alt={client.name}
                width={client.width}
                height={client.height}
                className={`w-auto h-full object-contain ${client.className || ""}`}
                quality={100}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
