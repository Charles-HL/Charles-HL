import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getValidationMessage, type Locale } from "@/lib/validation-messages";

// Fonction pour extraire la locale depuis les headers ou body
const getLocaleFromRequest = (
  request: NextRequest,
  body?: Record<string, unknown>
): Locale => {
  // Priorité 1: locale dans le body de la requête
  if (body?.locale && (body.locale === "fr" || body.locale === "en")) {
    return body.locale as Locale;
  }

  // Priorité 2: header Accept-Language
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage?.includes("fr")) {
    return "fr";
  }

  // Par défaut: français
  return "fr";
};

// Configuration du transporteur SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
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
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(obj.email)) {
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
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.error("Configuration SMTP manquante");
      return NextResponse.json(
        { success: false, error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }

    // Parsing des données JSON
    const body = await request.json();

    // Récupération de la locale
    const locale = getLocaleFromRequest(request, body);

    // Validation des données
    const validation = validateContactData(body, locale);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Erreurs de validation détectées",
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;

    // Création du transporteur
    const transporter = createTransporter();

    // Vérification de la connexion SMTP
    await transporter.verify();

    // Configuration de l'email à envoyer
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.TO_EMAIL,
      replyTo: email, // Permettre de répondre directement au client
      subject: `[Contact Site Web] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            Nouveau message de contact
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Sujet:</strong> ${subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Message:</h3>
            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${message}</div>
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

    console.log(`Email de contact envoyé avec succès de ${email}`);

    return NextResponse.json(
      { success: true, message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de contact:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de l'envoi du message. Veuillez réessayer.",
      },
      { status: 500 }
    );
  }
}

// Méthode OPTIONS pour CORS si nécessaire
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
