import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

export default function ProcessPage() {
  const steps = [
    {
      title: "Consultation & Ordering",
      desc: "Discuss your specific camper van requirements with our experts. We'll help you choose the right roof type, materials, and finish.",
    },
    {
      title: "Manufacturing in Yorkshire",
      desc: "Your roof is precision-manufactured in our Yorkshire facility using high-grade fiberglass and reinforced materials for maximum durability.",
    },
    {
      title: "Quality Control & Testing",
      desc: "Every product undergoes rigorous testing, including pull tests and structural integrity checks, before it leaves our factory.",
    },
    {
      title: "Installation",
      desc: "Have your roof installed by our in-house experts or through our nationwide network of approved fitters.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-neutral-50 text-black pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Our Process
            </h1>
            <p className="text-xl text-neutral-600">
              From initial consultation to final installation, discover how we build the UK's finest camper van roofs.
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 md:gap-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black text-white text-2xl font-bold">
                    {i + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-neutral-600 text-lg leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center bg-black text-white rounded-3xl p-12">
            <h2 className="text-3xl font-bold mb-6">Ready to start your conversion?</h2>
            <p className="text-neutral-400 mb-8 text-lg">Get in touch with our team today to discuss your project.</p>
            <a href="/contact" className="inline-block bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-neutral-200 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
