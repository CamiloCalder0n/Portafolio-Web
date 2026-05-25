"use client";

import React, { useState } from "react";

type ContactState = "idle" | "submitting" | "success" | "error";

interface ContactResponse {
  ok: boolean;
  error?: string;
}

const INITIAL_FORM_STATE = { name: "", email: "", message: "" };

export default function Contact() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [contactState, setContactState] = useState<ContactState>("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (contactState === "error") {
      setContactState("idle");
      setFeedback("");
    }

    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactState("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const result = (await response.json()) as ContactResponse;

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "The message could not be sent.");
      }

      setContactState("success");
      setFormState(INITIAL_FORM_STATE);
    } catch (error) {
      setContactState("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "The message could not be sent right now."
      );
    }
  };

  return (
    <section
      id="contact"
      className="pt-24 pb-[60px] sm:pt-32 sm:pb-[60px] px-6 sm:px-12 md:px-24 bg-bg2/80 relative border-t border-border overflow-hidden"
      aria-label="Contact & Connection Section"
    >
      {/* Subtle floating background detail grids */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.012)_1.5px,transparent_1.5px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Heading and Connection Details */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-8">
            <div>
              <span className="label-caps mb-4 block tracking-[0.15em] text-accent">GET IN TOUCH</span>
              <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-text mb-6">
                Let&apos;s Build something real.
              </h2>
              <p className="text-sm sm:text-base leading-relaxed max-w-md" style={{ color: '#C8C8DC' }}>
                Whether you have an internship opportunity, a freelance project, or simply want to chat about creative coding, feel free to reach out. I am always open to exploring new engineering horizons.
              </p>
            </div>

            {/* Connection Information List */}
            <div className="flex flex-col gap-6">
              
              {/* Row 1: Email */}
              <div className="flex flex-col gap-1">
                <span style={{fontSize:'11px', letterSpacing:'0.08em', 
                  color:'#C8C8DC', fontWeight:500}}>EMAIL</span>
                <a href="mailto:calderoncamilo905@gmail.com"
                  style={{color:'#C8C8DC', fontSize:'14px'}}>
                  calderoncamilo905@gmail.com
                </a>
              </div>

              {/* Row 2: Location */}
              <div className="flex flex-col gap-1">
                <span style={{fontSize:'11px', letterSpacing:'0.08em',
                  color:'#C8C8DC', fontWeight:500}}>LOCATION</span>
                <span style={{color:'#C8C8DC', fontSize:'14px'}}>
                  Bucaramanga, Colombia
                </span>
              </div>

              {/* Row 3: Linkedin */}
              <div className="flex flex-col gap-1">
                <span style={{fontSize:'11px', letterSpacing:'0.08em',
                  color:'#C8C8DC', fontWeight:500}}>LINKEDIN</span>
                <a href="https://linkedin.com/in/juan-camilo-calderon-calderon-729619389"
                  target="_blank" rel="noopener noreferrer" style={{color:'#C8C8DC', fontSize:'14px'}}>
                  Juan Camilo Calderón
                </a>
              </div>

              {/* Row 4: Github */}
              <div className="flex flex-col gap-1">
                <span style={{fontSize:'11px', letterSpacing:'0.08em',
                  color:'#C8C8DC', fontWeight:500}}>GITHUB</span>
                <a href="https://github.com/CamiloCalder0n"
                  target="_blank" rel="noopener noreferrer" style={{color:'#C8C8DC', fontSize:'14px'}}>
                  CamiloCalder0n
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="lg:col-span-7">
            <div className="border border-border bg-card/40 rounded-2xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-md">
              
              {/* Form border lighting glow ambient element */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Form Header */}
                <div className="border-b border-border/40 pb-6 mb-8 flex justify-between items-center">
                  <span className="font-mono text-[10px] text-muted/50 uppercase tracking-widest">
                    [ SECURE_MESSAGE_SERVICE ]
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse" />
                  </span>
                </div>

                {contactState === "success" ? (
                  <div className="py-12 text-center space-y-4" role="status" aria-live="polite">
                    {/* Pulse ring — no bounce, smooth scale + opacity */}
                    <div className="relative w-14 h-14 mx-auto mb-4">
                      <span className="absolute inset-0 rounded-full bg-accent/20 animate-ping" style={{ animationDuration: '1.6s' }} />
                      <div className="relative w-14 h-14 rounded-full border border-accent/50 bg-accent/10 flex items-center justify-center text-accent">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-medium text-text">Message Sent</h3>
                    <p className="text-sm max-w-xs mx-auto" style={{ color: '#C8C8DC' }}>
                      Thank you. I will review your message and reply as soon as possible.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Name Input */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="font-mono text-[11px] text-muted uppercase tracking-widest block">
                          NAME
                        </label>
                        <input
                          required
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          autoComplete="name"
                          placeholder="Your name"
                          className="w-full bg-base/40 border border-border/80 rounded-lg px-4 py-3 text-sm text-text placeholder:text-border focus:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors duration-300 font-mono"
                        />
                      </div>

                      {/* Email Input */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="font-mono text-[11px] text-muted uppercase tracking-widest block">
                          EMAIL
                        </label>
                        <input
                          required
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          autoComplete="email"
                          placeholder="your@email.com"
                          className="w-full bg-base/40 border border-border/80 rounded-lg px-4 py-3 text-sm text-text placeholder:text-border focus:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors duration-300 font-mono"
                        />
                      </div>

                    </div>

                    {/* Message TextArea */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="font-mono text-[11px] text-muted uppercase tracking-widest block">
                        MESSAGE
                      </label>
                      <textarea
                        required
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        className="w-full bg-base/40 border border-border/80 rounded-lg px-4 py-3 text-sm text-text placeholder:text-border focus:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors duration-300 font-mono resize-none"
                      />
                    </div>

                    <p
                      className={`min-h-5 text-sm ${
                        contactState === "error" ? "text-text" : "text-muted"
                      }`}
                      role={contactState === "error" ? "alert" : "status"}
                      aria-live="polite"
                    >
                      {contactState === "error" ? feedback : ""}
                    </p>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={contactState === "submitting"}
                      className="w-full py-4 rounded-lg bg-accent text-white font-mono text-xs uppercase tracking-widest font-semibold hover:opacity-85 disabled:cursor-wait disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-opacity duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {contactState === "submitting" ? "Sending..." : "Send Message"} &rarr;
                    </button>
                  </>
                )}

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
