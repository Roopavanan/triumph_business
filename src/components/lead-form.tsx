"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, PhoneCall, ShieldCheck } from "lucide-react";
import { submitLead, type LeadInput } from "@/app/actions";
import { Reveal, SectionLabel } from "./ui";

const investmentRanges = ["Under ₹10 Lakhs", "₹10 – 25 Lakhs", "₹25 – 50 Lakhs", "₹50 Lakhs+", "Prefer to discuss"];

const stepTitles = ["About you", "Your background", "Your motivation"];

const empty: LeadInput = {
  fullName: "",
  mobile: "",
  email: "",
  city: "",
  profession: "",
  ownsBusiness: "",
  investment: "",
  motivation: "",
};

type Errors = Partial<Record<keyof LeadInput, string>>;

function validate(step: number, d: LeadInput): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (!d.fullName.trim()) e.fullName = "Please enter your name";
    if (d.mobile.replace(/\D/g, "").length < 10) e.mobile = "Enter a valid mobile number";
    if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "Enter a valid email address";
  }
  if (step === 1) {
    if (!d.city.trim()) e.city = "Please enter your city";
    if (!d.profession.trim()) e.profession = "Please enter your profession";
    if (!d.ownsBusiness) e.ownsBusiness = "Please choose an option";
    if (!d.investment) e.investment = "Please choose a range";
  }
  return e;
}

const inputCls =
  "w-full rounded-xl border border-ink/10 bg-sand/60 px-4 py-3.5 text-ink outline-none transition placeholder:text-ink/35 focus:border-sun focus:bg-white focus:ring-4 focus:ring-sun/15";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/80">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 block text-sm text-coral"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

