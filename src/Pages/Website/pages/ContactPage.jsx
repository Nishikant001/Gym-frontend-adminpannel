import { MapPin, Phone, Clock, Mail, Navigation } from "lucide-react";
import { Button, PageHero, Section, SectionTitle } from "../components/ui";
import { EnquiryForm } from "../components/Forms";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "../components/Icons";
import { BRANCHES, CONTACT, telHref, waHref } from "../siteConfig";

const Row = ({ icon: Icon, children }) => (
  <p className="flex gap-3 text-sm font-light leading-relaxed text-neutral-300"><Icon size={18} className="mt-0.5 shrink-0 text-[#e11d27]" />{children}</p>
);

const ContactPage = () => (
  <>
    <PageHero
      eyebrow="Contact Us"
      title="Let's Start Your"
      accent="Fitness Journey"
      text="Questions about membership, training or wellness? Reach out to either branch — we're happy to help."
    >
      <Button href="#form">Send an Enquiry</Button>
      {waHref() && <Button variant="outline" href={waHref()} external><WhatsAppIcon className="h-5 w-5" /> WhatsApp</Button>}
    </PageHero>

    {/* BRANCH CARDS */}
    <Section>
      <SectionTitle eyebrow="Our Branches" title="Visit Us In" accent="Bhubaneswar" />
      <div className="grid gap-8 lg:grid-cols-2">
        {BRANCHES.map((b) => (
          <div key={b.slug} className="border border-white/10 bg-[#0d0d0d]">
            <div className="aspect-[16/9] w-full border-b border-white/10">
              <iframe title={`${b.short} map`} src={b.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full grayscale invert-[.9] contrast-[.9]" />
            </div>
            <div className="space-y-4 p-7">
              <p className="font-label text-sm tracking-[2px] text-[#e11d27]">{b.badge}</p>
              <h3 className="font-heading text-3xl uppercase tracking-[1px]">{b.short}</h3>
              <Row icon={MapPin}>{b.address}</Row>
              <Row icon={Phone}>{b.phone ? <a href={telHref(b.phone)} className="hover:text-[#e11d27]">{b.phone}</a> : "Phone number coming soon"}</Row>
              <Row icon={Clock}>{b.hours || "Opening hours coming soon"}</Row>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href={b.mapsUrl} external variant="outline"><Navigation size={16} /> Directions</Button>
                {b.phone && <Button href={telHref(b.phone)} variant="ghost"><Phone size={16} /> Call</Button>}
                {waHref(`Hi BFD ${b.short}, I would like to know more.`) && <Button href={waHref(`Hi BFD ${b.short}, I would like to know more.`)} external variant="ghost"><WhatsAppIcon className="h-4 w-4" /> WhatsApp</Button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>

    {/* FORM + GENERAL */}
    <Section alt id="form">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <SectionTitle center={false} eyebrow="Get In Touch" title="Send Us An" accent="Enquiry" text="Fill in the form and the designated team will get back to you. Choose the branch you're interested in so it reaches the right people." />
          <div className="space-y-4">
            <Row icon={Mail}>{CONTACT.email ? <a href={`mailto:${CONTACT.email}`} className="hover:text-[#e11d27]">{CONTACT.email}</a> : "Business email coming soon"}</Row>
            <div className="flex gap-3 pt-3">
              {CONTACT.instagram && <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e11d27] text-[#e11d27] transition hover:bg-[#e11d27] hover:text-white"><InstagramIcon /></a>}
              {CONTACT.facebook && <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" title="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e11d27] text-[#e11d27] transition hover:bg-[#e11d27] hover:text-white"><FacebookIcon /></a>}
            </div>
            <p className="pt-2 font-label tracking-[2px] text-neutral-400">@bharatfiitnessden</p>
          </div>
        </div>
        <div className="border border-[#e11d27]/30 bg-[#0d0d0d] p-6 sm:p-9">
          <EnquiryForm general />
        </div>
      </div>
    </Section>
  </>
);

export default ContactPage;
