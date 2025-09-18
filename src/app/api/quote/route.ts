import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getValidationMessage, getProjectTypeInvalidMessage, getTimelineInvalidMessage, type Locale } from "@/lib/validation-messages";

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
      pass: process.env.SMTP_PASSWORD, // Mot de passe d'application Google
    },
  });
};

// Validation des données du formulaire avec messages d'erreur détaillés
const validateQuoteData = (
  data: unknown,
  locale: Locale = "fr"
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data || typeof data !== "object") {
    errors.push(getValidationMessage("invalidDataFormat", locale));
    return { isValid: false, errors };
  }

  const obj = data as Record<string, unknown>;

  // Validation du prénom
  if (typeof obj.firstName !== "string") {
    errors.push(getValidationMessage("firstNameRequired", locale));
  } else if (obj.firstName.trim().length === 0) {
    errors.push(getValidationMessage("firstNameEmpty", locale));
  } else if (obj.firstName.trim().length < 2) {
    errors.push(getValidationMessage("firstNameTooShort", locale));
  } else if (obj.firstName.trim().length > 50) {
    errors.push(getValidationMessage("firstNameTooLong", locale));
  }

  // Validation du nom de famille
  if (typeof obj.lastName !== "string") {
    errors.push(getValidationMessage("lastNameRequired", locale));
  } else if (obj.lastName.trim().length === 0) {
    errors.push(getValidationMessage("lastNameEmpty", locale));
  } else if (obj.lastName.trim().length < 2) {
    errors.push(getValidationMessage("lastNameTooShort", locale));
  } else if (obj.lastName.trim().length > 50) {
    errors.push(getValidationMessage("lastNameTooLong", locale));
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

  // Validation de l'entreprise (optionnelle)
  if (
    obj.company &&
    typeof obj.company === "string" &&
    obj.company.trim().length > 100
  ) {
    errors.push(getValidationMessage("companyTooLong", locale));
  }

  // Validation du type de projet
  const validProjectTypes = [
    "website",
    "backend",
    "fullstack",
    "mobile",
    "other",
  ];
  if (typeof obj.projectType !== "string") {
    errors.push(getValidationMessage("projectTypeRequired", locale));
  } else if (obj.projectType.trim().length === 0) {
    errors.push(getValidationMessage("projectTypeEmpty", locale));
  } else if (!validProjectTypes.includes(obj.projectType)) {
    errors.push(
      getProjectTypeInvalidMessage(validProjectTypes, locale)
    );
  }

  // Validation du budget minimum
  if (typeof obj.budgetMin !== "string") {
    errors.push(getValidationMessage("budgetMinRequired", locale));
  } else if (obj.budgetMin.trim().length === 0) {
    errors.push(getValidationMessage("budgetMinEmpty", locale));
  } else if (isNaN(Number(obj.budgetMin))) {
    errors.push(getValidationMessage("budgetMinInvalid", locale));
  } else if (Number(obj.budgetMin) < 0) {
    errors.push(getValidationMessage("budgetMinNegative", locale));
  } else if (Number(obj.budgetMin) > 1000000) {
    errors.push(getValidationMessage("budgetMinTooHigh", locale));
  }

  // Validation du budget maximum
  if (typeof obj.budgetMax !== "string") {
    errors.push(getValidationMessage("budgetMaxRequired", locale));
  } else if (obj.budgetMax.trim().length === 0) {
    errors.push(getValidationMessage("budgetMaxEmpty", locale));
  } else if (isNaN(Number(obj.budgetMax))) {
    errors.push(getValidationMessage("budgetMaxInvalid", locale));
  } else if (Number(obj.budgetMax) <= 0) {
    errors.push(getValidationMessage("budgetMaxZero", locale));
  } else if (Number(obj.budgetMax) > 1000000) {
    errors.push(getValidationMessage("budgetMaxTooHigh", locale));
  }

  // Validation de la cohérence des budgets
  if (
    typeof obj.budgetMin === "string" &&
    typeof obj.budgetMax === "string" &&
    !isNaN(Number(obj.budgetMin)) &&
    !isNaN(Number(obj.budgetMax))
  ) {
    if (Number(obj.budgetMin) > Number(obj.budgetMax)) {
      errors.push(getValidationMessage("budgetCoherence", locale));
    }
  }

  // Validation du délai
  const validTimelines = ["urgent", "fast", "normal", "flexible"];
  if (typeof obj.timeline !== "string") {
    errors.push(getValidationMessage("timelineRequired", locale));
  } else if (obj.timeline.trim().length === 0) {
    errors.push(getValidationMessage("timelineEmpty", locale));
  } else if (!validTimelines.includes(obj.timeline)) {
    errors.push(
      getTimelineInvalidMessage(validTimelines, locale)
    );
  }

  // Validation de la description
  if (typeof obj.description !== "string") {
    errors.push(getValidationMessage("descriptionRequired", locale));
  } else if (obj.description.trim().length === 0) {
    errors.push(getValidationMessage("descriptionEmpty", locale));
  } else if (obj.description.trim().length < 10) {
    errors.push(getValidationMessage("descriptionTooShort", locale));
  } else if (obj.description.trim().length > 5000) {
    errors.push(getValidationMessage("descriptionTooLong", locale));
  }

  // Validation des exigences (optionnelles)
  if (
    obj.requirements &&
    typeof obj.requirements === "string" &&
    obj.requirements.trim().length > 2000
  ) {
    errors.push(getValidationMessage("requirementsTooLong", locale));
  }

  return { isValid: errors.length === 0, errors };
};

