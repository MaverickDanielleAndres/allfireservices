"use client";

import { Building2, ShieldCheck, Handshake, Clock, Award, ArrowUpRight } from "lucide-react";

const sections = [
  {
    title: "Every Building. Every Industry.",
    description: "From small businesses to large commercial facilities, strata communities, industrial sites, healthcare, education and government buildings, we understand that no two properties are the same. That’s why we tailor our fire protection, compliance and maintenance solutions to meet the unique needs of every client.",
    icon: Building2,
    tags: ["Fire Protection", "Maintenance"],
  },
  {
    title: "More Than Compliance",
    description: "Fire safety isn’t just about meeting regulations. It’s about protecting people, preserving valuable assets and giving you confidence that your building is safe, compliant and ready when it matters most.",
    icon: ShieldCheck,
    tags: ["Safety", "Regulations"],
  },
  {
    title: "Partners, Not Providers",
    description: "We believe the best results come from strong relationships. Our clients rely on us for honest advice, dependable service and practical solutions that minimise disruption and support their day-to-day operations.",
    icon: Handshake,
    tags: ["Advisory", "Service"],
  },
  {
    title: "Here When You Need Us",
    description: "Whether it’s routine testing, Annual Fire Safety Statements (AFSS), preventative maintenance or urgent support, our experienced team responds promptly and works efficiently to keep your fire protection systems performing at their best.",
    icon: Clock,
    tags: ["AFSS", "Support"],
  },
  {
    title: "Confidence Comes Standard",
    description: "As a firefighter-led business, we’re committed to quality workmanship, clear communication and exceptional service. It’s why clients across Greater Sydney continue to trust AllFire to protect their people, property and peace of mind.",
    icon: Award,
    tags: ["Quality", "Sydney"],
  },
];

export default function AboutClients() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 text-center">
          <h2 className="heading-style text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Why Sydney Trusts AllFire
          </h2>
          <p className="text-gray-600 text-base">
            Delivering tailored fire safety and compliance solutions for every property type.
          </p>
        </div>

        {/* Handshake-style Grid */}
        <div className="flex flex-wrap justify-center items-stretch gap-4 lg:gap-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div 
                key={idx}
                className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1rem)] group bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-gray-200 flex flex-col hover:shadow-lg transition-all duration-300"
              >
                {/* Header: Icon + Titles */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl border border-gray-100 flex items-center justify-center text-[#FEAF04] flex-shrink-0 bg-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <Icon strokeWidth={1.5} size={28} />
                  </div>
                  <div className="pt-1">
                    <div className="text-[12px] text-gray-500 font-medium mb-0.5">
                      AllFire Services
                    </div>
                    <h3 className="text-[15px] font-bold text-gray-900 leading-snug">
                      {section.title}
                    </h3>
                  </div>
                </div>

                {/* Body: Description */}
                <div className="flex-grow mb-6">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {section.description}
                  </p>
                </div>

                {/* Footer: Tags and Link */}
                <div className="mt-auto flex items-center justify-between text-[13px] font-medium text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-900">{section.tags[0]}</span>
                    <span>•</span>
                    <span>{section.tags[1]}</span>
                  </div>
                  <button className="text-gray-900 font-semibold flex items-center gap-1 group-hover:text-[#FEAF04] transition-colors">
                    Learn more <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
