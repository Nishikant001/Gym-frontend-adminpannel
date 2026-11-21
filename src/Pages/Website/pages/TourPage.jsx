import { Check } from "lucide-react";
import { PageHero, Section, SectionTitle } from "../components/ui";
import { TourForm } from "../components/Forms";

const TourPage = () => (
  <>
    <PageHero eyebrow="Gym Tour" title="Book A" accent="Gym Tour" text="See the floor, meet the team and experience BFD before you join." />
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <SectionTitle center={false} eyebrow="What To Expect" title="Your Visit," accent="Your Way" />
          <ul className="space-y-4 font-light text-neutral-300">
            {["Walk-through of the training floor and equipment", "Meet a member of the BFD team", "Discuss goals, services and membership options", "No pressure – just a conversation"].map((t) => (
              <li key={t} className="flex gap-3"><Check size={20} className="mt-0.5 shrink-0 text-[#e11d27]" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="border border-[#e11d27]/30 bg-[#0d0d0d] p-6 sm:p-9"><TourForm /></div>
      </div>
    </Section>
  </>
);

export default TourPage;
