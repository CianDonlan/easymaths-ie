import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { leadFormSchema, type LeadFormData } from "@/lib/validations";
import { useNavigate } from "react-router-dom";

export const LeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: "Your free guide is on the way to your inbox.",
      });
      
      // Store lead data in localStorage for demonstration
      localStorage.setItem('leadData', JSON.stringify(data));
      
      // Redirect to thank you page
      navigate('/thank-you');
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background border border-easy-green/20 rounded-xl p-6 shadow-medium">
      <h3 className="text-xl font-bold text-easy-dark mb-4 text-center">
        Get Your Free Exam Prep Guide
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-easy-dark font-medium">
            Full Name *
          </Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Enter your full name"
            className={`mt-1 ${errors.name ? 'border-easy-red' : 'border-gray-300 focus:border-easy-green'}`}
          />
          {errors.name && (
            <p className="text-easy-red text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-easy-dark font-medium">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email address"
            className={`mt-1 ${errors.email ? 'border-easy-red' : 'border-gray-300 focus:border-easy-green'}`}
          />
          {errors.email && (
            <p className="text-easy-red text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-easy-dark font-medium">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="Enter your phone number"
            className={`mt-1 ${errors.phone ? 'border-easy-red' : 'border-gray-300 focus:border-easy-green'}`}
          />
          {errors.phone && (
            <p className="text-easy-red text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="cta-red"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Get My Free Guide"}
        </Button>
      </form>
      
      <p className="text-xs text-muted-foreground text-center mt-3">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};