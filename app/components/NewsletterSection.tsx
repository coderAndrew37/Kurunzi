"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button, TextField } from "@radix-ui/themes";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

// Newsletter schema
const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

export default function NewsletterSignup() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterForm) => {
    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      // Simulated API call
      await axios.post("/api/newsletter", data);

      setSuccess("You have successfully subscribed to our newsletter!");
      reset();
    } catch (err) {
      console.error("Newsletter signup error:", err);
      setError("Failed to subscribe. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  // Auto-clear success/error messages
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-2xl border space-y-4">
      <h2 className="text-xl font-bold">Subscribe to Our Newsletter</h2>
      <p className="text-sm text-gray-600">
        Get the latest news delivered straight to your inbox.
      </p>

      {/* Error / Success Feedback */}
      <ErrorMessage error={error} />
      {success && (
        <div className="text-green-600 text-sm font-medium">{success}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <TextField.Root
          placeholder="Enter your email"
          type="email"
          {...register("email")}
          className="flex-1"
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : "Subscribe"}
        </Button>
      </form>

      {errors.email && <ErrorMessage error={errors.email.message} />}
    </div>
  );
}
