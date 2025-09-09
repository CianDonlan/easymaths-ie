import { Link } from "react-router-dom";
import logoImage from "@/assets/easymaths-logo.png";

export const Header = () => {
  return (
    <header className="bg-background shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img 
              src={logoImage} 
              alt="EasyMaths.ie - Leaving Cert Maths Tutoring" 
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-easy-dark hover:text-easy-green transition-colors font-medium"
            >
              Free Guide
            </Link>
            <Link 
              to="/thank-you" 
              className="text-easy-dark hover:text-easy-green transition-colors font-medium"
            >
              Book Lesson
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};