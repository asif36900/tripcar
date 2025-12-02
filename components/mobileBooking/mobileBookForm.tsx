import React, { useState } from 'react';
import { motion } from "framer-motion"
import BookingForm from '../booking-form';


export default function MobileBookForm() {
  // Updated placeholder image for a vibrant, family-friendly travel background
  const backgroundImageUrl = 'https://img.freepik.com/free-photo/young-couple-car-trip_23-2147935736.jpg?semt=ais_hybrid&w=740&q=80';

  return (
    <div
      // Centering the form, but giving it a fixed height context for the image overlap
      className="min-h-screen w-full flex flex-col items-center justify-start pt-16 font-inter"
      style={{
        backgroundImage: `url('${backgroundImageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center -110px', // Focus the top part of the image
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Background Dimmer/Overlay for focus (kept light since the source image is already bright) */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* The Floating Card Container (z-10, now opaque and positioned high) */}
      <div className="relative z-10 w-[99%] max-w-2xl mx-4 mt-[60%] sm:mt-[50%]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BookingForm />
          </motion.div>
      </div>
    </div>
  );
}
