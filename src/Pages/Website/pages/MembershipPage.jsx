import { useState } from "react";
import { Check, X as XIcon } from "lucide-react";
import { Button, Card, CtaBanner, PageHero, Section, SectionTitle } from "../components/ui";
import { EnquiryForm } from "../components/Forms";
import { useSite } from "../components/SiteContext";
import { Faq } from "./WellnessPage";
import { BRANCHES, MEMBERSHIP_FAQS, PLANS, PLAN_ADDONS, PLAN_INCLUSIONS } from "../siteConfig";

const MembershipPage = () => {
  const { openEnquiry, openTour } = useSite();
  const [branch, setBranch] = useState(BRANCHES[0].short);
  const active = BRANCHES.find((b) => b.short === branch);

  return (
    <>
      <PageHero
        eyebrow="Membership Plans"
        title="Find The Membership"
        accent="That Fits Your Goals"
        text="Choose your branch and a plan duration — from 1 month to 12 months. Final prices, validity and terms are confirmed by the branch team."
      >
        <Button href="#enquiry">Enquire Now</Button>
        <Button variant="outline" onClick={() => openTour(branch)}>Book a Gym Tour</Button>
      </PageHero>

      <Section>
        <SectionTitle eyebrow="Step 1" title="Select Your" accent="Branch" />
        <div className="mx-auto mb-12 flex max-w-2xl flex-col gap-4 sm:flex-row">
          {BRANCHES.map((b) => (
            <button
              key={b.slug}
              onClick={() => setBranch(b.short)}
              className={`flex-1 border p-5 text-left transition ${branch === b.short ? "border-[#e11d27] bg-[#e11d27]/10" : "border-white/15 bg-[#0d0d0d] hover:border-[#e11d27]/50"}`}
            >
              <span className="block font-label text-2xl tracking-[1px]">{b.short}</span>
              <span className="text-xs font-light text-neutral-400">{b.sqft} sq. ft. • {b.badge}</span>
            </button>
          ))}
        </div>

        <SectionTitle eyebrow="Step 2" title="Choose Your" accent="Plan Duration" text={`Plans at ${active.short}. Prices will be shared by the branch team on enquiry.`} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p) => (
            <div key={p.id} className={`relative flex flex-col border bg-[#0d0d0d] p-7 transition hover:-translate-y-1 ${p.popular || p.best ? "border-[#e11d27] shadow-[0_0_30px_rgba(255,27,27,0.2)]" : "border-white/10"}`}>
              {(p.popular || p.best) && (
                <span className="absolute -top-3 left-6 bg-[#e11d27] px-3 py-0.5 font-label text-sm tracking-[1px] text-white">{p.best ? "Best Value" : "Popular"}</span>
              )}
              <h3 className="font-heading text-3xl uppercase tracking-[1px]">{p.label}</h3>
              <p className="mt-1 mb-5 text-sm font-light text-neutral-400">{p.note}</p>
              <div className="mb-5 border-y border-white/10 py-4">
                <p className="font-label text-xl tracking-[1px] text-[#e11d27]">Price on enquiry</p>
                <p className="text-xs font-light text-neutral-500">Validity: {p.months} month{p.months > 1 ? "s" : ""}</p>
              </div>
              <ul className="mb-6 flex-1 space-y-2 text-sm font-light text-neutral-300">
                {PLAN_INCLUSIONS.slice(0, 3).map((i) => <li key={i} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#e11d27]" />{i}</li>)}
              </ul>
              <Button onClick={() => openEnquiry(branch, p.label.replace("Months", "months").replace("Month", "month"))} className="w-full">Enquire</Button>
            </div>
          ))}
        </div>
      </Section>

      <Section alt>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <h3 className="mb-4 font-label text-2xl tracking-[2px] text-[#e11d27]">Inclusions</h3>
            <ul className="space-y-3 text-sm font-light text-neutral-300">
              {PLAN_INCLUSIONS.map((i) => <li key={i} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#e11d27]" />{i}</li>)}
            </ul>
          </Card>
          <Card>
            <h3 className="mb-4 font-label text-2xl tracking-[2px] text-[#e11d27]">Optional Add-ons</h3>
            <ul className="space-y-3 text-sm font-light text-neutral-300">
              {PLAN_ADDONS.map((i) => <li key={i} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#e11d27]" />{i}</li>)}
            </ul>
            <p className="mt-4 text-xs text-neutral-500">Only where offered at the selected branch.</p>
          </Card>
          <Card>
            <h3 className="mb-4 font-label text-2xl tracking-[2px] text-[#e11d27]">Exclusions & Terms</h3>
            <ul className="space-y-3 text-sm font-light text-neutral-300">
              <li className="flex gap-2"><XIcon size={16} className="mt-0.5 shrink-0 text-neutral-500" />Add-ons are not included unless stated</li>
              <li className="flex gap-2"><XIcon size={16} className="mt-0.5 shrink-0 text-neutral-500" />Facilities vary by branch</li>
              <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#e11d27]" />Final terms confirmed by the branch team</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section id="enquiry">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionTitle center={false} eyebrow="Step 3" title="Send Your" accent="Enquiry" text="Tell us a little about your goals and our team will reach out with plan details, pricing and a tour." />
            <ul className="space-y-3 font-light text-neutral-300">
              <li className="flex gap-2"><Check size={18} className="text-[#e11d27]" />No obligation – just a conversation</li>
              <li className="flex gap-2"><Check size={18} className="text-[#e11d27]" />Response on your preferred contact mode</li>
              <li className="flex gap-2"><Check size={18} className="text-[#e11d27]" />Final terms confirmed by the branch team</li>
            </ul>
          </div>
          <div className="border border-[#e11d27]/30 bg-[#0d0d0d] p-6 sm:p-9">
            <EnquiryForm key={branch} defaultBranch={branch} />
          </div>
        </div>
      </Section>

      <Section alt>
        <SectionTitle eyebrow="FAQs" title="Membership" accent="Questions" />
        <Faq items={MEMBERSHIP_FAQS} />
      </Section>

      <CtaBanner onJoin={() => openEnquiry(branch)} onTour={() => openTour(branch)} />
    </>
  );
};

export default MembershipPage;
