"use client";

import React, { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineEnvelope, HiOutlineMapPin } from "react-icons/hi2";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ContactState = "idle" | "submitting" | "success" | "error";

interface ContactResponse {
  ok: boolean;
  error?: string;
}

interface ContactDetail {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  Icon: IconType;
}

const INITIAL_FORM_STATE = { name: "", email: "", message: "" };

const CONTACT_DETAILS: ContactDetail[] = [
  {
    label: "Email",
    value: "calderoncamilo905@gmail.com",
    href: "mailto:calderoncamilo905@gmail.com",
    Icon: HiOutlineEnvelope,
  },
  { label: "Location", value: "Bucaramanga, Colombia", Icon: HiOutlineMapPin },
  {
    label: "LinkedIn",
    value: "Juan Camilo Calderón",
    href: "https://linkedin.com/in/juan-camilo-calderon-calderon-729619389",
    external: true,
    Icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    value: "CamiloCalder0n",
    href: "https://github.com/CamiloCalder0n",
    external: true,
    Icon: FaGithub,
  },
];

const FIELD_CLASS =
  "w-full bg-base/40 border border-border/80 rounded-lg px-4 py-3 text-base text-text placeholder:text-muted/45 focus:border-accent focus-visible:outline-none transition-colors duration-300";

export default function Contact() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [contactState, setContactState] = useState<ContactState>("idle");
  const [feedback, setFeedback] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set("[data-reveal]", { opacity: 1, y: 0 });
        return;
      }

      gsap.from("[data-reveal]", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "jc.soft",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      ref={sectionRef}
      id="contact"
      className="section-pad px-6 sm:px-12 md:px-24 relative overflow-hidden"
      aria-label="Contact"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-20 lg:gap-x-24">
          {/* Left: headline + warm line + contact details */}
          <div className="lg:col-span-6 flex flex-col">
            <h2
              data-reveal
              className="text-display text-text max-w-2xl"
            >
              Where good code and good design become the{" "}
              <span className="italic-accent">same thing.</span>
            </h2>

            <p
              data-reveal
              className="mt-8 text-lg leading-relaxed text-muted max-w-md"
            >
              An internship, a freelance project, or simply a conversation about
              creative coding — I&apos;m always glad to hear from people building
              with care.
            </p>

            <dl data-reveal className="mt-14 flex flex-col gap-6">
              {CONTACT_DETAILS.map(({ label, value, href, external, Icon }) => (
                <div key={label} className="flex items-center gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/70 text-muted"
                    aria-hidden="true"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <dt className="text-xs uppercase tracking-[0.12em] text-muted/60">
                      {label}
                    </dt>
                    <dd className="text-base text-text">
                      {href ? (
                        <a
                          href={href}
                          className="link-underline hover:text-accent transition-colors duration-300 focus-visible:outline-none focus-visible:text-accent"
                          {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: form card */}
          <div data-reveal className="lg:col-span-6 lg:pt-3">
            <div className="border border-border bg-card/40 rounded-2xl p-6 sm:p-10 backdrop-blur-md relative overflow-hidden">
              {/* Subtle indigo glow — corner accent */}
              <div
                aria-hidden="true"
                className="pointer-events-none -z-10 absolute -top-16 -right-16 h-56 w-56 rounded-full bg-accent/5 blur-3xl"
              />

              {contactState === "success" ? (
                <div
                  className="flex flex-col justify-center min-h-[20rem]"
                  role="status"
                  aria-live="polite"
                >
                  <h3 className="font-display text-3xl sm:text-4xl text-text">
                    Message <span className="italic-accent">sent.</span>
                  </h3>
                  <p className="mt-5 text-lg leading-relaxed text-muted">
                    Thank you for reaching out. I&apos;ll read your message and
                    reply as soon as I can.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-7"
                  noValidate
                >
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-sm text-muted/70 tracking-wide"
                    >
                      Name
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
                      className={FIELD_CLASS}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm text-muted/70 tracking-wide"
                    >
                      Email
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
                      className={FIELD_CLASS}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-sm text-muted/70 tracking-wide"
                    >
                      Message
                    </label>
                    <textarea
                      required
                      id="message"
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell me a little about what you have in mind…"
                      className={`${FIELD_CLASS} resize-none`}
                    />
                  </div>

                  <p
                    className={`min-h-5 text-sm ${
                      contactState === "error" ? "text-accent" : "text-muted"
                    }`}
                    role={contactState === "error" ? "alert" : "status"}
                    aria-live="polite"
                  >
                    {contactState === "error" ? feedback : ""}
                  </p>

                  <button
                    type="submit"
                    disabled={contactState === "submitting"}
                    className="group inline-flex items-center gap-3 self-start border border-border/80 rounded-lg px-6 py-3 text-base text-text hover:border-accent hover:text-accent disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:border-accent transition-colors duration-300 cursor-pointer"
                  >
                    <span>
                      {contactState === "submitting"
                        ? "Sending…"
                        : "Send message"}
                    </span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
