import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative bg-dark rounded-3xl overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 bg-primary rounded-full blur-2xl" />
          </div>

          <div className="relative z-10 px-8 py-12 lg:px-16 lg:py-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Transform Your Design Process?
              </h2>
              <p className="text-primary-foreground/70 text-lg mb-8 leading-relaxed">
                Join thousands of architects and designers who source their materials through our platform. Start for free today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
