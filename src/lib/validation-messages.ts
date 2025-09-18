// Messages d'erreur de validation localisés
export const validationMessages = {
  fr: {
    // Messages généraux
    invalidDataFormat: "Format de données invalide",
    validationErrorsDetected: "Erreurs de validation détectées",

    // Validation des noms
    firstNameRequired:
      "Le prénom est requis et doit être une chaîne de caractères",
    firstNameEmpty: "Le prénom ne peut pas être vide",
    firstNameTooShort: "Le prénom doit contenir au moins 2 caractères",
    firstNameTooLong: "Le prénom ne peut pas dépasser 50 caractères",

    lastNameRequired:
      "Le nom de famille est requis et doit être une chaîne de caractères",
    lastNameEmpty: "Le nom de famille ne peut pas être vide",
    lastNameTooShort: "Le nom de famille doit contenir au moins 2 caractères",
    lastNameTooLong: "Le nom de famille ne peut pas dépasser 50 caractères",

    nameRequired: "Le nom est requis et doit être une chaîne de caractères",
    nameEmpty: "Le nom ne peut pas être vide",
    nameTooShort: "Le nom doit contenir au moins 2 caractères",
    nameTooLong: "Le nom ne peut pas dépasser 100 caractères",

    // Validation email
    emailRequired: "L'adresse email est requise",
    emailEmpty: "L'adresse email ne peut pas être vide",
    emailInvalid: "Format d'adresse email invalide (exemple: nom@exemple.com)",
    emailTooLong: "L'adresse email ne peut pas dépasser 254 caractères",

    // Validation entreprise
    companyTooLong:
      "Le nom de l'entreprise ne peut pas dépasser 100 caractères",

    // Validation sujet
    subjectRequired:
      "Le sujet est requis et doit être une chaîne de caractères",
    subjectEmpty: "Le sujet ne peut pas être vide",
    subjectTooShort: "Le sujet doit contenir au moins 3 caractères",
    subjectTooLong: "Le sujet ne peut pas dépasser 200 caractères",

    // Validation message
    messageRequired:
      "Le message est requis et doit être une chaîne de caractères",
    messageEmpty: "Le message ne peut pas être vide",
    messageTooShort: "Le message doit contenir au moins 10 caractères",
    messageTooLong: "Le message ne peut pas dépasser 5000 caractères",

    // Validation type de projet
    projectTypeRequired: "Le type de projet est requis",
    projectTypeEmpty: "Le type de projet ne peut pas être vide",

    // Validation budget
    budgetMinRequired: "Le budget minimum est requis",
    budgetMinEmpty: "Le budget minimum ne peut pas être vide",
    budgetMinInvalid: "Le budget minimum doit être un nombre valide",
    budgetMinNegative: "Le budget minimum ne peut pas être négatif",
    budgetMinTooHigh: "Le budget minimum ne peut pas dépasser 1 000 000 €",

    budgetMaxRequired: "Le budget maximum est requis",
    budgetMaxEmpty: "Le budget maximum ne peut pas être vide",
    budgetMaxInvalid: "Le budget maximum doit être un nombre valide",
    budgetMaxZero: "Le budget maximum doit être supérieur à 0",
    budgetMaxTooHigh: "Le budget maximum ne peut pas dépasser 1 000 000 €",

    budgetCoherence:
      "Le budget minimum ne peut pas être supérieur au budget maximum",

    // Validation délai
    timelineRequired: "Le délai est requis",
    timelineEmpty: "Le délai ne peut pas être vide",

    // Validation description
    descriptionRequired: "La description du projet est requise",
    descriptionEmpty: "La description du projet ne peut pas être vide",
    descriptionTooShort:
      "La description du projet doit contenir au moins 10 caractères",
    descriptionTooLong:
      "La description du projet ne peut pas dépasser 5000 caractères",

    // Validation exigences
    requirementsTooLong:
      "Les exigences spécifiques ne peuvent pas dépasser 2000 caractères",
  },

  en: {
    // General messages
    invalidDataFormat: "Invalid data format",
    validationErrorsDetected: "Validation errors detected",

    // Name validation
    firstNameRequired: "First name is required and must be a string",
    firstNameEmpty: "First name cannot be empty",
    firstNameTooShort: "First name must contain at least 2 characters",
    firstNameTooLong: "First name cannot exceed 50 characters",

    lastNameRequired: "Last name is required and must be a string",
    lastNameEmpty: "Last name cannot be empty",
    lastNameTooShort: "Last name must contain at least 2 characters",
    lastNameTooLong: "Last name cannot exceed 50 characters",

    nameRequired: "Name is required and must be a string",
    nameEmpty: "Name cannot be empty",
    nameTooShort: "Name must contain at least 2 characters",
    nameTooLong: "Name cannot exceed 100 characters",

    // Email validation
    emailRequired: "Email address is required",
    emailEmpty: "Email address cannot be empty",
    emailInvalid: "Invalid email format (example: name@example.com)",
    emailTooLong: "Email address cannot exceed 254 characters",

    // Company validation
    companyTooLong: "Company name cannot exceed 100 characters",

    // Subject validation
    subjectRequired: "Subject is required and must be a string",
    subjectEmpty: "Subject cannot be empty",
    subjectTooShort: "Subject must contain at least 3 characters",
    subjectTooLong: "Subject cannot exceed 200 characters",

    // Message validation
    messageRequired: "Message is required and must be a string",
    messageEmpty: "Message cannot be empty",
    messageTooShort: "Message must contain at least 10 characters",
    messageTooLong: "Message cannot exceed 5000 characters",

    // Project type validation
    projectTypeRequired: "Project type is required",
    projectTypeEmpty: "Project type cannot be empty",

    // Budget validation
    budgetMinRequired: "Minimum budget is required",
    budgetMinEmpty: "Minimum budget cannot be empty",
    budgetMinInvalid: "Minimum budget must be a valid number",
    budgetMinNegative: "Minimum budget cannot be negative",
    budgetMinTooHigh: "Minimum budget cannot exceed €1,000,000",

    budgetMaxRequired: "Maximum budget is required",
    budgetMaxEmpty: "Maximum budget cannot be empty",
    budgetMaxInvalid: "Maximum budget must be a valid number",
    budgetMaxZero: "Maximum budget must be greater than 0",
    budgetMaxTooHigh: "Maximum budget cannot exceed €1,000,000",

    budgetCoherence: "Minimum budget cannot be greater than maximum budget",

    // Timeline validation
    timelineRequired: "Timeline is required",
    timelineEmpty: "Timeline cannot be empty",

    // Description validation
    descriptionRequired: "Project description is required",
    descriptionEmpty: "Project description cannot be empty",
    descriptionTooShort:
      "Project description must contain at least 10 characters",
    descriptionTooLong: "Project description cannot exceed 5000 characters",

    // Requirements validation
    requirementsTooLong: "Specific requirements cannot exceed 2000 characters",
  },
} as const;

export type Locale = keyof typeof validationMessages;
export type ValidationMessageKey = keyof typeof validationMessages.fr;

// Fonction utilitaire pour récupérer un message localisé
export function getValidationMessage(
  key: ValidationMessageKey,
  locale: Locale = "fr"
): string {
  return validationMessages[locale][key];
}

// Fonctions utilitaires pour les messages avec paramètres
export function getProjectTypeInvalidMessage(validTypes: string[], locale: Locale = 'fr'): string {
  if (locale === 'en') {
    return `Invalid project type. Allowed values are: ${validTypes.join(", ")}`;
  }
  return `Type de projet invalide. Les valeurs autorisées sont: ${validTypes.join(", ")}`;
}

export function getTimelineInvalidMessage(validTimelines: string[], locale: Locale = 'fr'): string {
  if (locale === 'en') {
    return `Invalid timeline. Allowed values are: ${validTimelines.join(", ")}`;
  }
  return `Délai invalide. Les valeurs autorisées sont: ${validTimelines.join(", ")}`;
}
