"use client";

import React, { useState } from "react";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/api";

const NewsletterSignup = ({ variant = "default", className = "" }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // null, 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      await apiRequest('/contact/newsletter', {
        method: 'POST',
        body: { email: email.trim() }
      });

      setStatus('success');
      setEmail("");
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const variants = {
    default: {
      container: "bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg",
      title: "text-2xl font-bold mb-2",
      subtitle: "text-blue-100 mb-6",
      form: "space-y-4",
      input: "w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
      button: "w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center",
      success: "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center",
      error: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center"
    },
    compact: {
      container: "bg-gray-50 border border-gray-200 p-6 rounded-lg",
      title: "text-lg font-semibold text-gray-900 mb-2",
      subtitle: "text-gray-600 mb-4",
      form: "flex gap-3",
      input: "flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      button: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-200 flex items-center justify-center",
      success: "bg-green-50 border border-green-200 text-green-800 px-3 py-2 rounded-md text-sm flex items-center",
      error: "bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded-md text-sm flex items-center"
    },
    footer: {
      container: "bg-gray-800 text-white p-6 rounded-lg",
      title: "text-lg font-semibold mb-2",
      subtitle: "text-gray-300 mb-4",
      form: "space-y-3",
      input: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      button: "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center",
      success: "bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded-md flex items-center",
      error: "bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-md flex items-center"
    }
  };

  const styles = variants[variant];

  return (
    <div className={`${styles.container} ${className}`}>
      <div className="text-center">
        <Mail className="w-8 h-8 mx-auto mb-3 opacity-80" />
        <h3 className={styles.title}>Stay Updated</h3>
        <p className={styles.subtitle}>
          Get the latest property listings, market insights, and exclusive offers delivered to your inbox.
        </p>
      </div>

      {status === 'success' && (
        <div className={styles.success}>
          <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <span>Thank you for subscribing! Check your email for confirmation.</span>
        </div>
      )}

      {status === 'error' && (
        <div className={styles.error}>
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <span>Please enter a valid email address.</span>
        </div>
      )}

      {(status !== 'success') && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className={styles.input}
            disabled={isSubmitting}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting || !email.trim()}
            className={`${styles.button} ${
              isSubmitting || !email.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </>
            )}
          </button>
        </form>
      )}

      <div className="mt-4 text-center text-xs opacity-75">
        <p>We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </div>
  );
};

export default NewsletterSignup;