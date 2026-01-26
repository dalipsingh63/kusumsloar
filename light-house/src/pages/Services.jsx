
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

/* =========================
   SERVICES DATA
========================= */
const servicesData = [
  {
    id: "home",
    title: "Home Solar",
    icon: "☀️",
    img: "/images/homesolar.jpg",
    points: [
      "Rooftop solar panel installation",
      "Reduce electricity bills",
      "Clean & renewable energy",
      "Low maintenance system",
      "10-year warranty",
      "Free consultation & design",
    ],
  },
  {
    id: "commercial",
    title: "Commercial Solar",
    icon: "🏢",
    img: "/images/commercaialsolar.webp",
    points: [
      "Solar for shops & offices",
      "Lower monthly power cost",
      "High efficiency panels",
      "Long-term savings",
      "Custom solutions for each business",
      "Smart monitoring system",
    ],
  },
  {
    id: "industrial",
    title: "Industrial Solar",
    icon: "🏭",
    img: "/images/indusrtial.webp",
    points: [
      "Large-scale solar systems",
      "High power output",
      "Reliable factory energy",
      "Custom solar solutions",
      "Expert installation teams",
      "Maintenance contracts available",
    ],
  },
  {
    id: "inverter",
    title: "Solar Inverter & Battery",
    icon: "🔋",
    img: "/images/solar-inverter.jfif",
    points: [
      "High-quality inverters",
      "Battery backup support",
      "Power during outages",
      "Safe & durable systems",
      "Compatible with all panel types",
      "Extended warranty options",
    ],
  },
  {
    id: "maintenance",
    title: "Solar Maintenance",
    icon: "🛠️",
    img: "/images/solar-maintenance.jfif",
    points: [
      "Solar panel cleaning",
      "System health check",
      "Performance monitoring",
      "Fast technical support",
      "Regular inspection schedules",
      "Preventive maintenance",
    ],
  },
];

/* =========================
   FEATURES
========================= */
const featuresData = [
  { icon: "⚡", title: "High Efficiency", desc: "Panels that maximize sunlight capture." },
  { icon: "🌱", title: "Eco Friendly", desc: "Reduce carbon footprint and save the planet." },
  { icon: "💰", title: "Cost Saving", desc: "Lower your electricity bills significantly." },
  { icon: "🛡️", title: "Reliable Support", desc: "24/7 customer service & maintenance." },
  { icon: "🔧", title: "Custom Solutions", desc: "Tailored systems for every roof and business." },
  { icon: "📈", title: "Performance Monitoring", desc: "Track your energy production in real-time." },
];

/* =========================
   OWNERS
========================= */
const owners = [
  {
    name: "Dalip Singh",
    role: "Owner",
    phone: "7740972863",
    whatsapp: "7740972863",
    img: "/images/logo.png",
  },
  {
    name: "Akhilesh Singh",
    role: "Owner",
    phone: "9785935437",
    whatsapp: "9785935437",
    img: "/images/logo.png",
  },
];

const Services = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToId) {
      const el = document.getElementById(location.state.scrollToId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      {/* ================= SEO ================= */}
      <Helmet>
        <title>Kusum Solar Services | Home, Commercial & Industrial Solar Solutions</title>
        <meta
          name="description"
          content="Kusum Solar provides home, commercial and industrial solar installation, inverter systems and professional solar maintenance services."
        />
      </Helmet>

      <div className="pt-24 px-6 max-w-7xl mx-auto">

        {/* ================= HERO ================= */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-blue-700">
            Power Your Life with Solar Energy
          </h1>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-lg">
            Smart, affordable, and reliable solar solutions for your home,
            business, and industry.
          </p>
        </div>

        {/* ================= SERVICES GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesData.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-28 bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition group cursor-pointer transform hover:-translate-y-1 hover:scale-105 duration-500"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={service.img}
                  loading="lazy"
                  alt={`${service.title} solar service by Kusum Solar - installation and maintenance`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{service.icon}</span>
                  <h2 className="text-2xl font-bold text-blue-600">
                    {service.title}
                  </h2>
                </div>
                <ul className="text-gray-600 space-y-2">
                  {service.points.map((point, idx) => (
                    <li key={idx}>• {point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* ================= OWNERS ================= */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-blue-700 text-center mb-10">
            Our Owners
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {owners.map((owner, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-1 duration-500 text-center"
              >
                <img
                  src={owner.img}
                  loading="lazy"
                  alt={`${owner.name} - ${owner.role} at Kusum Solar`}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-blue-600">
                  {owner.name}
                </h3>
                <p className="text-gray-600 mb-4">{owner.role}</p>

                <div className="flex justify-center space-x-6 text-gray-600 text-2xl">
                  <a href={`tel:${owner.phone}`} title="Call">
                    <FaPhoneAlt />
                  </a>
                  <a
                    href={`https://wa.me/${owner.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CTA ================= */}
        {/* SEO image for Google */}
        <img
          src="/images/cta-solar.jpg"
          alt="Solar panel installation for home and commercial buildings"
          className="hidden"
        />

        <div
          className="mt-32 relative bg-cover bg-center rounded-3xl text-white overflow-hidden"
          style={{ backgroundImage: "url('/images/cta-solar.jpg')" }}
        >
          <div className="bg-black/50 p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Switch to Solar & Start Saving Today
            </h2>
            <p className="mb-6 text-lg text-blue-100">
              Contact us now for a free solar consultation.
            </p>
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition">
              Get Free Quote
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default Services;

