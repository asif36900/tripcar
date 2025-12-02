// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { motion, AnimatePresence } from "framer-motion"
// import { Car, Menu, X, Phone } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/theme-toggle"

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)

//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/about" },
//     { name: "Services", href: "/services" },
//     { name: "Popular Rides", href: "/popular-routes" },
//     // { name: "Taxi List", href: "/taxi-list" },
//     { name: "Contact", href: "/contact" },
//   ]

//   return (
//     <nav className="bg-white shadow-lg sticky top-0 z-40">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <div className="bg-yellow-400 p-2 rounded-lg">
//               <Car className="w-6 h-6 text-black" />
//             </div>
//             <span className="text-2xl font-bold text-gray-900">Easy Go Cab</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className="text-gray-700 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors"
//               >
//                 {item.name}
//               </Link>
//             ))}
//             <ThemeToggle />
//             <Link href="/booking">
//               <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
//                 <Phone className="w-4 h-4 mr-2" />
//                 Book Now
//               </Button>
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-yellow-600 p-2">
//               {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ x: "100%", opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: "100%", opacity: 0 }}
//               transition={{ type: "tween", duration: 0.3 }}
//               className="md:hidden fixed top-16 right-0 w-64 h-screen bg-white shadow-xl z-50 border-l"
//             >
//               <div className="px-4 pt-4 pb-3 space-y-2">
//                 {navItems.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className="block px-3 py-3 text-gray-700 hover:text-yellow-600 hover:bg-gray-50 rounded-md font-medium"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//                 <div className="px-3 py-3">
//                   <Link href="/booking">
//                     <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
//                       <Phone className="w-4 h-4 mr-2" />
//                       Book Now
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="md:hidden fixed inset-0 bg-black/20 z-40 top-16"
//               onClick={() => setIsOpen(false)}
//             />
//           )}
//         </AnimatePresence>
//       </div>
//     </nav>
//   )
// }




"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Car, Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Popular Rides", href: "/popular-routes" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav
      className={`
        sticky top-0 z-50
        bg-background/80 backdrop-blur-lg border-b border-border
        animate-slideInDown transition-all duration-300
      `}
    >
      <div className="max-w-7xl mx-auto px-4 py-1 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <img
              src="/logo/logo-icon.png" // replace with your logo path
              alt="Easy Go Cab Logo"
              className=" h-12 md:h-14 w-auto" // adjust size as needed
            />
            <span className="text-3xl md:text-4xl font-extrabold text-foreground group-hover:text-primary transition-colors">
              <span className="text-primary">Easy</span> Go
            </span>
          </Link>

          {/* <Link href="/" className="flex items-center">
            <img
              src="/logo/logo.png" // replace with your logo path
              alt="Easy Go Cab Logo"
              className="h-16 w-auto" // adjust size as needed
            />
          </Link> */}


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="
                  text-foreground/80 hover:text-primary
                  font-medium px-3 py-2 text-sm transition-colors
                  relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary
                  hover:after:w-full after:transition-all after:duration-300
                "
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />

            <Link href="/booking">
              <Button
                className="
                  bg-primary hover:bg-primary/90 text-primary-foreground font-semibold
                  flex items-center transition-all duration-300 shadow-md hover:shadow-lg
                "
              >
                {/* <Phone className="w-4 h-4 mr-2" /> */}
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex justify-center items-center">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary p-2 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="
                md:hidden fixed top-16 right-0 w-64 h-screen
                bg-background border-l border-border shadow-xl z-50
                animate-slideInDown
              "
            >
              <div className="px-4 pt-4 pb-3 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="
                      block px-3 py-3 rounded-md font-medium
                      text-foreground/80 hover:text-primary hover:bg-muted transition-all
                    "
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="px-3 py-3">
                  <Link href="/booking" onClick={() => setIsOpen(false)}>
                    <Button
                      className="
                        w-full bg-primary hover:bg-primary/90 text-primary-foreground
                        font-semibold shadow-md hover:shadow-lg flex items-center justify-center
                      "
                    >
                      {/* <Phone className="w-4 h-4 mr-2" /> */}
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay when menu open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 top-16"
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
