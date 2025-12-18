import { Button } from "@/components/ui/button";

const footerLinks = {
  explore: {
    title: "Explore",
    links: ["Products", "Brands", "Boards", "Collections"],
  },
  about: {
    title: "About",
    links: ["How it Works", "Blog", "Careers", "University Program"],
  },
  support: {
    title: "Support",
    links: ["FAQ's", "Privacy and Legal Center", "CA Privacy Notice"],
  },
};

const socialLinks = ["Instagram", "Pinterest", "Linkedin"];

const Footer = () => {
  return (
    <footer className="bg-background border-t-2 border-primary mt-auto">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Explore Column */}
          <div>
            <h3 className="text-muted-foreground text-sm font-medium mb-4">
              {footerLinks.explore.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.explore.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="text-muted-foreground text-sm font-medium mb-4">
              {footerLinks.about.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.about.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-muted-foreground text-sm font-medium mb-4">
              {footerLinks.support.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Column */}
          <div className="lg:text-left">
            <h3 className="text-foreground font-medium mb-2">
              Manufacturer? Let's Talk!
            </h3>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              Get your products in front of 100,000+ design professionals who are
              actively sourcing materials for their projects
            </p>
            <Button className="rounded-full bg-dark hover:bg-dark/90 text-primary-foreground">
              Join Us
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-border gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 ArcMat. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <span key={social} className="flex items-center">
                <a
                  href="#"
                  className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  {social}
                </a>
                {index < socialLinks.length - 1 && (
                  <span className="text-muted-foreground ml-4">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
