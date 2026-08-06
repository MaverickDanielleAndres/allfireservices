"use client";

import Image from "next/image";
import styles from "@/components/HomeStoryLegacy.module.css";

const clients = [
  { name: "Household Properties", src: "/client-logos/household-properties.png", width: 250, height: 88 },
  { name: "Civium", src: "/client-logos/civium.svg", width: 158, height: 29 },
  { name: "LUNA Management", src: "/client-logos/luna.png", width: 130, height: 48 },
  { name: "Vital Strata Management", src: "/client-logos/vital-strata.png", width: 400, height: 400, className: "has-bg" },
  { name: "Netstrata", src: "/client-logos/netstrata.svg", width: 240, height: 68 },
  { name: "Get Strata", src: "/client-logos/get-strata.png", width: 135, height: 72 },
  { name: "Cambridge Lodge", src: "/client-logos/cambridge-lodge.jpg", width: 296, height: 90, className: "has-bg" },
  { name: "Strathfield Partners", src: "https://www.strathfieldpartners.com.au/wp-content/uploads/2020/11/cropped-logosp.png", width: 500, height: 221, className: "has-bg" },
  { name: "Arriva", src: "/client-logos/arriva.svg", width: 131, height: 39 },
  // Adding 3 duplicated clients to balance out the grid dynamically
  { name: "Household Properties", src: "/client-logos/household-properties.png", width: 250, height: 88 },
  { name: "Civium", src: "/client-logos/civium.svg", width: 158, height: 29 },
  { name: "LUNA Management", src: "/client-logos/luna.png", width: 130, height: 48 },
];

export default function ClientGrid() {
  return (
    <section className="bg-white" data-theme="light">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large pb-0 lg:pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
            
            {/* Left Column: Text */}
            <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left">
              <p className={styles.kicker} style={{ color: '#fb5614', fontWeight: 600 }}>
                TRUSTED BY
              </p>
              <h2 style={{ 
                margin: 0,
                color: '#111111',
                fontSize: 'clamp(2.8rem, 5.8vw, 4.5rem)',
                fontWeight: 780,
                letterSpacing: '-0.06em',
                lineHeight: 0.92,
                textWrap: 'balance'
              }}>
                Greater Sydney's <span style={{ color: '#fb5614' }}>Property Managers</span>
              </h2>
            </div>

            {/* Right Column: Logos */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16 items-center justify-items-center">
              {clients.map((client, index) => {
                // Determine styling based on image type
                let filterClass = "filter brightness-0 opacity-90"; // Default for transparent PNG/SVG
                let blendMode = {};
                
                if (client.className === "has-bg") {
                  filterClass = "filter grayscale contrast-125 opacity-90";
                  blendMode = { mixBlendMode: 'multiply' };
                }

                return (
                  <div key={index} className="flex items-center justify-center w-full h-16 md:h-20 px-4">
                    {client.src.startsWith("http") ? (
                      <img
                        src={client.src}
                        alt={client.name}
                        width={client.width}
                        height={client.height}
                        className={`w-auto h-full max-w-full object-contain ${filterClass}`}
                        style={blendMode}
                      />
                    ) : (
                      <Image
                        src={client.src}
                        alt={client.name}
                        width={client.width}
                        height={client.height}
                        className={`w-auto h-full max-w-full object-contain ${filterClass}`}
                        style={blendMode}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
