"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Car, CheckCircle, Smile } from "lucide-react";

// Data array for the steps (Remains the same)
const steps = [
  {
    icon: MapPin,
    title: "Choose Pickup & Drop Location",
    description: "Specify your exact pickup point and your final destination on our simple web interface.",
    number: "1",
  },
  {
    icon: Car,
    title: "Select Cab Type (Mini / Sedan / SUV)",
    description: "Pick the vehicle that fits your needs: Mini (Hatchback), Sedan, or SUV (Innova/Ertiga).",
    number: "2",
  },
  {
    icon: CheckCircle,
    title: "Confirm Booking & Pay Securely",
    description: "Confirm your details and complete the booking using our secure and transparent payment gateway.",
    number: "3",
  },
  {
    icon: Smile,
    title: "Driver Arrives on Time – Enjoy Your Ride!",
    description: "Your professional driver will arrive on time. Relax and enjoy a comfortable journey to your destination!",
    number: "4",
  },
];

// Animation variants for the card containers
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger the appearance of each step card
    },
  },
};

// Animation variants for individual step cards
const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const HowToBookSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-yellow-500 mb-2">
            The EasyGoCab Way
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Book Your Cab in Four Simple Steps
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Getting an affordable, comfortable ride has never been easier. Follow our simple process to secure your next trip.
          </p>
        </motion.div>

        {/* Content Grid (Two columns on large screen, one on mobile) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border-t-4 border-yellow-400 flex items-start space-x-6"
            >
              
              {/* Step Number Badge */}
              <div className="flex-shrink-0 w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center font-extrabold text-2xl text-yellow-600 shadow-inner">
                {step.number}
              </div>
              
              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
                  {/* <step.icon className="w-5 h-5 text-yellow-500" /> */}
                  <span>{step.title}</span>
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
};

export default HowToBookSection;