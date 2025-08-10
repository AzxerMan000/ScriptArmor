import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";

const loginSchema = insertUserSchema.pick({ username: true, password: true });
const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { user, loginMutation, registerMutation } = useAuth();
  const [, navigate] = useLocation();

  // Redirect if already logged in
  if (user) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      if (isLogin) {
        const validData = loginSchema.parse(formData);
        await loginMutation.mutateAsync(validData);
        navigate("/");
      } else {
        const validData = registerSchema.parse(formData);
        await registerMutation.mutateAsync({
          username: validData.username,
          password: validData.password
        });
        navigate("/");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue to-brand-dark-blue flex">
      {/* Left Column - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue rounded-full mb-4">
                <Shield className="text-white text-2xl" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">ScriptArmor</h1>
              <p className="text-gray-600">Secure Script Protection Platform</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className={errors.username ? "border-red-500" : ""}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={isLogin ? "Enter your password" : "Create a password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {!isLogin && (
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-blue hover:bg-brand-dark-blue"
                disabled={loginMutation.isPending || registerMutation.isPending}
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>

              <div className="text-center">
                <span className="text-gray-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </span>
                <Button
                  type="button"
                  variant="link"
                  className="text-brand-blue hover:text-brand-dark-blue ml-1 p-0"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                    setFormData({ username: "", password: "", confirmPassword: "" });
                  }}
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Hero */}
      <div className="flex-1 flex items-center justify-center p-8 text-white">
        <div className="max-w-md text-center">
          <h2 className="text-4xl font-bold mb-6">Protect Your Scripts</h2>
          <p className="text-xl mb-8 text-blue-100">
            Advanced script protection with key-based authentication, whitelist management, 
            and secure link generation.
          </p>
          <div className="space-y-4">
            <div className="flex items-center text-left">
              <Shield className="w-6 h-6 mr-3 text-blue-200" />
              <span>Enterprise-grade script protection</span>
            </div>
            <div className="flex items-center text-left">
              <Shield className="w-6 h-6 mr-3 text-blue-200" />
              <span>Key-based access control</span>
            </div>
            <div className="flex items-center text-left">
              <Shield className="w-6 h-6 mr-3 text-blue-200" />
              <span>Whitelist management system</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
