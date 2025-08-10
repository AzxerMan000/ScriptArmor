import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { type Script } from "@shared/schema";

export default function LinksTab() {
  const [selectedScript, setSelectedScript] = useState("");

  const { data: scripts } = useQuery<Script[]>({
    queryKey: ["/api/scripts"],
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generate Links */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Script Links</CardTitle>
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
            <div className="grid grid-cols-2 gap-4">
              <Button className="bg-brand-blue hover:bg-brand-dark-blue">
                <Link className="w-4 h-4 mr-2" />
                Raw Link
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <FileText className="w-4 h-4 mr-2" />
                Blob Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Generated Links */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              No links generated yet. Generate your first link to get started.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Access Control Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Access Control Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Successful Access */}
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <div className="flex items-center mb-3">
                <CheckCircle className="text-green-600 mr-2" size={20} />
                <span className="font-medium text-green-800">Access Granted</span>
              </div>
              <p className="text-sm text-green-700 mb-2">User authenticated successfully</p>
              <div className="bg-white rounded p-2">
                <code className="text-xs text-gray-700">Script loaded successfully</code>
              </div>
            </div>

            {/* Denied Access */}
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <div className="flex items-center mb-3">
                <AlertCircle className="text-red-600 mr-2" size={20} />
                <span className="font-medium text-red-800">Access Denied</span>
              </div>
              <p className="text-sm text-red-700 mb-2">Invalid key or not whitelisted</p>
              <div className="bg-white rounded p-2">
                <code className="text-xs text-gray-700">Please enter a valid key to access</code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
