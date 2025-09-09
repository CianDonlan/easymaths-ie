import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-background shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/f4684f6c-d4a0-4cfa-89d0-da5bc655af9a.png" 
              alt="EasyMaths.ie - Leaving Cert Maths Tutoring" 
              className="h-12 w-auto"
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