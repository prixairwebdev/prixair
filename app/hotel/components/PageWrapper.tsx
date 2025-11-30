"use client";

import React, { useEffect, useState } from "react";
import Loader from "./loader";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loader /> : <>{children}</>;
}