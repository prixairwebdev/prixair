"use client";

import React, { useEffect, useState } from "react";
import Loader from "./loader";

export default function PageWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loader /> : <div className={className}>{children}</div>;
}