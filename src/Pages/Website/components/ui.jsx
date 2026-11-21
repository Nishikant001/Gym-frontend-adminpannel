import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const Button = ({ to, href, onClick, variant = "solid", children, className = "", external, type = "button", disabled }) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-7 py-3 font-label text-sm tracking-[1px] transition duration-300 disabled:opacity-50 sm:text-[15px]";
  const styles = {
    solid: "bg-[#e11d27] text-white hover:bg-[#b9151d]",
    outline: "border border-white/70 bg-black/30 text-white hover:border-[#e11d27] hover:bg-[#e11d27]",
    ghost: "border border-white/20 text-white hover:border-[#e11d27] hover:text-[#e11d27]",
  }[variant];
  const cls = `${base} ${styles} ${className}`;
  const style = undefined;
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
      <p className="mb-2 font-label text-sm uppercase tracking-[2px] text-[#e11d27]">{eyebrow}</p>
    )}
    <h2 className="font-heading text-[clamp(26px,4.2vw,42px)] leading-tight tracking-[0px]">
      {title} {accent && <span className="text-[#e11d27]">{accent}</span>}
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
    className="relative overflow-hidden border-b border-[#e11d27]/15 px-5 pt-36 pb-20 text-center sm:pt-44 sm:pb-28"
    style={{
      backgroundImage:
        "radial-gradient(circle at 50% 0%, rgba(225,29,39,.25), transparent 55%), repeating-linear-gradient(135deg, #121212 0px, #121212 2px, #080808 2px, #080808 40px)",
    }}
  >
    <div className="relative mx-auto max-w-4xl">
      {eyebrow && (
        <p className="mb-4 font-label text-sm uppercase tracking-[2px] text-neutral-300 sm:text-base sm:tracking-[3px]">
          <span className="mx-2 text-[#e11d27]">—</span>
          {eyebrow}
          <span className="mx-2 text-[#e11d27]">—</span>
        </p>
      )}
      <h1
        className="font-heading text-[clamp(34px,6.4vw,72px)] leading-[1.02] tracking-[0px]"
        style={{ textShadow: "0 10px 30px rgba(0,0,0,.85)" }}
      >
        {title} {accent && <span className="text-[#e11d27]">{accent}</span>}
      </h1>
      {text && <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed tracking-wide text-neutral-300 sm:text-lg">{text}</p>}
      {children && <div className="mt-9 flex flex-wrap justify-center gap-4">{children}</div>}
    </div>
  </section>
);

export const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl border border-white/10 bg-[#111113] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#e11d27]/60 hover:shadow-[0_0_30px_rgba(225,29,39,0.18)] ${className}`}>
    {children}
  </div>
);

export const CtaBanner = ({ title = "Your Next Level", accent = "Starts Now.", text = "Visit a branch, book a gym tour or send us an enquiry — our team will get back to you.", onJoin, onTour }) => (
  <section className="border-y border-[#e11d27]/20 bg-gradient-to-r from-[#240406] via-[#0d0d0d] to-[#240406] px-5 py-20 text-center">
    <h2 className="font-heading text-[clamp(26px,4.8vw,46px)] tracking-[0px]">
      {title} <span className="text-[#e11d27]">{accent}</span>
    </h2>
    <p className="mx-auto mt-3 mb-9 max-w-xl text-base font-light tracking-wide text-neutral-300">{text}</p>
    <div className="flex flex-wrap justify-center gap-4">
      <Button onClick={onJoin}>Join BFD Today <ArrowRight size={18} /></Button>
      <Button variant="outline" onClick={onTour}>Book a Gym Tour</Button>
    </div>
  </section>
);
