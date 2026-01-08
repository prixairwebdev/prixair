// components/HeroSection.tsx
import Image from 'next/image';
import { motion } from 'framer-motion';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function HeroSection() {
  return (
    <motion.div 
      className="bg-[#0060DC] text-white py-12 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-100px" }}
      variants={container}
    >
      {/* Left Text Section */}
      <div className="max-w-lg mb-10 md:mb-0">
        <motion.div className="flex items-center gap-2 mb-4" variants={item}>
          <Image src="/pharmalogo.png" alt="Logo" width={120} height={30} />
        </motion.div>
        
        <motion.h1 className="text-3xl md:text-4xl font-bold mb-4" variants={item}>
          Ready to Take Control of Your Health?
        </motion.h1>
        
        <motion.p className="mb-6 text-sm md:text-base" variants={item}>
          Order trusted medications, upload prescriptions, or get quick support —
          all in one smooth experience.
        </motion.p>
        
        <motion.div className="flex flex-wrap gap-4" variants={item}>
          <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition">
            Start Shopping
          </button>
          <button className="bg-white text-[#0060DC] font-semibold py-2 px-4 rounded hover:bg-gray-100 transition">
            Upload Prescription
          </button>
        </motion.div>
        
        <motion.p className="text-xs mt-4" variants={item}>✅ NAFDAC Approved</motion.p>
      </div>

      {/* Right Illustration Section (Two Doctors) */}
      <motion.div 
        className="w-full md:w-[40%] flex justify-center items-center"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {/* Doctor 1 */}
        <motion.div 
          className="w-1/2 flex justify-center"
          variants={item}
        >
          <Image
            src="/Character_1.png"
            alt="Doctor 1"
            width={180}
            height={300}
            className="object-contain"
          />
        </motion.div>

        {/* Doctor 2 */}
        <motion.div 
          className="w-1/2 flex justify-center"
          variants={item}
        >
          <Image
            src="/Character_2.png"
            alt="Doctor 2"
            width={180}
            height={300}
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}