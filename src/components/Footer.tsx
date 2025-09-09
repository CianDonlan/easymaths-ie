import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-easy-dark text-easy-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact EasyMaths.ie</h3>
            <p className="text-gray-300 mb-2">Email: info@easymaths.ie</p>
            <p className="text-gray-300 mb-2">Phone: +353 1 234 5678</p>
            <p className="text-gray-300">Dublin, Ireland</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-easy-white transition-colors">
                  Free Guide
                </Link>
              </li>
              <li>
                <Link to="/thank-you" className="text-gray-300 hover:text-easy-white transition-colors">
                  Book Lesson
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-easy-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-easy-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 EasyMaths.ie. All rights reserved. Helping students excel in Leaving Cert Mathematics.
          </p>
        </div>
      </div>
    </footer>
  );
};