import { useState } from "react";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import DashboardTab from "@/components/dashboard/dashboard-tab";
import ScriptsTab from "@/components/dashboard/scripts-tab";
import KeysTab from "@/components/dashboard/keys-tab";
import WhitelistTab from "@/components/dashboard/whitelist-tab";
import LinksTab from "@/components/dashboard/links-tab";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "scripts":
        return <ScriptsTab />;
      case "keys":
        return <KeysTab />;
      case "whitelist":
        return <WhitelistTab />;
      case "links":
        return <LinksTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="ml-64 flex-1">
        <Header activeTab={activeTab} />
        <main className="p-6">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
}
