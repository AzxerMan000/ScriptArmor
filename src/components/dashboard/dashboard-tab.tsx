import { useQuery } from "@tanstack/react-query";
import StatsCard from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Shield, Key, Users } from "lucide-react";

export default function DashboardTab() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Scripts"
          value={stats?.totalScripts || 0}
          icon={Code}
          iconColor="text-brand-blue"
          iconBgColor="bg-blue-100"
        />
        <StatsCard
          title="Protected Scripts"
          value={stats?.protectedScripts || 0}
          icon={Shield}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        <StatsCard
          title="Active Keys"
          value={stats?.activeKeys || 0}
          icon={Key}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />
        <StatsCard
          title="Whitelisted Users"
          value={stats?.whitelistedUsers || 0}
          icon={Users}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-100"
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            No recent activity to display
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
