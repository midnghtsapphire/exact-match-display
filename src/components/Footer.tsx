const footerLinks = {
  Product: ["How It Works", "Features", "Pricing", "Security", "API"],
  Company: ["About Us", "Careers", "Press Kit", "Contact", "Blog"],
  Legal: ["Privacy Policy", "Terms of Service", "Data Protection", "CCPA Rights"],
  Support: ["Help Center", "Community", "Status", "Report a Bug"],
};

export const Footer = () => {
  return (
    <footer className="py-16 bg-card border-t-2 border-primary">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display text-primary uppercase mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-foreground/60 hover:text-cash-green transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-foreground/10 text-center text-foreground/40 text-sm">
          <p>© 2026 SubKill.io. All rights reserved. We kill subscriptions, not people.</p>
        </div>
      </div>
    </footer>
  );
};
