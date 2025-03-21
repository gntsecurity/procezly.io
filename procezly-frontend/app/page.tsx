"use client";

import Navbar from "@components/ui/Navbar";
import Footer from "@components/ui/Footer";
import { ClipboardCheck, FileCheck, Workflow, ShieldCheck, BarChart3, Eye } from "lucide-react";
import "../styles/global.css";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Background Gradient Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[900px] h-[900px] bg-gradient-to-br from-blue-500/10 to-indigo-500/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-gray-700/10 to-gray-500/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-12 pt-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h1 className="text-7xl font-extrabold tracking-tight leading-[1.1] text-gray-900">
              The Future of <span className="text-blue-600">Kamishibai Auditing</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-xl">
              AI-powered compliance automation with real-time monitoring, digital workflows, and enterprise-grade security—built for precision manufacturing.
            </p>
          </div>

          <div className="w-full flex flex-col space-y-6">
            {[
              { icon: FileCheck, label: "Digital Audit Logs" },
              { icon: Workflow, label: "Automated Workflows" },
              { icon: ShieldCheck, label: "Enterprise-Grade Security" },
              { icon: BarChart3, label: "AI-Powered Analytics" },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center space-x-6 p-6 bg-white rounded-2xl shadow-xl">
                <Icon className="h-10 w-10 text-blue-600" />
                <p className="text-lg font-semibold text-gray-900">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
