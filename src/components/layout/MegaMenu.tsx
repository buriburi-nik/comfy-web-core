import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Category images
import furnitureImg from "@/assets/categories/furniture.jpg";
import lightingImg from "@/assets/categories/lighting.jpg";
import bathwareImg from "@/assets/categories/bathware.jpg";
import decorImg from "@/assets/categories/decor.jpg";
import appliancesImg from "@/assets/categories/appliances.jpg";
import constructionImg from "@/assets/categories/construction.jpg";

interface SubCategory {
  name: string;
  items: string[];
}

interface Category {
  name: string;
  isHighlighted?: boolean;
  subcategories: SubCategory[];
  image?: string;
}

const categoriesData: Category[] = [
  {
    name: "New",
    isHighlighted: true,
    subcategories: [
      { name: "Latest Arrivals", items: ["This Week", "This Month", "Trending", "Best Sellers"] },
      { name: "Featured Collections", items: ["Spring Collection", "Eco-Friendly", "Designer Picks", "Budget Friendly"] },
    ],
    image: furnitureImg,
  },
  {
    name: "Construction",
    subcategories: [
      { name: "Building Materials", items: ["Cement", "Bricks", "Blocks", "Sand", "Gravel", "Steel"] },
      { name: "Structural Elements", items: ["Beams", "Columns", "Slabs", "Foundations", "Roofing"] },
      { name: "Insulation", items: ["Thermal Insulation", "Sound Insulation", "Waterproofing", "Vapor Barriers"] },
    ],
    image: constructionImg,
  },
  {
    name: "Finishes",
    subcategories: [
      { name: "Wall Finishes", items: ["Paints", "Wallpapers", "Textured Coatings", "Wall Panels", "Tiles"] },
      { name: "Floor Finishes", items: ["Hardwood", "Laminate", "Vinyl", "Carpet", "Tile Flooring"] },
      { name: "Ceiling Finishes", items: ["Suspended Ceilings", "Plaster", "Wood Ceilings", "Acoustic Panels"] },
    ],
    image: decorImg,
  },
  {
    name: "Door & Windows",
    subcategories: [
      { name: "Doors", items: ["Entry Doors", "Interior Doors", "Sliding Doors", "French Doors", "Garage Doors"] },
      { name: "Windows", items: ["Casement", "Double Hung", "Skylights", "Bay Windows", "Picture Windows"] },
      { name: "Hardware", items: ["Handles", "Locks", "Hinges", "Door Closers", "Window Latches"] },
    ],
    image: constructionImg,
  },
  {
    name: "Lighting",
    subcategories: [
      { name: "Indoor Lighting", items: ["Chandeliers", "Pendant Lights", "Recessed Lighting", "Track Lighting", "Wall Sconces"] },
      { name: "Outdoor Lighting", items: ["Landscape Lights", "Security Lights", "Pathway Lights", "Flood Lights"] },
      { name: "Smart Lighting", items: ["Smart Bulbs", "Light Controllers", "Motion Sensors", "Dimmers"] },
    ],
    image: lightingImg,
  },
  {
    name: "Furniture",
    subcategories: [
      { name: "Sofas and armchairs", items: ["Sectional Sofas", "Loveseats", "Recliners", "Accent Chairs", "Ottomans"] },
      { name: "Tables and chairs", items: ["Dining Tables", "Coffee Tables", "Side Tables", "Dining Chairs", "Bar Stools"] },
      { name: "Storage systems and units", items: ["Wardrobes", "Shelving", "Cabinets", "Dressers", "Bookcases"] },
      { name: "Sleeping area and children's bedrooms", items: ["Beds", "Mattresses", "Nightstands", "Kids Beds", "Cribs"] },
      { name: "Kids furniture", items: ["Study Desks", "Toy Storage", "Kids Chairs", "Bunk Beds"] },
      { name: "Furniture components and hardware", items: ["Drawers", "Cabinet doors", "Table tops", "Table bases", "Furniture handles"] },
    ],
    image: furnitureImg,
  },
  {
    name: "Appliances",
    subcategories: [
      { name: "Kitchen Appliances", items: ["Refrigerators", "Ovens", "Dishwashers", "Microwaves", "Range Hoods"] },
      { name: "Laundry", items: ["Washing Machines", "Dryers", "Washer-Dryer Combos", "Ironing Systems"] },
      { name: "Climate Control", items: ["Air Conditioners", "Heaters", "Dehumidifiers", "Air Purifiers"] },
    ],
    image: appliancesImg,
  },
  {
    name: "Decor",
    subcategories: [
      { name: "Wall Decor", items: ["Artwork", "Mirrors", "Clocks", "Wall Hangings", "Photo Frames"] },
      { name: "Textiles", items: ["Curtains", "Rugs", "Cushions", "Throws", "Bedding"] },
      { name: "Accessories", items: ["Vases", "Candles", "Plants", "Sculptures", "Decorative Bowls"] },
    ],
    image: decorImg,
  },
  {
    name: "Bathware",
    subcategories: [
      { name: "Fixtures", items: ["Toilets", "Sinks", "Bathtubs", "Showers", "Bidets"] },
      { name: "Faucets", items: ["Basin Faucets", "Shower Heads", "Bath Mixers", "Kitchen Faucets"] },
      { name: "Accessories", items: ["Towel Racks", "Soap Dispensers", "Mirrors", "Storage", "Bath Mats"] },
    ],
    image: bathwareImg,
  },
  {
    name: "Sustainable",
    subcategories: [
      { name: "Eco Materials", items: ["Bamboo", "Recycled Materials", "Cork", "Reclaimed Wood", "Natural Stone"] },
      { name: "Energy Efficient", items: ["Solar Panels", "LED Lighting", "Smart Thermostats", "Insulation"] },
      { name: "Water Saving", items: ["Low-Flow Fixtures", "Rainwater Systems", "Greywater Systems"] },
    ],
    image: decorImg,
  },
  {
    name: "Smart",
    subcategories: [
      { name: "Smart Home", items: ["Smart Hubs", "Voice Assistants", "Smart Displays", "Automation Systems"] },
      { name: "Security", items: ["Smart Locks", "Cameras", "Doorbells", "Alarm Systems", "Sensors"] },
      { name: "Entertainment", items: ["Smart TVs", "Sound Systems", "Streaming Devices", "Multi-Room Audio"] },
    ],
    image: appliancesImg,
  },
  {
    name: "Protection",
    subcategories: [
      { name: "Safety Equipment", items: ["Fire Extinguishers", "Smoke Detectors", "CO Detectors", "First Aid"] },
      { name: "Security Systems", items: ["Alarm Systems", "CCTV", "Access Control", "Safes"] },
      { name: "Weather Protection", items: ["Storm Shutters", "Flood Barriers", "Weather Stripping", "Sealants"] },
    ],
    image: constructionImg,
  },
];

