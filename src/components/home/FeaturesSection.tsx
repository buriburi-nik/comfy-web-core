import { Search, Layers, Truck, Shield } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find exactly what you need with AI-powered search and visual recognition",
  },
  {
    icon: Layers,
    title: "Curated Collections",
    description: "Expert-selected materials organized into stunning collections",
  },
  {
    icon: Truck,
    title: "Direct Sourcing",
    description: "Connect directly with manufacturers for samples and quotes",
  },
  {
    icon: Shield,
    title: "Verified Quality",
    description: "All products verified for quality and sustainability standards",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-soft">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Designers Choose Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Streamline your material sourcing with powerful tools designed for professionals
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-coral-light rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
