"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  title: string;
  image: string | null;
}

const teamMembers: TeamMember[] = [

  //   {
  //   name: "Adenike Ogunwusi",
  //   title: "COO, Prixair Group",
  //   image: "/team/prixaircoo.jpg",
  // },
  //   {
  //   name: "Mr Babatunde Adegbola",
  //   title: "CFO, Prixair Group",
  //   image:"/team/mrbabatunde.jpg"
  // },
  {
    name: " Mr Bankole Banjo",
    title: "COO, Prixair Resources",
    image: "/team/prixairbankole.jpg",
  },


];

export default function TeamSection() {
  return (
    <section id="leadership" className="py-16 bg-white text-center">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h4 className="text-lg  font-semibold mb-1">
            Executive Management
          </h4>
          <h2 className=" mb-12 text-gray-700 maintext">
            Our executive team brings together industry
            experience, strategic insight, and a shared commitment to
            excellence.
          </h2>
        </motion.div>

        {/* Updated grid for 2 columns on small screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              className="bg-white  overflow-hidden shadow-md"
            >
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-80 object-cover"
                />
              ) : (
                <div className="w-full h-80 bg-gray-100 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gray-300 rounded-full" />
                </div>
              )}
              <div className="py-4">
                <h3 className="font-semibold text-lg text-black">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-400">{member.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
