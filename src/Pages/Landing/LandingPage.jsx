import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, MapPin, Maximize, Calendar, Users, Dumbbell, Layers, Award, UserCheck,
  HeartPulse, Activity, Flame, Flower2, Snowflake,
} from "lucide-react";
import { useSite } from "../Website/components/SiteContext";
import { BRANCHES, EQUIPMENT_BRANDS, HOME_BRANCH_CARD, HOME_FEATURES, HOME_SERVICE_TILES, HOME_STATS } from "../Website/siteConfig";
import { HOME_IMAGES } from "../Website/siteImages";

// ====== YAHAN APNE ASLI APP LINKS DAAL DENA ======
const APP_STORE_URL = "https://apps.apple.com/";
const PLAY_STORE_URL = "https://play.google.com/store";

const RED = "#e11d27";
const GOLD = "#f2b53f";
const DISPLAY = "font-(family-name:--font-display-site)";

const ICONS = { Users, MapPin, Dumbbell, Layers, Award, UserCheck, HeartPulse, Activity, Flame, Flower2, Snowflake };

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
    className="group flex min-w-[230px] items-center gap-4 rounded-xl border border-white/15 bg-[#111113] px-6 py-4 text-white transition duration-300 hover:-translate-y-1 hover:border-[#e11d27] hover:shadow-[0_0_30px_rgba(225,29,39,0.35)]"
  >
    {icon}
    <span className="flex flex-col text-left leading-tight">
      <span className="text-[11px] uppercase tracking-[2px] text-neutral-400">{small}</span>
      <span className={`${DISPLAY} text-lg font-bold group-hover:text-[#e11d27]`}>{big}</span>
    </span>
  </a>
);

/* ---------- counter ---------- */
const useInView = () => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen];
};

