import type { getMessages } from "next-intl/server";

type Messages = Awaited<ReturnType<typeof getMessages>>;

/**
 * Namespaces read by client components (`useTranslations`): the navigation,
 * the catalogue filter and the two forms. Everything else is rendered on the
 * server, so shipping it would only inflate the HTML of every page.
 */
const CLIENT_NAMESPACES = [
  "navigation",
  "projectsPage",
  "contact",
  "quote",
] as const satisfies readonly (keyof Messages)[];

export function pickClientMessages(
  messages: Messages
): Pick<Messages, (typeof CLIENT_NAMESPACES)[number]> {
  return Object.fromEntries(
    CLIENT_NAMESPACES.map((namespace) => [namespace, messages[namespace]])
  ) as Pick<Messages, (typeof CLIENT_NAMESPACES)[number]>;
}
