"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailTo = "mianclothhouse@gmail.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(
      `Assalam-o-Alaikum,\n\n${message}\n\n— ${name}\n\n(Reply to this email to continue the conversation)`
    );
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    setIsSubmitting(false);
  };

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Reach Us</p>
          <h1 className="font-display mt-3 text-4xl text-primary sm:text-5xl">Contact Us</h1>
          <div className="gold-rule mx-auto mt-5" />
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            We are here to help. Send a message, call, or reach us on WhatsApp.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="bg-card p-7 shadow-sm">
              <h2 className="font-display text-2xl text-primary">Get in Touch</h2>
              <div className="mt-6 space-y-5 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-gold">Email</p>
                  <a href={`mailto:${emailTo}`} className="mt-1 block hover:text-primary">
                    {emailTo}
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-gold">WhatsApp</p>
                  <a
                    href="https://wa.me/923027726309"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block hover:text-primary"
                  >
                    +92 302 7726309
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-gold">Location</p>
                  <p className="mt-1">Kot Muzaffar, Tehsil Mailsi, Pakistan</p>
                  <p className="mt-1 text-muted-foreground">Mon–Sun, 9:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden bg-card shadow-sm">
              <div className="border-b border-border px-5 py-4">
                <h2 className="font-display text-xl text-primary">Find Us Here</h2>
              </div>
              <div className="h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6927.941595360845!2d72.09174866674363!3d29.74955831694827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393c842b2bbb6b0b%3A0xcddfe4d6bac9bc88!2sKot%20Muzaffar%2C%20Pakistan!5e0!3m2!1sen!2s!4v1756120724931!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="bg-card p-7 shadow-sm">
            <h2 className="font-display text-2xl text-primary">Send a Message</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-1 block text-sm text-foreground/80">Your Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-foreground/80">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={6}
                  className="w-full border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary py-3 text-sm uppercase tracking-[0.16em] text-primary-foreground disabled:opacity-60"
              >
                {isSubmitting ? "Opening email..." : "Send via Email"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
