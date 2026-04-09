import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" fill="currentColor" />
              <span className="font-display font-bold">CardioPredict</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered heart attack risk prediction for early detection and prevention.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Product</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/about" className="block hover:text-foreground transition-colors">About</Link>
              <Link to="/research" className="block hover:text-foreground transition-colors">Research</Link>
              <Link to="/assessment" className="block hover:text-foreground transition-colors">Assessment</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Resources</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/contact" className="block hover:text-foreground transition-colors">Contact</Link>
              <span className="block">Privacy Policy</span>
              <span className="block">Terms of Service</span>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Connect</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <span className="block">Twitter</span>
              <span className="block">LinkedIn</span>
              <span className="block">GitHub</span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          © 2026 CardioPredict. All rights reserved. For research purposes only.
        </div>
      </div>
    </footer>
  );
}
