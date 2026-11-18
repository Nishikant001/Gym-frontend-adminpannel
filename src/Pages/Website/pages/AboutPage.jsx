import { Link } from "react-router-dom";
import { Target, Eye, Trophy, Users, Award, ShieldCheck } from "lucide-react";
import { Button, Card, CtaBanner, PageHero, Section, SectionTitle } from "../components/ui";
import { useSite } from "../components/SiteContext";
import { BRANCHES, JOURNEY, PHILOSOPHY } from "../siteConfig";

const AboutPage = () => {
  const { openEnquiry, openTour } = useSite();
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Our Story –"
        accent="Building a Stronger Fitness Community"
        text="From one well-equipped gym in Jaydev Vihar to a 24,000+ sq. ft. flagship on Forest Park Road — this is the journey of Bharat Fiitness Den in Bhubaneswar."
      >
        <Button onClick={() => openEnquiry()}>Become a Part of BFD</Button>
        <Button variant="outline" to="/services">Our Services</Button>
      </PageHero>

      {/* INTRO */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle center={false} eyebrow="Who We Are" title="More Than A Gym." accent="A Complete Fitness Experience." />
            <div className="space-y-5 text-base font-light leading-relaxed tracking-wide text-neutral-300">
              <p>
                Bharat Fiitness Den (BFD) is a Bhubaneswar-based fitness brand built around one belief — that everyone deserves a gym where they feel supported, challenged and part of something bigger. We combine modern equipment, professional trainers and a welcoming community to make fitness a part of everyday life.
              </p>
              <p>
                Today BFD stands as a single master brand with two distinct destinations: <strong className="font-medium text-white">Jaydev Vihar</strong>, our established, well-equipped fitness centre for everyday training, and <strong className="font-medium text-white">BFD Enhanced</strong>, our flagship premium destination with specialist training and wellness facilities.
              </p>
              <p>
                Whether you are walking in for the very first time or training for your next performance goal, BFD is designed to meet you where you are and help you go further.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["2", "Branches in Bhubaneswar"],
              ["8,000+", "Sq. ft. at Jaydev Vihar"],
              ["24,000+", "Sq. ft. at BFD Enhanced"],
              ["130+", "Advanced machines at Enhanced"],
            ].map(([n, l]) => (
              <div key={l} className="border border-white/10 bg-[#0d0d0d] p-6 text-center">
                <div className="font-['Anton'] text-4xl tracking-[2px] text-[#ff1b1b] sm:text-5xl">{n}</div>
                <div className="mt-2 text-xs font-light uppercase tracking-[2px] text-neutral-400">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* VISION / MISSION */}
      <Section alt>
        <SectionTitle eyebrow="Purpose" title="Our Vision &" accent="Mission" />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <Eye className="mb-4 text-[#ff1b1b]" size={38} />
            <h3 className="mb-3 font-['Anton'] text-2xl uppercase tracking-[2px]">Our Vision</h3>
            <p className="font-light leading-relaxed tracking-wide text-neutral-300">
              To be Odisha&apos;s most trusted fitness brand — a place where people of every age and background discover strength, discipline and confidence, and where a stronger community is built one member at a time.
            </p>
          </Card>
          <Card>
            <Target className="mb-4 text-[#ff1b1b]" size={38} />
            <h3 className="mb-3 font-['Anton'] text-2xl uppercase tracking-[2px]">Our Mission</h3>
            <p className="font-light leading-relaxed tracking-wide text-neutral-300">
              To deliver a premium, honest and results-focused fitness experience — through modern equipment, certified and professional trainers, welcoming spaces and complete wellness support — at every BFD branch.
            </p>
          </Card>
        </div>
      </Section>

      {/* JOURNEY */}
      <Section>
        <SectionTitle eyebrow="Our Journey" title="From Jaydev Vihar To" accent="BFD Enhanced" text="Every milestone has been shaped by our members and our commitment to doing fitness better." />
        <div className="relative mx-auto max-w-4xl border-l-2 border-[#ff1b1b]/40 pl-8 sm:pl-12">
          {JOURNEY.map((j, i) => (
            <div key={j.title} className="relative mb-12 last:mb-0">
              <span className="absolute -left-[46px] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#ff1b1b] font-['Bebas_Neue'] text-sm text-black sm:-left-[62px]">{i + 1}</span>
              <h3 className="font-['Anton'] text-2xl uppercase tracking-[2px]">{j.title}</h3>
              <p className="mt-2 font-light leading-relaxed tracking-wide text-neutral-300">{j.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* BRANCHES SNAPSHOT */}
      <Section alt>
        <SectionTitle eyebrow="Two Destinations" title="One Brand." accent="Two Experiences." />
        <div className="grid gap-6 md:grid-cols-2">
          {BRANCHES.map((b) => (
            <Card key={b.slug}>
              <p className="font-['Bebas_Neue'] text-sm tracking-[4px] text-[#ff1b1b]">{b.badge}</p>
              <h3 className="mt-1 font-['Anton'] text-3xl uppercase tracking-[2px]">{b.short}</h3>
              <p className="mt-1 text-sm text-neutral-400">{b.area}</p>
              <p className="my-4 font-light leading-relaxed text-neutral-300">{b.description}</p>
              <Link to={`/branches/${b.slug}`} className="font-['Bebas_Neue'] text-lg tracking-[3px] text-[#ff1b1b] hover:text-white">Explore {b.short} →</Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* PHILOSOPHY */}
      <Section>
        <SectionTitle eyebrow="Our Fitness Philosophy" title="Consistency. Discipline." accent="Performance. Community." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PHILOSOPHY.map((p, i) => (
            <Card key={p.title}>
              <div className="mb-3 font-['Anton'] text-5xl text-[#ff1b1b]/30">0{i + 1}</div>
              <h3 className="mb-2 font-['Anton'] text-2xl uppercase tracking-[2px]">{p.title}</h3>
              <p className="text-sm font-light leading-relaxed text-neutral-300">{p.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* WHY BFD */}
      <Section alt>
        <SectionTitle eyebrow="Why BFD" title="What Makes Us" accent="Different" />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            [Award, "Professional Trainers", "Supportive, certified trainers who guide your form, planning and progress."],
            [ShieldCheck, "Modern Equipment", "Advanced machines and premium equipment, including Panatta stations at BFD Enhanced."],
            [Users, "Real Community", "A respectful, motivating environment where every member belongs."],
          ].map(([Icon, t, d]) => (
            <Card key={t}>
              <Icon className="mb-4 text-[#ff1b1b]" size={36} />
              <h3 className="mb-2 font-['Anton'] text-xl uppercase tracking-[2px]">{t}</h3>
              <p className="text-sm font-light leading-relaxed text-neutral-300">{d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* TEAM */}
      <Section>
        <SectionTitle eyebrow="Our People" title="Leadership & Trainer" accent="Team" />
        <div className="mx-auto max-w-3xl border border-dashed border-[#ff1b1b]/40 bg-[#0d0d0d] p-8 text-center">
          <Users className="mx-auto mb-4 text-[#ff1b1b]" size={42} />
          <p className="font-light leading-relaxed text-neutral-300">
            Our leadership, management and certified trainer team will be introduced here. Profiles are published only after names, photos and credentials are approved. Meet the team in person — book a gym tour at either branch.
          </p>
          <div className="mt-6"><Button variant="outline" onClick={() => openTour()}>Book a Gym Tour</Button></div>
        </div>
      </Section>

      {/* ACHIEVEMENTS */}
      <Section alt>
        <SectionTitle eyebrow="Milestones" title="Verified Achievements &" accent="Member Milestones" />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            "Two fitness destinations across Bhubaneswar",
            "24,000+ sq. ft. flagship facility with 130+ machines and 36+ Panatta stations",
            "Membership options from 1 month to 1 year",
          ].map((t) => (
            <Card key={t}><Trophy className="mb-3 text-[#ff1b1b]" size={32} /><p className="font-light leading-relaxed text-neutral-200">{t}</p></Card>
          ))}
        </div>
        <p className="mt-6 text-center text-xs font-light text-neutral-500">More member milestones and achievements will be added once verified.</p>
      </Section>

      <CtaBanner title="Become A Part Of" accent="BFD" onJoin={() => openEnquiry()} onTour={() => openTour()} />
    </>
  );
};

export default AboutPage;
