"use client";

import React from "react";
import dynamic from "next/dynamic";

const AdminPortal = dynamic(() => import("../../components/AdminPortal"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-[#09090e] text-amber-300 font-cinzel">
      Loading Master Atelier Admin Portal...
    </div>
  ),
});

export default function AdminPage() {
  return <AdminPortal />;
}