// Fonction pour formater le budget
const formatBudget = (min: string, max: string): string => {
  const minNum = Number(min);
  const maxNum = Number(max);
  return `${minNum.toLocaleString("fr-FR")} € - ${maxNum.toLocaleString(
    "fr-FR"
  )} €`;
};

// Fonction pour formater le type de projet
const formatProjectType = (type: string): string => {
  const types: Record<string, string> = {
    website: "Site Web / Application Web",
    backend: "API Backend",
    fullstack: "Application Full Stack",
    mobile: "Application Mobile",
    other: "Autre",
  };
  return types[type] || type;
};

// Fonction pour formater le délai
const formatTimeline = (timeline: string): string => {
  const timelines: Record<string, string> = {
    urgent: "ASAP (Frais d'urgence applicables)",
    fast: "1-2 mois",
    normal: "2-4 mois",
    flexible: "Flexible",
  };
  return timelines[timeline] || timeline;
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
    const validation = validateQuoteData(body, locale);
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

    const {
      firstName,
      lastName,
      email,
      company,
      projectType,
      budgetMin,
      budgetMax,
      timeline,
      description,
      requirements,
    } = body;

    // Création du transporteur
    const transporter = createTransporter();

    // Vérification de la connexion SMTP
    await transporter.verify();

    // Configuration de l'email à envoyer
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.TO_EMAIL,
      replyTo: email, // Permettre de répondre directement au client
      subject: `[Demande de Devis] ${formatProjectType(
        projectType
      )} - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            Nouvelle demande de devis
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Informations client</h3>
            <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${company ? `<p><strong>Entreprise:</strong> ${company}</p>` : ""}
          </div>
          
          <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ea580c;">
            <h3 style="color: #ea580c; margin-top: 0;">Détails du projet</h3>
            <p><strong>Type de projet:</strong> ${formatProjectType(
              projectType
            )}</p>
            <p><strong>Budget:</strong> ${formatBudget(
              budgetMin,
              budgetMax
            )}</p>
            <p><strong>Délai souhaité:</strong> ${formatTimeline(timeline)}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Description du projet</h3>
            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${description}</div>
          </div>
          
          ${
            requirements
              ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Exigences spécifiques</h3>
            <div style="background-color: #f3f4f6; border: 1px solid #e5e7eb; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${requirements}</div>
          </div>
          `
              : ""
          }
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <div style="background-color: #ecfdf5; padding: 15px; border-radius: 6px; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #065f46; font-weight: bold;">
              💡 Action recommandée
            </p>
            <p style="margin: 5px 0 0 0; color: #047857;">
              Répondez dans les 24h pour maintenir un excellent service client.
              Utilisez la fonction "Répondre" pour contacter directement le client.
            </p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            Cette demande a été envoyée depuis le formulaire de devis de votre site web.
          </p>
        </div>
      `,
      text: `
Nouvelle demande de devis

=== INFORMATIONS CLIENT ===
Nom: ${firstName} ${lastName}
Email: ${email}
${company ? `Entreprise: ${company}` : ""}

=== DÉTAILS DU PROJET ===
Type de projet: ${formatProjectType(projectType)}
Budget: ${formatBudget(budgetMin, budgetMax)}
Délai souhaité: ${formatTimeline(timeline)}

=== DESCRIPTION DU PROJET ===
${description}

${
  requirements
    ? `=== EXIGENCES SPÉCIFIQUES ===
${requirements}`
    : ""
}

---
Cette demande a été envoyée depuis le formulaire de devis de votre site web.
Répondez rapidement pour maintenir un excellent service client.
      `,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    console.log(`Demande de devis envoyée avec succès de ${email}`);

    return NextResponse.json(
      { success: true, message: "Demande de devis envoyée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi de la demande de devis:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de l'envoi de la demande. Veuillez réessayer.",
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
