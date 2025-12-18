import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, Info, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type UserType = "professional" | "brand";

const Register = () => {
  const [userType, setUserType] = useState<UserType>("professional");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !businessEmail || !password || !confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const redirectUrl = `${window.location.origin}/`;

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: businessEmail,
      password,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    if (authError) {
      setIsLoading(false);
      toast({
        title: "Sign up failed",
        description: authError.message,
        variant: "destructive",
      });
      return;
    }

    if (authData.user) {
      let avatarUrl = null;

      // Upload avatar if provided
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${authData.user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile);

        if (!uploadError && uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName);
          avatarUrl = publicUrl;
        }
      }

      // Create profile
      const { error: profileError } = await supabase.from('profiles').insert({
        user_id: authData.user.id,
        full_name: fullName,
        location,
        business_email: businessEmail,
        linkedin_url: linkedinUrl,
        avatar_url: avatarUrl,
        user_type: userType,
      });

      if (profileError) {
        console.error("Profile creation error:", profileError);
      }
    }

    setIsLoading(false);
    toast({
      title: "Account created!",
      description: "Welcome to the platform.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-coral-light flex-col justify-between p-12">
        <div>
          <svg
            width="48"
            height="48"
            viewBox="0 0 40 40"
            fill="none"
            className="text-foreground"
          >
            <path
              d="M8 32V8L20 20L32 8V32"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground leading-tight mb-6">
            The marketplace where architects and brands build the future together.
          </h1>
          <p className="text-muted-foreground text-lg">
            Hundreds of verified brands, Thousands of materials. One smart platform.
          </p>
        </div>

        <div className="text-center">
          <p className="text-primary font-medium mb-4">Trusted by 5000+ brands</p>
          <div className="flex justify-center gap-8 opacity-60">
            <span className="font-bold text-foreground">JOHNSON</span>
            <span className="font-bold text-foreground">SOMANY</span>
            <span className="font-bold text-foreground">Kajaria</span>
            <span className="font-bold text-foreground">CERA</span>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex justify-between items-center p-6">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <Button 
            variant="outline" 
            className="rounded-full"
            onClick={() => navigate("/auth")}
          >
            Sign In
          </Button>
        </div>

        <div className="flex-1 flex items-start justify-center p-6 pb-12">
          <div className="w-full max-w-md">
            {/* User Type Toggle */}
            <div className="flex gap-2 mb-8">
              <Button
                variant={userType === "professional" ? "default" : "outline"}
                className="rounded-full flex-1"
                onClick={() => setUserType("professional")}
              >
                Professionals
              </Button>
              <Button
                variant={userType === "brand" ? "default" : "outline"}
                className="rounded-full flex-1"
                onClick={() => setUserType("brand")}
              >
                Brands & Retailers
              </Button>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-2">
              Join as a {userType === "professional" ? "Professional" : "Brand"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {userType === "professional" 
                ? "Free membership for architects, designers and contractors."
                : "Connect with professionals and showcase your products."
              }
            </p>

            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Avatar Upload */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  {avatarPreview ? (
                    <div className="relative">
                      <img 
                        src={avatarPreview} 
                        alt="Avatar preview" 
                        className="w-20 h-20 rounded-full object-cover border-2 border-border"
                      />
                      <button
                        type="button"
                        onClick={removeAvatar}
                        className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center cursor-pointer hover:bg-secondary/80 transition-colors border-2 border-dashed border-border">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">Profile Photo</p>
                  <p className="text-sm text-muted-foreground">Optional</p>
                </div>
              </div>

              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-12"
              />

              <Input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-12"
              />

              <div className="relative">
                <Input
                  type="email"
                  placeholder="Business Email"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  className="h-12 pr-10"
                />
                <Info className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>

              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="relative flex-1">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Input
                type="url"
                placeholder="LinkedIn / Portfolio URL"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="h-12"
              />

              <p className="text-xs text-muted-foreground">
                By Clicking "Create Account", You Agree to{" "}
                <a href="#" className="text-foreground underline">Our Terms of Use</a>
                {" "}and{" "}
                <a href="#" className="text-foreground underline">Privacy Notice</a>
              </p>

              <Button 
                type="submit" 
                className="w-full h-12 rounded-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Professional Account"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <button 
                onClick={() => navigate("/auth")}
                className="text-primary hover:underline font-medium"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
