"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    brand: "Strata",
    quote: "All Fire Services keeps our annual fire safety statements moving without the last-minute stress. Their team explains what matters, turns up prepared, and follows through.",
    name: "Sarah Jenkins",
    role: "Strata Manager, Inner West Sydney",
    image: "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp",
  },
  {
    brand: "Facilities",
    quote: "The difference is practical experience. When something needs attention, All Fire Services tells us what is urgent, what is compliant, and what can be planned properly.",
    name: "Mark Taylor",
    role: "Facilities Manager, Commercial Portfolio",
    image: "/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp",
  },
  {
    brand: "Owners",
    quote: "They are reliable, clear, and easy to work with. We have confidence that our fire protection maintenance is being handled by people who understand real buildings.",
    name: "David Chen",
    role: "Building Owner, Greater Sydney",
    image: "/Fireprotectionservicesimage/monthlyfireprotection.webp",
  },
  {
    brand: "Compliance",
    quote: "All Fire Services helped us get our compliance records organised and kept our committee informed in plain language. That made approvals much easier.",
    name: "Lisa Wong",
    role: "Owners Corporation Secretary",
    image: "/annual-fire-safety-statement/fire-truck-all-fire-services.webp",
  },
  {
    brand: "Maintenance",
    quote: "Their technicians are punctual and professional. They leave useful notes after each inspection, which helps us stay ahead of defects before they become bigger issues.",
    name: "Michael Kavanagh",
    role: "Asset Manager, Sydney",
    image: "/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp",
  },
  {
    brand: "Support",
    quote: "We call All Fire Services because they respond quickly and give us direct answers. The firefighter-led knowledge shows in the way they solve problems on site.",
    name: "Paul Davis",
    role: "Operations Director, Property Group",
    image: "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-peter-and-paul-scaled-e1759978085539-2048x1536.webp",
  },
];

export default function HandshakeTestimonials() {
  // Duplicate for seamless looping
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-[#F8F9FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="heading-style text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hear from our clients
          </h2>
        </div>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-6 w-max px-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
        >
          {duplicatedTestimonials.map((testimonial, idx) => (
            <div 
              key={idx}
              className="flex-none w-[320px] md:w-[420px]"
            >
              <div className="bg-white rounded-[2rem] p-8 md:p-10 h-full flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                <div className="flex-grow mb-8">
                  <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                    {testimonial.image ? (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
