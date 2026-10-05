import { NextRequest, NextResponse } from "next/server";
import { isContactProfile, type ContactProfile } from "@/content/audiences";
import { escapeHtml } from "@/lib/escape-html";
import {
  createTransporter,
  getLocaleFromRequest,
  hasValidCaptcha,
  isHoneypotFilled,
  isRateLimited,
  isSmtpConfigured,
  isValidEmail,
  singleLine,
} from "@/lib/mail-api";
import { getValidationMessage, type Locale } from "@/lib/validation-messages";

// Libellés du profil dans l'e-mail reçu (en français)
const profileLabels: Record<ContactProfile, string> = {
  freelance: "Développeur pour un projet",
  consulting: "Consultant pour une mission",
  recruiters: "Profil à recruter",
  other: "Autre",
};

// Validation des données du formulaire avec messages d'erreur détaillés
const validateContactData = (
  data: unknown,
  locale: Locale = "fr"
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data || typeof data !== "object") {
    errors.push(getValidationMessage("invalidDataFormat", locale));
    return { isValid: false, errors };
  }

  const obj = data as Record<string, unknown>;

  // Validation du profil
  if (typeof obj.profile !== "string" || obj.profile.trim().length === 0) {
    errors.push(getValidationMessage("profileRequired", locale));
  } else if (!isContactProfile(obj.profile)) {
    errors.push(getValidationMessage("profileInvalid", locale));
  }

  // Validation du nom
  if (typeof obj.name !== "string") {
    errors.push(getValidationMessage("nameRequired", locale));
  } else if (obj.name.trim().length === 0) {
    errors.push(getValidationMessage("nameEmpty", locale));
  } else if (obj.name.trim().length < 2) {
    errors.push(getValidationMessage("nameTooShort", locale));
  } else if (obj.name.trim().length > 100) {
    errors.push(getValidationMessage("nameTooLong", locale));
  }

  // Validation de l'email
  if (typeof obj.email !== "string") {
    errors.push(getValidationMessage("emailRequired", locale));
  } else if (obj.email.trim().length === 0) {
    errors.push(getValidationMessage("emailEmpty", locale));
  } else if (!isValidEmail(obj.email)) {
    errors.push(getValidationMessage("emailInvalid", locale));
  } else if (obj.email.length > 254) {
    errors.push(getValidationMessage("emailTooLong", locale));
  }

  // Validation du sujet
  if (typeof obj.subject !== "string") {
    errors.push(getValidationMessage("subjectRequired", locale));
  } else if (obj.subject.trim().length === 0) {
    errors.push(getValidationMessage("subjectEmpty", locale));
  } else if (obj.subject.trim().length < 3) {
    errors.push(getValidationMessage("subjectTooShort", locale));
  } else if (obj.subject.trim().length > 200) {
    errors.push(getValidationMessage("subjectTooLong", locale));
  }

  // Validation du message
  if (typeof obj.message !== "string") {
    errors.push(getValidationMessage("messageRequired", locale));
  } else if (obj.message.trim().length === 0) {
    errors.push(getValidationMessage("messageEmpty", locale));
  } else if (obj.message.trim().length < 10) {
    errors.push(getValidationMessage("messageTooShort", locale));
  } else if (obj.message.trim().length > 5000) {
    errors.push(getValidationMessage("messageTooLong", locale));
  }

  return { isValid: errors.length === 0, errors };
};

export async function POST(request: NextRequest) {
  try {
    // Vérification des variables d'environnement
    if (!isSmtpConfigured()) {
      console.error("Configuration SMTP manquante");
      return NextResponse.json(
        { success: false, error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }

    if (isRateLimited(request)) {
      return NextResponse.json(
        { success: false, error: "Trop de demandes. Veuillez réessayer plus tard." },
        { status: 429 }
      );
    }

    // Parsing des données JSON
    const body = await request.json().catch(() => undefined);

    // Champ piège : un robot le remplit, on feint le succès sans rien envoyer
    if (isHoneypotFilled(body)) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Récupération de la locale
    const locale = getLocaleFromRequest(request, body);

    // Vérification Cloudflare Turnstile (active dès que TURNSTILE_SECRET_KEY est définie)
    if (!(await hasValidCaptcha(request, body))) {
      return NextResponse.json(
        { success: false, error: getValidationMessage("captchaFailed", locale) },
        { status: 400 }
      );
    }

    // Validation des données
    const validation = validateContactData(body, locale);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: getValidationMessage("validationErrorsDetected", locale),
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;
    const profile = profileLabels[body.profile as ContactProfile];

    // Création du transporteur
    const transporter = createTransporter();

    // Vérification de la connexion SMTP
    await transporter.verify();

    // Configuration de l'email à envoyer
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.TO_EMAIL,
      replyTo: email.trim(), // Permettre de répondre directement au client
      subject: `[Contact Site Web · ${profile}] ${singleLine(subject)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            Nouveau message de contact
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Profil:</strong> ${escapeHtml(profile)}</p>
            <p><strong>Nom:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p><strong>Sujet:</strong> ${escapeHtml(subject)}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Message:</h3>
            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${escapeHtml(message)}</div>
          </div>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 14px;">
            Ce message a été envoyé depuis le formulaire de contact de votre site web.
            <br>
            Pour répondre, utilisez simplement la fonction "Répondre" de votre client email.
          </p>
        </div>
      `,
      text: `
Nouveau message de contact

Profil: ${profile}
Nom: ${name}
Email: ${email}
Sujet: ${subject}

Message:
${message}

---
Ce message a été envoyé depuis le formulaire de contact de votre site web.
      `,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    console.log("Email de contact envoyé");

    return NextResponse.json(
      { success: true, message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'email de contact:",
      error instanceof Error ? error.message : "inconnue"
    );

    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de l'envoi du message. Veuillez réessayer.",
      },
      { status: 500 }
    );
  }
}
