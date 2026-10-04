import Button, { type ButtonHref } from "@/components/Button";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

interface CtaAction {
  label: string;
  href: ButtonHref;
}

interface CtaBannerProps {
  title: string;
  description: string;
  primary: CtaAction;
  secondary?: CtaAction;
}

/** Closing call to action (style of the former home contact block). */
export default function CtaBanner({
  title,
  description,
  primary,
  secondary,
}: CtaBannerProps) {
  return (
    <Section id="cta">
      <Reveal>
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-center text-white shadow-xl md:p-12">
          <h2 className="mb-4 text-2xl font-bold text-balance md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90 text-pretty">
            {description}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="primary" size="lg" href={primary.href}>
              {primary.label}
            </Button>
            {secondary && (
              <Button
                variant="outline"
                size="lg"
                href={secondary.href}
                className="!border-white !text-white hover:!bg-white/10"
              >
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
