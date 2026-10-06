"use server";

export type LeadInput = {
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  profession: string;
  ownsBusiness: "yes" | "no" | "";
  investment: string;
  motivation: string;
};

export type LeadResult = { ok: true } | { ok: false; error: string };

export async function submitLead(input: LeadInput): Promise<LeadResult> {
  const required: (keyof LeadInput)[] = ["fullName", "mobile", "email", "city", "profession", "ownsBusiness", "investment"];
  if (required.some((k) => !String(input[k] ?? "").trim())) {
    return { ok: false, error: "Please fill in all required fields." };
  }
  if (!/^\S+@\S+\.\S+$/.test(input.email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (input.mobile.replace(/\D/g, "").length < 10) {
    return { ok: false, error: "Please enter a valid mobile number." };
  }

  // TODO: forward the lead to a CRM, database or email service.
  console.log("[franchise-lead]", { ...input, receivedAt: new Date().toISOString() });

  return { ok: true };
}
