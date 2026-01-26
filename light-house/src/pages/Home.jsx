
// src/pages/Home.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

import UserBanner from "../components/UserBanner";
import HomeCards from "../components/HomeCards";
import HomeVideos from "../components/HomeVideos";
import HomeImageSlider from "../components/HomeImageSlider";
import WhatsAppButton from "../components/WhatsAppButton";

const Home = () => {
  return (
    <>
      {/* ✅ INDUSTRY LEVEL SEO */}
      <Helmet>
        <title>
          Kusum Solar | Solar Panel Installation for Home & Business
        </title>

        <meta
          name="description"
          content="Kusum Solar provides reliable solar panel installation for homes, businesses, and industries. Save electricity bills with high-quality solar systems and expert service."
        />

        <meta
          name="keywords"
          content="Solar panel installation services for homes and businesses across India, including local rooftop solar solutions."
        />

        <meta name="author" content="Kusum Solar" />

        {/* ✅ Social Preview */}
        <meta property="og:title" content="Kusum Solar | Trusted Solar Solutions" />
        <meta
          property="og:description"
          content="Affordable and long-lasting solar solutions for home, business, and industry."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ✅ Page Content */}
      <div className="pt-18 md:pt-22">

        {/* 🔥 Hero / Banner */}
        <section className="m-0 p-0">
          {/* SEO H1 (hidden but valid for Google) */}
          <h1 className="sr-only">
            Solar Panel Installation for Home, Business and Industry
          </h1>
          <UserBanner />
        </section>

        {/* 🧩 Services Cards */}
        <section className="pt-0 pb-6 bg-gray-50 m-0">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="sr-only">Our Solar Services</h2>
            <HomeCards />
          </div>
        </section>

        {/* 🎬 Solar Videos */}
        <section className="pt-0 pb-2 m-0">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
              Trading Solar Systems
            </h2>
            <HomeVideos />
          </div>
        </section>

        {/* 🖼️ Work & Maintenance */}
        <section className="pt-0 pb-2 bg-gray-50 m-0">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
              Solar Work & Maintenance
            </h2>
            <HomeImageSlider />
          </div>
        </section>

        {/* 💬 WhatsApp CTA */}
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Home;
