import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ICONS } from "../components/iconMap";
import { Button, Card, CtaBanner, PageHero, Section, SectionTitle } from "../components/ui";
import { useSite } from "../components/SiteContext";
import { SERVICES } from "../siteConfig";

const ServicesPage = () => {
  const { openEnquiry, openTour } = useSite();
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Train Your Way."
        accent="Train With BFD."
        text="From strength and cardio to HYROX, kickboxing, yoga and personal training — explore the programmes and services designed to help you reach your goals."
      >
        <Button onClick={() => openEnquiry()}>Enquire Now</Button>
        <Button variant="outline" onClick={() => openTour()}>Book a Gym Tour</Button>
      </PageHero>

      <Section>
        <SectionTitle eyebrow="Service Catalogue" title="Everything You Need," accent="Under One Roof" text="Availability of some services (such as group-class schedules, diet café and supplements) varies by branch and is confirmed by the branch team." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <Card key={s.slug} className="flex flex-col">
                <Icon className="mb-4 text-[#ff1b1b]" size={40} />
                <h3 className="mb-2 font-['Anton'] text-2xl uppercase tracking-[2px]">{s.title}</h3>
                <p className="mb-5 flex-1 text-sm font-light leading-relaxed text-neutral-300">{s.short}</p>
                <Link to={`/services/${s.slug}`} className="inline-flex items-center gap-2 font-['Bebas_Neue'] text-lg tracking-[3px] text-[#ff1b1b] hover:text-white">
                  Learn More <ArrowRight size={16} />
                </Link>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section alt>
        <SectionTitle eyebrow="How It Works" title="Your Journey" accent="In 4 Steps" />
        <div className="grid gap-6 md:grid-cols-4">
          {[
            ["Visit", "Book a gym tour and see the floor, equipment and facilities."],
            ["Discuss", "Tell our team your goals, experience and preferred schedule."],
            ["Plan", "Choose a membership and the services that fit your goals."],
            ["Progress", "Train with guidance and track your progress with support."],
          ].map(([t, d], i) => (
            <Card key={t}>
              <div className="font-['Anton'] text-5xl text-[#ff1b1b]/30">0{i + 1}</div>
              <h3 className="mt-2 mb-2 font-['Anton'] text-xl uppercase tracking-[2px]">{t}</h3>
              <p className="text-sm font-light leading-relaxed text-neutral-300">{d}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-8 border border-[#ff1b1b]/30 bg-[#0d0d0d] p-8 sm:p-12 lg:grid-cols-[1fr_auto]">
          <div>
            <h3 className="font-['Anton'] text-3xl uppercase tracking-[2px]">Looking For <span className="text-[#ff1b1b]">Recovery & Wellness?</span></h3>
            <p className="mt-3 max-w-2xl font-light leading-relaxed text-neutral-300">Sauna, red-light therapy, cold plunge, massage and spine care are available at BFD Enhanced, where available.</p>
          </div>
          <Button to="/wellness-recovery" variant="outline">Explore Wellness</Button>
        </div>
      </Section>

      <CtaBanner onJoin={() => openEnquiry()} onTour={() => openTour()} />
    </>
  );
};

export default ServicesPage;
