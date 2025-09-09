import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  const benefits = [
    "Tailored exam prep for Paper 1 & 2",
    "Instant feedback to boost grades",
    "Build confidence before exam day"
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      grade: "Higher Level",
      quote: "Went from failing to getting a H3! The strategies really work.",
      rating: 5
    },
    {
      name: "James K.",
      grade: "Ordinary Level", 
      quote: "Finally understood algebra thanks to the clear explanations.",
      rating: 5
    },
    {
      name: "Emma L.",
      grade: "Higher Level",
      quote: "The exam prep guide was exactly what I needed. Highly recommend!",
      rating: 5
    }
  ];

  const handleBooking = () => {
    navigate('/confirmation');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <CheckCircle className="w-16 h-16 text-easy-green mx-auto mb-4" />
            <h1 className="text-4xl lg:text-5xl font-bold text-easy-dark mb-6">
              You're In! Your Exam Guide is on its way
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to Take the Next Step?
            </p>
          </div>

          {/* Special Offer Box */}
          <div className="bg-gradient-to-br from-easy-green/5 to-easy-green/10 border-2 border-easy-green/30 rounded-2xl p-8 mb-12 shadow-large">
            <h2 className="text-3xl font-bold text-easy-dark mb-4">
              Book Your First Grind Today at a Special Intro Price
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              For new students: Get your first 1-to-1 lesson for just{" "}
              <span className="text-2xl font-bold text-easy-red">€20</span>{" "}
              <span className="line-through text-gray-400">(normally €40)</span>
            </p>

            {/* Benefits List */}
            <ul className="space-y-3 mb-8 text-left max-w-md mx-auto">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-easy-green mt-0.5 flex-shrink-0" />
                  <span className="text-easy-dark">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={handleBooking}
              variant="cta-green"
              size="xl"
              className="text-lg px-12"
            >
              Book My First Lesson Now
            </Button>

            <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-easy-red">
              <Clock className="w-4 h-4" />
              <span className="font-medium">
                Limited spots available each week — book today to secure yours
              </span>
            </div>
          </div>

          {/* Booking Integration Placeholder */}
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 mb-12">
            <p className="text-gray-500">
              🗓️ Calendly/Stripe Integration Placeholder
              <br />
              <span className="text-sm">(Booking widget will be embedded here)</span>
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-easy-dark text-center mb-12">
            What Our Students Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-background rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow"
              >
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-easy-dark">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.grade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ThankYou;