import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPlus } from "lucide-react";
import { type Script } from "@shared/schema";

export default function WhitelistTab() {
  const [username, setUsername] = useState("");
  const [selectedScript, setSelectedScript] = useState("");

  const { data: scripts } = useQuery<Script[]>({
    queryKey: ["/api/scripts"],
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Whitelist Management</CardTitle>
        <Button className="bg-brand-blue hover:bg-brand-dark-blue">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </CardHeader>
      <CardContent>
        {/* Add User Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
          <div>
            <Label>Username</Label>
            <Input
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Label>Script Access</Label>
            <Select value={selectedScript} onValueChange={setSelectedScript}>
              <SelectTrigger>
                <SelectValue placeholder="Select script" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Scripts</SelectItem>
                {scripts?.map((script) => (
                  <SelectItem key={script.id} value={script.id}>
                    {script.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Add to Whitelist
            </Button>
          </div>
        </div>

        {/* Whitelist Table */}
        <div className="text-center py-8 text-gray-500">
          No whitelisted users found. Add users to grant them access to your scripts.
        </div>
      </CardContent>
    </Card>
  );
}
