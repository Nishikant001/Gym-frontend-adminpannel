import { Link, Navigate, useParams } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";
import { ICONS } from "../components/iconMap";
import { Button, Card, CtaBanner, PageHero, Section, SectionTitle } from "../components/ui";
import { useSite } from "../components/SiteContext";
import { SERVICES } from "../siteConfig";

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const { openEnquiry, openTour } = useSite();
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;
  const Icon = ICONS[service.icon];
  const others = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow="Service" title={service.title} text={service.short}>
        <Button onClick={() => openEnquiry("", "")}>Enquire About This</Button>
        <Button variant="outline" onClick={() => openTour()}>Book a Gym Tour</Button>
      </PageHero>

      <Section>
        <Link to="/services" className="mb-8 inline-flex items-center gap-2 text-sm tracking-[1px] text-neutral-400 hover:text-[#e11d27]"><ArrowLeft size={16} /> All Services</Link>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Icon className="mb-5 text-[#e11d27]" size={50} />
            <h2 className="mb-5 font-heading text-4xl uppercase tracking-[1px]">About <span className="text-[#e11d27]">{service.title}</span></h2>
            <p className="text-lg font-light leading-relaxed tracking-wide text-neutral-300">{service.long}</p>
            <p className="mt-6 border-l-2 border-[#e11d27] pl-4 font-light text-neutral-300"><strong className="font-medium text-white">Best for: </strong>{service.suitable}</p>
          </div>
          <Card className="self-start">
            <h3 className="mb-5 font-label text-2xl tracking-[2px] text-[#e11d27]">What You Get</h3>
            <ul className="space-y-4">
              {service.benefits.map((b) => (
                <li key={b} className="flex gap-3 font-light text-neutral-200"><Check className="mt-0.5 shrink-0 text-[#e11d27]" size={20} />{b}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section alt>
        <SectionTitle eyebrow="Explore More" title="Other" accent="Services" />
        <div className="grid gap-6 md:grid-cols-3">
          {others.map((s) => (
            <Card key={s.slug}>
              <h3 className="mb-2 font-heading text-xl uppercase tracking-[1px]">{s.title}</h3>
              <p className="mb-4 text-sm font-light text-neutral-300">{s.short}</p>
              <Link to={`/services/${s.slug}`} className="font-label tracking-[1px] text-[#e11d27] hover:text-white">Learn More →</Link>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBanner onJoin={() => openEnquiry()} onTour={() => openTour()} />
    </>
  );
};

export default ServiceDetailPage;
