import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { BenefitsSection } from "@/components/BenefitsSection";
import pdfGuideImage from "@/assets/pdf-guide-cover.png";
import { CheckCircle } from "lucide-react";

const LeadMagnet = () => {
  const guideContents = [
    "Essential formulas cheat sheet for both papers",
    "Common mistakes to avoid in exams",
    "Quick-win strategies for maximum points",
    "Time management techniques",
    "Step-by-step problem-solving methods"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-easy-dark mb-6 leading-tight">
                Struggling with{" "}
                <span className="text-easy-green">Leaving Cert Maths?</span>
                <br />
                We'll get you exam ready.
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Grab your free Exam Prep Guide to Paper 1 & 2.
              </p>

              {/* Guide Preview */}
              <div className="flex items-start space-x-6 mb-8">
                <img
                  src={pdfGuideImage}
                  alt="Free Leaving Cert Maths Exam Prep Guide"
                  className="w-32 h-40 object-cover rounded-lg shadow-medium"
                />
                
                <div>
                  <h3 className="text-lg font-semibold text-easy-dark mb-3">
                    What's inside your free guide:
                  </h3>
                  <ul className="space-y-2">
                    {guideContents.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-easy-green mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <BenefitsSection />
      
      {/* Video Placeholder Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-easy-dark mb-8">
            See How We Help Students Succeed
          </h2>
          <div className="bg-gray-200 rounded-xl p-12 border-2 border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">
              📹 Video testimonial placeholder
              <br />
              <span className="text-sm">(2-3 minute VSL coming soon)</span>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LeadMagnet;