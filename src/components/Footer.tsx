import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-sm font-display font-bold text-primary-foreground">M</span>
              </div>
              <span className="font-display font-bold text-foreground">MST Blockchain</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              India's 1st Layer 1 Blockchain. Secure, scalable, and sustainable infrastructure for the decentralized future.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Platform</h4>
            <div className="flex flex-col gap-3">
              <Link to="/ecosystem" className="text-sm text-muted-foreground hover:text-primary transition-colors">Ecosystem</Link>
              <Link to="/solutions" className="text-sm text-muted-foreground hover:text-primary transition-colors">Solutions</Link>
              <Link to="/build-with-mst" className="text-sm text-muted-foreground hover:text-primary transition-colors">Build with MST</Link>
              <a href="https://mstscan.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">MST Explorer</a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Community</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Telegram</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Discord</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2026 MST Blockchain. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">Pune, Maharashtra, India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
