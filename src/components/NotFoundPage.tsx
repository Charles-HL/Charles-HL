import { getTranslations } from "next-intl/server";
import Button from "./Button";
import PageLayout from "./PageLayout";
import PageHeader from "./ui/PageHeader";
import Section from "./ui/Section";

export default async function NotFoundPage() {
  const t = await getTranslations("NotFoundPage");

  return (
    <PageLayout>
      <PageHeader title={t("title")} intro={t("description")} />
      <Section>
        <div className="flex justify-center">
          <Button href="/" variant="primary">
            {t("back")}
          </Button>
        </div>
      </Section>
    </PageLayout>
  );
}
