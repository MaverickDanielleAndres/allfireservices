"use client";

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
  // Adding 3 duplicated clients to balance out the grid dynamically
  { name: "Household Properties", src: "/client-logos/household-properties.png", width: 250, height: 88 },
  { name: "Civium", src: "/client-logos/civium.svg", width: 158, height: 29 },
  { name: "LUNA Management", src: "/client-logos/luna.png", width: 130, height: 48 },
];

export default function ClientGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header moved to page hero */}
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16 items-center justify-items-center">
          {clients.map((client, index) => (
            <div key={index} className="flex items-center justify-center w-full h-20 md:h-24 px-4">
              <Image
                src={client.src}
                alt={client.name}
                width={client.width}
                height={client.height}
                className={`w-auto h-full max-w-full object-contain ${
                  client.className === "is-inverted" ? "filter brightness-0" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
