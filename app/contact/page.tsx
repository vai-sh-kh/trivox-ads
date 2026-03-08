"use client";

import { useState, FormEvent } from "react";
import { Footer } from "@/components/footer";
import { InnerPageLayout } from "@/components/inner-page-layout";
import { CONTACT, MEDIA_LINKS } from "@/lib/constants";
import { motion } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  MessageCircle,
  Send,
} from "lucide-react";

const INTRO_COPY =
  "Get in touch. We'd love to hear about your brand and how we can help you grow. Reach us by phone, email, or send a message directly via WhatsApp.";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};

    const trimmedName = name.trim();
    if (!trimmedName) {
      next.name = "Name is required.";
    } else if (trimmedName.length < 2) {
      next.name = "Name must be at least 2 characters.";
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      next.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      next.email = "Please enter a valid email address.";
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      next.message = "Message is required.";
    } else if (trimmedMessage.length < 10) {
      next.message = "Message must be at least 10 characters.";
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const lines = [];
    lines.push(`Name: ${trimmedName}`);
    lines.push(`Email: ${trimmedEmail}`);
    lines.push(`Message: ${trimmedMessage}`);
    const text = lines.join("\n\n");
    const url = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <InnerPageLayout
        contentClassName="w-full"
        centerContent={true}
        showDecorativeCircle={false}
      >
        <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          {/* Hero: same as Digital Marketing / About */}
          <header className="text-center max-w-6xl mx-auto w-full">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-black uppercase tracking-tight leading-[0.95] mt-6 sm:mt-8 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Contact
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {INTRO_COPY}
            </motion.p>
          </header>

          {/* Contact details + form: two columns on large screens */}
          <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12">
            {/* Contact info cards: same style as DM/About cards — title and value aligned start */}
            <div className="lg:col-span-2 space-y-6 text-start">
              <motion.a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-8 md:p-10 rounded-2xl border border-zinc-200 bg-white hover:border-brand-purple/30 hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
              >
                <div className="flex items-start gap-4">
                  <span className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center shrink-0 group-hover:bg-brand-purple/20 transition-colors">
                    <MapPin size={24} className="text-brand-purple" />
                  </span>
                  <div>
                    <h2 className="text-brand-purple font-black text-lg uppercase tracking-tight mb-2">
                      Address
                    </h2>
                    <p className="text-zinc-600 leading-relaxed text-base">
                      {CONTACT.address}
                    </p>
                  </div>
                </div>
              </motion.a>

              <motion.a
                href={`mailto:${CONTACT.email}`}
                className="block p-8 md:p-10 rounded-2xl border border-zinc-200 bg-white hover:border-brand-purple/30 hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
              >
                <div className="flex items-start gap-4">
                  <span className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center shrink-0 group-hover:bg-brand-purple/20 transition-colors">
                    <Mail size={24} className="text-brand-purple" />
                  </span>
                  <div>
                    <h2 className="text-brand-purple font-black text-lg uppercase tracking-tight mb-2">
                      Email
                    </h2>
                    <p className="text-zinc-600 leading-relaxed text-base break-all">
                      {CONTACT.email}
                    </p>
                  </div>
                </div>
              </motion.a>

              <motion.a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="block p-8 md:p-10 rounded-2xl border border-zinc-200 bg-white hover:border-brand-purple/30 hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
              >
                <div className="flex items-start gap-4">
                  <span className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center shrink-0 group-hover:bg-brand-purple/20 transition-colors">
                    <Phone size={24} className="text-brand-purple" />
                  </span>
                  <div>
                    <h2 className="text-brand-purple font-black text-lg uppercase tracking-tight mb-2">
                      Phone
                    </h2>
                    <p className="text-zinc-600 leading-relaxed text-base">
                      {CONTACT.phone}
                    </p>
                  </div>
                </div>
              </motion.a>

              {MEDIA_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-8 md:p-10 rounded-2xl border border-zinc-200 bg-white hover:border-brand-purple/30 hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -6 }}
                >
                  <div className="flex items-start gap-4">
                    <span className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center shrink-0 group-hover:bg-brand-purple/20 transition-colors">
                      {link.label === "Instagram" ? (
                        <Instagram size={24} className="text-brand-purple" />
                      ) : link.label === "Facebook" ? (
                        <Facebook size={24} className="text-brand-purple" />
                      ) : (
                        <MessageCircle
                          size={24}
                          className="text-brand-purple"
                        />
                      )}
                    </span>
                    <div>
                      <h2 className="text-brand-purple font-black text-lg uppercase tracking-tight mb-2">
                        {link.label}
                      </h2>
                      <p className="text-zinc-600 leading-relaxed text-base">
                        {link.href.replace(/^https?:\/\//, "")}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Contact form: same card style as contact info + DM/About cards */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
            >
              <div className="p-8 md:p-10 rounded-2xl border border-zinc-200 bg-white hover:border-brand-purple/30 hover:shadow-xl transition-all duration-300">
                <h2 className="text-brand-purple font-black text-2xl md:text-3xl uppercase tracking-tight mb-2 text-start">
                  Send a message via WhatsApp
                </h2>
                <p className="text-zinc-600 leading-relaxed text-base md:text-lg mb-8 text-start">
                  Fill in your details and message below. Click Send to open
                  WhatsApp with your message ready to send.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6 text-start">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-brand-purple font-black text-xs uppercase tracking-widest mb-2 text-start"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name)
                          setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={
                        errors.name ? "contact-name-error" : undefined
                      }
                      className={`w-full min-h-[44px] px-4 py-3.5 rounded-xl border bg-white text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-all duration-200 text-base text-start ${
                        errors.name ? "border-red-500" : "border-zinc-200"
                      }`}
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        className="mt-1.5 text-sm text-red-600 text-start"
                        role="alert"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-brand-purple font-black text-xs uppercase tracking-widest mb-2 text-start"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email)
                          setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="your@email.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "contact-email-error" : undefined
                      }
                      className={`w-full min-h-[44px] px-4 py-3.5 rounded-xl border bg-white text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-all duration-200 text-base text-start ${
                        errors.email ? "border-red-500" : "border-zinc-200"
                      }`}
                    />
                    {errors.email && (
                      <p
                        id="contact-email-error"
                        className="mt-1.5 text-sm text-red-600 text-start"
                        role="alert"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-brand-purple font-black text-xs uppercase tracking-widest mb-2 text-start"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message)
                          setErrors((prev) => ({
                            ...prev,
                            message: undefined,
                          }));
                      }}
                      placeholder="Your message..."
                      rows={5}
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "contact-message-error" : undefined
                      }
                      className={`w-full px-4 py-3.5 rounded-xl border bg-white text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-all duration-200 resize-y min-h-[120px] sm:min-h-[140px] text-base leading-relaxed text-start ${
                        errors.message ? "border-red-500" : "border-zinc-200"
                      }`}
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        className="mt-1.5 text-sm text-red-600 text-start"
                        role="alert"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-brand-purple text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-purple-900 transition-all duration-300 w-full sm:w-auto active:scale-[0.98]"
                  >
                    <Send size={18} strokeWidth={2.5} />
                    Send via WhatsApp
                  </button>
                </form>
              </div>
            </motion.div>
          </section>
        </div>
      </InnerPageLayout>
      <Footer />
    </>
  );
}