interface MegaMenuProps {
  isOpen: boolean;
  activeCategory: string | null;
  onClose: () => void;
}

const MegaMenu = ({ isOpen, activeCategory, onClose }: MegaMenuProps) => {
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  
  const currentCategory = categoriesData.find(cat => cat.name === activeCategory);
  const currentSubcategory = currentCategory?.subcategories.find(sub => sub.name === activeSubcategory) || currentCategory?.subcategories[0];

  // Set default subcategory when category changes
  useState(() => {
    if (currentCategory && !activeSubcategory) {
      setActiveSubcategory(currentCategory.subcategories[0]?.name || null);
    }
  });

  if (!isOpen || !activeCategory || !currentCategory) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
      
      <div className="absolute left-0 right-0 top-full bg-background border-b border-border shadow-xl z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex min-h-[320px]">
            {/* Left Panel - Main Subcategories */}
            <div className="w-80 bg-accent/40 py-6 border-r border-border">
              <h3 className="text-lg font-semibold mb-4 px-6">{currentCategory.name}</h3>
              <ul className="space-y-0.5">
                {currentCategory.subcategories.map((subcategory) => (
                  <li key={subcategory.name}>
                    <button
                      className={`w-full flex items-center justify-between px-6 py-3 text-sm transition-colors ${
                        activeSubcategory === subcategory.name || (!activeSubcategory && currentCategory.subcategories[0]?.name === subcategory.name)
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-accent/60 text-foreground"
                      }`}
                      onMouseEnter={() => setActiveSubcategory(subcategory.name)}
                      onClick={() => setActiveSubcategory(subcategory.name)}
                    >
                      {subcategory.name}
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Panel - Subcategory Items */}
            <div className="flex-1 py-6 px-10">
              {currentSubcategory && (
                <>
                  <h3 className="text-lg font-semibold mb-6">{currentSubcategory.name}</h3>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                    {currentSubcategory.items.map((item) => (
                      <Link
                        key={item}
                        to={`/products?category=${encodeURIComponent(item)}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors py-1.5"
                        onClick={onClose}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Featured Image */}
            <div className="w-64 p-6 hidden xl:flex items-center">
              <div className="rounded-xl overflow-hidden w-full h-full relative">
                {currentCategory.image ? (
                  <img 
                    src={currentCategory.image} 
                    alt={currentCategory.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent to-muted" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <Link 
                    to={`/products?category=${encodeURIComponent(currentCategory.name)}`}
                    className="text-sm text-white font-medium hover:underline"
                    onClick={onClose}
                  >
                    Explore {currentCategory.name} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { categoriesData };
export default MegaMenu;