const useCountUp = (target, active, duration = 1700) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    let start;
    const step = (t) => {
      start ??= t;
      const p = Math.min((t - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
};

const StatItem = ({ stat, active }) => {
  const Icon = ICONS[stat.icon] || Users;
  const v = useCountUp(stat.value, active);
  return (
    <div className="flex items-center justify-center gap-4 px-3 py-5 sm:px-6">
      <Icon className="h-8 w-8 shrink-0 text-white/90 sm:h-10 sm:w-10" strokeWidth={1.4} />
      <div className="leading-tight">
        <p className={`${DISPLAY} text-2xl font-bold sm:text-[28px]`}>
          {stat.format ? v.toLocaleString("en-IN") : v}
          {stat.suffix}
        </p>
        <p className="text-[13px] text-white/85">{stat.label}</p>
        {stat.note && <p className="text-[11px] text-white/50">{stat.note}</p>}
      </div>
    </div>
  );
};

const StatsBar = () => {
  const [ref, seen] = useInView();
  return (
    <section ref={ref} className="relative z-10 border-y border-white/10 bg-[#0b0b0c]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-[#e11d27]/70">
        {HOME_STATS.map((s) => (
          <StatItem key={s.label} stat={s} active={seen} />
        ))}
      </div>
    </section>
  );
};

/* ---------- small helpers ---------- */
const Eyebrow = ({ children }) => (
  <p className="mb-2 text-center text-[13px] font-bold uppercase tracking-[3px]" style={{ color: RED }}>
    {children}
  </p>
);

const ImageOrFallback = ({ src, alt, className = "", children }) =>
  src ? (
    <img src={src} alt={alt} loading="lazy" className={className} />
  ) : (
    <div className={`flex items-center justify-center bg-gradient-to-br from-[#1b1b1e] via-[#101012] to-[#2a0709] ${className}`}>
      {children || <Dumbbell className="h-12 w-12 text-white/10" />}
    </div>
  );

/* ---------- branch card ---------- */
const BranchCard = ({ branch }) => {
  const extra = HOME_BRANCH_CARD[branch.slug] || {};
  const flagship = Boolean(extra.flag);
  const accent = flagship ? GOLD : RED;
  const [first, ...rest] = branch.name.replace("–", "|").split("|")[0].trim().split(" ");
  const isEnhanced = branch.slug === "bfd-enhanced";
  return (
    <article
      className="relative flex flex-col overflow-hidden rounded-xl bg-[#101012] sm:flex-row"
      style={{ border: `1px solid ${flagship ? GOLD + "99" : "rgba(255,255,255,0.12)"}` }}
    >
      {flagship && (
        <span
          className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-b-md px-3 py-1 text-[10px] font-bold uppercase tracking-[1px] text-black sm:left-auto sm:right-[26%]"
          style={{ background: GOLD }}
        >
          {extra.flag}
        </span>
      )}
      <ImageOrFallback
        src={HOME_IMAGES.branches[branch.slug]}
        alt={branch.name}
        className="h-52 w-full object-cover sm:h-auto sm:w-[44%]"
      />
      <div className="flex flex-1 flex-col justify-center gap-3 p-5 pt-8 sm:p-6">
        <h3 className={`${DISPLAY} text-[17px] font-extrabold uppercase leading-tight sm:text-[19px]`}>
          {first} {isEnhanced ? <>{rest.join(" ")} |<br /><span style={{ color: accent }}>ENHANCED</span></> : <><br /><span style={{ color: accent }}>{rest.join(" ")}</span></>}
        </h3>
        <p className="flex items-start gap-2 text-[13px] text-white/80">
          <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: accent }} />
          {branch.area}
        </p>
        <p className={`${DISPLAY} inline-flex w-fit items-center gap-2 rounded-md border border-white/15 bg-black/40 px-3 py-2 text-[15px] font-bold`}>
          <Maximize size={16} className="text-white/70" /> {branch.sqft} Sq. Ft.
        </p>
        <p className="text-[13px] leading-relaxed text-white/70">{extra.text || branch.tagline}</p>
        <Link
          to={`/branches/${branch.slug}`}
          className={`mt-1 inline-flex w-fit items-center gap-2 rounded-md px-4 py-2 text-[13px] font-semibold transition ${flagship ? "text-black hover:brightness-110" : "border border-white/30 text-white hover:border-[#e11d27] hover:bg-[#e11d27]"}`}
          style={flagship ? { background: GOLD } : undefined}
        >
          Explore {flagship ? "Enhanced" : "Branch"} <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
};

const LandingPage = () => {
  const { openEnquiry, openTour } = useSite();
  return (
    <div className="bg-[#060606]">
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[640px] items-center overflow-hidden pt-32 pb-24 lg:min-h-[780px]">
        <div
          className="absolute inset-0 bg-cover bg-[position:70%_center]"
          style={{ backgroundImage: `url(${HOME_IMAGES.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-black/40" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <h1 className="font-heading max-w-[640px] text-[clamp(32px,5.4vw,64px)] leading-[1.06] tracking-[0px]" style={{ textShadow: "0 8px 30px rgba(0,0,0,.7)" }}>
            Eastern India&rsquo;s Most Premium Fitness Destination
          </h1>
          <span className="mt-5 block h-[3px] w-24" style={{ background: RED }} />
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
            World-class equipment, expert training, wellness &amp; more &mdash; all under one roof.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#branches"
              className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_rgba(225,29,39,0.35)] transition hover:bg-[#b9151d]"
              style={{ background: RED }}
            >
              Explore Our Branches <ArrowRight size={17} />
            </a>
            <Link
              to="/membership"
              className="inline-flex items-center rounded-md border border-white/80 bg-black/30 px-6 py-3.5 text-[15px] font-semibold text-white transition hover:border-[#e11d27] hover:bg-[#e11d27]"
            >
              View Membership Plans
            </Link>
          </div>
        </div>
      </section>

      {/* ================= COUNTERS ================= */}
      <StatsBar />

      {/* ================= WELCOME ================= */}
      <section className="relative overflow-hidden bg-[#0b0b0c]">
        <div className="pointer-events-none absolute -left-24 bottom-0 top-0 w-[38%] -skew-x-[18deg] bg-gradient-to-r from-[#e11d27]/35 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl items-end gap-4 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.5fr]">
                    <div className="order-2 flex justify-center self-end lg:order-1">
            {HOME_IMAGES.welcome ? (
              <img
                src={HOME_IMAGES.welcome}
                alt="BFD athlete"
                loading="lazy"
                className="h-[320px] w-full object-cover object-[center_15%] sm:h-[420px] lg:h-[440px]"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, #000 28%, #000 72%, transparent), linear-gradient(to top, #000 78%, transparent)",
                  maskImage:
                    "linear-gradient(to right, transparent, #000 28%, #000 72%, transparent), linear-gradient(to top, #000 78%, transparent)",
                  WebkitMaskComposite: "source-in",
                  maskComposite: "intersect",
                }}
              />
            ) : (
              <div className="flex h-[300px] w-full items-center justify-center sm:h-[400px] lg:h-[430px]">
                <span className={`${DISPLAY} text-8xl font-black italic text-white/[0.06]`}>BFD</span>
              </div>
            )}
          </div>

          <div className="order-1 py-12 lg:order-2 lg:py-16">
            <p className="mb-2 flex items-center gap-3 text-[13px] font-extrabold uppercase italic tracking-[1px]" style={{ color: RED }}>
              <span className="h-8 w-[3px] -skew-x-[20deg]" style={{ background: RED }} /> Welcome to
            </p>
            <h2 className="font-heading text-[clamp(28px,4.4vw,46px)] leading-tight tracking-[0px]">
              Bharat <span style={{ color: RED }}>Fiitness Den</span>
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80">
              A complete fitness and wellness destination in Bhubaneswar, built to help you train harder, recover better and lead a healthier, stronger life.
              With world-class equipment, certified trainers and multiple fitness programs, BFD is where your fitness goals turn into reality.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-y-6 border-t border-white/10 pt-6 sm:grid-cols-4 sm:divide-x sm:divide-white/10">
              {HOME_FEATURES.map((f) => {
                const Icon = ICONS[f.icon] || Award;
                return (
                  <div key={f.label} className="flex flex-col items-center gap-2 px-3 text-center">
                    <Icon className="h-9 w-9" style={{ color: RED }} strokeWidth={1.4} />
                    <span className="text-[13px] leading-tight text-white/90">{f.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= BRANCHES ================= */}
      <section id="branches" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Our Branches</Eyebrow>
          <h2 className="font-heading mb-10 text-center text-[clamp(24px,4vw,40px)] leading-tight tracking-[0px]">
            Two destinations. One fitness lifestyle.
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {BRANCHES.map((b) => (
              <BranchCard key={b.slug} branch={b} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Our Services</Eyebrow>
          <h2 className="font-heading mb-10 text-center text-[clamp(24px,4vw,40px)] leading-tight tracking-[0px]">More than a gym.</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {HOME_SERVICE_TILES.map((t) => {
              const Icon = ICONS[t.icon] || Dumbbell;
              return (
                <Link
                  key={t.label}
                  to={t.to}
                  className="group flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#111113] px-3 py-6 text-center transition duration-300 hover:-translate-y-1 hover:border-[#e11d27]/70 hover:shadow-[0_0_30px_rgba(225,29,39,0.18)]"
                >
                  <Icon className="h-9 w-9 transition group-hover:scale-110" style={{ color: RED }} strokeWidth={1.5} />
                  <span className="text-sm font-semibold leading-tight">{t.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= DOWNLOAD APP ================= */}
      <section id="download" className="border-y border-white/10 bg-[#0b0b0c] px-5 py-16 text-center">
        <Eyebrow>Download Now</Eyebrow>
        <h2 className="font-heading text-[clamp(24px,4vw,40px)] tracking-[0px]">
          Get The <span style={{ color: RED }}>BFD</span> App
        </h2>
        <p className="mx-auto mt-3 mb-9 max-w-md text-sm text-neutral-400">
          Workouts, diet plans and your gym &mdash; all in one place. Download the app and start roaring.
        </p>
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
          <StoreButton href={APP_STORE_URL} icon={<AppleIcon />} small="Download on the" big="App Store" />
          <StoreButton href={PLAY_STORE_URL} icon={<PlayIcon />} small="Get it on" big="Google Play" />
        </div>
      </section>

      {/* ================= EQUIPMENT BRANDS ================= */}
      <section className="bg-[#ececee] px-5 py-6 text-[#111] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 lg:flex-row lg:gap-10">
          <p className={`${DISPLAY} flex shrink-0 items-center gap-3 text-[13px] font-extrabold uppercase italic leading-tight`}>
            <span className="h-9 w-[3px] -skew-x-[20deg]" style={{ background: RED }} />
            World-Class<br />Equipment Brands
          </p>
          <ul className="grid flex-1 grid-cols-2 items-center gap-x-6 gap-y-3 text-center sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-black/15">
            {EQUIPMENT_BRANDS.slice(0, 5).map((name, i) => (
              <li key={name} className="px-2">
                <span
                  className={`${DISPLAY} inline-block text-lg font-black uppercase tracking-tight ${i % 2 === 0 ? "italic" : ""}`}
                  style={i === 0 ? { color: RED } : undefined}
                >
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden bg-black">
        <div className="pointer-events-none absolute -right-20 bottom-0 top-0 w-[32%] -skew-x-[18deg] bg-gradient-to-l from-[#e11d27]/40 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.4fr]">
          <div className="flex h-56 items-center justify-center overflow-hidden lg:h-72 lg:justify-start">
            {HOME_IMAGES.cta ? (
              <img src={HOME_IMAGES.cta} alt="BFD weight plate" loading="lazy" className="h-full w-auto max-w-full object-contain object-left" />
            ) : (
              <div
                className="flex h-52 w-52 items-center justify-center rounded-full border-[14px] border-[#18181a] text-xl font-black italic text-white shadow-[inset_0_0_0_10px_#e11d27,0_0_60px_rgba(225,29,39,0.3)] lg:h-60 lg:w-60"
                style={{ background: "radial-gradient(circle,#0a0a0a 40%,#1d1d20 100%)" }}
              >
                <span className={DISPLAY}>BFD</span>
              </div>
            )}
          </div>

          <div className="pb-12 text-center lg:py-12 lg:text-left">
            <h2 className="font-heading text-[clamp(26px,4.4vw,44px)] leading-[1.1] tracking-[0px]">
              Start your<br />
              <span style={{ color: RED }}>Fitness Journey</span> today.
            </h2>
            <div className="mt-7 flex flex-wrap justify-center gap-4 lg:justify-start">
              <button
                onClick={() => openEnquiry()}
                className="inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#b9151d]"
                style={{ background: RED }}
              >
                Join Now <ArrowRight size={17} />
              </button>
              <button
                onClick={() => openTour()}
                className="inline-flex items-center gap-2 rounded-md border border-white/80 px-6 py-3.5 text-[15px] font-semibold text-white transition hover:border-[#e11d27] hover:bg-[#e11d27]"
              >
                <Calendar size={17} /> Book a Gym Tour
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
