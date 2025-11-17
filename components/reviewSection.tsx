import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Assuming 'Star' is an imported icon component like from lucide-react or similar
// Assuming 'ChevronLeft' and 'ChevronRight' are imported icon component for navigation

// Dummy components for demonstration. Replace with your actual icons.
const Star = (props: any) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.817 1.48-8.279L.001 9.306l8.332-1.151z" /></svg>;
const ChevronLeft = (props: any) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" /></svg>;
const ChevronRight = (props: any) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" /></svg>;


const reviewsData = [
  {
    rating: 5,
    text: "I booked a cab from EasyGoCab for my weekend trip to Digha. The driver was polite, car was clean, and the fare was much cheaper than others. Definitely using them again!",
    name: "Amit Ghosh",
    title: "Kolkata to Digha Trip",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSATJ42TzwckpuE6IX8tFIELCy1XQyI_IXpSQ&s" // Placeholder
  },
  {
    rating: 5,
    text: "Super quick service! My flight landed late but the driver still waited patiently. Smooth ride to Salt Lake. Highly recommend EasyGoCab for airport transfers.",
    name: "Priya Sen",
    title: "Kolkata Airport Pickup",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAkf-qsHk-qrStIm-tZpEI3YjHubAB7BOidQ&s" // Placeholder
  },
  {
    rating: 4,
    text: "The car arrived on time, and the driver knew the route perfectly. A little delay due to traffic, but overall very professional service.",
    name: "Ravi Kumar",
    title: "Kolkata to Jamshedpur Ride",
    image: "https://img.freepik.com/premium-photo/low-angle-view-young-man-standing-field_1048944-29152825.jpg?semt=ais_hybrid&w=740&q=80" // Placeholder
  },
  {
    rating: 5,
    text: "We planned a family trip and booked through EasyGoCab. The cab was neat, AC worked perfectly, and the driver helped us find good food stops on the way. Great experience!",
    name: "Soumita Das",
    title: "Kolkata to Mandarmani Trip",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF60WaZrdjD-KwucW0l4gwZlRpSFz6gq3--g&s" // Placeholder
  },
  {
    rating: 5,
    text: "I used EasyGoCab for daily office travel. Affordable and comfortable. Their booking system is simple and transparent.",
    name: "Sourav Pal",
    title: "Local Ride in Howrah",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTySsNfMtBvdRhckmDV4Veay_9m5Bm1kAyEcHlA_E7CL8-2yPOHlzWRbW4666ibJ3ZigEU&usqp=CAU" // Placeholder
  },
];

const ReviewSection = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const currentReview = reviewsData[currentReviewIndex];

  const handleNext = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
  };

  const handlePrev = () => {
    setCurrentReviewIndex((prevIndex) =>
      (prevIndex - 1 + reviewsData.length) % reviewsData.length
    );
  };

  // Auto swipe effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change review every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-[#0d1927] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Review Carousel Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-yellow-400 p-8 rounded-lg relative">
              <h2 className="text-4xl font-bold text-black mb-6">What Our Customers Say</h2>

              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentReviewIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    // Adjusted dark background to be slightly lighter than the section background
                    className="bg-white dark:bg-zinc-900 dark:shadow-2xl dark:shadow-yellow-900/10 p-6 rounded-lg shadow-lg"
                  >
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < currentReview.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 dark:fill-gray-600 text-gray-300 dark:text-gray-600'}`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                      "{currentReview.text}"
                    </p>

                    <div className="flex items-center">
                      <img
                        src={currentReview.image}
                        alt={currentReview.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{currentReview.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{currentReview.title}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous review"
                  // Adjusted button background and border for visibility on the yellow and dark backgrounds
                  className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition dark:bg-[#0d1927] dark:hover:bg-zinc-800 dark:border dark:border-gray-700"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-white" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next review"
                  // Adjusted button background and border for visibility on the yellow and dark backgrounds
                  className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition dark:bg-[#0d1927] dark:hover:bg-zinc-800 dark:border dark:border-gray-700"
                >
                  <ChevronRight className="w-5 h-5 text-gray-800 dark:text-white" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/happy-professional-man-in-yellow-shirt-giving-thum.jpg"
              alt="Happy customer giving a thumbs up"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ReviewSection;