function Choice({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
        selected
          ? "border-sun bg-sun/10 text-ink ring-4 ring-sun/15"
          : "border-ink/10 bg-sand/60 text-ink/70 hover:border-ink/25"
      }`}
    >
      {children}
    </button>
  );
}

export function LeadForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<LeadInput>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof LeadInput>(k: K, v: LeadInput[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const next = () => {
    const e = validate(step, data);
    setErrors(e);
    if (Object.keys(e).length) return;
    setDir(1);
    setStep((s) => s + 1);
  };

  const back = () => {
    setDir(-1);
    setStep((s) => s - 1);
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (step < 2) return next();
    setServerError("");
    startTransition(async () => {
      const res = await submitLead(data);
      if (res.ok) setDone(true);
      else setServerError(res.error);
    });
  };

  return (
    <section id="apply" className="relative overflow-hidden bg-linear-to-br from-sun via-sun to-coral py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-white/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-coral/60 blur-[120px]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="text-white">
          <Reveal>
            <SectionLabel index="08" onRed>
              Get in touch
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Your Travel Business Could Start With{" "}
              <span className="underline decoration-white/40 decoration-4 underline-offset-8">
                One Conversation.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85">
              Tell us a little about yourself and our franchise team will get in touch with you.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 space-y-4">
              {[
                { icon: PhoneCall, text: "A personal call from our franchise team" },
                { icon: ShieldCheck, text: "Discuss eligibility, investment & location availability" },
                { icon: CheckCircle2, text: "Clear next steps — no obligation" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-white/90">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative rounded-[2rem] bg-white p-6 shadow-2xl shadow-coral/40 sm:p-10">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                    className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-linear-to-br from-sun to-coral text-white shadow-xl shadow-sun/30"
                  >
                    <CheckCircle2 className="h-10 w-10" />
                  </motion.div>
                  <h3 className="mt-6 font-display text-3xl font-bold">
                    Thank you, {data.fullName.split(" ")[0]}!
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-ink/65">
                    Your journey has begun. Our franchise team will contact you soon to discuss
                    eligibility, investment, location availability and the next steps.
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }}>
                  <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
                    Become a Triumph Holidays Franchise Partner
                  </h3>

                  <div className="mt-6 flex items-center gap-3">
                    {stepTitles.map((t, i) => (
                      <div key={t} className="flex-1">
                        <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
                          <motion.div
                            className="h-full bg-linear-to-r from-sun to-coral"
                            animate={{ width: i <= step ? "100%" : "0%" }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <p
                          className={`mt-2 text-xs font-medium ${
                            i === step ? "text-ink" : "text-ink/40"
                          }`}
                        >
                          {i + 1}. {t}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-8 min-h-[300px] overflow-hidden">
                    <AnimatePresence mode="wait" custom={dir} initial={false}>
                      <motion.div
                        key={step}
                        custom={dir}
                        initial={{ opacity: 0, x: dir * 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: dir * -40 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-5"
                      >
                        {step === 0 && (
                          <>
                            <Field label="Full Name" error={errors.fullName}>
                              <input
                                className={inputCls}
                                value={data.fullName}
                                onChange={(e) => set("fullName", e.target.value)}
                                placeholder="Your full name"
                                autoComplete="name"
                              />
                            </Field>
                            <Field label="Mobile Number" error={errors.mobile}>
                              <input
                                className={inputCls}
                                type="tel"
                                value={data.mobile}
                                onChange={(e) => set("mobile", e.target.value)}
                                placeholder="+91 98765 43210"
                                autoComplete="tel"
                              />
                            </Field>
                            <Field label="Email Address" error={errors.email}>
                              <input
                                className={inputCls}
                                type="email"
                                value={data.email}
                                onChange={(e) => set("email", e.target.value)}
                                placeholder="you@example.com"
                                autoComplete="email"
                              />
                            </Field>
                          </>
                        )}

                        {step === 1 && (
                          <>
                            <div className="grid gap-5 sm:grid-cols-2">
                              <Field label="City / Location" error={errors.city}>
                                <input
                                  className={inputCls}
                                  value={data.city}
                                  onChange={(e) => set("city", e.target.value)}
                                  placeholder="e.g. Chennai"
                                  autoComplete="address-level2"
                                />
                              </Field>
                              <Field label="Current Profession" error={errors.profession}>
                                <input
                                  className={inputCls}
                                  value={data.profession}
                                  onChange={(e) => set("profession", e.target.value)}
                                  placeholder="e.g. Travel consultant"
                                />
                              </Field>
                            </div>
                            <div>
                              <p className="mb-2 text-sm font-medium text-ink/80">
                                Do you currently own a business?
                              </p>
                              <div className="flex gap-2">
                                {(["yes", "no"] as const).map((v) => (
                                  <Choice
                                    key={v}
                                    selected={data.ownsBusiness === v}
                                    onClick={() => set("ownsBusiness", v)}
                                  >
                                    {v === "yes" ? "Yes, I do" : "Not yet"}
                                  </Choice>
                                ))}
                              </div>
                              {errors.ownsBusiness && (
                                <p className="mt-1 text-sm text-coral">{errors.ownsBusiness}</p>
                              )}
                            </div>
                            <div>
                              <p className="mb-2 text-sm font-medium text-ink/80">Investment Range</p>
                              <div className="flex flex-wrap gap-2">
                                {investmentRanges.map((r) => (
                                  <Choice
                                    key={r}
                                    selected={data.investment === r}
                                    onClick={() => set("investment", r)}
                                  >
                                    {r}
                                  </Choice>
                                ))}
                              </div>
                              {errors.investment && (
                                <p className="mt-1 text-sm text-coral">{errors.investment}</p>
                              )}
                            </div>
                          </>
                        )}

                        {step === 2 && (
                          <Field label="Why are you interested in starting a travel business?">
                            <textarea
                              className={`${inputCls} min-h-[200px] resize-none`}
                              value={data.motivation}
                              onChange={(e) => set("motivation", e.target.value)}
                              placeholder="Tell us about your goals, your market and what excites you about travel…"
                              maxLength={1000}
                            />
                            <span className="mt-1 block text-right text-xs text-ink/40">
                              {data.motivation.length}/1000
                            </span>
                          </Field>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {serverError && <p className="mt-4 text-sm text-coral">{serverError}</p>}

                  <div className="mt-6 flex items-center gap-3">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={back}
                        className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-5 py-4 font-semibold text-ink/70 transition hover:bg-ink/5"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                    )}
                    <motion.button
                      type="submit"
                      disabled={pending}
                      whileTap={{ scale: 0.97 }}
                      className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-linear-to-r from-sun to-coral px-6 py-4 font-semibold text-white shadow-lg shadow-sun/30 transition hover:shadow-xl disabled:opacity-70"
                    >
                      {pending ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" /> Submitting…
                        </>
                      ) : step < 2 ? (
                        <>
                          Continue
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      ) : (
                        <>
                          Start My Franchise Journey
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </motion.button>
                  </div>

                  <p className="mt-5 text-center text-xs leading-relaxed text-ink/50">
                    Submit your details and our franchise team will contact you to discuss
                    eligibility, investment, location availability and the next steps.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
