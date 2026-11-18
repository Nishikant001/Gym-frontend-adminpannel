import { Link } from "react-router-dom";
import { useSite } from "../Website/components/SiteContext";

import heroBg from "../../assets/landing/hero.webp";

// ====== YAHAN APNE ASLI APP LINKS DAAL DENA ======
const APP_STORE_URL = "https://apps.apple.com/";
const PLAY_STORE_URL = "https://play.google.com/store";

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true">
    <path d="M16.37 12.63c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.71-3.19-1.73-1.35-.14-2.65.8-3.34.8-.69 0-1.76-.78-2.9-.76-1.49.02-2.87.87-3.64 2.2-1.55 2.69-.4 6.67 1.11 8.85.74 1.07 1.62 2.26 2.77 2.22 1.11-.04 1.53-.72 2.88-.72 1.34 0 1.72.72 2.9.7 1.2-.02 1.96-1.08 2.69-2.16.85-1.24 1.2-2.44 1.22-2.5-.03-.01-2.34-.9-2.36-3.59ZM14.2 6.1c.61-.74 1.02-1.77.91-2.8-.88.04-1.95.59-2.58 1.33-.57.65-1.06 1.7-.93 2.7.98.08 1.99-.5 2.6-1.23Z" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
    <path fill="#00d1ff" d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l.1.1 9.3-9.3v-.2L3.7 2.2l-.1.1Z" />
    <path fill="#ffce00" d="m16.1 15.2-3.1-3.1v-.2l3.1-3.1.1.1 3.7 2.1c1 .6 1 1.5 0 2.1l-3.7 2.1-.1.1Z" />
    <path fill="#ff3a44" d="m16.2 15.1-3.2-3.2-9.4 9.4c.3.4.9.4 1.6.1l11-6.3Z" />
    <path fill="#00f076" d="M16.2 8.9 5.2 2.6c-.7-.4-1.3-.3-1.6.1L13 12l3.2-3.1Z" />
  </svg>
);

const StoreButton = ({ href, icon, small, big }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex min-w-[230px] items-center gap-4 border border-[#ff1b1b]/40 bg-[#0d0d0d] px-6 py-4 text-white transition duration-300 hover:-translate-y-1 hover:border-[#ff1b1b] hover:shadow-[0_0_30px_rgba(255,27,27,0.35)]"
    style={{ clipPath: "polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)" }}
  >
    {icon}
    <span className="flex flex-col text-left leading-tight">
      <span className="font-['Oswald'] text-[11px] uppercase tracking-[3px] text-neutral-400">
        {small}
      </span>
      <span className="font-['Bebas_Neue'] text-2xl tracking-[3px] group-hover:text-[#ff1b1b]">
        {big}
      </span>
    </span>
  </a>
);

const LandingPage = () => {
  const { openEnquiry } = useSite();
  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#060606]" />

        <div className="relative z-10 px-5 text-center">
          <p className="mb-4 font-['Bebas_Neue'] text-sm uppercase tracking-[6px] text-neutral-300 sm:text-base sm:tracking-[8px]">
            <span className="mx-2 text-[#ff1b1b]">—</span>
            Bhubaneswar
            <span className="mx-2 text-[#ff1b1b]">—</span>
          </p>

          <h1
            className="font-['Bebas_Neue'] text-[clamp(56px,11vw,160px)] uppercase leading-[0.85] tracking-[6px]"
            style={{
              transform: "skew(-6deg)",
              textShadow: "0 10px 30px rgba(0,0,0,.85)",
            }}
          >
            <span className="block text-white">Bharat</span>
            <span
              className="block text-[#ff1b1b]"
              style={{ textShadow: "0 0 30px rgba(255,27,27,.55), 0 0 70px rgba(255,27,27,.25)" }}
            >
              Fitness Den
            </span>
          </h1>

          <p className="mt-6 font-['Bebas_Neue'] text-sm uppercase tracking-[4px] text-[#ff2d2d] sm:text-xl sm:tracking-[7px]">
            Train Hard <span className="text-white">•</span> Roar Louder{" "}
            <span className="text-white">•</span> Build Legacy
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-block bg-[#ff1b1b] px-8 py-3 font-['Bebas_Neue'] text-lg tracking-[4px] text-black transition hover:bg-[#ffce00]"
            >
              Explore Our Branches
            </Link>
            <button
              onClick={() => openEnquiry()}
              className="inline-block border border-[#ff1b1b] px-8 py-3 font-['Bebas_Neue'] text-lg tracking-[4px] transition hover:bg-[#ff1b1b] hover:text-black"
            >
              Enquire Now
            </button>
            <a
              href="#download"
              className="inline-block border border-white/25 px-8 py-3 font-['Bebas_Neue'] text-lg tracking-[4px] transition hover:border-[#ff1b1b] hover:text-[#ff1b1b]"
            >
              Get The App
            </a>
          </div>
        </div>
      </section>

      {/* ================= DOWNLOAD ================= */}
      <section
        id="download"
        className="border-y border-[#ff1b1b]/15 bg-[#080808] px-5 py-20 text-center"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #141414 0px, #141414 2px, #0a0a0a 2px, #0a0a0a 40px)",
        }}
      >
        <p className="mb-2 font-['Bebas_Neue'] text-sm uppercase tracking-[6px] text-[#ff1b1b]">
          Download Now
        </p>
        <h2 className="font-['Anton'] text-[clamp(30px,6vw,56px)] uppercase tracking-[3px]">
          Get The <span className="text-[#ff1b1b]">BFD</span> App
        </h2>
        <p className="mx-auto mt-3 mb-10 max-w-md text-sm font-light tracking-wide text-neutral-400">
          Workouts, diet plans and your gym — all in one place. Download the app and start roaring.
        </p>

        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
          <StoreButton
            href={APP_STORE_URL}
            icon={<AppleIcon />}
            small="Download on the"
            big="App Store"
          />
          <StoreButton
            href={PLAY_STORE_URL}
            icon={<PlayIcon />}
            small="Get it on"
            big="Google Play"
          />
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
