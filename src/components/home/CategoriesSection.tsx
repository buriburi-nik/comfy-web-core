const categories = [
  {
    title: "Finishes",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    count: "2,340+",
  },
  {
    title: "Lighting",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
    count: "1,850+",
  },
  {
    title: "Furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop",
    count: "4,200+",
  },
  {
    title: "Bathware",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&auto=format&fit=crop",
    count: "1,120+",
  },
  {
    title: "Decor",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop",
    count: "3,560+",
  },
  {
    title: "Smart",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&auto=format&fit=crop",
    count: "890+",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of premium materials organized by category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <a
              key={category.title}
              href="#"
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-primary-foreground font-semibold text-lg">
                  {category.title}
                </h3>
                <p className="text-primary-foreground/70 text-sm">
                  {category.count} products
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
