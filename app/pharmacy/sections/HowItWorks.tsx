// app/components/HowItWorks.tsx
'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function HowItWorks() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    // Handle file upload here (e.g. upload to server or show preview)
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full px-6 py-12 space-y-12 text-black">
      {/* How it Works Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, margin: "-100px" }}
        className="text-center"
      >
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="text-gray-500 text-sm">Order your medications in just a few easy steps.</p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            title: 'Upload or Search',
            desc: 'Either upload your prescription or browse our catalog for the medications you need.',
            icon: '/icons/upload.png',
            step: '01',
          },
          {
            title: 'Add to Cart & Pay',
            desc: 'Select your items, review your cart, and checkout securely with multiple payment options.',
            icon: '/icons/cart.png',
            step: '02',
          },
          {
            title: 'Get Fast Delivery',
            desc: 'Your order is processed by a licensed pharmacist and delivered safely to your doorstep.',
            icon: '/icons/delivery.png',
            step: '03',
          },
        ].map((itemData, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className="border rounded-lg p-6 text-center space-y-4 bg-white shadow-sm"
          >
            <div className="text-2xl font-bold text-gray-300">{itemData.step}</div>
            <Image src={itemData.icon} alt={itemData.title} width={60} height={60} className="mx-auto" />
            <h3 className="font-medium text-lg">{itemData.title}</h3>
            <p className="text-sm text-gray-500">{itemData.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Prescription Upload */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, margin: "-100px" }}
        className="grid md:grid-cols-2 gap-8 items-start bg-[#F6F6F6] px-6 py-10 w-full h-[500px]"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <h3 className="text-lg font-semibold mb-2">Have a Prescription?</h3>
          <p className="text-sm text-gray-600">
            Upload a clear photo or PDF of your doctor&apos;s prescription, and our licensed pharmacists
            will handle the rest—verify your needs, recommend options if needed, and prepare your
            order for fast delivery right to your doorstep.
          </p>
        </motion.div>

        {/* Drag-and-drop area */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center h-[70%] bg-white justify-center text-center cursor-pointer transition ${
              isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="w-8 h-8 text-gray-500 mb-2" />
            {files.length > 0 ? (
              <p className="text-sm text-green-600">{files[0].name} uploaded successfully</p>
            ) : (
              <>
                <p className="text-sm text-gray-500">Drop image here or click to <span className="text-blue-500 underline">browse</span></p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, PDF (max 10MB)</p>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}