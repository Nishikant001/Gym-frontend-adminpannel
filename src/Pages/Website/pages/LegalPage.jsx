import { PageHero, Section } from "../components/ui";
import { BRAND } from "../siteConfig";

const DOCS = {
  privacy: {
    title: "Privacy",
    accent: "Policy",
    sections: [
      ["Information we collect", "When you submit an enquiry or gym-tour form we collect details you provide, such as your name, mobile number, email, age, branch preference, fitness goals and the page you submitted from."],
      ["How we use it", "We use this information only to respond to your enquiry, confirm visits, share relevant membership information and improve our services. We contact you only on the modes you have permitted."],
      ["Sharing", "Your details are shared only with the designated BFD team members and service providers who help us operate our website and respond to enquiries."],
      ["Your choices", "You may ask us to update or delete your enquiry details at any time by contacting your branch."],
    ],
  },
  terms: {
    title: "Terms &",
    accent: "Conditions",
    sections: [
      ["Website information", "Information on this website is provided for general guidance. Services, facilities, schedules and availability may vary by branch and may change without notice."],
      ["Memberships", "Membership prices, validity, inclusions, exclusions and terms are confirmed by the branch team at the time of enrolment."],
      ["Wellness & supplements", "Wellness services and supplements are not medical treatment or medical advice, and no guaranteed results are promised."],
      ["Enquiries", "Submitting a form does not constitute a booking or membership; it is a request for the BFD team to contact you."],
    ],
  },
};

const LegalPage = ({ kind }) => {
  const d = DOCS[kind];
  return (
    <>
      <PageHero title={d.title} accent={d.accent} text={`${BRAND.name} • Last updated November ${BRAND.year}`} />
      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          {d.sections.map(([h, t]) => (
            <div key={h}>
              <h2 className="mb-2 font-heading text-2xl uppercase tracking-[1px]">{h}</h2>
              <p className="font-light leading-relaxed text-neutral-300">{t}</p>
            </div>
          ))}
          <p className="border-t border-white/10 pt-6 text-xs text-neutral-500">This is a summary draft; have it reviewed by your legal advisor before publishing.</p>
        </div>
      </Section>
    </>
  );
};

export default LegalPage;
