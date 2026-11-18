import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CUT = { clipPath: "polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)" };

export const Button = ({ to, href, onClick, variant = "solid", children, className = "", external, type = "button", disabled }) => {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3 font-['Bebas_Neue'] text-lg tracking-[3px] transition duration-300 disabled:opacity-50";
  const styles = {
    solid: "bg-[#ff1b1b] text-black hover:bg-[#ffce00]",
    outline: "border border-[#ff1b1b] text-white hover:bg-[#ff1b1b] hover:text-black",
    ghost: "border border-white/20 text-white hover:border-[#ff1b1b] hover:text-[#ff1b1b]",
  }[variant];
  const cls = `${base} ${styles} ${className}`;
  const style = variant === "solid" ? CUT : undefined;
  if (to) return <Link to={to} className={cls} style={style}>{children}</Link>;
  if (href)
    return (
      <a href={href} className={cls} style={style} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  return <button type={type} onClick={onClick} disabled={disabled} className={cls} style={style}>{children}</button>;
};

export const SectionTitle = ({ eyebrow, title, accent, text, center = true }) => (
  <div className={`mb-12 ${center ? "text-center" : ""}`}>
    {eyebrow && (
      <p className="mb-2 font-['Bebas_Neue'] text-sm uppercase tracking-[6px] text-[#ff1b1b]">{eyebrow}</p>
    )}
    <h2 className="font-['Anton'] text-[clamp(28px,5vw,48px)] uppercase leading-tight tracking-[2px]">
      {title} {accent && <span className="text-[#ff1b1b]">{accent}</span>}
    </h2>
    {text && (
      <p className={`mt-4 max-w-3xl text-base font-light leading-relaxed tracking-wide text-neutral-400 ${center ? "mx-auto" : ""}`}>
        {text}
      </p>
    )}
  </div>
);

export const Section = ({ children, className = "", id, alt }) => (
  <section id={id} className={`px-5 py-16 sm:px-8 sm:py-24 ${alt ? "bg-[#0a0a0a]" : ""} ${className}`}>
    <div className="mx-auto max-w-7xl">{children}</div>
  </section>
);

export const PageHero = ({ eyebrow, title, accent, text, children }) => (
  <section
    className="relative overflow-hidden border-b border-[#ff1b1b]/15 px-5 pt-36 pb-20 text-center sm:pt-44 sm:pb-28"
    style={{
      backgroundImage:
        "radial-gradient(circle at 50% 0%, rgba(255,27,27,.22), transparent 55%), repeating-linear-gradient(135deg, #121212 0px, #121212 2px, #080808 2px, #080808 40px)",
    }}
  >
    <div className="relative mx-auto max-w-4xl">
      {eyebrow && (
        <p className="mb-4 font-['Bebas_Neue'] text-sm uppercase tracking-[6px] text-neutral-300 sm:text-base sm:tracking-[8px]">
          <span className="mx-2 text-[#ff1b1b]">—</span>
          {eyebrow}
          <span className="mx-2 text-[#ff1b1b]">—</span>
        </p>
      )}
      <h1
        className="font-['Bebas_Neue'] text-[clamp(44px,8vw,96px)] uppercase leading-[0.9] tracking-[4px]"
        style={{ transform: "skew(-6deg)", textShadow: "0 10px 30px rgba(0,0,0,.85)" }}
      >
        {title} {accent && <span className="text-[#ff1b1b]">{accent}</span>}
      </h1>
      {text && <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed tracking-wide text-neutral-300 sm:text-lg">{text}</p>}
      {children && <div className="mt-9 flex flex-wrap justify-center gap-4">{children}</div>}
    </div>
  </section>
);

export const Card = ({ children, className = "" }) => (
  <div className={`border border-white/10 bg-[#0d0d0d] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#ff1b1b]/60 hover:shadow-[0_0_30px_rgba(255,27,27,0.15)] ${className}`}>
    {children}
  </div>
);

export const CtaBanner = ({ title = "Your Next Level", accent = "Starts Now.", text = "Visit a branch, book a gym tour or send us an enquiry — our team will get back to you.", onJoin, onTour }) => (
  <section className="border-y border-[#ff1b1b]/20 bg-gradient-to-r from-[#1a0000] via-[#0d0d0d] to-[#1a0000] px-5 py-20 text-center">
    <h2 className="font-['Anton'] text-[clamp(30px,6vw,56px)] uppercase tracking-[3px]">
      {title} <span className="text-[#ff1b1b]">{accent}</span>
    </h2>
    <p className="mx-auto mt-3 mb-9 max-w-xl text-base font-light tracking-wide text-neutral-300">{text}</p>
    <div className="flex flex-wrap justify-center gap-4">
      <Button onClick={onJoin}>Join BFD Today <ArrowRight size={18} /></Button>
      <Button variant="outline" onClick={onTour}>Book a Gym Tour</Button>
    </div>
  </section>
);
