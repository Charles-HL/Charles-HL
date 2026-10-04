"use client";

import { useSearchParams } from "next/navigation";
import { isContactProfile } from "@/content/audiences";
import ContactForm from "./ContactForm";

/** Reads `?profil=` to pre-select the profile field. */
export default function ContactFormFromQuery() {
  const profile = useSearchParams().get("profil");

  return (
    <ContactForm
      key={profile ?? ""}
      initialProfile={isContactProfile(profile) ? profile : undefined}
    />
  );
}
