import React from "react";

function footer() {
  return (
    <div className="flex justify-between text-center items-center px-12 py-4 bg-[#FE0000]  text-sm text-gray-300 ">
      <div>© {new Date().getFullYear()} <span className="text-white">PRIXAIR BUKA</span> All Rights Reserved.</div> <a href="/privacypolicy">Privacy Policy</a>
    </div>
  );
}

export default footer;
