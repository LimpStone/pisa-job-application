import React from "react";
import Header from "@/components/ui/header";

const PisaManager = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Pisa Manager</h1>
        <p>This is the Pisa Manager dashboard. Customize this page as needed.</p>
      </main>
    </div>
  );
};

export default PisaManager;