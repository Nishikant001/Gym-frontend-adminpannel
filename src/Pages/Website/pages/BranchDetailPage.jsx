import { Navigate, useParams, Link } from "react-router-dom";
import { Check, MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Button, Card, CtaBanner, PageHero, Section, SectionTitle } from "../components/ui";
import { useSite } from "../components/SiteContext";
import { BRANCHES, EQUIPMENT_BRANDS, SERVICES, telHref } from "../siteConfig";

const BranchDetailPage = () => {
  const { slug } = useParams();
  const { openEnquiry, openTour } = useSite();
  const b = BRANCHES.find((x) => x.slug === slug);
  if (!b) return <Navigate to="/contact" replace />;
  const enhanced = b.slug === "bfd-enhanced";
  const other = BRANCHES.find((x) => x.slug !== slug);

  return (
    <>
      <PageHero eyebrow={b.badge} title={b.short} accent={`– ${b.sqft} Sq. Ft.`} text={b.tagline}>
        <Button onClick={() => openEnquiry(b.short)}>Enquire Now</Button>
        <Button variant="outline" onClick={() => openTour(b.short)}>Book a Gym Tour</Button>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle center={false} eyebrow="About This Branch" title="Welcome To" accent={b.short} />
            <p className="mb-8 text-lg font-light leading-relaxed tracking-wide text-neutral-300">{b.description}</p>
            <ul className="space-y-3">
              {b.highlights.map((h) => <li key={h} className="flex gap-3 font-light text-neutral-200"><Check className="mt-0.5 shrink-0 text-[#e11d27]" size={20} />{h}</li>)}
            </ul>
          </div>
          <Card className="self-start space-y-4">
            <h3 className="font-label text-2xl tracking-[2px] text-[#e11d27]">Branch Details</h3>
            <p className="flex gap-3 text-sm font-light text-neutral-300"><MapPin size={18} className="mt-0.5 shrink-0 text-[#e11d27]" />{b.address}</p>
            <p className="flex gap-3 text-sm font-light text-neutral-300"><Phone size={18} className="mt-0.5 shrink-0 text-[#e11d27]" />{b.phone ? <a href={telHref(b.phone)}>{b.phone}</a> : "Phone number coming soon"}</p>
            <p className="flex gap-3 text-sm font-light text-neutral-300"><Clock size={18} className="mt-0.5 shrink-0 text-[#e11d27]" />{b.hours || "Opening hours coming soon"}</p>
            <Button href={b.mapsUrl} external variant="outline"><Navigation size={16} /> Get Directions</Button>
          </Card>
        </div>
      </Section>

      <Section alt>
        <SectionTitle eyebrow="Facilities" title={`At ${b.short}`} accent="You'll Find" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {b.facilities.map((f) => <Card key={f}><p className="font-heading text-xl uppercase tracking-[1px]">{f}</p></Card>)}
        </div>
      </Section>

      {enhanced && (
        <Section>
          <SectionTitle eyebrow="Equipment" title="Premium Equipment" accent="Brands" text="Brand listing is subject to confirmation of what is installed at the branch; approved logos will be added." />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {EQUIPMENT_BRANDS.map((n) => (
              <div key={n} className="flex h-20 items-center justify-center border border-white/10 bg-[#0d0d0d] font-heading text-lg uppercase tracking-[1px] text-neutral-300">{n}</div>
            ))}
          </div>
          <div className="mt-8 text-center"><Button to="/wellness-recovery" variant="outline">Explore Wellness & Recovery</Button></div>
        </Section>
      )}

      <Section alt={enhanced}>
        <SectionTitle eyebrow="Services" title="Train With" accent="Our Programmes" />
        <div className="flex flex-wrap justify-center gap-3">
          {SERVICES.map((s) => <Link key={s.slug} to={`/services/${s.slug}`} className="border border-white/15 px-5 py-2.5 font-label tracking-[1px] transition hover:border-[#e11d27] hover:text-[#e11d27]">{s.title}</Link>)}
        </div>
        <p className="mt-5 text-center text-xs text-neutral-500">Service availability varies by branch and is confirmed by the branch team.</p>
      </Section>

      <Section alt={!enhanced}>
        <div className="flex flex-col items-center justify-between gap-6 border border-[#e11d27]/30 bg-[#0d0d0d] p-8 sm:flex-row sm:p-12">
          <div>
            <p className="font-label text-sm tracking-[2px] text-[#e11d27]">Also In Bhubaneswar</p>
            <h3 className="font-heading text-3xl uppercase tracking-[1px]">{other.short}</h3>
            <p className="mt-1 text-sm text-neutral-400">{other.tagline}</p>
          </div>
          <Button to={`/branches/${other.slug}`} variant="outline">Explore {other.short}</Button>
        </div>
      </Section>

      <CtaBanner onJoin={() => openEnquiry(b.short)} onTour={() => openTour(b.short)} />
    </>
  );
};

export default BranchDetailPage;
