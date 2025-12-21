import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronRight, ChevronDown, Search, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  full_name: string | null;
  avatar_url: string | null;
}

const searchCategories = [
  "Tiles", "Paints", "Textiles", "Wallpaper", 
  "Flooring", "Laminate", "Paneling", "Acoustics", "Leathers"
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("user_id", user.id)
          .maybeSingle();
        
        if (data) {
          setProfile(data);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const firstName = profile?.full_name?.split(" ")[0] || "User";

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar-background p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <span className="font-semibold text-foreground">{profile?.full_name || "User"}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>

        <Button className="mb-8 rounded-lg bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create project
        </Button>

        <nav className="flex-1 space-y-1">
          {["Boards", "Notes", "Order history", "Help"].map((item) => (
            <a
              key={item}
              href="#"
              className="flex items-center justify-between py-3 text-foreground hover:text-primary transition-colors"
            >
              {item}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </a>
          ))}
        </nav>

        <Button 
          variant="ghost" 
          onClick={handleSignOut}
          className="mt-auto text-muted-foreground hover:text-foreground"
        >
          Sign Out
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-6">
              Welcome, {firstName}
            </h1>
            <div className="flex justify-center gap-4">
              <Button asChild className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/products">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Product Listing
                </Link>
              </Button>
              <Button variant="outline" className="rounded-full px-8">
                See New
              </Button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Current Project Card */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Current Project</h2>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium">{firstName.charAt(0)}</span>
                </div>
                <span className="text-foreground">{firstName}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>

              <p className="text-sm text-muted-foreground mb-4">Search For :</p>
              
              <div className="flex flex-wrap gap-2">
                {searchCategories.map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                  >
                    <Search className="w-3 h-3 mr-1.5" />
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Recent Boards Card */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Recent Boards</h2>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                  All Boards
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Sample boards - placeholder */}
                <div className="group cursor-pointer">
                  <div className="aspect-square rounded-2xl bg-coral-light mb-3 flex items-center justify-center overflow-hidden">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/60 to-primary/20 rounded-full" />
                  </div>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    Interior Design
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    4 items · {firstName}
                  </p>
                </div>
                
                <div className="group cursor-pointer">
                  <div className="aspect-square rounded-2xl bg-secondary mb-3 flex items-center justify-center overflow-hidden">
                    <div className="w-16 h-16 bg-gradient-to-br from-muted-foreground/40 to-muted-foreground/10 rounded-lg" />
                  </div>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    Office Design
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    1 items · {firstName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
