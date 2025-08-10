import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface HeaderProps {
  activeTab: string;
}

const tabTitles = {
  dashboard: "Dashboard",
  scripts: "My Scripts",
  keys: "Keys & Access",
  whitelist: "Whitelist Management",
  links: "Generated Links",
};

export default function Header({ activeTab }: HeaderProps) {
  const title = tabTitles[activeTab as keyof typeof tabTitles] || "Dashboard";

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {activeTab === "scripts" && (
            <Button className="bg-brand-blue hover:bg-brand-dark-blue">
              <Plus className="w-4 h-4 mr-2" />
              New Script
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
