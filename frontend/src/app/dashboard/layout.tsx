"use client";

import React from "react";
// Default import matches the file above
import AiAssistant from "@/components/ai/AiAssistant";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Existing Dashboard Content */}
      {children}
      
      {/* AI Widget Overlay */}
      <AiAssistant />
    </div>
  );
}