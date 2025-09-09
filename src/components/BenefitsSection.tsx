import { CheckCircle, Target, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: CheckCircle,
    title: "Proven Paper 1 & 2 Strategies",
    description: "Time-tested methods that consistently help students improve their grades"
  },
  {
    icon: Target,
    title: "Tailored Tutoring",
    description: "One-on-one sessions customized to your specific learning style and needs"
  },
  {
    icon: TrendingUp,
    title: "Grade Boosts",
    description: "See real improvement in your understanding and exam performance"
  }
];

export const BenefitsSection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-easy-dark mb-4">
            Why EasyMaths.ie?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've helped hundreds of students achieve their Leaving Cert Maths goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-background rounded-xl shadow-soft hover:shadow-medium transition-shadow"
              >
                <div className="w-16 h-16 bg-easy-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-easy-green" />
                </div>
                <h3 className="text-xl font-semibold text-easy-dark mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};