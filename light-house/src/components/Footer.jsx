import React from "react";
import { HiLocationMarker } from "react-icons/hi";

export const Footer = () => {
  return (
    <footer className="bg-[#0a1f44] text-white pt-10 md:pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* BRAND */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
            𝓚𝓤𝓢𝓤𝓜 𝓢𝓞𝓛𝓐𝓡 𝓔ⓝ𝓔ⓝ𝓡𝓖𝓨
          </h2>
          <p className="mt-2 text-gray-300 text-base md:text-lg">
            𝓢𝓞𝓛𝓐𝓡 your way with trust & quality
          </p>

          <div className="flex justify-center flex-wrap gap-5 mt-4 text-gray-300">
            <a className="hover:text-yellow-400">Instagram</a>
            <a className="hover:text-yellow-400">Facebook</a>
            <a className="hover:text-yellow-400">Twitter</a>
          </div>
        </div>

        {/* CONTACT + MAP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* CONTACT */}
          <div className="space-y-4 text-center md:text-left">

            <div className="bg-white/10 rounded-xl p-4">
              <a
                href="tel:+917740972863"
                className="block font-bold text-lg hover:text-yellow-400"
              >
                📞 +91 7740972863
              </a>
              <a
                href="https://wa.me/917740972863"
                target="_blank"
                rel="noreferrer"
                className="block mt-1 text-sm hover:text-yellow-400"
              >
                💬 WhatsApp 
              </a>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <a
                href="tel:+919785935437"
                className="block font-semibold text-lg hover:text-yellow-400"
              >
                📞 +91 9785935437
              </a>
              <a
                href="https://wa.me/919785935437"
                target="_blank"
                rel="noreferrer"
                className="block mt-1 text-sm hover:text-yellow-400"
              >
                💬 WhatsApp
              </a>
            </div>

            <a
              href="mailto:Dalipsingh2863@gmail.com"
              className="block font-semibold hover:text-yellow-400"
            >
              ✉️ Dalipsingh2863@gmail.com
            </a>

            <p className="text-gray-300">
              📍 Jaipur, Rajasthan, India
            </p>
          </div>

          {/* MAP */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=26.941107,75.753717"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative h-64 sm:h-72 md:h-80 hover:scale-105 transition-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <HiLocationMarker className="text-red-500 text-7xl animate-bounce" />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-md text-sm md:text-base">
                📍 Open in Google Maps
              </div>
            </a>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-gray-400 text-sm md:text-base border-t border-gray-600 mt-8 pt-4">
          © {new Date().getFullYear()} 𝓚𝓤𝓢𝓤𝓜 𝓢𝓞𝓛𝓐𝓡. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
