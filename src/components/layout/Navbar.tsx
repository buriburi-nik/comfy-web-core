import { Search, Camera, Heart, Folder, ShoppingCart, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const navCategories = [
  { name: "New", isHighlighted: true },
  { name: "Construction", isHighlighted: false },
  { name: "Finishes", isHighlighted: false },
  { name: "Door & Windows", isHighlighted: false },
  { name: "Lighting", isHighlighted: false },
  { name: "Furniture", isHighlighted: false },
  { name: "Appliances", isHighlighted: false },
  { name: "Decor", isHighlighted: false },
  { name: "Bathware", isHighlighted: false },
  { name: "Sustainable", isHighlighted: false },
  { name: "Smart", isHighlighted: false },
  { name: "Protection", isHighlighted: false },
];

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top Bar */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <svg
              width="40"
              height="40"
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
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search materials, products, bands and more"
                className="pl-10 pr-10 h-10 border-border rounded-full bg-background"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                <Camera className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors hidden sm:flex">
              <Sparkles className="w-5 h-5" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors hidden sm:flex">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors hidden sm:flex">
              <Folder className="w-5 h-5" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <Button 
              variant="outline" 
              className="rounded-full ml-2"
              onClick={() => navigate(user ? "/dashboard" : "/auth")}
            >
              {user ? "Dashboard" : "Sign In"}
            </Button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="border-t border-border overflow-x-auto">
        <div className="container mx-auto px-4 lg:px-8">
          <ul className="flex items-center gap-6 lg:gap-8 h-12 whitespace-nowrap">
            {navCategories.map((category) => (
              <li key={category.name}>
                <a
                  href="#"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    category.isHighlighted
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
