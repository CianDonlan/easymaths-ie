import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-easy-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-easy-green" />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-easy-dark mb-6">
              Thanks for booking!
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Check your email for confirmation and next steps.
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-secondary/30 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-easy-dark mb-6">
              What happens next?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-easy-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-easy-green" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-easy-dark mb-2">
                    Check Your Email
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You'll receive a confirmation email with all the details for your first lesson.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-easy-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-easy-green" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-easy-dark mb-2">
                    Prepare for Your Session
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Bring any specific topics or questions you'd like to focus on during your lesson.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-easy-green/5 border border-easy-green/20 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-easy-dark mb-3">
              Need help or have questions?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our team is here to help you succeed
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> info@easymaths.ie</p>
              <p><strong>Phone:</strong> +353 1 234 5678</p>
            </div>
          </div>

          {/* Return to Home */}
          <Button asChild variant="outline-green" size="lg">
            <Link to="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Confirmation;