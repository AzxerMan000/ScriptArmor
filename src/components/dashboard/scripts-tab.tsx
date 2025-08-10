import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { FileText, Upload, Edit, Key, Link } from "lucide-react";
import { insertScriptSchema, type Script } from "@shared/schema";
import { z } from "zod";

const createScriptSchema = insertScriptSchema.omit({ ownerId: true });

export default function ScriptsTab() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    isProtected: true
  });
  const { toast } = useToast();

  const { data: scripts, isLoading } = useQuery<Script[]>({
    queryKey: ["/api/scripts"],
  });

  const createScriptMutation = useMutation({
    mutationFn: async (data: z.infer<typeof createScriptSchema>) => {
      const res = await apiRequest("POST", "/api/scripts", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scripts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      setIsCreateDialogOpen(false);
      setFormData({ name: "", content: "", isProtected: true });
      toast({
        title: "Success",
        description: "Script created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create script",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validData = createScriptSchema.parse(formData);
      createScriptMutation.mutate(validData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Scripts</CardTitle>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-blue hover:bg-brand-dark-blue">
              <Upload className="w-4 h-4 mr-2" />
              Upload Script
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Script</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="scriptName">Script Name</Label>
                <Input
                  id="scriptName"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., LoginSystem.lua"
                  required
                />
              </div>
              <div>
                <Label htmlFor="scriptContent">Script Content</Label>
                <Textarea
                  id="scriptContent"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Paste your script content here..."
                  className="min-h-[200px] font-mono"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isProtected"
                  checked={formData.isProtected}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isProtected: checked }))}
                />
                <Label htmlFor="isProtected">Enable Protection</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createScriptMutation.isPending}
                  className="bg-brand-blue hover:bg-brand-dark-blue"
                >
                  Create Script
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {scripts && scripts.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Script Name</TableHead>
                <TableHead>Protection</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scripts.map((script) => (
                <TableRow key={script.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <FileText className="text-brand-blue mr-3" size={16} />
                      <span className="font-medium">{script.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={script.isProtected ? "default" : "secondary"}
                      className={script.isProtected ? "bg-green-100 text-green-800" : ""}
                    >
                      {script.isProtected ? "Protected" : "Unprotected"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {formatDate(script.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Key className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Link className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No scripts found. Upload your first script to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
