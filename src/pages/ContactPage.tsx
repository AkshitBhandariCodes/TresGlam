import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { WHATSAPP_NUMBER } from "@/const";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sendEmail = trpc.contact.send.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    },
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Phone must be at least 10 digits";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    sendEmail.mutate(formData);
  };

  const whatsAppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20TresGlam,%20I%20have%20a%20question`;

  const inputClasses =
    "w-full px-4 py-3.5 rounded-xl bg-white border border-[#EAD6CF] text-[#2A1E1A] placeholder-[#A58A82] focus:outline-none focus:ring-2 focus:ring-[#E7B7AE]/40 focus:border-[#E7B7AE] transition-all text-sm";

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#FDF7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#9C5A4A] text-xs uppercase tracking-[0.25em] font-medium mb-4">
            CONTACT US
          </p>
          <h1
            className="font-semibold text-[#2A1E1A] mb-4"
            style={{
              fontSize: "clamp(32px, 4vw, 56px)",
              lineHeight: 1.1,
            }}
          >
            Let’s talk beauty.
          </h1>
          <p className="text-[#6B5C56] text-lg max-w-md mx-auto">
            We would love to hear from you. Share your questions or ritual goals.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-2/5 flex flex-col gap-6"
          >
            {/* Email Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#F2E7E4] hover:border-[#E7B7AE] hover:shadow-lg hover:shadow-[#EBC7BF]/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F3E1DB] flex items-center justify-center flex-shrink-0">
                  <Mail size={22} className="text-[#9C5A4A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2A1E1A] mb-1">Email</h3>
                  <p className="text-[#6B5C56] text-sm">hello@tresglam.com</p>
                  <p className="text-[#6B5C56] text-sm">support@tresglam.com</p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#F2E7E4] hover:border-[#E7B7AE] hover:shadow-lg hover:shadow-[#EBC7BF]/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F3E1DB] flex items-center justify-center flex-shrink-0">
                  <Phone size={22} className="text-[#9C5A4A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2A1E1A] mb-1">Phone</h3>
                  <p className="text-[#6B5C56] text-sm">+91 97697 71850</p>
                  <p className="text-[#6B5C56] text-sm">+91 98765 43211</p>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#F2E7E4] hover:border-[#E7B7AE] hover:shadow-lg hover:shadow-[#EBC7BF]/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F3E1DB] flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} className="text-[#9C5A4A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2A1E1A] mb-1">
                    Address
                  </h3>
                  <p className="text-[#6B5C56] text-sm">
                    TresGlam HQ, Andheri West,
                    <br />
                    Mumbai, Maharashtra 400053
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-3xl p-6 border border-[#F2E7E4] hover:border-[#E7B7AE] hover:shadow-lg hover:shadow-[#EBC7BF]/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F3E1DB] flex items-center justify-center flex-shrink-0">
                  <Clock size={22} className="text-[#9C5A4A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2A1E1A] mb-1">
                    Business Hours
                  </h3>
                  <p className="text-[#6B5C56] text-sm">
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-[#6B5C56] text-sm">
                    Saturday: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Connect */}
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2A1E1A] rounded-3xl p-6 flex items-center gap-4 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={22} className="text-[#F8EDE8]" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">
                  Chat on WhatsApp
                </h3>
                <p className="text-white/70 text-sm">
                  Quick response during business hours
                </p>
              </div>
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:w-3/5"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-10 text-center h-full flex flex-col items-center justify-center border border-[#F2E7E4]"
              >
                <div className="w-16 h-16 rounded-full bg-[#EAF4F1] flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-[#58A38B]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2A1E1A] mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-[#6B5C56]">
                  Thank you for reaching out. We will get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F2E7E4] flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#2A1E1A] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={inputClasses}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2A1E1A] mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={inputClasses}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#2A1E1A] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={inputClasses}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2A1E1A] mb-2">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className={inputClasses}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Question">Product Question</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Bulk Order">Bulk Order</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2A1E1A] mb-2">
                    Your Message
                  </label>
                  <textarea
                    placeholder="Tell us how we can help..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`${inputClasses} resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={sendEmail.isPending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#2A1E1A] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#3B2B25] transition-colors disabled:opacity-70 text-base"
                >
                  <Send size={18} />
                  {sendEmail.isPending ? "Sending..." : "Send Message"}
                </motion.button>

                {sendEmail.isError && (
                  <p className="text-red-500 text-sm text-center">
                    Failed to send message. Please try again.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
