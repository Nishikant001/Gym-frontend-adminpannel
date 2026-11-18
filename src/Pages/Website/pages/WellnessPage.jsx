import { useState } from "react";
import { ChevronDown, Leaf } from "lucide-react";
import { ICONS } from "../components/iconMap";
import { Button, Card, CtaBanner, PageHero, Section, SectionTitle } from "../components/ui";
import { useSite } from "../components/SiteContext";
import { WELLNESS, WELLNESS_FAQS } from "../siteConfig";

export const Faq = ({ items }) => {
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-white/10 border border-white/10 bg-[#0d0d0d]">
      {items.map((f, i) => (
        <div key={f.q}>
          <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-['Bebas_Neue'] text-xl tracking-[2px] hover:text-[#ff1b1b]">
            {f.q}
            <ChevronDown size={20} className={`shrink-0 transition ${open === i ? "rotate-180 text-[#ff1b1b]" : ""}`} />
          </button>
          {open === i && <p className="px-6 pb-5 text-sm font-light leading-relaxed text-neutral-300">{f.a}</p>}
        </div>
      ))}
    </div>
  );
};

const WellnessPage = () => {
  const { openEnquiry, openTour } = useSite();
  return (
    <>
      <PageHero
        eyebrow="BFD Enhanced"
        title="Wellness &"
        accent="Recovery"
        text="Train hard, recover smarter. Discover the wellness and recovery experience at BFD Enhanced — designed to help you unwind, reset and come back stronger."
      >
        <Button onClick={() => openEnquiry("BFD Enhanced")}>Enquire Now</Button>
        <Button variant="outline" onClick={() => openTour("BFD Enhanced")}>Book a Gym Tour</Button>
      </PageHero>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle center={false} eyebrow="Overview" title="Recovery Is Part Of" accent="Training" />
            <div className="space-y-5 font-light leading-relaxed tracking-wide text-neutral-300">
              <p>Great results are built in the gym and consolidated outside it. The wellness and recovery area at BFD Enhanced gives members a calm, dedicated space to relax and reset after demanding sessions.</p>
              <p>From sauna and cold plunge to red-light sessions, massage and spine-care support, our facilities are designed around comfort, relaxation and an overall sense of wellbeing — all inside the 24,000+ sq. ft. flagship.</p>
              <p className="text-sm text-neutral-400">Availability of each service, operating protocols and descriptions are confirmed by our operations team.</p>
            </div>
          </div>
          <div className="flex items-center justify-center border border-[#ff1b1b]/30 bg-gradient-to-br from-[#1a0000] to-[#0a0a0a] p-12 text-center">
            <div>
              <Leaf className="mx-auto mb-4 text-[#ff1b1b]" size={64} />
              <p className="font-['Anton'] text-3xl uppercase tracking-[3px]">Recover. Reset. <span className="text-[#ff1b1b]">Repeat.</span></p>
            </div>
          </div>
        </div>
      </Section>

      <Section alt>
        <SectionTitle eyebrow="Our Facilities" title="Recovery" accent="Experiences" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WELLNESS.map((w) => {
            const Icon = ICONS[w.icon];
            return (
              <Card key={w.id} id={w.id}>
                <Icon className="mb-4 text-[#ff1b1b]" size={40} />
                <h3 className="mb-2 font-['Anton'] text-2xl uppercase tracking-[2px]">{w.title}</h3>
                <p className="text-sm font-light leading-relaxed text-neutral-300">{w.text}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="The Environment" title="A Space Built To" accent="Unwind" />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Calm & Clean", "A quiet, well-maintained environment separate from the high-energy training floor."],
            ["Guided By Our Team", "Staff explain how each facility works so you can use it comfortably and responsibly."],
            ["Part Of The Flagship", "Located inside BFD Enhanced so training and recovery happen under one roof."],
          ].map(([t, d]) => (
            <Card key={t}><h3 className="mb-2 font-['Anton'] text-xl uppercase tracking-[2px]">{t}</h3><p className="text-sm font-light leading-relaxed text-neutral-300">{d}</p></Card>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl border border-white/10 bg-[#0d0d0d] p-5 text-center text-xs font-light leading-relaxed text-neutral-400">
          Important: Wellness and recovery services at BFD are lifestyle and relaxation offerings. They are not medical treatment and no guaranteed results are promised. If you have a medical condition, please consult your doctor first.
        </p>
      </Section>

      <Section alt>
        <SectionTitle eyebrow="FAQs" title="Frequently Asked" accent="Questions" />
        <Faq items={WELLNESS_FAQS} />
      </Section>

      <CtaBanner title="Experience Recovery At" accent="BFD Enhanced" text="Book a gym tour to see the wellness facilities or send us an enquiry." onJoin={() => openEnquiry("BFD Enhanced")} onTour={() => openTour("BFD Enhanced")} />
    </>
  );
};

export default WellnessPage;
