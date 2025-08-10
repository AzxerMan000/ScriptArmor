import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Key } from "lucide-react";
import { type Script } from "@shared/schema";

export default function KeysTab() {
  const [selectedScript, setSelectedScript] = useState("");
  const [keyDuration, setKeyDuration] = useState("30");
  const [keyDescription, setKeyDescription] = useState("");

  const { data: scripts } = useQuery<Script[]>({
    queryKey: ["/api/scripts"],
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Generate New Key */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Key</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Select Script</Label>
            <Select value={selectedScript} onValueChange={setSelectedScript}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a script" />
              </SelectTrigger>
              <SelectContent>
                {scripts?.map((script) => (
                  <SelectItem key={script.id} value={script.id}>
                    {script.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="duration">Key Duration (days)</Label>
            <Input
              id="duration"
              type="number"
              value={keyDuration}
              onChange={(e) => setKeyDuration(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Key Description (Optional)</Label>
            <Input
              id="description"
              placeholder="e.g., VIP User Access"
              value={keyDescription}
              onChange={(e) => setKeyDescription(e.target.value)}
            />
          </div>
          <Button className="w-full bg-brand-blue hover:bg-brand-dark-blue">
            <Key className="w-4 h-4 mr-2" />
            Generate Key
          </Button>
        </CardContent>
      </Card>

      {/* Active Keys */}
      <Card>
        <CardHeader>
          <CardTitle>Active Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            No active keys found. Generate your first key to get started.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
